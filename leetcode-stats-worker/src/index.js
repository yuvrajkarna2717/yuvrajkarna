function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function handleLeetCode(url) {
  const username = url.searchParams.get("username") || "yuvrajkarna27";

  const query = `
  {
    matchedUser(username: "${username}") {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

async function handleGitHub(url, env) {
  const username = url.searchParams.get("username") || "yuvrajkarna2717";

  // Authenticate when a token is available to raise GitHub's rate limit from
  // 60 req/hour (unauthenticated) to 5000 req/hour.
  const ghHeaders = {
    "User-Agent": "portfolio-worker",
    Accept: "application/vnd.github+json",
  };
  if (env && env.GITHUB_TOKEN) {
    ghHeaders.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers: ghHeaders }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: ghHeaders,
    }),
  ]);

  // If GitHub rejects us (rate limit / error), surface a real error so the
  // client falls back instead of silently rendering zeros.
  if (!userRes.ok || !reposRes.ok) {
    return new Response(
      JSON.stringify({
        error: "github_api_error",
        userStatus: userRes.status,
        reposStatus: reposRes.status,
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      }
    );
  }

  const [user, repos] = await Promise.all([userRes.json(), reposRes.json()]);

  const stars = Array.isArray(repos)
    ? repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
    : 0;

  return new Response(
    JSON.stringify({
      repos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      stars,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        // Cache at the edge for 1 hour so repeat visitors don't burn the
        // GitHub rate limit.
        "Cache-Control": "public, max-age=3600",
        ...corsHeaders(),
      },
    }
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    const pathname = url.pathname;

    if (pathname === "/github") {
      // Serve from the edge cache when possible to protect the GitHub rate limit.
      const cache = caches.default;
      const cacheKey = new Request(url.toString(), request);
      const cached = await cache.match(cacheKey);
      if (cached) return cached;

      const response = await handleGitHub(url, env);
      // Only cache successful responses so a transient error isn't pinned for an hour.
      if (response.status === 200 && ctx) {
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
      }
      return response;
    }

    // Default: / or /leetcode → LeetCode stats
    return handleLeetCode(url);
  },
};

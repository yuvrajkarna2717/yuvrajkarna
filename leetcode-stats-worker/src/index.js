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

async function handleGitHub(url) {
  const username = url.searchParams.get("username") || "yuvrajkarna2717";

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: { "User-Agent": "portfolio-worker" },
    }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { "User-Agent": "portfolio-worker" },
    }),
  ]);

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
    { headers: { "Content-Type": "application/json", ...corsHeaders() } }
  );
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    const pathname = url.pathname;

    if (pathname === "/github") {
      return handleGitHub(url);
    }

    // Default: / or /leetcode → LeetCode stats
    return handleLeetCode(url);
  },
};

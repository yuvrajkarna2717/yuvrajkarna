export default {
  async fetch(request) {
    const url = new URL(request.url);

    const username =
      url.searchParams.get("username") || "yuvrajkarna27";

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

    const response = await fetch(
      "https://leetcode.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};

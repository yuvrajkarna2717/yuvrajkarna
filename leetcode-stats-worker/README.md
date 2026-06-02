# Portfolio API Worker

A Cloudflare Worker that acts as a unified API proxy for the portfolio site. All external API calls are routed through here to handle CORS and avoid exposing third-party endpoints directly from the browser.

## Endpoints

| Route | Description |
|---|---|
| `GET /` or `GET /leetcode?username=<user>` | LeetCode solved stats |
| `GET /github?username=<user>` | GitHub repos, stars, followers |

### Example responses

**LeetCode** (`/leetcode?username=yuvrajkarna27`)
```json
{
  "data": {
    "matchedUser": {
      "submitStats": {
        "acSubmissionNum": [
          { "difficulty": "All",    "count": 1000 },
          { "difficulty": "Easy",   "count": 400  },
          { "difficulty": "Medium", "count": 480  },
          { "difficulty": "Hard",   "count": 120  }
        ]
      }
    }
  }
}
```

**GitHub** (`/github?username=yuvrajkarna2717`)
```json
{ "repos": 30, "followers": 50, "stars": 25 }
```

---

## Deploy

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is enough)
- `wrangler` CLI — already listed as a dev dependency

### Steps

**1. Install dependencies**
```bash
cd leetcode-stats-worker
npm install
```

**2. Log in to Cloudflare**
```bash
npx wrangler login
```
This opens a browser window. Authorize Wrangler to access your account.

**3. (Optional) Rename the worker**

If you want a different subdomain (e.g. `portfolio-api.yourname.workers.dev`), edit `wrangler.jsonc`:
```jsonc
{
  "name": "portfolio-api"   // ← change this
}
```
Then update the fetch URLs in `src/Home/StatsSection.tsx` to match.

**4. Test locally**
```bash
npm run dev
```
Worker runs at `http://localhost:8787`. Test it:
```
http://localhost:8787/leetcode?username=yuvrajkarna27
http://localhost:8787/github?username=yuvrajkarna2717
```

**5. Deploy**
```bash
npm run deploy
```
Output will show the live URL:
```
Published leetcode-stats-worker (https://leetcode-stats-worker.<your-subdomain>.workers.dev)
```

**6. Update `StatsSection.tsx`**

If the deployed URL is different from what's already in the file, update the base URL in `src/Home/StatsSection.tsx`:
```ts
// LeetCode (line ~127)
"https://<your-worker-url>/leetcode?username=yuvrajkarna27"

// GitHub (line ~161)
"https://<your-worker-url>/github?username=yuvrajkarna2717"
```

---

## Redeploy after changes

Any time you edit `src/index.js`, just run:
```bash
npm run deploy
```
from inside the `leetcode-stats-worker/` directory.

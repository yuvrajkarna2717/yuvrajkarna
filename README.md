# Yuvraj Karna Portfolio

A React, TypeScript, and Vite portfolio with a FastAPI backend for live GitHub/LeetCode statistics and the MongoDB-backed habit tracker.

## Architecture

```text
React + Vite frontend
				| HTTP /api
				v
FastAPI backend
	|-- GitHub REST API
	|-- LeetCode GraphQL API
	`-- MongoDB tracker collections
```

The repository has one API architecture: `backend/`. The former Cloudflare Pages Function and standalone Cloudflare stats Worker have been removed.

## Frontend setup

```bash
npm install
cp .env.example .env
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:8000`. Set `VITE_API_BASE_URL` in `.env` when the backend is deployed separately.

## FastAPI setup

```bash
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
uvicorn app.main:app --app-dir backend --reload --port 8000
```

Swagger documentation is available at `http://localhost:8000/docs`.

### Backend environment variables

- `API_BASE_URL`: public backend URL.
- `CORS_ORIGINS`: comma-separated frontend origins.
- `GITHUB_TOKEN`: optional GitHub token for the higher API rate limit.
- `GITHUB_API_URL`: GitHub API base URL.
- `LEETCODE_API_URL`: LeetCode GraphQL endpoint.
- `MONGODB_URI`: MongoDB connection string for tracker persistence.
- `MONGODB_DB_NAME`: MongoDB database name.
- `EXTERNAL_API_TIMEOUT_SECONDS`: external service timeout.
- `STATS_CACHE_TTL_SECONDS`: in-memory stats cache duration.

## API endpoints

- `GET /api/health`
- `GET /api/github/{username}`
- `GET /api/leetcode/{username}`
- `GET /api/track?month=YYYY-MM`
- `POST /api/track/habits`
- `PATCH /api/track/habits/{habit_id}`
- `DELETE /api/track/habits/{habit_id}`
- `PATCH /api/track/records/{date}/toggle?habit_id=...`
- `PATCH /api/track/records/{date}/note`
- `DELETE /api/track/records/{date}/note`

GitHub uses the official REST API for profile and repository data. LeetCode uses its public GraphQL endpoint for profile, solved difficulty counts, and contest data. Both use async requests, timeouts, TTL caching, and structured errors.

The tracker uses the existing MongoDB database and collections. Habit definitions remain database-only; no default habits are seeded.

## Testing

```bash
backend/.venv/bin/pytest backend/tests
npm run build

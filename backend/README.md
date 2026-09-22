# FastAPI Backend

This is the single backend for the portfolio frontend. It replaces the former Cloudflare Pages Function tracker API and the separate LeetCode/GitHub Worker.

## Architecture

- `app/routes`: HTTP endpoints and validation
- `app/controllers`: request coordination
- `app/services`: MongoDB, GitHub, and LeetCode integrations
- `app/schemas`: Pydantic request and response contracts
- `app/core`: environment configuration

## Setup

From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
```

Set `MONGODB_URI` for tracker persistence and `GITHUB_TOKEN` for the higher GitHub API rate limit. LeetCode uses its public GraphQL endpoint configured by `LEETCODE_API_URL`.

Run the API:

```bash
uvicorn app.main:app --app-dir backend --reload --port 8000
```

Interactive API docs are available at `http://localhost:8000/docs`.

## Endpoints

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

## Tests

```bash
pytest backend/tests
```

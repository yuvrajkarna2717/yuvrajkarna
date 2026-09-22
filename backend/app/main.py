from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import AsyncMongoClient

from app.core.config import get_settings
from app.routes import github, health, leetcode, track
from app.services.github_service import GitHubService, GitHubServiceError
from app.services.leetcode_service import LeetCodeService, LeetCodeServiceError
from app.services.tracker_service import TrackerService


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    app.state.github_service = GitHubService(settings)
    app.state.leetcode_service = LeetCodeService(settings)
    app.state.mongo_client = None
    app.state.tracker_service = None

    if settings.mongodb_uri:
        client = AsyncMongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)
        await client.admin.command("ping")
        app.state.mongo_client = client
        tracker_service = TrackerService(client[settings.mongodb_db_name])
        await tracker_service.initialize()
        app.state.tracker_service = tracker_service

    yield

    if app.state.mongo_client:
        await app.state.mongo_client.close()


settings = get_settings()
app = FastAPI(title=settings.app_name, version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(GitHubServiceError)
async def github_error_handler(_: Request, exc: GitHubServiceError):
    return JSONResponse(status_code=exc.status_code, content={"error": exc.code, "message": str(exc)})


@app.exception_handler(LeetCodeServiceError)
async def leetcode_error_handler(_: Request, exc: LeetCodeServiceError):
    return JSONResponse(status_code=exc.status_code, content={"error": exc.code, "message": str(exc)})


@app.exception_handler(ValueError)
async def value_error_handler(_: Request, exc: ValueError):
    return JSONResponse(status_code=422, content={"error": "invalid_request", "message": str(exc)})


app.include_router(health.router)
app.include_router(github.router)
app.include_router(leetcode.router)
app.include_router(track.router)

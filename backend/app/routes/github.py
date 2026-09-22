from fastapi import APIRouter, Path, Request

from app.controllers.stats_controller import get_github_stats
from app.schemas.github import GitHubStats
from app.services.github_service import GitHubService

router = APIRouter(prefix="/api/github", tags=["GitHub"])
USERNAME_PATTERN = r"^[A-Za-z0-9-]{1,39}$"


@router.get("/{username}", response_model=GitHubStats)
async def github_stats(request: Request, username: str = Path(pattern=USERNAME_PATTERN)):
    return await get_github_stats(request.app.state.github_service, username)

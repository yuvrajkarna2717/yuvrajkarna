from fastapi import APIRouter, Path, Request

from app.controllers.stats_controller import get_leetcode_stats
from app.schemas.leetcode import LeetCodeStats
from app.services.leetcode_service import LeetCodeService

router = APIRouter(prefix="/api/leetcode", tags=["LeetCode"])
USERNAME_PATTERN = r"^[A-Za-z0-9_-]{1,39}$"


@router.get("/{username}", response_model=LeetCodeStats)
async def leetcode_stats(request: Request, username: str = Path(pattern=USERNAME_PATTERN)):
    return await get_leetcode_stats(request.app.state.leetcode_service, username)

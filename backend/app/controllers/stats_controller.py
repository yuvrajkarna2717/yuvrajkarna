from app.services.github_service import GitHubService
from app.services.leetcode_service import LeetCodeService


async def get_github_stats(service: GitHubService, username: str):
    return await service.get_stats(username)


async def get_leetcode_stats(service: LeetCodeService, username: str):
    return await service.get_stats(username)

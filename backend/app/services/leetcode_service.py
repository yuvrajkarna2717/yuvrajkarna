from typing import Any

import httpx

from app.core.config import Settings
from app.schemas.leetcode import ContestStats, LeetCodeProfile, LeetCodeStats, SolvedStats
from app.services.cache_service import TTLCache


USERNAME_RE = r"^[A-Za-z0-9_-]{1,39}$"


class LeetCodeServiceError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 502):
        self.code = code
        self.status_code = status_code
        super().__init__(message)


class LeetCodeService:
    QUERY = """
    query userStats($username: String!) {
      matchedUser(username: $username) {
        username
        profile { realName userAvatar ranking reputation }
        submitStats: submitStatsGlobal {
          acSubmissionNum { difficulty count submissions }
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount rating globalRanking totalParticipants topPercentage
      }
    }
    """

    def __init__(self, settings: Settings, cache: TTLCache | None = None):
        self.settings = settings
        self.cache = cache or TTLCache(settings.stats_cache_ttl_seconds * 6)

    async def get_stats(self, username: str) -> LeetCodeStats:
        cached = self.cache.get(username)
        if cached:
            return cached

        try:
            async with httpx.AsyncClient(timeout=self.settings.external_api_timeout_seconds) as client:
                response = await client.post(
                    self.settings.leetcode_api_url,
                    json={"query": self.QUERY, "variables": {"username": username}},
                    headers={"Content-Type": "application/json", "User-Agent": "yuvrajkarna-portfolio-api"},
                )
        except httpx.TimeoutException as exc:
            raise LeetCodeServiceError("leetcode_timeout", "LeetCode did not respond in time.") from exc
        except httpx.HTTPError as exc:
            raise LeetCodeServiceError("leetcode_unavailable", "LeetCode is currently unavailable.") from exc

        if response.status_code == 404:
            raise LeetCodeServiceError("leetcode_user_not_found", "LeetCode user was not found.", 404)
        if not response.is_success:
            raise LeetCodeServiceError("leetcode_api_error", "LeetCode returned an unexpected error.")

        payload = response.json()
        if payload.get("errors"):
            raise LeetCodeServiceError("leetcode_api_error", "LeetCode returned an API error.")
        matched_user = (payload.get("data") or {}).get("matchedUser")
        if not matched_user:
            raise LeetCodeServiceError("leetcode_user_not_found", "LeetCode user was not found.", 404)

        submission_counts = {
            item.get("difficulty"): item.get("count", 0)
            for item in matched_user.get("submitStats", {}).get("acSubmissionNum", [])
        }
        contest_data = (payload.get("data") or {}).get("userContestRanking")
        result = LeetCodeStats(
            username=username,
            profile=LeetCodeProfile(
                username=matched_user.get("username", username),
                real_name=(matched_user.get("profile") or {}).get("realName"),
                avatar=(matched_user.get("profile") or {}).get("userAvatar"),
                ranking=(matched_user.get("profile") or {}).get("ranking"),
                reputation=(matched_user.get("profile") or {}).get("reputation"),
            ),
            solved=SolvedStats(
                total=submission_counts.get("All", 0),
                easy=submission_counts.get("Easy", 0),
                medium=submission_counts.get("Medium", 0),
                hard=submission_counts.get("Hard", 0),
            ),
            contest=ContestStats(
                rating=contest_data.get("rating"),
                attended=contest_data.get("attendedContestsCount", 0),
                global_ranking=contest_data.get("globalRanking"),
                top_percentage=contest_data.get("topPercentage"),
            )
            if contest_data
            else None,
        )
        self.cache.set(username, result)
        return result

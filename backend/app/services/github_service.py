import asyncio
from typing import Any

import httpx

from app.core.config import Settings
from app.schemas.github import GitHubProfile, GitHubRepository, GitHubStats
from app.services.cache_service import TTLCache


class GitHubServiceError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 502):
        self.code = code
        self.status_code = status_code
        super().__init__(message)


class GitHubService:
    def __init__(self, settings: Settings, cache: TTLCache | None = None):
        self.settings = settings
        self.cache = cache or TTLCache(settings.stats_cache_ttl_seconds)

    def _headers(self) -> dict[str, str]:
        headers = {
            "Accept": "application/vnd.github+json",
            "User-Agent": "yuvrajkarna-portfolio-api",
        }
        if self.settings.github_token:
            headers["Authorization"] = f"Bearer {self.settings.github_token}"
        return headers

    async def get_stats(self, username: str) -> GitHubStats:
        cached = self.cache.get(username)
        if cached:
            return cached

        base_url = self.settings.github_api_url.rstrip("/")
        try:
            async with httpx.AsyncClient(timeout=self.settings.external_api_timeout_seconds) as client:
                profile_response, repositories_response = await self._fetch_profile_and_repositories(
                    client, base_url, username
                )
        except httpx.TimeoutException as exc:
            raise GitHubServiceError("github_timeout", "GitHub did not respond in time.") from exc
        except httpx.HTTPError as exc:
            raise GitHubServiceError("github_unavailable", "GitHub is currently unavailable.") from exc

        if profile_response.status_code == 404:
            raise GitHubServiceError("github_user_not_found", "GitHub user was not found.", 404)
        if profile_response.status_code in (403, 429) or repositories_response.status_code in (403, 429):
            raise GitHubServiceError("github_rate_limited", "GitHub rate limit exceeded.", 429)
        if not profile_response.is_success or not repositories_response.is_success:
            raise GitHubServiceError("github_api_error", "GitHub returned an unexpected error.")

        profile_data = profile_response.json()
        repositories_data = repositories_response.json()
        if not isinstance(repositories_data, list):
            raise GitHubServiceError("github_api_error", "GitHub returned invalid repository data.")

        repositories = [self._repository(item) for item in repositories_data if isinstance(item, dict)]
        languages: dict[str, int] = {}
        for repository in repositories:
            if repository.language:
                languages[repository.language] = languages.get(repository.language, 0) + 1

        result = GitHubStats(
            username=username,
            profile=GitHubProfile(
                login=profile_data.get("login", username),
                name=profile_data.get("name"),
                avatar_url=profile_data.get("avatar_url"),
                html_url=profile_data.get("html_url", f"https://github.com/{username}"),
                bio=profile_data.get("bio"),
                public_repos=profile_data.get("public_repos", 0),
                followers=profile_data.get("followers", 0),
                following=profile_data.get("following", 0),
            ),
            repositories=repositories,
            totals={
                "repos": profile_data.get("public_repos", 0),
                "stars": sum(repository.stars for repository in repositories),
                "forks": sum(repository.forks for repository in repositories),
                "followers": profile_data.get("followers", 0),
            },
            languages=languages,
        )
        self.cache.set(username, result)
        return result

    async def _fetch_profile_and_repositories(
        self, client: httpx.AsyncClient, base_url: str, username: str
    ) -> tuple[httpx.Response, httpx.Response]:
        return await asyncio.gather(
            client.get(f"{base_url}/users/{username}", headers=self._headers()),
            client.get(
                f"{base_url}/users/{username}/repos",
                params={"per_page": 100, "sort": "updated"},
                headers=self._headers(),
            ),
        )

    @staticmethod
    def _repository(data: dict[str, Any]) -> GitHubRepository:
        return GitHubRepository(
            name=data.get("name", ""),
            html_url=data.get("html_url", ""),
            description=data.get("description"),
            stars=data.get("stargazers_count", 0),
            forks=data.get("forks_count", 0),
            language=data.get("language"),
        )

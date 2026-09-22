import httpx
import pytest
import respx

from app.core.config import Settings
from app.services.github_service import GitHubService, GitHubServiceError
from app.services.leetcode_service import LeetCodeService, LeetCodeServiceError


@pytest.fixture
def settings():
    return Settings(github_api_url="https://api.github.test", leetcode_api_url="https://leetcode.test/graphql")


@pytest.mark.asyncio
@respx.mock
async def test_github_stats_success(settings):
    respx.get("https://api.github.test/users/octocat").mock(
        return_value=httpx.Response(
            200,
            json={"login": "octocat", "html_url": "https://github.com/octocat", "public_repos": 2, "followers": 5},
        )
    )
    respx.get("https://api.github.test/users/octocat/repos").mock(
        return_value=httpx.Response(
            200,
            json=[{"name": "hello", "html_url": "https://github.com/octocat/hello", "stargazers_count": 4, "forks_count": 1, "language": "Python"}],
        )
    )

    result = await GitHubService(settings).get_stats("octocat")

    assert result.totals == {"repos": 2, "stars": 4, "forks": 1, "followers": 5}
    assert result.languages == {"Python": 1}


@pytest.mark.asyncio
@respx.mock
async def test_github_user_not_found(settings):
    respx.get("https://api.github.test/users/missing").mock(return_value=httpx.Response(404))
    respx.get("https://api.github.test/users/missing/repos").mock(return_value=httpx.Response(404))

    with pytest.raises(GitHubServiceError) as error:
        await GitHubService(settings).get_stats("missing")

    assert error.value.code == "github_user_not_found"
    assert error.value.status_code == 404


@pytest.mark.asyncio
@respx.mock
async def test_leetcode_stats_success(settings):
    respx.post("https://leetcode.test/graphql").mock(
        return_value=httpx.Response(
            200,
            json={
                "data": {
                    "matchedUser": {
                        "username": "octocat",
                        "profile": {"ranking": 10, "reputation": 2},
                        "submitStats": {"acSubmissionNum": [
                            {"difficulty": "All", "count": 12},
                            {"difficulty": "Easy", "count": 5},
                            {"difficulty": "Medium", "count": 5},
                            {"difficulty": "Hard", "count": 2},
                        ]},
                    },
                    "userContestRanking": {"rating": 1500, "attendedContestsCount": 3},
                }
            },
        )
    )

    result = await LeetCodeService(settings).get_stats("octocat")

    assert result.solved.total == 12
    assert result.solved.medium == 5
    assert result.contest.rating == 1500


@pytest.mark.asyncio
@respx.mock
async def test_leetcode_user_not_found(settings):
    respx.post("https://leetcode.test/graphql").mock(return_value=httpx.Response(200, json={"data": {"matchedUser": None}}))

    with pytest.raises(LeetCodeServiceError) as error:
        await LeetCodeService(settings).get_stats("missing")

    assert error.value.code == "leetcode_user_not_found"
    assert error.value.status_code == 404


@pytest.mark.asyncio
@respx.mock
async def test_external_api_failure(settings):
    respx.get("https://api.github.test/users/octocat").mock(return_value=httpx.Response(500))
    respx.get("https://api.github.test/users/octocat/repos").mock(return_value=httpx.Response(500))

    with pytest.raises(GitHubServiceError) as error:
        await GitHubService(settings).get_stats("octocat")

    assert error.value.code == "github_api_error"

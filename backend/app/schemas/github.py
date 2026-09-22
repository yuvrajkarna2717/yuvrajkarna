from pydantic import BaseModel, ConfigDict


class GitHubProfile(BaseModel):
    login: str
    name: str | None = None
    avatar_url: str | None = None
    html_url: str
    bio: str | None = None
    public_repos: int = 0
    followers: int = 0
    following: int = 0


class GitHubRepository(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str
    html_url: str
    description: str | None = None
    stars: int = 0
    forks: int = 0
    language: str | None = None


class GitHubStats(BaseModel):
    username: str
    profile: GitHubProfile
    repositories: list[GitHubRepository]
    totals: dict[str, int]
    languages: dict[str, int]

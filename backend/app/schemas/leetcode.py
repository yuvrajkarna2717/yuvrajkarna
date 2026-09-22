from pydantic import BaseModel


class LeetCodeProfile(BaseModel):
    username: str
    real_name: str | None = None
    avatar: str | None = None
    ranking: int | None = None
    reputation: int | None = None


class SolvedStats(BaseModel):
    total: int = 0
    easy: int = 0
    medium: int = 0
    hard: int = 0


class ContestStats(BaseModel):
    rating: float | None = None
    attended: int = 0
    global_ranking: int | None = None
    top_percentage: float | None = None


class LeetCodeStats(BaseModel):
    username: str
    profile: LeetCodeProfile | None = None
    solved: SolvedStats
    contest: ContestStats | None = None

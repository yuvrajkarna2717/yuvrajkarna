from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Yuvraj Karna Portfolio API"
    api_base_url: str = "http://localhost:8000"
    cors_origins: str = "http://localhost:5173,http://localhost:4173"
    github_token: str | None = None
    github_api_url: str = "https://api.github.com"
    leetcode_api_url: str = "https://leetcode.com/graphql"
    mongodb_uri: str | None = None
    mongodb_db_name: str = "thedigitalprofile"
    external_api_timeout_seconds: float = 10.0
    stats_cache_ttl_seconds: int = 3600

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()

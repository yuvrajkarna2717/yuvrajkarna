import time
from typing import Any


class TTLCache:
    def __init__(self, ttl_seconds: int):
        self.ttl_seconds = ttl_seconds
        self._values: dict[str, tuple[float, Any]] = {}

    def get(self, key: str) -> Any | None:
        cached = self._values.get(key)
        if not cached:
            return None
        expires_at, value = cached
        if expires_at <= time.monotonic():
            self._values.pop(key, None)
            return None
        return value

    def set(self, key: str, value: Any) -> None:
        self._values[key] = (time.monotonic() + self.ttl_seconds, value)

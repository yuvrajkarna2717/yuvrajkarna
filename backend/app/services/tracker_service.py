import re
from datetime import datetime, timezone
from typing import Any

from pymongo import AsyncMongoClient

from app.schemas.tracker import Habit, HabitCreate, HabitUpdate, NoteUpdate, TrackerMonth, TrackerRecord


MONTH_RE = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _datetime(value: Any) -> datetime | None:
    return value if isinstance(value, datetime) else None


def _habit(data: dict[str, Any]) -> Habit:
    return Habit(
        id=str(data.get("id") or data.get("_id")),
        name=data.get("name", ""),
        description=data.get("description", ""),
        is_active=data.get("isActive", True) is not False,
        created_at=_datetime(data.get("createdAt")),
        updated_at=_datetime(data.get("updatedAt")),
    )


def _record(data: dict[str, Any]) -> TrackerRecord:
    return TrackerRecord(
        date=data["date"],
        completed_habit_ids=data.get("completedHabitIds", []),
        note=data.get("note", ""),
        created_at=_datetime(data.get("createdAt")),
        updated_at=_datetime(data.get("updatedAt")),
    )


class TrackerService:
    def __init__(self, database):
        self.habits = database["habit_definitions"]
        self.records = database["habit_daily_entries"]

    async def initialize(self) -> None:
        await self.habits.create_index("id", unique=True, name="habit_id_unique")
        await self.records.create_index("date", unique=True, name="daily_date_unique")

    async def get_month(self, month: str | None) -> TrackerMonth:
        if month and not MONTH_RE.fullmatch(month):
            raise ValueError("month must use YYYY-MM format")
        habits = await self.habits.find({"isActive": {"$ne": False}}).sort("createdAt", 1).to_list()
        query = {"date": {"$regex": f"^{month}-"}} if month else {}
        records = await self.records.find(query).sort("date", 1).to_list()
        return TrackerMonth(habits=[_habit(item) for item in habits], records=[_record(item) for item in records])

    async def save_habit(self, habit_id: str | None, payload: HabitCreate | HabitUpdate) -> Habit:
        now = datetime.now(timezone.utc)
        resolved_id = habit_id or f"habit-{int(now.timestamp() * 1000)}"
        update = {
            "$set": {
                "id": resolved_id,
                "name": payload.name.strip(),
                "description": payload.description,
                "isActive": getattr(payload, "is_active", True),
                "updatedAt": now,
            },
            "$setOnInsert": {"createdAt": now},
        }
        result = await self.habits.find_one_and_update({"id": resolved_id}, update, upsert=True, return_document=True)
        return _habit(result or {"id": resolved_id, **update["$set"]})

    async def archive_habit(self, habit_id: str) -> Habit:
        result = await self.habits.find_one_and_update(
            {"id": habit_id}, {"$set": {"isActive": False, "updatedAt": datetime.now(timezone.utc)}}, return_document=True
        )
        return _habit(result or {"id": habit_id, "isActive": False})

    async def toggle_habit(self, date: str, habit_id: str) -> TrackerRecord:
        self._validate_date(date)
        existing = await self.records.find_one({"date": date})
        completed = set(existing.get("completedHabitIds", []) if existing else [])
        if habit_id in completed:
            completed.remove(habit_id)
        else:
            completed.add(habit_id)
        now = datetime.now(timezone.utc)
        payload = {
            "date": date,
            "completedHabitIds": sorted(completed),
            "note": existing.get("note", "") if existing else "",
            "createdAt": existing.get("createdAt", now) if existing else now,
            "updatedAt": now,
        }
        await self.records.replace_one({"date": date}, payload, upsert=True)
        return _record(payload)

    async def update_note(self, date: str, payload: NoteUpdate) -> TrackerRecord:
        self._validate_date(date)
        existing = await self.records.find_one({"date": date})
        now = datetime.now(timezone.utc)
        record = {
            "date": date,
            "completedHabitIds": existing.get("completedHabitIds", []) if existing else [],
            "note": payload.note,
            "createdAt": existing.get("createdAt", now) if existing else now,
            "updatedAt": now,
        }
        await self.records.replace_one({"date": date}, record, upsert=True)
        return _record(record)

    async def delete_note(self, date: str) -> TrackerRecord:
        self._validate_date(date)
        existing = await self.records.find_one({"date": date})
        if not existing:
            return TrackerRecord(date=date)
        existing["note"] = ""
        existing["updatedAt"] = datetime.now(timezone.utc)
        await self.records.replace_one({"date": date}, existing)
        return _record(existing)

    @staticmethod
    def _validate_date(date: str) -> None:
        if not DATE_RE.fullmatch(date):
            raise ValueError("date must use YYYY-MM-DD format")
        try:
            datetime.strptime(date, "%Y-%m-%d")
        except ValueError as exc:
            raise ValueError("date must be a valid calendar date") from exc

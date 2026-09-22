from datetime import datetime

from pydantic import BaseModel, Field


class HabitCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    description: str = Field(default="", max_length=500)


class HabitUpdate(HabitCreate):
    is_active: bool = True


class Habit(BaseModel):
    id: str
    name: str
    description: str = ""
    is_active: bool = Field(default=True, serialization_alias="isActive")
    created_at: datetime | None = Field(default=None, serialization_alias="createdAt")
    updated_at: datetime | None = Field(default=None, serialization_alias="updatedAt")


class TrackerRecord(BaseModel):
    date: str
    completed_habit_ids: list[str] = Field(default_factory=list, serialization_alias="completedHabitIds")
    note: str = ""
    created_at: datetime | None = Field(default=None, serialization_alias="createdAt")
    updated_at: datetime | None = Field(default=None, serialization_alias="updatedAt")


class TrackerMonth(BaseModel):
    habits: list[Habit]
    records: list[TrackerRecord]


class NoteUpdate(BaseModel):
    note: str = Field(default="", max_length=2000)

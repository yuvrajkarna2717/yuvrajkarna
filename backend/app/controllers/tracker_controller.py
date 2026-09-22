from app.schemas.tracker import HabitCreate, HabitUpdate, NoteUpdate
from app.services.tracker_service import TrackerService


async def get_month(service: TrackerService, month: str | None):
    return await service.get_month(month)


async def create_habit(service: TrackerService, payload: HabitCreate):
    return await service.save_habit(None, payload)


async def update_habit(service: TrackerService, habit_id: str, payload: HabitUpdate):
    return await service.save_habit(habit_id, payload)


async def archive_habit(service: TrackerService, habit_id: str):
    return await service.archive_habit(habit_id)


async def toggle_habit(service: TrackerService, date: str, habit_id: str):
    return await service.toggle_habit(date, habit_id)


async def update_note(service: TrackerService, date: str, payload: NoteUpdate):
    return await service.update_note(date, payload)


async def delete_note(service: TrackerService, date: str):
    return await service.delete_note(date)

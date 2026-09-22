from fastapi import APIRouter, HTTPException, Query, Request, status

from app.controllers.tracker_controller import (
    archive_habit,
    create_habit,
    delete_note,
    get_month,
    toggle_habit,
    update_habit,
    update_note,
)
from app.schemas.tracker import Habit, HabitCreate, HabitUpdate, NoteUpdate, TrackerMonth, TrackerRecord

router = APIRouter(prefix="/api/track", tags=["Tracker"])


def service_for(request: Request):
    service = request.app.state.tracker_service
    if service is None:
        raise HTTPException(status_code=503, detail="Tracker database is not configured.")
    return service


@router.get("", response_model=TrackerMonth)
async def tracker_month(request: Request, month: str | None = Query(default=None, pattern=r"^\d{4}-(0[1-9]|1[0-2])$")):
    return await get_month(service_for(request), month)


@router.post("/habits", response_model=Habit, status_code=status.HTTP_201_CREATED)
async def add_habit(request: Request, payload: HabitCreate):
    return await create_habit(service_for(request), payload)


@router.patch("/habits/{habit_id}", response_model=Habit)
async def edit_habit(request: Request, habit_id: str, payload: HabitUpdate):
    return await update_habit(service_for(request), habit_id, payload)


@router.delete("/habits/{habit_id}", response_model=Habit)
async def remove_habit(request: Request, habit_id: str):
    return await archive_habit(service_for(request), habit_id)


@router.patch("/records/{date}/toggle", response_model=TrackerRecord)
async def complete_habit(request: Request, date: str, habit_id: str = Query(min_length=1, max_length=120)):
    return await toggle_habit(service_for(request), date, habit_id)


@router.patch("/records/{date}/note", response_model=TrackerRecord)
async def save_note(request: Request, date: str, payload: NoteUpdate):
    return await update_note(service_for(request), date, payload)


@router.delete("/records/{date}/note", response_model=TrackerRecord)
async def remove_note(request: Request, date: str):
    return await delete_note(service_for(request), date)

from fastapi import APIRouter, Request

router = APIRouter(tags=["Health"])


@router.get("/api/health")
async def health(request: Request):
    database_configured = request.app.state.tracker_service is not None
    return {"status": "ok", "database_configured": database_configured}

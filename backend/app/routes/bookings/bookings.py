from fastapi import APIRouter
from app.routes.bookings.router import router as jobs_router

router = APIRouter()
router.include_router(jobs_router)

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.routes.bookings.schemas import DetailingJobCreate, DetailingJobRead
from app.routes.bookings.booking_service import DetailingJobService
from app.core.session import get_db

router = APIRouter(prefix="/bookings", tags=["Detailing Jobs"])

@router.post("", response_model=DetailingJobRead)
async def create_job(job: DetailingJobCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await DetailingJobService.create_job(db, job)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{job_id}/assign-technician", response_model=DetailingJobRead)
async def assign_technician(job_id: str, technician_id: str, eta: str = None, db: AsyncSession = Depends(get_db)):
    try:
        return await DetailingJobService.assign_technician(db, job_id, technician_id, eta)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/", response_model=list[DetailingJobRead])
async def get_jobs(db: AsyncSession = Depends(get_db)):
    jobs = await DetailingJobService.get_all_jobs(db)
    return jobs

@router.get("/{job_id}", response_model=DetailingJobRead)
async def get_job(job_id: str, db: AsyncSession = Depends(get_db)):
    job = await DetailingJobService.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

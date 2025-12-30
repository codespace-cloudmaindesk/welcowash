from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.routes.bookings.models import DetailingService
from app.routes.bookings.schemas import DetailingJobCreate
from app.routes.bookings.service_status import ServiceStatus

class DetailingJobService:
    @staticmethod
    async def create_job(db: AsyncSession, job_data: DetailingJobCreate) -> DetailingService:
        job = DetailingService(**job_data.dict())
        db.add(job)
        await db.commit()
        await db.refresh(job)
        return job

    @staticmethod
    async def assign_technician(db: AsyncSession, job_id: str, technician_id: str, eta: str|None = None):
        job = await db.get(DetailingService, job_id)
        if not job:
            raise ValueError("Job not found")
        if job.service_status in (ServiceStatus.completed, ServiceStatus.cancelled):
            raise ValueError(f"Cannot assign a technician to job with status {job.service_status.value}")
        job.assigned_technician_id = technician_id
        job.service_status = ServiceStatus.en_route
        if eta:
            job.estimated_arrival = eta
        await db.commit()
        await db.refresh(job)
        return job

    @staticmethod
    async def get_all_jobs(db: AsyncSession):
        result = await db.execute(select(DetailingService))
        return result.scalars().all()

    @staticmethod
    async def get_job_by_id(db: AsyncSession, job_id: str):
        job = await db.get(DetailingService, job_id)
        return job

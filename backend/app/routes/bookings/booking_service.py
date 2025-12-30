from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.routes.bookings.models import DetailingService
from app.routes.bookings.schemas import DetailingJobCreate
from app.routes.bookings.service_status import ServiceStatus

class DetailingJobService:
    @staticmethod
    async def create_job(db: AsyncSession, job_data: DetailingJobCreate) -> DetailingService:
        """
        Create and persist a DetailingService using the provided job data.
        
        Parameters:
            job_data (DetailingJobCreate): Data used to populate the new detailing job.
        
        Returns:
            DetailingService: The created DetailingService instance reflecting the persisted database state.
        """
        job = DetailingService(**job_data.dict())
        db.add(job)
        await db.commit()
        await db.refresh(job)
        return job

    @staticmethod
    async def assign_technician(db: AsyncSession, job_id: str, technician_id: str, eta: str = None):
        """
        Assign a technician to a detailing job, set the job's status to en_route, and optionally record an estimated arrival time.
        
        Parameters:
            db (AsyncSession): Database session used to load and persist the job.
            job_id (str): Identifier of the detailing job to update.
            technician_id (str): Identifier of the technician to assign.
            eta (str, optional): Estimated arrival time to set on the job, if provided.
        
        Returns:
            DetailingService: The updated detailing job instance.
        
        Raises:
            ValueError: If no job with the given `job_id` exists.
            ValueError: If the job's current status is completed or cancelled and therefore cannot accept a technician assignment.
        """
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
        """
        Retrieve all records from the `detailing_service` table.
        
        Returns:
            A list of rows corresponding to every record in the `detailing_service` table.
        """
        result = await db.execute("SELECT * FROM detailing_service")
        return result.fetchall()

    @staticmethod
    async def get_job_by_id(db: AsyncSession, job_id: str):
        """
        Fetches a DetailingService record by its identifier.
        
        Parameters:
            job_id (str): The primary key of the DetailingService to retrieve.
        
        Returns:
            DetailingService | None: The matching DetailingService instance if found, otherwise `None`.
        """
        job = await db.get(DetailingService, job_id)
        return job
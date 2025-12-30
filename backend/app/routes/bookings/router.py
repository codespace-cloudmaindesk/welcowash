from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.routes.bookings.schemas import DetailingJobCreate, DetailingJobRead
from app.routes.bookings.booking_service import DetailingJobService
from app.core.session import get_db

router = APIRouter(prefix="/bookings", tags=["Detailing Jobs"])

@router.post("", response_model=DetailingJobRead)
async def create_job(job: DetailingJobCreate, db: AsyncSession = Depends(get_db)):
    """
    Create a new detailing job from the provided input.
    
    Parameters:
        job (DetailingJobCreate): Data required to create the detailing job.
    
    Returns:
        DetailingJobRead: The created detailing job.
    
    Raises:
        HTTPException: Raised with status code 400 when job creation fails.
    """
    try:
        return await DetailingJobService.create_job(db, job)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{job_id}/assign-technician", response_model=DetailingJobRead)
async def assign_technician(job_id: str, technician_id: str, eta: str = None, db: AsyncSession = Depends(get_db)):
    """
    Assigns a technician to a detailing job and optionally sets an estimated time of arrival.
    
    Parameters:
        job_id (str): Identifier of the detailing job to update.
        technician_id (str): Identifier of the technician to assign.
        eta (str, optional): Estimated time of arrival for the technician.
    
    Returns:
        The updated detailing job as a DetailingJobRead.
    
    Raises:
        HTTPException: 404 if the job or technician cannot be found or the assignment is invalid.
    """
    try:
        return await DetailingJobService.assign_technician(db, job_id, technician_id, eta)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/", response_model=list[DetailingJobRead])
async def get_jobs(db: AsyncSession = Depends(get_db)):
    """
    Retrieve all detailing jobs.
    
    Returns:
        List[DetailingJobRead]: A list of detailing job records.
    """
    jobs = await DetailingJobService.get_all_jobs(db)
    return jobs

@router.get("/{job_id}", response_model=DetailingJobRead)
async def get_job(job_id: str, db: AsyncSession = Depends(get_db)):
    """
    Retrieve a detailing job by its identifier.
    
    Parameters:
        job_id (str): The identifier of the detailing job to fetch.
    
    Returns:
        DetailingJobRead: The matching detailing job.
    
    Raises:
        HTTPException: with status code 404 if no job with the given id exists.
    """
    job = await DetailingJobService.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from app.routes.bookings.service_status import ServiceStatus

class DetailingJobCreate(BaseModel):
    service_id: str
    scheduled_datetime: datetime
    client_address: str
    vehicle_category: Optional[str] = None
    license_plate: Optional[str] = None

    client_name: str
    contact_number: str
    email: EmailStr

class DetailingJobRead(DetailingJobCreate):
    id: str
    service_status: ServiceStatus
    estimated_arrival: Optional[str] = None
    technician_location: Optional[str] = None
    assigned_technician_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
   
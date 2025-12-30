import uuid
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.session import Base
from app.routes.bookings.service_status import ServiceStatus

class DetailingService(Base):
    __tablename__ = "detailing_service"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    service_id = Column(String, nullable=False)
    scheduled_datetime = Column(DateTime, nullable=False)
    client_address = Column(String, nullable=False)
    vehicle_category = Column(String, nullable=True)
    license_plate = Column(String, nullable=True)

    client_name = Column(String, nullable=False)
    contact_number = Column(String, nullable=False)
    email = Column(String, nullable=False)

    service_status = Column(Enum(ServiceStatus), default=ServiceStatus.pending, nullable=False)
    estimated_arrival = Column(String, nullable=True)
    technician_location = Column(String, nullable=True)
    assigned_technician_id = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
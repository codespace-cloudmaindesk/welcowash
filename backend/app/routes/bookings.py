from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/bookings", tags=["Bookings"])

# Pydantic Schema for Validation
class BookingCreate(BaseModel):
    serviceId: str
    date: str
    location: str
    vehicleType: Optional[str] = None
    contact: str

@router.post("/")
def create_booking(booking: BookingCreate):
    # In a real app, we would save to DB here
    print(f"New Booking Received: {booking}")
    
    return {
        "status": "success",
        "message": "Booking received successfully",
        "booking_id": "blk_123456",  # Mock ID
        "data": booking
    }

@router.get("/{booking_id}")
def get_booking_status(booking_id: str):
    return {
        "booking_id": booking_id,
        "status": "On The Way",
        "eta": "15 mins"
    }

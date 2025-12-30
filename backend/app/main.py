from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.bookings import bookings
from app.core.session import engine, Base

app = FastAPI(title="WelcomWash API")

@app.on_event("startup")
async def init_tables():
    """
    Ensure all ORM tables declared in Base.metadata exist in the configured database.
    
    Designed to be executed during application startup to create any missing tables required by the ORM.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Configure CORS
origins = [
    "http://localhost:5000",  # React Frontend (Vite)
    "http://localhost:3000",  # Common alternative
    "http://localhost:5173",  # Vite default
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(bookings.router)

@app.get("/")
def root():
    """
    Health-check endpoint that reports the application status.
    
    Returns:
        dict: JSON-serializable object with a single key `"message"` set to `"Backend is running"`.
    """
    return {"message": "Backend is running"}
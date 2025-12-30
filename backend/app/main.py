from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.bookings import bookings
from app.core.session import engine, Base
from app.routes.bookings.models import DetailingService

app = FastAPI(title="WelcomWash API")

@app.on_event("startup")
async def init_tables():
    """
    Create all ORM tables declared on Base.metadata using the application's database engine.
    
    This function opens a connection to the configured engine and ensures every table defined in
    Base.metadata is created in the target database. Intended to be executed during application startup.
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
    return {"message": "Backend is running"}
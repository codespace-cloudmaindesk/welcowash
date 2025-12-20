from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, bookings

app = FastAPI(title="WelcomWash API")

# Configure CORS
origins = [
    "http://localhost:5000",  # React Frontend (Vite)
    "http://localhost:3000",  # Common alternative
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(bookings.router)

@app.get("/")
def root():
    return {"message": "Backend is running"}

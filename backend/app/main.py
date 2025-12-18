from fastapi import FastAPI
from app.routes import users

app = FastAPI(title="WelcomWash API")
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Backend is running"}

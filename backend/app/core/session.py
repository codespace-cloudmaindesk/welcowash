import os
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)
from sqlalchemy.orm import declarative_base
from app.core.config import DATABASE_URL

engine = create_async_engine(DATABASE_URL,echo
=os.getenv("SQL_ECHO", "false").lower() == "true")
AsyncSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
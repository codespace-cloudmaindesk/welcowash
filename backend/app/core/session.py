from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)
from sqlalchemy.orm import declarative_base
from app.core.config import DATABASE_URL

engine = create_async_engine(DATABASE_URL,echo=True)
AsyncSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

async def get_db() -> AsyncSession:
    """
    Provide a scoped AsyncSession for use by callers.
    
    Yields:
        AsyncSession: A database session instance opened for the current context; it is closed when the consumer exits the surrounding context.
    """
    async with AsyncSessionLocal() as session:
        yield session
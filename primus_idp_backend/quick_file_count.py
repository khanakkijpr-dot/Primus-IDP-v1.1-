"""
Quick database file counter for Primus IDP.
Run this script to get a quick count of uploaded files.
"""
import asyncio
from sqlalchemy import func, select
from app.db import Document, DocumentType, get_async_session


async def quick_count():
    """Quick count of files in database."""
    async for session in get_async_session():
        try:
            # Count files
            result = await session.execute(
                select(func.count(Document.id)).where(
                    Document.document_type == DocumentType.FILE
                )
            )
            count = result.scalar()

            print(f"\n{'='*60}")
            print(f"  FILES UPLOADED IN DATABASE: {count}")
            print(f"{'='*60}\n")

        finally:
            break


if __name__ == "__main__":
    asyncio.run(quick_count())

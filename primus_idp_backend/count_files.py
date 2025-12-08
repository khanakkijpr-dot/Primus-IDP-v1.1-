"""
Script to count the number of files uploaded in the database.
"""
import asyncio
from sqlalchemy import func, select
from app.db import Document, DocumentType, get_async_session


async def count_files():
    """Count files by document type in the database."""
    async for session in get_async_session():
        try:
            # Count total files with document_type = FILE
            result = await session.execute(
                select(func.count(Document.id)).where(
                    Document.document_type == DocumentType.FILE
                )
            )
            total_files = result.scalar()

            # Get breakdown by all document types
            type_counts = await session.execute(
                select(
                    Document.document_type, func.count(Document.id)
                ).group_by(Document.document_type)
            )
            type_breakdown = {
                doc_type: count for doc_type, count in type_counts.all()
            }

            # Count total documents
            total_result = await session.execute(select(func.count(Document.id)))
            total_documents = total_result.scalar()

            # Display results
            print("\n" + "=" * 60)
            print("  PRIMUS IDP - DATABASE FILE COUNT REPORT")
            print("=" * 60)
            print(f"\n  Total Files Uploaded (FILE type): {total_files}")
            print(f"  Total Documents (All types): {total_documents}")
            print("\n" + "-" * 60)
            print("  Document Type Breakdown:")
            print("-" * 60)

            for doc_type, count in sorted(
                type_breakdown.items(), key=lambda x: x[1], reverse=True
            ):
                print(f"  {str(doc_type).ljust(30)}: {count}")

            print("=" * 60 + "\n")

        finally:
            break


if __name__ == "__main__":
    asyncio.run(count_files())

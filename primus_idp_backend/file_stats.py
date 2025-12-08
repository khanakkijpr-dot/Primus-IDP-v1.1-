"""
Script to get detailed file upload statistics from the database.
"""
import asyncio
from sqlalchemy import func, select, distinct
from app.db import Document, DocumentType, get_async_session, SearchSpace, User


async def get_file_statistics():
    """Get detailed statistics about uploaded files."""
    async for session in get_async_session():
        try:
            # Count total files
            result = await session.execute(
                select(func.count(Document.id)).where(
                    Document.document_type == DocumentType.FILE
                )
            )
            total_files = result.scalar()

            # Get files with metadata
            files_query = await session.execute(
                select(Document)
                .where(Document.document_type == DocumentType.FILE)
                .order_by(Document.created_at.desc())
            )
            files = files_query.scalars().all()

            # Count unique search spaces with files
            search_spaces_query = await session.execute(
                select(func.count(distinct(Document.search_space_id))).where(
                    Document.document_type == DocumentType.FILE
                )
            )
            unique_search_spaces = search_spaces_query.scalar()

            # Get ETL service breakdown
            etl_services = {}
            for file in files:
                metadata = file.document_metadata or {}
                etl_service = metadata.get("ETL_SERVICE", "Unknown")
                etl_services[etl_service] = etl_services.get(etl_service, 0) + 1

            # Get recent files (last 10)
            recent_files = files[:10]

            # Display results
            print("\n" + "=" * 80)
            print("  PRIMUS IDP - DETAILED FILE UPLOAD STATISTICS")
            print("=" * 80)
            print(f"\n  📊 SUMMARY")
            print("  " + "-" * 76)
            print(f"  Total Files Uploaded: {total_files}")
            print(f"  Unique Search Spaces: {unique_search_spaces}")
            print(
                f"  Average Files per Space: {total_files / unique_search_spaces if unique_search_spaces > 0 else 0:.2f}"
            )

            print(f"\n  🔧 ETL SERVICE BREAKDOWN")
            print("  " + "-" * 76)
            for service, count in sorted(
                etl_services.items(), key=lambda x: x[1], reverse=True
            ):
                percentage = (count / total_files * 100) if total_files > 0 else 0
                print(f"  {service.ljust(20)}: {count:>3} files ({percentage:>5.1f}%)")

            if recent_files:
                print(f"\n  📄 RECENT FILES (Last 10)")
                print("  " + "-" * 76)
                for idx, file in enumerate(recent_files, 1):
                    metadata = file.document_metadata or {}
                    filename = metadata.get("FILE_NAME", file.title)
                    etl_service = metadata.get("ETL_SERVICE", "Unknown")
                    created = file.created_at.strftime("%Y-%m-%d %H:%M:%S")
                    print(f"  {idx:>2}. {filename[:50]}")
                    print(f"      ETL: {etl_service} | Created: {created}")
                    print(
                        f"      Search Space ID: {file.search_space_id} | Chunks: {len(file.chunks) if file.chunks else 0}"
                    )

            print("\n" + "=" * 80 + "\n")

        finally:
            break


if __name__ == "__main__":
    asyncio.run(get_file_statistics())

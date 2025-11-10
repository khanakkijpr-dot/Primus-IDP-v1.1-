"""
Debug script to check file upload issues.
"""
import asyncio
from sqlalchemy import select, func
from app.db import Document, DocumentType, SearchSpace, get_async_session


async def debug_files():
    """Debug file visibility issues."""
    async for session in get_async_session():
        try:
            # Get all search spaces
            search_spaces = await session.execute(select(SearchSpace))
            spaces = search_spaces.scalars().all()

            print("\n" + "=" * 80)
            print("  FILE UPLOAD DEBUG REPORT")
            print("=" * 80)

            print(f"\n📁 SEARCH SPACES ({len(spaces)} total):")
            print("-" * 80)
            for space in spaces:
                print(f"\n  ID: {space.id}")
                print(f"  Name: {space.name}")
                print(f"  User ID: {space.user_id}")
                print(f"  Created: {space.created_at}")

                # Count documents in this space
                doc_count = await session.execute(
                    select(func.count(Document.id)).where(
                        Document.search_space_id == space.id
                    )
                )
                count = doc_count.scalar()
                print(f"  Documents: {count}")

                # Get documents
                docs = await session.execute(
                    select(Document)
                    .where(Document.search_space_id == space.id)
                    .order_by(Document.created_at.desc())
                    .limit(5)
                )
                documents = docs.scalars().all()

                if documents:
                    print(f"\n  Recent Documents:")
                    for doc in documents:
                        metadata = doc.document_metadata or {}
                        filename = metadata.get("FILE_NAME", doc.title)
                        print(f"    - {filename} (Type: {doc.document_type})")
                        print(f"      Created: {doc.created_at}")
                        print(f"      ID: {doc.id}")

            # Check for orphaned documents (no search space)
            orphaned = await session.execute(
                select(func.count(Document.id)).where(
                    Document.search_space_id.is_(None)
                )
            )
            orphaned_count = orphaned.scalar()

            if orphaned_count > 0:
                print(f"\n⚠️  ORPHANED DOCUMENTS: {orphaned_count}")

            # Get all FILE type documents
            all_files = await session.execute(
                select(Document.search_space_id, func.count(Document.id))
                .where(Document.document_type == DocumentType.FILE)
                .group_by(Document.search_space_id)
            )
            file_distribution = all_files.all()

            print(f"\n📊 FILE DISTRIBUTION BY SEARCH SPACE:")
            print("-" * 80)
            for space_id, count in file_distribution:
                print(f"  Search Space {space_id}: {count} files")

            print("\n" + "=" * 80 + "\n")

        finally:
            break


if __name__ == "__main__":
    asyncio.run(debug_files())

"""
Check recent task logs to debug file upload issues.
"""
import asyncio
from sqlalchemy import select
from app.db import Log, get_async_session


async def check_logs():
    """Check recent task logs."""
    async for session in get_async_session():
        try:
            # Get recent logs
            logs = await session.execute(
                select(Log).order_by(Log.created_at.desc()).limit(20)
            )
            log_entries = logs.scalars().all()

            print("\n" + "=" * 80)
            print("  RECENT TASK LOGS (Last 20)")
            print("=" * 80)

            for log in log_entries:
                status_emoji = (
                    "✅"
                    if log.status == "SUCCESS"
                    else "❌" if log.status == "FAILED" else "⏳"
                )
                print(f"\n{status_emoji} [{log.level}] {log.task_name}")
                print(f"   Time: {log.created_at}")
                print(f"   Status: {log.status}")
                print(f"   Message: {log.message}")
                if log.error_details:
                    print(f"   Error: {log.error_details}")
                if log.metadata:
                    print(f"   Metadata: {log.metadata}")
                print("   " + "-" * 76)

            print("\n" + "=" * 80 + "\n")

        finally:
            break


if __name__ == "__main__":
    asyncio.run(check_logs())

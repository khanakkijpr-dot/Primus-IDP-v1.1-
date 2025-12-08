"""Check existing users in database"""
import asyncio
from sqlalchemy import select
from app.db import User, AsyncSessionLocal

async def list_users():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User))
        users = result.scalars().all()
        
        print(f"\n{'='*80}")
        print(f"USERS IN DATABASE ({len(users)} total)")
        print('='*80)
        
        for user in users:
            print(f"\nUser ID: {user.id}")
            print(f"Email: {user.email}")
            print(f"Is Active: {user.is_active}")
            print(f"Is Superuser: {user.is_superuser}")
            print(f"Is Verified: {user.is_verified}")
            print(f"Created: {user.created_at if hasattr(user, 'created_at') else 'N/A'}")
            
if __name__ == "__main__":
    asyncio.run(list_users())

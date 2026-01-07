"""
Script to reset all users and create a fresh test user.
This will:
1. Delete all existing users from the database
2. Create a new test user with known credentials
"""
import asyncio
import sys

from fastapi_users.password import PasswordHelper
from sqlalchemy import delete, text
from sqlalchemy.future import select

from app.db import User, async_session_maker, Base, engine


async def reset_and_create_user():
    """Reset database users and create a fresh test user."""
    password_helper = PasswordHelper()
    
    print("=" * 50)
    print("PRIMUS IDP - Database User Reset")
    print("=" * 50)
    
    async with async_session_maker() as session:
        try:
            # Step 1: Count existing users
            result = await session.execute(select(User))
            existing_users = result.scalars().all()
            print(f"\n📊 Found {len(existing_users)} existing user(s)")
            
            for user in existing_users:
                print(f"   - {user.email} (ID: {user.id})")
            
            # Step 2: Delete all users
            if existing_users:
                print("\n🗑️  Deleting all existing users...")
                await session.execute(delete(User))
                await session.commit()
                print("   ✓ All users deleted successfully")
            else:
                print("\n📭 No existing users to delete")
            
            # Step 3: Create new test user
            print("\n👤 Creating new test user...")
            
            test_email = "test@primusidp.com"
            test_password = "TestUser123!"
            
            hashed_password = password_helper.hash(test_password)
            new_user = User(
                email=test_email,
                hashed_password=hashed_password,
                is_active=True,
                is_superuser=False,
                is_verified=True,
            )
            session.add(new_user)
            await session.commit()
            
            print("   ✓ Test user created successfully!")
            print("\n" + "=" * 50)
            print("🔐 LOGIN CREDENTIALS")
            print("=" * 50)
            print(f"   Email:    {test_email}")
            print(f"   Password: {test_password}")
            print("=" * 50)
            print("\n✅ Database reset complete! You can now login with the above credentials.")
            
            return True
            
        except Exception as e:
            print(f"\n❌ Error: {e}")
            await session.rollback()
            return False


if __name__ == "__main__":
    try:
        result = asyncio.run(reset_and_create_user())
        sys.exit(0 if result else 1)
    except KeyboardInterrupt:
        print("\n\n⚠️  Operation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        sys.exit(1)

import asyncio

from fastapi_users.password import PasswordHelper
from sqlalchemy import select

from app.db import User, async_session_maker


async def create_user():
    password_helper = PasswordHelper()

    async with async_session_maker() as session:
        result = await session.execute(
            select(User).where(User.email == "akki@primussoft.com")
        )
        existing_user = result.scalar_one_or_none()

        if existing_user:
            print("User already exists")
            return

        hashed_password = password_helper.hash("Primus123")
        user = User(
            email="akki@primussoft.com",
            hashed_password=hashed_password,
            is_active=True,
            is_superuser=False,
            is_verified=True,
        )
        session.add(user)
        await session.commit()

    print("User created successfully!")
    print("Email: akki@primussoft.com")
    print("Password: Primus123")


if __name__ == "__main__":
    asyncio.run(create_user())

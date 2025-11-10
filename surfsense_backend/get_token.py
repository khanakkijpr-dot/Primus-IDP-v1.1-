"""
Automated Login and Token Retrieval for Primus IDP
"""
import asyncio
import httpx
import json

API_BASE_URL = "http://localhost:8000"

async def login_and_get_token():
    """Login to get bearer token"""
    print("=== Primus IDP Token Retrieval ===\n")
    
    # Get credentials
    email = input("Enter your email: ").strip()
    password = input("Enter your password: ").strip()
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        # Login endpoint
        login_url = f"{API_BASE_URL}/api/v1/auth/jwt/login"
        
        print(f"\n🔐 Attempting login to: {login_url}")
        
        # Prepare form data (FastAPI Users expects form-encoded data)
        data = {
            "username": email,  # FastAPI Users uses 'username' field for email
            "password": password
        }
        
        try:
            response = await client.post(
                login_url,
                data=data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )
            
            print(f"Response Status: {response.status_code}")
            
            if response.status_code == 200:
                token_data = response.json()
                token = token_data.get("access_token")
                
                print("\n✅ Login successful!")
                print(f"\n{'='*80}")
                print("Bearer Token:")
                print(f"{'='*80}")
                print(token)
                print(f"{'='*80}\n")
                
                # Save to file
                with open("bearer_token.txt", "w") as f:
                    f.write(token)
                print("✅ Token saved to: bearer_token.txt\n")
                
                # Verify token
                print("🔍 Verifying token...")
                verify_response = await client.post(
                    f"{API_BASE_URL}/api/v1/auth/verify-token",
                    headers={"Authorization": f"Bearer {token}"}
                )
                
                if verify_response.status_code == 200:
                    user_data = verify_response.json()
                    print(f"✅ Token verified! User ID: {user_data.get('id')}")
                    print(f"   Email: {user_data.get('email')}")
                    return token
                else:
                    print(f"⚠️  Token verification failed: {verify_response.status_code}")
                    return token
                    
            elif response.status_code == 400:
                error_detail = response.json()
                print(f"\n❌ Login failed: {error_detail}")
                print("   Check your email and password")
                return None
            else:
                print(f"\n❌ Unexpected response: {response.status_code}")
                print(f"   {response.text}")
                return None
                
        except Exception as e:
            print(f"\n❌ Error during login: {e}")
            return None

if __name__ == "__main__":
    token = asyncio.run(login_and_get_token())
    
    if token:
        print("\n" + "="*80)
        print("Next Steps:")
        print("="*80)
        print("1. Token is ready to use")
        print("2. Run the upload audit with:")
        print("   python upload_audit.py")
        print("3. When prompted, paste the token from above")
        print("   (or it will auto-load from bearer_token.txt)")
        print("="*80)
    else:
        print("\n⚠️  Could not retrieve token. Please check:")
        print("   1. Backend is running on http://localhost:8000")
        print("   2. Email and password are correct")
        print("   3. User account exists in database")

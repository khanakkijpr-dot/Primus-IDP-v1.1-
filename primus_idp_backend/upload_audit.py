"""
COMPLETE FILE UPLOAD AUDIT - API Journey Tracker
Uploads files from specified directory and logs every step, value, and attribute
"""
import asyncio
import httpx
import json
from pathlib import Path
from datetime import datetime
import hashlib
from typing import Dict, Any, List
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import Document, SearchSpace, Log, async_session_maker

# Configuration
SOURCE_DIR = r"C:\Users\Akki\Downloads\OneDrive_1_06-11-2025"
API_BASE_URL = "http://localhost:8000"
SEARCH_SPACE_ID = 1
USER_ID = "3a3408f8-2842-4b83-943a-9febafb23fb9"

# Get bearer token - try to load from file first
def get_bearer_token():
    """Get bearer token from file or user input"""
    token_file = Path(__file__).parent / "bearer_token.txt"
    
    if token_file.exists():
        print(f"✅ Loading token from {token_file}")
        with open(token_file, 'r') as f:
            token = f.read().strip()
        if token:
            return token
    
    print("\n⚠️  No saved token found. Please get token:")
    print("   Option 1: Run 'python get_token.py' to login and get token")
    print("   Option 2: Get from browser localStorage: primus_idp_bearer_token")
    return input("\nEnter Bearer Token: ").strip()

BEARER_TOKEN = get_bearer_token()

class UploadAuditor:
    def __init__(self):
        self.audit_log = []
        self.upload_results = []
        self.session = None
        
    def log(self, stage: str, message: str, data: Dict[Any, Any] | None = None):
        """Log audit trail entry"""
        entry = {
            "timestamp": datetime.now().isoformat(),
            "stage": stage,
            "message": message,
            "data": data or {}
        }
        self.audit_log.append(entry)
        print(f"\n{'='*80}")
        print(f"[{entry['timestamp']}] {stage}")
        print(f"{message}")
        if data:
            print(json.dumps(data, indent=2, default=str))
        print('='*80)
        
    async def verify_database_before(self):
        """Check database state before upload"""
        self.log("PRE-UPLOAD DB CHECK", "Querying database state before upload")
        
        async with async_session_maker() as session:
            # Count existing documents
            result = await session.execute(
                select(func.count(Document.id))
                .where(Document.search_space_id == SEARCH_SPACE_ID)
            )
            doc_count = result.scalar()
            
            # Get search space details
            result = await session.execute(
                select(SearchSpace).where(SearchSpace.id == SEARCH_SPACE_ID)
            )
            search_space = result.scalar_one_or_none()
            
            # Get recent logs
            result = await session.execute(
                select(Log).order_by(Log.created_at.desc()).limit(5)
            )
            recent_logs = result.scalars().all()
            
            self.log("DATABASE STATE", f"Documents in search space: {doc_count}", {
                "search_space_id": SEARCH_SPACE_ID,
                "search_space_name": search_space.name if search_space else "NOT FOUND",
                "user_id": str(search_space.user_id) if search_space else None,
                "existing_documents": doc_count,
                "recent_logs_count": len(recent_logs),
                "recent_log_messages": [log.message for log in recent_logs]
            })
            
            return doc_count
            
    async def upload_file_via_api(self, file_path: Path):
        """Upload single file via API and track journey"""
        self.log("FILE SELECTED", f"Preparing to upload: {file_path.name}", {
            "file_name": file_path.name,
            "file_size": file_path.stat().st_size,
            "file_extension": file_path.suffix,
            "file_path": str(file_path),
            "last_modified": datetime.fromtimestamp(file_path.stat().st_mtime).isoformat()
        })
        
        # Calculate file hash
        with open(file_path, 'rb') as f:
            file_hash = hashlib.sha256(f.read()).hexdigest()
            
        self.log("FILE HASH", "Calculated SHA256 hash", {
            "sha256": file_hash,
            "purpose": "Used for deduplication in database"
        })
        
        # Prepare API request
        async with httpx.AsyncClient(timeout=300.0) as client:
            headers = {
                "Authorization": f"Bearer {BEARER_TOKEN}"
            }
            
            self.log("API REQUEST PREP", "Preparing multipart form data", {
                "endpoint": f"{API_BASE_URL}/api/v1/documents/fileupload",
                "method": "POST",
                "headers": {"Authorization": "Bearer ***"},
                "form_data": {
                    "search_space_id": SEARCH_SPACE_ID,
                    "files": file_path.name
                }
            })
            
            # Open file and upload
            with open(file_path, 'rb') as f:
                files = {'files': (file_path.name, f, 'application/octet-stream')}
                data = {'search_space_id': str(SEARCH_SPACE_ID)}
                
                try:
                    self.log("API CALL", "Sending POST request to backend")
                    
                    response = await client.post(
                        f"{API_BASE_URL}/api/v1/documents/fileupload",
                        headers=headers,
                        files=files,
                        data=data
                    )
                    
                    self.log("API RESPONSE", f"Status: {response.status_code}", {
                        "status_code": response.status_code,
                        "reason": response.reason_phrase,
                        "headers": dict(response.headers),
                        "response_body": response.text[:500]
                    })
                    
                    if response.status_code == 200:
                        response_data = response.json()
                        self.log("UPLOAD SUCCESS", "File accepted by API", response_data)
                        return {"success": True, "file": file_path.name, "response": response_data}
                    else:
                        self.log("UPLOAD FAILED", f"API returned error: {response.status_code}", {
                            "status_code": response.status_code,
                            "error": response.text
                        })
                        return {"success": False, "file": file_path.name, "error": response.text}
                        
                except Exception as e:
                    self.log("EXCEPTION", f"Upload failed with exception: {str(e)}", {
                        "error_type": type(e).__name__,
                        "error_message": str(e)
                    })
                    return {"success": False, "file": file_path.name, "exception": str(e)}
                    
    async def verify_celery_task(self, wait_seconds: int = 10):
        """Check if Celery task was created"""
        self.log("CELERY CHECK", f"Waiting {wait_seconds} seconds for Celery task processing")
        await asyncio.sleep(wait_seconds)
        
        async with async_session_maker() as session:
            # Check for recent logs
            result = await session.execute(
                select(Log)
                .order_by(Log.created_at.desc())
                .limit(10)
            )
            logs = result.scalars().all()
            
            self.log("CELERY LOGS", f"Found {len(logs)} recent log entries", {
                "log_count": len(logs),
                "logs": [
                    {
                        "id": log.id,
                        "message": log.message,
                        "level": log.level,
                        "created_at": log.created_at.isoformat() if log.created_at else None
                    }
                    for log in logs
                ]
            })
            
    async def verify_database_after(self, initial_count: int):
        """Check database state after upload"""
        self.log("POST-UPLOAD DB CHECK", "Querying database for new documents")
        
        async with async_session_maker() as session:
            # Count documents now
            result = await session.execute(
                select(func.count(Document.id))
                .where(Document.search_space_id == SEARCH_SPACE_ID)
            )
            new_count = result.scalar()
            
            # Get most recent documents
            result = await session.execute(
                select(Document)
                .where(Document.search_space_id == SEARCH_SPACE_ID)
                .order_by(Document.created_at.desc())
                .limit(10)
            )
            recent_docs = result.scalars().all()
            
            self.log("DATABASE VERIFICATION", f"Document count changed: {initial_count} → {new_count}", {
                "before_count": initial_count,
                "after_count": new_count,
                "new_documents": new_count - initial_count,
                "recent_documents": [
                    {
                        "id": doc.id,
                        "title": doc.title,
                        "document_type": doc.document_type.value if doc.document_type else None,
                        "created_at": doc.created_at.isoformat() if doc.created_at else None,
                        "metadata": doc.document_metadata,
                        "content_preview": doc.content[:200] if doc.content else None,
                        "has_embedding": doc.embedding is not None
                    }
                    for doc in recent_docs
                ]
            })
            
            return new_count - initial_count
            
    async def run_audit(self, max_files: int = 3):
        """Run complete audit for file uploads"""
        self.log("AUDIT START", f"Beginning file upload audit from: {SOURCE_DIR}")
        
        # List all files
        source_path = Path(SOURCE_DIR)
        all_files = list(source_path.glob("*.xlsx"))[:max_files]  # Start with Excel files only
        
        self.log("FILES DISCOVERED", f"Found {len(all_files)} files to upload", {
            "files": [f.name for f in all_files]
        })
        
        # Check database before
        initial_count = await self.verify_database_before()
        
        # Upload files
        for idx, file_path in enumerate(all_files, 1):
            self.log("UPLOAD BATCH", f"Processing file {idx}/{len(all_files)}")
            result = await self.upload_file_via_api(file_path)
            self.upload_results.append(result)
            
            # Wait between uploads
            if idx < len(all_files):
                await asyncio.sleep(2)
                
        # Check Celery processing
        await self.verify_celery_task(wait_seconds=15)
        
        # Check database after
        new_docs = await self.verify_database_after(initial_count)
        
        # Summary
        successful = sum(1 for r in self.upload_results if r.get("success"))
        failed = len(self.upload_results) - successful
        
        self.log("AUDIT COMPLETE", f"Upload audit finished", {
            "total_files": len(all_files),
            "successful_uploads": successful,
            "failed_uploads": failed,
            "new_documents_in_db": new_docs,
            "discrepancy": successful - new_docs,
            "possible_issues": [
                "Celery worker not running" if new_docs == 0 and successful > 0 else None,
                "Duplicate files rejected" if successful > new_docs else None,
                "Processing still in progress" if new_docs < successful else None
            ]
        })
        
        # Save audit log
        audit_file = Path(__file__).parent / f"upload_audit_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(audit_file, 'w') as f:
            json.dump({
                "audit_log": self.audit_log,
                "upload_results": self.upload_results,
                "summary": {
                    "total_files": len(all_files),
                    "successful": successful,
                    "failed": failed,
                    "new_documents": new_docs
                }
            }, f, indent=2, default=str)
            
        self.log("AUDIT SAVED", f"Complete audit log saved to: {audit_file}")
        
        return self.audit_log

if __name__ == "__main__":
    auditor = UploadAuditor()
    asyncio.run(auditor.run_audit(max_files=3))

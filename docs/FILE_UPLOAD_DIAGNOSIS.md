# File Upload Issue Diagnosis
**Date**: 2025-11-07 00:42:00  
**Status**: 🔍 INVESTIGATING

---

## 🔎 Problem Statement

User reports: "Files are being uploaded but they are not showing anywhere neither in UI or DB"

---

## ✅ What We Found

### Database Check
- **24 files exist in database** (document_type = FILE)
- All files in Search Space ID: 1
- All processed with DOCLING ETL service
- Most recent upload: 2025-11-06 17:15:58

### Files Distribution
```
Search Space 1 ("Akki Khan"): 24 files
- WPR_CC_2022_4thApril.xlsx (ID: 56)
- WPR_CC_2022_2ndMay.xlsx (ID: 55)
- WPR_CC_28Oct2022.xlsx (ID: 54)
- ... and 21 more files
```

---

## ❌ Potential Issues

### 1. Celery Worker Not Running ⚠️
**Evidence**: No task logs in database (checked last 20 logs - empty)

**Impact**: 
- New file uploads will be queued but NOT processed
- Files won't appear in UI until Celery processes them
- Background tasks (chunking, embedding, indexing) won't run

**Solution**: Start Celery worker
```bash
cd surfsense_backend
celery -A app.celery_app worker --loglevel=info --concurrency=1 --pool=solo
```

### 2. Frontend Not Fetching Documents
**Check Needed**: Verify if frontend is calling `/api/v1/documents/` correctly

**Possible Causes**:
- Auth token missing/expired
- Wrong search_space_id in URL
- API endpoint not responding
- CORS issues

### 3. UI Display Issue
**Check Needed**: Verify if documents are fetched but not rendered

---

## 🧪 Test Checklist

### Backend Tests
- [ ] Check if backend is running on port 8000
- [ ] Test documents API: `GET /api/v1/documents/?search_space_id=1`
- [ ] Verify auth token is valid
- [ ] Check Celery worker status
- [ ] Check Redis connection (Celery broker)

### Frontend Tests
- [ ] Check browser console for errors
- [ ] Verify localStorage has `primus_idp_bearer_token`
- [ ] Check Network tab for API calls to `/documents/`
- [ ] Verify search_space_id in URL matches database (should be 1)
- [ ] Check if documents component is rendering

### Database Tests
- [x] Count files in DB ✅ (24 files found)
- [x] Check search spaces ✅ (1 space found, ID: 1)
- [ ] Check if user ID matches logged-in user
- [ ] Verify document permissions

---

## 🔧 Quick Fix Commands

### 1. Start Celery Worker
```powershell
cd c:\Users\Akki\SurfSense\surfsense_backend
& c:\Users\Akki\SurfSense\.venv\Scripts\python.exe -m celery -A app.celery_app worker --loglevel=info --concurrency=1 --pool=solo
```

### 2. Check Backend Status
```powershell
Test-NetConnection -ComputerName localhost -Port 8000
```

### 3. Check Redis Status
```powershell
docker ps | Select-String "redis"
```

### 4. Test Documents API (with auth)
Open browser console on Primus IDP dashboard, run:
```javascript
const token = localStorage.getItem('primus_idp_bearer_token');
fetch('http://localhost:8000/api/v1/documents/?search_space_id=1&page_size=5', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(console.log);
```

### 5. Check Frontend Console
1. Open Primus IDP in browser
2. Navigate to `/dashboard/1/documents` (or correct search_space_id)
3. Open DevTools (F12)
4. Check Console tab for errors
5. Check Network tab for `/documents/` API calls

---

## 📊 Diagnosis Script Results

### debug_files.py
```
✅ Search Spaces: 1 total
✅ Documents: 24 files in Space 1
✅ User ID: 3a3408f8-2842-4b83-943a-9febafb23fb9
✅ Recent uploads exist (Nov 6, 2025)
```

### check_logs.py
```
❌ No task logs found
⚠️  This indicates Celery worker has never run or isn't logging
```

---

## 🎯 Recommended Action Plan

**IMMEDIATE (Do this now)**:
1. Start Celery worker (command above)
2. Check if UI shows documents after Celery starts
3. If still not showing, check browser console for errors

**IF STILL NOT WORKING**:
1. Verify you're logged in with correct user
2. Check search_space_id in URL (should be 1)
3. Clear browser cache and localStorage
4. Re-login to get fresh auth token

**LONG TERM**:
1. Add Celery worker to startup script
2. Set up process manager (PM2, systemd, or Windows Service)
3. Add health check endpoint for Celery status
4. Add UI indicator when Celery is not running

---

## 📝 Additional Notes

**User ID**: 3a3408f8-2842-4b83-943a-9febafb23fb9  
**Search Space ID**: 1  
**Search Space Name**: "Akki Khan"  
**Total Files**: 24  
**ETL Service**: DOCLING (100%)

All files were successfully uploaded and processed on **Nov 6, 2025** between 17:03 and 17:15.

If user is uploading NEW files TODAY (Nov 7), those will NOT process without Celery worker running.

---

**Next Step**: START CELERY WORKER and verify UI shows documents!

# Database File Count Report
**Generated**: 2025-11-07 00:22:00  
**Database**: PostgreSQL (surfsense-db-1)  
**Query Status**: ✅ SUCCESSFUL

---

## 📊 Summary

**Total Files Uploaded**: **24 files**

All files are stored in the `documents` table with `document_type = 'FILE'`.

---

## 🗂️ Breakdown by ETL Service

| ETL Service | Count | Percentage |
|-------------|-------|------------|
| **DOCLING** | 24 | 100.0% |

**Note**: All files were processed using the Docling ETL service (local document processing).

---

## 📍 Distribution Metrics

| Metric | Value |
|--------|-------|
| Total Documents (All Types) | 24 |
| Unique Search Spaces | 1 |
| Average Files per Search Space | 24.00 |

---

## 📄 Most Recent Upload

- **Filename**: `WPR_CC_2022_4thApril.xlsx`
- **Upload Date**: 2025-11-06 17:15:58
- **ETL Service**: DOCLING
- **Document Type**: FILE

---

## 🛠️ Query Scripts

Three Python scripts are available for database queries:

### 1. Quick Count
```bash
cd surfsense_backend
python quick_file_count.py
```
Fast file count (1-2 seconds).

### 2. Basic Report
```bash
cd surfsense_backend
python count_files.py
```
Shows file count and document type breakdown.

### 3. Detailed Statistics
```bash
cd surfsense_backend
python file_stats.py
```
Comprehensive report with:
- ETL service breakdown
- Recent files list
- Search space distribution
- File metadata

---

## 📈 Database Schema

Files are stored in the `documents` table with the following structure:

```sql
CREATE TABLE documents (
    id INTEGER PRIMARY KEY,
    title VARCHAR NOT NULL,
    document_type VARCHAR NOT NULL,  -- 'FILE' for uploaded files
    document_metadata JSONB,         -- Contains FILE_NAME, ETL_SERVICE
    content TEXT NOT NULL,            -- Document summary/content
    content_hash VARCHAR NOT NULL,    -- SHA256 hash for deduplication
    unique_identifier_hash VARCHAR,   -- Unique ID for document
    embedding VECTOR,                 -- Embeddings for RAG
    search_space_id INTEGER,          -- Foreign key to searchspaces
    created_at TIMESTAMP
);
```

### Document Metadata Example
```json
{
  "FILE_NAME": "WPR_CC_2022_4thApril.xlsx",
  "ETL_SERVICE": "DOCLING"
}
```

---

## 🔍 Query Details

### SQL Query Used
```sql
SELECT COUNT(id) 
FROM documents 
WHERE document_type = 'FILE';
```

### Python Query (SQLAlchemy)
```python
from sqlalchemy import func, select
from app.db import Document, DocumentType

result = await session.execute(
    select(func.count(Document.id)).where(
        Document.document_type == DocumentType.FILE
    )
)
count = result.scalar()
```

---

## 📊 Document Type Enumeration

Available document types in Primus IDP:

- `FILE` - Uploaded files (24 records) ✅
- `EXTENSION` - Browser extension captures (0 records)
- `CRAWLED_URL` - Web pages from crawler (0 records)
- `YOUTUBE_VIDEO` - YouTube transcripts (0 records)
- `SLACK_CONNECTOR` - Slack messages (0 records)
- `NOTION_CONNECTOR` - Notion pages (0 records)
- `GITHUB_CONNECTOR` - GitHub repositories (0 records)
- `LINEAR_CONNECTOR` - Linear issues (0 records)
- `DISCORD_CONNECTOR` - Discord messages (0 records)
- `JIRA_CONNECTOR` - Jira tickets (0 records)
- `CONFLUENCE_CONNECTOR` - Confluence pages (0 records)
- `CLICKUP_CONNECTOR` - ClickUp tasks (0 records)
- `GOOGLE_CALENDAR_CONNECTOR` - Calendar events (0 records)
- `GOOGLE_GMAIL_CONNECTOR` - Gmail messages (0 records)
- `AIRTABLE_CONNECTOR` - Airtable records (0 records)
- `LUMA_CONNECTOR` - Luma events (0 records)
- `ELASTICSEARCH_CONNECTOR` - Elasticsearch documents (0 records)

---

## 🎯 Key Findings

1. ✅ **All 24 documents are uploaded files**
2. ✅ **100% processed using Docling ETL service** (local processing)
3. ✅ **All files in a single search space**
4. ✅ **Most recent upload: November 6, 2025**
5. ⚠️ **No connector data or other document types yet**

---

## 💡 Recommendations

1. **Connector Integration**: No external connectors (Slack, GitHub, etc.) have been set up yet
2. **Search Space Utilization**: All files in one search space - consider organizing by projects
3. **ETL Service**: Docling is working well (100% success rate)
4. **Document Diversity**: Consider adding web crawls, YouTube videos, or extension captures

---

**Report Location**: `docs/DATABASE_FILE_COUNT.md`  
**Scripts Location**: `surfsense_backend/*.py`  
**Database**: PostgreSQL on port 5432 (Docker: surfsense-db-1)


# 🧠 Primus IDP


<div align="center">
<!-- Discord badge - Add your own -->
</div>


# Primus IDP
While tools like NotebookLM and Perplexity are impressive and highly effective for conducting research on any topic/query, Primus IDP elevates this capability by integrating with your personal knowledge base. It is a highly customizable AI research agent, connected to external sources such as Search Engines (SearxNG, Tavily, LinkUp), Slack, Linear, Jira, ClickUp, Confluence, Gmail, Notion, YouTube, GitHub, Discord, Airtable, Google Calendar, Luma, Elasticsearch and more to come.


# Video 


<!-- Video/Image placeholder - Add your own demo -->


## Podcast Sample

<!-- Video/Image placeholder - Add your own demo -->




## Key Features

### 💡 **Idea**: 
Have your own highly customizable private NotebookLM and Perplexity integrated with external sources.
### 📁 **Multiple File Format Uploading Support**
Save content from your own personal files *(Documents, images, videos and supports **50+ file extensions**)* to your own personal knowledge base .
### 🔍 **Powerful Search**
Quickly research or find anything in your saved content .
### 💬 **Chat with your Saved Content**
 Interact in Natural Language and get cited answers.
### 📄 **Cited Answers**
Get Cited answers just like Perplexity.
### 🔔 **Privacy & Local LLM Support**
Works Flawlessly with Ollama local LLMs.
### 🏠 **Self Hostable**
Open source and easy to deploy locally.
### 🎙️ Podcasts 
- Blazingly fast podcast generation agent. (Creates a 3-minute podcast in under 20 seconds.)
- Convert your chat conversations into engaging audio content
- Support for local TTS providers (Kokoro TTS)
- Support for multiple TTS providers (OpenAI, Azure, Google Vertex AI)

### 📊 **Advanced RAG Techniques**
- Supports 100+ LLM's
- Supports 6000+ Embedding Models.
- Supports all major Rerankers (Pinecode, Cohere, Flashrank etc)
- Uses Hierarchical Indices (2 tiered RAG setup).
- Utilizes Hybrid Search (Semantic + Full Text Search combined with Reciprocal Rank Fusion).

### ℹ️ **External Sources**
- Search Engines (Tavily, LinkUp)
- SearxNG (self-hosted instances)
- Slack
- Linear
- Jira
- ClickUp
- Confluence
- Notion
- Gmail
- Youtube Videos
- GitHub
- Discord
- Airtable
- Google Calendar
- Luma
- Elasticsearch
- and more to come.....

## 📄 **Supported File Extensions**

> **Note**: File format support depends on your ETL service configuration. LlamaCloud supports 50+ formats, Unstructured supports 34+ core formats, and Docling (core formats, local processing, privacy-focused, no API key).

### Documents & Text
**LlamaCloud**: `.pdf`, `.doc`, `.docx`, `.docm`, `.dot`, `.dotm`, `.rtf`, `.txt`, `.xml`, `.epub`, `.odt`, `.wpd`, `.pages`, `.key`, `.numbers`, `.602`, `.abw`, `.cgm`, `.cwk`, `.hwp`, `.lwp`, `.mw`, `.mcw`, `.pbd`, `.sda`, `.sdd`, `.sdp`, `.sdw`, `.sgl`, `.sti`, `.sxi`, `.sxw`, `.stw`, `.sxg`, `.uof`, `.uop`, `.uot`, `.vor`, `.wps`, `.zabw`

**Unstructured**: `.doc`, `.docx`, `.odt`, `.rtf`, `.pdf`, `.xml`, `.txt`, `.md`, `.markdown`, `.rst`, `.html`, `.org`, `.epub`

**Docling**: `.pdf`, `.docx`, `.html`, `.htm`, `.xhtml`, `.adoc`, `.asciidoc`

### Presentations
**LlamaCloud**: `.ppt`, `.pptx`, `.pptm`, `.pot`, `.potm`, `.potx`, `.odp`, `.key`

**Unstructured**: `.ppt`, `.pptx`

**Docling**: `.pptx`

### Spreadsheets & Data
**LlamaCloud**: `.xlsx`, `.xls`, `.xlsm`, `.xlsb`, `.xlw`, `.csv`, `.tsv`, `.ods`, `.fods`, `.numbers`, `.dbf`, `.123`, `.dif`, `.sylk`, `.slk`, `.prn`, `.et`, `.uos1`, `.uos2`, `.wk1`, `.wk2`, `.wk3`, `.wk4`, `.wks`, `.wq1`, `.wq2`, `.wb1`, `.wb2`, `.wb3`, `.qpw`, `.xlr`, `.eth`

**Unstructured**: `.xls`, `.xlsx`, `.csv`, `.tsv`

**Docling**: `.xlsx`, `.csv`

### Images
**LlamaCloud**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.tiff`, `.webp`, `.html`, `.htm`, `.web`

**Unstructured**: `.jpg`, `.jpeg`, `.png`, `.bmp`, `.tiff`, `.heic`

**Docling**: `.jpg`, `.jpeg`, `.png`, `.bmp`, `.tiff`, `.tif`, `.webp`

### Audio & Video *(Always Supported)*
`.mp3`, `.mpga`, `.m4a`, `.wav`, `.mp4`, `.mpeg`, `.webm`

### Email & Communication
**Unstructured**: `.eml`, `.msg`, `.p7s`

### 🔖 Cross Browser Extension
- The Primus IDP extension can be used to save any webpage you like.
- Its main usecase is to save any webpages protected beyond authentication.



## FEATURE REQUESTS AND FUTURE


**Primus IDP is actively being developed.** While it's not yet production-ready, you can help us speed up the process.

Join the [Primus IDP Community](#) and help shape the future of Primus IDP!

## 🚀 Roadmap

Stay up to date with our development progress and upcoming features!  
Check out our public roadmap and contribute your ideas or feedback:

**View the Roadmap:** [Primus IDP Roadmap on GitHub Projects](https://github.com/users/khanakkijpr-dot/projects/2)


## How to get started?

### Installation Options

Primus IDP provides two installation methods:

1. **[Docker Installation](https://www.Primus IDP.net/docs/docker-installation)** - The easiest way to get Primus IDP up and running with all dependencies containerized.
   - Includes pgAdmin for database management through a web UI
   - Supports environment variable customization via `.env` file
   - Flexible deployment options (full stack or core services only)
   - No need to manually edit configuration files between environments

2. **[Manual Installation (Recommended)](https://www.Primus IDP.net/docs/manual-installation)** - For users who prefer more control over their setup or need to customize their deployment.

Both installation guides include detailed OS-specific instructions for Windows, macOS, and Linux.

Before installation, make sure to complete the [prerequisite setup steps](https://www.Primus IDP.net/docs/) including:
- Auth setup
- **File Processing ETL Service** (choose one):
  - Unstructured.io API key (supports 34+ formats)
  - LlamaIndex API key (enhanced parsing, supports 50+ formats)
  - Docling (local processing, no API key required, supports PDF, Office docs, images, HTML, CSV)
- Other required API keys

## Screenshots

**Research Agent** 

![updated_researcher](<!-- Video/Image placeholder - Add your own demo -->)

**Search Spaces** 

![search_spaces](<!-- Video/Image placeholder - Add your own demo -->)

**Manage Documents** 
![documents](<!-- Video/Image placeholder - Add your own demo -->)

**Podcast Agent** 
![podcasts](<!-- Video/Image placeholder - Add your own demo -->)


**Agent Chat** 

![git_chat](<!-- Video/Image placeholder - Add your own demo -->)

**Browser Extension**

![ext1](<!-- Video/Image placeholder - Add your own demo -->)

![ext2](<!-- Video/Image placeholder - Add your own demo -->)


## Tech Stack


 ### **BackEnd** 

-  **FastAPI**: Modern, fast web framework for building APIs with Python
  
-  **PostgreSQL with pgvector**: Database with vector search capabilities for similarity searches

-  **SQLAlchemy**: SQL toolkit and ORM (Object-Relational Mapping) for database interactions

-  **Alembic**: A database migrations tool for SQLAlchemy.

-  **FastAPI Users**: Authentication and user management with JWT and OAuth support

-  **LangGraph**: Framework for developing AI-agents.
  
-  **LangChain**: Framework for developing AI-powered applications.

-  **LLM Integration**: Integration with LLM models through LiteLLM

-  **Rerankers**: Advanced result ranking for improved search relevance

-  **Hybrid Search**: Combines vector similarity and full-text search for optimal results using Reciprocal Rank Fusion (RRF)

-  **Vector Embeddings**: Document and text embeddings for semantic search

-  **pgvector**: PostgreSQL extension for efficient vector similarity operations

-  **Redis**: In-memory data structure store used as message broker and result backend for Celery

-  **Celery**: Distributed task queue for handling asynchronous background jobs (document processing, podcast generation, etc.)

-  **Flower**: Real-time monitoring and administration tool for Celery task queues

-  **Chonkie**: Advanced document chunking and embedding library
 - Uses `AutoEmbeddings` for flexible embedding model selection
 -  `LateChunker` for optimized document chunking based on embedding model's max sequence length


  
---
 ### **FrontEnd**

-  **Next.js 15.2.3**: React framework featuring App Router, server components, automatic code-splitting, and optimized rendering.

-  **React 19.0.0**: JavaScript library for building user interfaces.

-  **TypeScript**: Static type-checking for JavaScript, enhancing code quality and developer experience.
- **Vercel AI SDK Kit UI Stream Protocol**: To create scalable chat UI.

-  **Tailwind CSS 4.x**: Utility-first CSS framework for building custom UI designs.

-  **Shadcn**: Headless components library.

-  **Lucide React**: Icon set implemented as React components.

-  **Framer Motion**: Animation library for React.

-  **Sonner**: Toast notification library.

-  **Geist**: Font family from Vercel.

-  **React Hook Form**: Form state management and validation.

-  **Zod**: TypeScript-first schema validation with static type inference.

-  **@hookform/resolvers**: Resolvers for using validation libraries with React Hook Form.

-  **@tanstack/react-table**: Headless UI for building powerful tables & datagrids.


 ### **DevOps**

-  **Docker**: Container platform for consistent deployment across environments
  
-  **Docker Compose**: Tool for defining and running multi-container Docker applications

-  **pgAdmin**: Web-based PostgreSQL administration tool included in Docker setup


### **Extension** 
 Manifest v3 on Plasmo


## Contribute 

Contributions are very welcome! A contribution can be as small as a ⭐ or even finding and creating issues.
Fine-tuning the Backend is always desired.

For detailed contribution guidelines, please see our [CONTRIBUTING.md](CONTRIBUTING.md) file.

---
---
<p align="center">
    <img 
      src="<!-- Video/Image placeholder - Add your own demo -->" 
      alt="Catalyst Project" 
      width="200"
    />
</p>

---
---





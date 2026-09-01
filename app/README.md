# 🎯 Campus Genie — Next.js Application Frontend

This directory contains the Next.js 16 (Turbopack) frontend and Databricks Genie API route handler for **Campus Genie — Hand-Drawn Opportunity Radar**.

---

## ⚡ Key Features

- **Live Databricks Genie Integration**: REST API connection (`POST /api/genie`) that starts conversations, polls status, and extracts real-time SQL and natural language reasoning from Databricks Unity Catalog (`workspace.campus_genie`).
- **Hand-Drawn Wobbly UI**: Built with TailwindCSS, Lucide Icons, Kalam heading font, and custom wobbly sketch shadows.
- **Razor-Sharp Typography**: Solid high-contrast text (`#111111`) with subpixel antialiasing for crisp legibility.
- **"What-If?" Re-Planning Engine**: Interactive constraint scenario testing with animated scribble strikethroughs.

---

## 🚀 Quick Start

### 1. Environment Setup
Ensure `.env.local` contains valid Databricks credentials:

```env
DATABRICKS_HOST=https://<your-databricks-instance>.cloud.databricks.com
DATABRICKS_TOKEN=<your-databricks-personal-access-token>
GENIE_SPACE_ID=<your-genie-space-id>
```

### 2. Run Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to launch the app!

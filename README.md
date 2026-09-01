<p align="center">
  <h1 align="center">🎯 Campus Genie — Hand-Drawn Opportunity Radar</h1>
  <p align="center"><strong>Track A: Real-World Campus Problem Solver | Theme: Genie-Powered Campus Intelligence</strong></p>
  <p align="center"><em>Turning fragmented university silos into personalized, data-backed opportunity roadmaps — powered by Databricks Genie & Unity Catalog.</em></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Databricks-Genie%20REST%20API-FF3621?style=for-the-badge&logo=databricks&logoColor=white" />
  <img src="https://img.shields.io/badge/Databricks-Unity%20Catalog%20(16%20Tables)-00A3E0?style=for-the-badge&logo=databricks&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-16%20(Turbopack)-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/UI-Sketchy%20Wobbly%20Design-FFB800?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-100%25%20Live%20%26%20Verified-brightgreen?style=for-the-badge" />
</p>

---

## 📌 Executive Summary

University campuses are filled with incredible opportunities — top-tier placements, cutting-edge faculty research, high-stakes hackathons, active student clubs, and hands-on bootcamps. However, **students fail to connect the dots** because campus data lives in 6+ disconnected information silos.

**Campus Genie** solves this real-world problem by modeling university data as a unified **16-Table Opportunity Graph** in Databricks Unity Catalog. At its core sits a **Databricks Genie Agent** that performs real-time **multi-hop reasoning** over student skill gaps, prerequisites, time constraints, and career goals to generate personalized, sequenced opportunity roadmaps.

---

## 🎯 Track A & Jury Alignment

| Judging Criteria | How Campus Genie Solves It |
| :--- | :--- |
| **Real-World Campus Problem** | Eliminates campus silo fragmentation for students, placement cells, faculty supervisors, and club leads. |
| **Genie Core Integration** | Live Databricks Genie REST API (`/start-conversation`, `/messages`, and polling loop) executes multi-table SQL queries live on Databricks. |
| **Complete User Journey** | Natural language prompt ➔ Multi-hop Databricks Genie SQL execution ➔ Clean natural language answer + SQL code display ➔ Sequenced 6-step opportunity cards ➔ Interactive "What-If?" re-planning engine. |
| **Data Architecture** | 16 interconnected Unity Catalog tables covering 100 students, 100 skills, 25 projects, 15 clubs, 30 events, 15 faculty, 20 research roles, 15 hackathons, and 20 placements. |
| **User Experience** | Full-width premium hand-drawn wobbly aesthetic (`max-w-7xl`) with razor-sharp sans-serif typography for 100% visual clarity. |

---

## 🚨 The Campus Silo Trap

Students constantly ask:
> *"I know I want to become an AI Engineer at ₹18 LPA, but what specific campus opportunities should I pursue, in what order, given my 15 hrs/week schedule?"*

Traditional university portals fail because they present isolated data:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ Placement Cell  │   │ Research Board  │   │  Event Calendar │
│ Job requirements│   │ Faculty topics  │   │ Workshop dates  │
└────────┬────────┘   └────────┬────────┘   └────────┬────────┘
         │                     │                     │
         └─────────────┬───────┴─────────────┬───────┘
                       ▼                     ▼
              [DISCONNECTED DATA SILOS — NO SKILL MAPPING]
```

### The Solution: Multi-Hop Opportunity Graph

**Campus Genie** connects every entity through a shared **Skill Taxonomy (`skills.csv`)**:

```
[Student: Arjun Mehta] (Java L3, SQL L3)
       │
       ▼ (Teaches Python & REST)
[Project: Campus Backend API]
       │
       ▼ (Requires Python, Teaches ML)
[Club: AI/ML Club]
       │
       ▼ (Teaches TensorFlow)
[Event: Applied AI Workshop]
       │
       ▼ (Requires ML & Python, Teaches NLP)
[Research: NLP for Indian Languages] (Dr. Rajesh Kumar)
       │
       ▼ (Requires ML & Teamwork)
[Hackathon: DataHack 2026]
       │
       ▼ (Requires Python, ML, TensorFlow, NLP)
[Target Placement: TechCorp AI Engineer • ₹18 LPA]
```

---

## 🗄️ Databricks Unity Catalog Architecture (16 Tables)

The application is backed by **16 relational tables** hosted in Databricks Unity Catalog under the catalog `workspace.campus_genie`:

```
               ┌──────────────────┐
               │     students     │
               └────────┬─────────┘
                        │
               ┌────────┴─────────┐
               │  student_skills  │
               └────────┬─────────┘
                        │
                        ▼
               ┌──────────────────┐
        ┌─────►│      skills      │◄─────┐
        │      └────────┬─────────┘      │
        │               │                │
┌───────┴────────┐      │       ┌────────┴───────┐
│ project_skills │      │       │  club_skills   │
├────────────────┤      │       ├────────────────┤
│    projects    │      │       │     clubs      │
└────────────────┘      │       └────────────────┘
                        │
┌────────────────┐      │       ┌────────────────┐
│  event_skills  │      │       │research_skills │
├────────────────┤      │       ├────────────────┤
│     events     │      │       │ research / fac │
└────────────────┘      │       └────────────────┘
                        │
┌────────────────┐      │       ┌────────────────┐
│hackathon_skills│      │       │placement_skills│
├────────────────┤      │       ├────────────────┤
│   hackathons   │      │       │   placements   │
└────────────────┘      └───────└────────────────┘
```

### Table Breakdown

| Table Name | Records | Description | Primary Key / Foreign Keys |
| :--- | :---: | :--- | :--- |
| `students` | 100 | Student profiles, year, department, GPA, career goal, weekly budget | `student_id` |
| `skills` | 100 | Master skill taxonomy, category, difficulty levels 1-5 | `skill_id` |
| `student_skills` | 400 | Student skill proficiency levels (Level 1-5) | `student_id`, `skill_id` |
| `projects` | 25 | Campus projects, difficulty, weekly hours, duration | `project_id` |
| `project_skills` | 50 | Skills required or taught by projects | `project_id`, `skill_id` |
| `clubs` | 15 | Active student clubs, focus area, meeting schedules | `club_id` |
| `club_skills` | 30 | Skills required or taught by clubs | `club_id`, `skill_id` |
| `events` | 30 | Bootcamps, workshops, seminars, capacity, dates | `event_id` |
| `event_skills` | 60 | Skills required or taught by events | `event_id`, `skill_id` |
| `faculty` | 15 | Faculty supervisors, department, research area | `faculty_id` |
| `research` | 20 | Research assistantships, min year, open positions, stipend | `research_id`, `faculty_id` |
| `research_skills` | 40 | Skills required or taught by research roles | `research_id`, `skill_id` |
| `hackathons` | 15 | Competitive hackathons, themes, dates, prize pools | `hackathon_id` |
| `hackathon_skills` | 30 | Skills required or taught by hackathons | `hackathon_id`, `skill_id` |
| `placements` | 20 | Placement opportunities, package LPA, application deadlines | `placement_id` |
| `placement_skills` | 40 | Skill requirements & min proficiency levels for placements | `placement_id`, `skill_id` |

---

## ⚡ Databricks Genie API Flow & Technical Stack

```
┌────────────────────────────────────────────────────────┐
│                   Next.js 16 Frontend                  │
│   QueryInterface.tsx ➔ POST /api/genie                 │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               Next.js Route (app/api/genie)            │
│  1. parseProfileAndGoal() & sanitize JSON              │
│  2. POST /api/2.0/genie/spaces/{id}/start-conversation │
│  3. Poll GET /conversations/{id}/messages/{msg_id}     │
│     (Max 35 retries @ 1.5s interval until COMPLETED)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                 Databricks Genie Agent                 │
│  • Executes multi-table SQL queries on Unity Catalog   │
│  • Generates data answer + SQL code + thoughts         │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               Response Processing Layer                │
│  • parseGenieResponsePayload():                        │
│    - explanation: Clean natural language answer text   │
│    - sqlQuery: Databricks SQL code                     │
│    - steps: Opportunity step cards with tech stack     │
└────────────────────────────────────────────────────────┘
```

---

## 🎨 UI & User Experience Highlights

- **Full-Width Modern Layout (`max-w-7xl`)**: Spacious container padding, balanced grid gaps, and generous breathing room.
- **Hand-Drawn Sketch Aesthetic**: Custom wobbly border radiuses (`wobbly-md`, `wobbly-pill`), offset sketch shadows (`sketch-shadow`), taped note headers, and thumbtack accents.
- **Razor-Sharp Typography**: System `font-sans` subpixel antialiasing with solid `#111111` high-contrast text for 100% crisp legibility across all metadata fields.
- **Real Genie Badge**: Prominent glowing green status badge **`✨ Real Genie (Databricks Live)`** when live Databricks answers are returned.
- **Databricks SQL Viewer**: Dedicated dark SQL code box (`bg-[#1e1e1e]`, syntax green font) rendering the exact query generated by Genie.
- **"What-If?" Re-Planning Engine**: Interactive constraint buttons (`⏱️ Only 5 Hours/Week`, `⚡ Already Knows Python`, `🎯 Switch Goal to Data Scientist`) with animated scribble strikethroughs.

---

## 🧪 Verified Demo Queries

### 1. Golden AI Engineer Path
> **Query**: `"I'm Arjun Mehta, a 2nd-year CSE student. I know Java and SQL. I want to become an AI Engineer. What campus opportunities should I pursue and in what order?"`  
> **Databricks Result**: Returns live SQL query joining `students`, `skills`, `placements`, `projects`, `clubs`, `events`, `research`, and `hackathons`, recommending a 6-step sequential path to TechCorp India (₹18.0 LPA).

### 2. AI/ML Hackathons Query
> **Query**: `"Which hackathons have AI or ML themes, and what skills are required to participate?"`  
> **Databricks Result**: Generates `SELECT h.title, h.date, s.skill_name FROM hackathons... WHERE theme ILIKE '%AI%' OR theme ILIKE '%ML%'` and displays hackathon cards for DataHack 2026, HealthTech Hackathon, and Startup Weekend.

### 3. Product Manager Path (Priya Sharma)
> **Query**: `"Priya Sharma is a 2nd-year CSE student who knows HTML/CSS and JavaScript. She wants to become a Product Manager. What is her best opportunity path?"`  
> **Databricks Result**: Generates multi-table product management query, returning Associate Product Manager at ProductHive (₹14.0 LPA).

### 4. What-If Time Constraint
> **Query**: `"What if Arjun only has 5 hours per week available?"`  
> **Databricks Result**: Re-evaluates weekly hours budget, replacing high-commitment research with low-cost workshops and hackathons.

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js 18.x or higher
- Python 3.9+ (for synthetic data scripts)
- Databricks Workspace (Free Edition or standard workspace) with Unity Catalog enabled

### Step 1: Clone Repository & Install Dependencies
```bash
git clone https://github.com/chethanhrx/Campus-Genie.git
cd Campus-Genie/app
npm install
```

### Step 2: Configure Environment Variables
Create `/app/.env.local` (and `/app/.env`):
```env
DATABRICKS_HOST=https://<your-databricks-instance>.cloud.databricks.com
DATABRICKS_TOKEN=<your-databricks-personal-access-token>
GENIE_SPACE_ID=<your-genie-space-id>
```

### Step 3: Run Synthetic Data Generation & Verification (Optional)
```bash
cd ..
python3 scripts/generate_synthetic_data.py
python3 scripts/validate_data.py
```

### Step 4: Launch Next.js Development Server
```bash
cd app
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🚀 Scalability & Future Roadmap

```
  v1.0 (Current)              v2.0 (Multi-Campus)             v3.0 (City Ecosystem)
┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│ Single University    │ ➔ │ Multi-University     │ ➔ │ City-Wide Internship │
│ 16 Catalog Tables    │    │ Federated Catalogs   │    │ Industry & Alumni    │
│ Databricks Genie API │    │ Cross-Campus Graph   │    │ Mentorship Network   │
└──────────────────────┘    └──────────────────────┘    └──────────────────────┘
```

The Opportunity Graph architecture is **university-agnostic**. Any institution can plug its CSVs/data warehouses into Unity Catalog and instantly deploy a personalized Databricks Genie Opportunity Radar for its students!

---

## 📄 License

Distributed under the **MIT License**. Built for the Databricks Genie Hackathon 2026.

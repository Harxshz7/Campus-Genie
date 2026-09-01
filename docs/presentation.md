# 🎤 Campus Genie — Final Jury Pitch & Presentation Deck
## Track A: Real-World Campus Problem Solver | Theme: Genie-Powered Campus Intelligence

> **Tagline**: *Turning fragmented campus silos into personalized, data-backed opportunity roadmaps — powered by Databricks Genie & Unity Catalog.*

---

## 📽️ SLIDE 1: Title & The Core Problem

### The Big Campus Problem: "The Silo Trap"
Universities spend millions on placements, research, clubs, workshops, and hackathons, yet **90% of students struggle to navigate their campus journey**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           THE SILO TRAP                                 │
│                                                                         │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────┐          │
│  │ Placement Cell │   │ Research Board │   │ Event Calendar │          │
│  │ Job criteria   │   │ Faculty topics │   │ Workshop dates │          │
│  └───────┬────────┘   └───────┬────────┘   └───────┬────────┘          │
│          │                    │                    │                   │
│          └────────────┬───────┴────────────┬───────┘                   │
│                       ▼                    ▼                           │
│             [DISCONNECTED DATA SILOS — NO SKILL MAPPING]                │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Student Pain**: *"I know I want to become an AI Engineer at ₹18 LPA, but what specific campus opportunities should I pursue, in what order, given my 15 hrs/week schedule?"*
- **Placement Cell Pain**: *"How do we identify which students are actually ready for high-paying roles?"*
- **Faculty Pain**: *"How do we find students with the exact prerequisites for our research projects?"*

---

## 💡 SLIDE 2: The Core Innovation: Multi-Hop Opportunity Graph

**Campus Genie** models the entire university ecosystem as an **Opportunity Graph** in **Databricks Unity Catalog**, connecting 16 relational tables through a unified **Skill Taxonomy (`skills.csv`)**.

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

At the core sits a **Databricks Genie Agent** that performs real-time **multi-hop reasoning** over student profiles, skill gaps, weekly time budgets, and career targets.

---

## ⚙️ SLIDE 3: End-to-End Technical Workflow & Backend Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. STUDENT PROMPT                               │
│  "I know Java+SQL, want to be AI Engineer at ₹18 LPA, help me"        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   2. NEXT.JS 16 BACKEND (app/api/genie)                │
│  • parseProfileAndGoal(): Extracts name, initials, target role         │
│  • POST /api/2.0/genie/spaces/{id}/start-conversation                  │
│  • Polling Loop: GET /conversations/{id}/messages/{msg_id}             │
│    (Max 35 retries @ 1.5s interval until status = COMPLETED)           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   3. DATABRICKS GENIE & UNITY CATALOG                  │
│  • Performs multi-table SQL joins across 16 tables in workspace.campus_genie│
│  • Generates data answer + live SQL query + reasoning trace thoughts   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   4. RESPONSE PROCESSING LAYER                         │
│  • parseGenieResponsePayload():                                        │
│    - explanation: Clean natural language answer text                   │
│    - sqlQuery: Databricks SQL code box                                 │
│    - steps: Opportunity step cards with mentors, tech stack & rewards  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    5. PREMIUM HAND-DRAWN FRONTEND                      │
│  • Full-width modern layout (max-w-7xl)                                │
│  • Real Genie status badge: ✨ Real Genie (Databricks Live)            │
│  • Interactive "What-If?" Re-Planning Engine                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🎬 SLIDE 4: 90-Second Demo Choreography ("The Magic Moment")

### 1. The Opening Hook (15s)
- Show the clean empty state of the app at `http://localhost:3000`.
- Highlight the **Student Profile Ribbon**: `Arjun Mehta • Year 2 CSE • Target: TechCorp AI Engineer (₹18.0 LPA)`.

### 2. The Golden Question Execution (30s)
- Click the chip: **`⭐ Golden Path: AI Engineer`**.
- Show the live spinner: *"Databricks Genie is Reasoning Across 16 Catalog Tables... 🧠"*.
- **Watch Databricks Genie execute live** and render the glowing green badge **`✨ Real Genie (Databricks Live)`**.

### 3. The SQL & Reasoning Trace (20s)
- Show the **Databricks Generated SQL Query**:
  ```sql
  WITH arjun AS (...),
  java_sql_skills AS (...),
  ai_opportunities AS (...)
  SELECT * FROM ai_opportunities ORDER BY CASE opportunity_type ...
  ```
- Show the 6 sequenced opportunity step cards (Campus API Project ➔ AI/ML Club ➔ Applied AI Workshop ➔ NLP Research ➔ DataHack 2026 ➔ TechCorp Placement).

### 4. The "What-If?" Re-Planning Engine (25s)
- Click: **`⏱️ What if 5 hrs/week constraint?`**.
- Watch Genie **re-plan in real time**, replacing high-commitment research with lightweight workshops and hackathons, updating cards with animated scribble strikethroughs!

---

## 📊 SLIDE 5: 16 Unity Catalog Tables (Data Backbone)

Campus Genie is powered by **16 interconnected Unity Catalog tables** hosting 100 students, 100 skills, and dozens of campus opportunities:

| Entity Category | Tables Included | Key Relationships |
| :--- | :--- | :--- |
| **Student Profiles** | `students`, `skills`, `student_skills` | Maps student proficiencies (L1–L5) across 100 technical/soft skills |
| **Projects & Clubs** | `projects`, `project_skills`, `clubs`, `club_skills` | Tracks difficulty, time commitment, and skills taught/required |
| **Events & Bootcamps** | `events`, `event_skills` | Captures workshops, dates, duration hours, and capacity |
| **Faculty & Research** | `faculty`, `research`, `research_skills` | Links faculty supervisors, research areas, stipends, and min year |
| **Hackathons** | `hackathons`, `hackathon_skills` | Tracks themes (AI/ML, Web, Data), prize pools, team sizes, and dates |
| **Placements** | `placements`, `placement_skills` | Specifies target roles, companies, LPA packages, and required skill levels |

---

## 🌟 SLIDE 6: Multi-Stakeholder Value Matrix

| Stakeholder | Problem Solved | Value Delivered by Campus Genie |
| :--- | :--- | :--- |
| **Students** | Confusion & fragmented opportunity lists | Personalized, step-by-step 6-step opportunity roadmap with skill prerequisites. |
| **Placement Officers** | Blind student applicant matching | Instant data-backed skill gap analysis across student cohorts. |
| **Faculty Supervisors** | Low visibility for research assistantships | Automated matching of qualified students based on research prerequisites. |
| **Club Leads & Event Hosts** | Targeted event promotion | Direct visibility to students who need specific skills taught by the club. |

---

## 🚀 SLIDE 7: Future Scalability & Market Expansion

```
  v1.0 (Current)              v2.0 (Multi-Campus)             v3.0 (City Ecosystem)
┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│ Single University    │ ➔ │ Multi-University     │ ➔ │ City-Wide Internship │
│ 16 Catalog Tables    │    │ Federated Catalogs   │    │ Industry & Alumni    │
│ Databricks Genie API │    │ Cross-Campus Graph   │    │ Mentorship Network   │
└──────────────────────┘    └──────────────────────┘    └──────────────────────┘
```

- **Campus Agnostic**: Any university can plug its CSVs/data warehouse into Unity Catalog without changing a single line of code.
- **Enterprise Ready**: Seamlessly integrates with existing Databricks Lakehouse infrastructure.

---

## 🏁 SLIDE 8: Summary & Final Call to Action

> **"Every student starts from a different place, but with Databricks Genie & Campus Genie, every student gets a clear, data-backed path to their dream career."**

- **Live App**: [http://localhost:3000](http://localhost:3000)
- **GitHub Repository**: [https://github.com/chethanhrx/Campus-Genie](https://github.com/chethanhrx/Campus-Genie)
- **Databricks Catalog**: `workspace.campus_genie` (16 Tables)

**Thank you, Jury! We are ready for your Q&A.** 🚀

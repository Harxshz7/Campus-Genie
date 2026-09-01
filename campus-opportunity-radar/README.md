<p align="center">
  <h1 align="center">🎯 Campus Opportunity Radar</h1>
  <p align="center"><em>Turn fragmented campus data into personalized opportunity paths — powered by Databricks Genie</em></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Databricks-Genie%20Space-FF3621?style=for-the-badge&logo=databricks&logoColor=white" />
  <img src="https://img.shields.io/badge/Data-Unity%20Catalog-00A3E0?style=for-the-badge&logo=databricks&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Demo%20Ready-brightgreen?style=for-the-badge" />
</p>

---

## 🔥 The Problem

> **"I know I want to become an AI Engineer, but I have no idea what to do next on campus."**

Campus information is **fragmented** across dozens of disconnected silos:

| Silo | What a student sees |
|------|-------------------|
| Course catalog | A list of courses — no link to career goals |
| Club listings | Names and meeting times — no skill mapping |
| Event calendar | Dates — no relevance scoring |
| Placement portal | Job descriptions — no preparation path |
| Research board | Faculty projects — no prerequisite clarity |
| Hackathon announcements | Themes — no team/skill matching |

Students can find **individual pieces** but cannot see **how they connect to their goals**. The result: missed opportunities, wasted semesters, and the nagging feeling that "everyone else knows something I don't."

---

## 💡 The Insight

Every campus entity — a project, a club, an event, a research opportunity, a placement role — is connected through **skills**. These connections form an **Opportunity Graph** where:

- A **Backend Development** project teaches `Java`, `REST APIs`, `SQL`
- The **AI Club** requires `Python` and teaches `Machine Learning`, `NLP`
- An **Applied AI Workshop** deepens `TensorFlow`, `Model Deployment`
- A **Research Assistantship** under Prof. Kumar needs `ML` + `Statistics`
- A **Hackathon** rewards `End-to-End ML`, `Teamwork`, `Presentation`
- An **AI Engineer placement** at TechCorp requires exactly those accumulated skills

**These aren't random connections. They form a learnable, traversable path.**

---

## 🚀 The Solution: Campus Opportunity Radar

Campus Opportunity Radar turns disconnected campus datasets into an **Opportunity Graph** and uses **Databricks Genie** as the intelligence layer to:

### 1. 🔍 Understand the Student
A student asks a natural-language question:
> *"I'm a 2nd-year CSE student who knows Java and SQL. I want to become an AI Engineer. What should I do?"*

### 2. 🧠 Reason Across the Graph (Multi-Hop)
Genie doesn't just search — it **reasons**:
- Current skills → skill gaps for goal → which campus opportunities fill each gap → optimal sequencing → time constraints

### 3. 📋 Return Personalized Opportunity Cards
Each recommendation comes with:
- **Why** this opportunity (skill gap it fills)
- **Prerequisites** (what you need first)
- **Time cost** (hours/week)
- **What it unlocks** (next opportunities it enables)

### 4. 🗺️ Build an Adaptive Opportunity Path
An 8–12 week sequenced plan:
```
Week 1-2: Join Backend Project → solidify Java, learn REST APIs
Week 3-4: Join AI Club → start Python, intro to ML concepts
Week 5-6: Attend Applied AI Workshop → hands-on TensorFlow
Week 7-8: Apply for Prof. Kumar's NLP Research → real-world ML
Week 9-10: Enter DataHack Hackathon → end-to-end ML project
Week 11-12: Apply to TechCorp AI Engineer role → you're ready
```

### 5. 🔄 Support "What If?" Re-Planning
> *"What if I only have 5 hours per week?"*
> *"What if I already know Python?"*
> *"What if I want Data Science instead of AI Engineering?"*

Genie **re-reasons** and returns an adjusted path instantly.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Student Question                   │
│  "I know Java+SQL, want to be AI Engineer, help me" │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Databricks Genie Space                  │
│  ┌─────────────────────────────────────────────┐    │
│  │         System Instructions                  │    │
│  │  • Multi-hop reasoning across tables         │    │
│  │  • Explain every recommendation              │    │
│  │  • Support "What if?" constraints            │    │
│  │  • Return structured opportunity paths       │    │
│  └─────────────────────────────────────────────┘    │
│                       │                              │
│                       ▼                              │
│  ┌─────────────────────────────────────────────┐    │
│  │         Unity Catalog Tables                 │    │
│  │                                              │    │
│  │  students ──→ student_skills ←── skills      │    │
│  │     │              │                │         │    │
│  │     │    projects ──→ project_skills │        │    │
│  │     │    clubs ────→ club_skills     │        │    │
│  │     │    events ───→ event_skills    │        │    │
│  │     │    research ─→ research_skills │        │    │
│  │     │    hackathons → hackathon_skills│       │    │
│  │     │    placements → placement_skills│       │    │
│  │     │              │                │         │    │
│  │     └──── OPPORTUNITY GRAPH ────────┘        │    │
│  └─────────────────────────────────────────────┘    │
│                       │                              │
│                       ▼                              │
│            Personalized Opportunity Path              │
└─────────────────────────────────────────────────────┘
```

> See [docs/architecture.md](docs/architecture.md) for the full technical architecture.

---

## 📊 Data Model

The Opportunity Graph is built from **14 intentionally connected tables**:

| Entity | Description | Key Relationships |
|--------|-------------|-------------------|
| `students` | Student profiles with year, department, goals | → `student_skills` |
| `skills` | Skill taxonomy (technical + soft) | Central node connecting everything |
| `student_skills` | What each student knows + proficiency level | students ↔ skills |
| `projects` | Campus projects with difficulty, time cost | → `project_skills` (teaches/requires) |
| `clubs` | Student clubs with focus areas | → `club_skills` |
| `events` | Workshops, seminars, bootcamps | → `event_skills` |
| `faculty` | Faculty profiles with research areas | → `research` |
| `research` | Research opportunities under faculty | → `research_skills` |
| `hackathons` | Hackathon events with themes | → `hackathon_skills` |
| `placements` | Company placement roles | → `placement_skills` |

> See [docs/data-model.md](docs/data-model.md) for the full schema and relationship map.

---

## 🎬 Demo in 90 Seconds

### The Magic Moment
1. **Open Genie Space** — show the clean interface
2. **Ask the golden question:**
   > *"I'm Arjun, a 2nd-year CSE student. I know Java and SQL but want to become an AI Engineer. What opportunities should I pursue and in what order?"*
3. **Watch Genie reason** across 8+ tables and return a sequenced path
4. **Show the "What if?":**
   > *"What if I only have 5 hours per week?"*
5. **Genie re-plans** — drops time-heavy options, suggests alternatives
6. **Close with the insight:** *"Every student gets a different path because every student starts from a different place."*

> See [docs/demo-script.md](docs/demo-script.md) for the full demo playbook.

---

## 🚀 Quick Start

### Prerequisites
- Databricks Free Edition account
- Python 3.9+

### Step 1: Generate Synthetic Data
```bash
cd campus-opportunity-radar
pip install faker pandas numpy
python scripts/generate_synthetic_data.py
```
This creates realistic, relationship-rich CSVs in `data/raw/`.

### Step 2: Validate Data Quality
```bash
python scripts/validate_data.py
```
Confirms the golden multi-hop paths exist and relationship density is sufficient.

### Step 3: Load into Databricks
Follow the step-by-step guide in [docs/genie-setup.md](docs/genie-setup.md) to:
1. Upload CSVs to Unity Catalog
2. Create the Genie Space
3. Configure system instructions
4. Test with sample questions

### Step 4: Demo!
Use the questions in [genie/sample_questions.md](genie/sample_questions.md) to showcase the full capability.

---

## 📁 Project Structure

```
campus-opportunity-radar/
├── README.md                          # You are here
├── docs/
│   ├── architecture.md                # Technical architecture deep-dive
│   ├── data-model.md                  # Entity-relationship model + design decisions
│   ├── genie-setup.md                 # Step-by-step Databricks + Genie setup
│   ├── demo-script.md                 # 90-second pitch + demo choreography
│   └── jury-notes.md                  # How this project hits every judging criterion
├── data/
│   ├── raw/                           # Generated CSV files
│   ├── processed/                     # Transformed / enriched data
│   └── schemas/
│       └── schema.sql                 # DDL for all tables
├── scripts/
│   ├── generate_synthetic_data.py     # Relationship-rich synthetic data generator
│   ├── load_to_databricks.py          # Loading helper / instructions
│   └── validate_data.py              # Data quality + relationship density checks
├── genie/
│   ├── genie_instructions.md          # System prompt for Genie Space
│   ├── sample_questions.md            # 12–15 golden demo questions
│   └── expected_answers.md            # Expected reasoning traces
├── app/                               # Optional lightweight frontend
└── notebooks/
    └── 01_data_exploration.ipynb      # Data exploration notebook
```

---

## 🌍 Scalability Story

| Phase | Scope | What Changes |
|-------|-------|-------------|
| **v1** (now) | Single campus | Core opportunity graph |
| **v2** | Multi-campus | Federated data, cross-campus opportunities |
| **v3** | City layer | Industry partnerships, city-wide internships, alumni network |

The Opportunity Graph model is **campus-agnostic**. The same schema works for any university — only the data changes.

---

## 👥 Team

Built for the Databricks Genie Hackathon.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

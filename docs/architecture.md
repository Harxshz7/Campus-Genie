# Architecture — Campus Opportunity Radar

## System Overview

Campus Opportunity Radar is a **data-first intelligence platform** that transforms fragmented campus information into personalized, explainable opportunity paths. The architecture is deliberately simple — we let the **data model carry the intelligence** and **Genie carry the reasoning**.

---

## Architecture Layers

```
┌──────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│   │ Genie Space  │    │  (Optional)  │    │   Notebooks for  │  │
│   │  Chat UI     │    │  Streamlit   │    │   Admin / Faculty│  │
│   │              │    │  Frontend    │    │   Exploration     │  │
│   └──────┬───────┘    └──────┬───────┘    └───────┬──────────┘  │
└──────────┼───────────────────┼────────────────────┼─────────────┘
           │                   │                    │
           ▼                   ▼                    ▼
┌──────────────────────────────────────────────────────────────────┐
│                      INTELLIGENCE LAYER                          │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  Databricks Genie                        │   │
│   │                                                          │   │
│   │  System Instructions:                                    │   │
│   │  • Multi-hop reasoning (student → skills → gaps →        │   │
│   │    opportunities → sequence → path)                      │   │
│   │  • Explainability mandate ("why this recommendation")    │   │
│   │  • "What if?" constraint re-planning                     │   │
│   │  • Structured output (opportunity cards + timeline)      │   │
│   │                                                          │   │
│   │  Capabilities:                                           │   │
│   │  • Natural language → SQL generation                     │   │
│   │  • Cross-table JOIN reasoning                            │   │
│   │  • Contextual follow-up questions                        │   │
│   │  • Constraint-aware re-optimization                      │   │
│   └─────────────────────┬───────────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                               │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              Databricks Unity Catalog                    │   │
│   │                                                          │   │
│   │   Catalog: campus_radar                                  │   │
│   │   Schema:  opportunity_graph                             │   │
│   │                                                          │   │
│   │   ┌──────────┐  ┌──────────┐  ┌───────────────┐        │   │
│   │   │ students │  │  skills  │  │ student_skills │        │   │
│   │   └────┬─────┘  └────┬─────┘  └───────┬───────┘        │   │
│   │        │             │                 │                 │   │
│   │   ┌────┴─────────────┴─────────────────┤                │   │
│   │   │         OPPORTUNITY ENTITIES        │                │   │
│   │   │                                     │                │   │
│   │   │  projects ──→ project_skills        │                │   │
│   │   │  clubs ─────→ club_skills           │                │   │
│   │   │  events ────→ event_skills          │                │   │
│   │   │  faculty ───→ research              │                │   │
│   │   │  research ──→ research_skills       │                │   │
│   │   │  hackathons → hackathon_skills      │                │   │
│   │   │  placements → placement_skills      │                │   │
│   │   │                                     │                │   │
│   │   └─────────────────────────────────────┘                │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              Synthetic Data Pipeline                     │   │
│   │                                                          │   │
│   │  generate_synthetic_data.py                              │   │
│   │       │                                                  │   │
│   │       ├──→ data/raw/*.csv  (14 CSV files)               │   │
│   │       │                                                  │   │
│   │  validate_data.py                                        │   │
│   │       │                                                  │   │
│   │       ├──→ Relationship density checks                   │   │
│   │       ├──→ Golden path verification                      │   │
│   │       └──→ Data quality report                           │   │
│   └─────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. Skills as the Central Node

Every entity connects through **skills**. This is the fundamental insight:

```
Student ──has──→ Skill ←──teaches── Project
                  ↑ ↑
        requires──┘ └──unlocks──→ Placement
```

By making skills the shared vocabulary, Genie can reason: *"Student has Skill A → Project P teaches Skill B → Club C teaches Skill C → Placement R requires Skills A+B+C → here's your path."*

### 2. Genie as the Intelligence Layer (Not a Chatbot)

We do NOT build recommendation logic in application code. Instead:
- The **data model encodes relationships** (opportunity graph)
- The **system instructions teach Genie how to reason** across those relationships
- Genie generates **SQL queries** that traverse the graph
- Genie provides **natural language explanations** of its reasoning

This means:
- ✅ No custom ML model to build or maintain
- ✅ Genie's SQL generation handles complex multi-table JOINs
- ✅ "What if?" re-planning is just a new query with different WHERE clauses
- ✅ Explanations come from Genie's natural language capabilities

### 3. Intentional Data Density

Our synthetic data is NOT random. Every row serves the opportunity graph:
- **Golden paths** are pre-designed (e.g., Java→Backend→AI Club→Workshop→Research→Hackathon→Placement)
- **Branching paths** exist for "What if?" scenarios
- **Dead ends** are intentionally absent — every skill leads somewhere
- **Proficiency levels** enable nuanced matching (beginner → intermediate → advanced)
- **Time costs** enable constraint-aware planning

### 4. Proficiency-Aware Skill Matching

Skills aren't binary. Each has a proficiency level (1–5):

| Level | Meaning | Example |
|-------|---------|---------|
| 1 | Awareness | "I've heard of ML" |
| 2 | Beginner | "I've done a tutorial" |
| 3 | Intermediate | "I've built a project" |
| 4 | Advanced | "I can teach this" |
| 5 | Expert | "I've published work" |

This allows Genie to recommend **skill-building sequences**: you can't jump from Level 1 Python to Level 4 ML research.

### 5. Time-Cost Modeling

Every opportunity has a `weekly_hours` cost. This enables:
- *"What if I only have 5 hours per week?"* → filter by time cost
- *"What if I have 20 hours?"* → stack more opportunities in parallel
- Realistic scheduling that respects student constraints

---

## Data Flow

```
1. Student asks question in Genie Space
       │
       ▼
2. Genie parses intent:
   - Who is the student? (profile lookup)
   - What do they know? (current skills)
   - What do they want? (career goal)
   - Any constraints? (time, prerequisites)
       │
       ▼
3. Genie generates SQL queries:
   - Query 1: Get student's current skills + proficiency
   - Query 2: Get target role's required skills
   - Query 3: Compute skill gaps
   - Query 4: Find opportunities that teach missing skills
   - Query 5: Sequence by prerequisites + time cost
       │
       ▼
4. Genie synthesizes results:
   - Opportunity cards with "why" explanations
   - Sequenced path (week-by-week timeline)
   - Alternative paths for "What if?" follow-ups
       │
       ▼
5. Student asks follow-up:
   - "What if I only have 5 hours?"
   - Genie re-runs with new constraint → adjusted path
```

---

## Why This Architecture Wins

| Criterion | How Architecture Supports It |
|-----------|------------------------------|
| **Intelligent Genie use** | Genie does multi-hop reasoning, not just simple lookups |
| **Explainability** | System instructions mandate "why" for every recommendation |
| **"What if?" support** | Constraints are query parameters, not code changes |
| **Reproducibility** | Synthetic data + loading scripts = fully reproducible |
| **Scalability** | Same schema works for any campus; just load different data |
| **Clean separation** | Data layer ↔ Intelligence layer ↔ Presentation layer |

---

## Scalability Path

### v1: Single Campus (Current)
- One Unity Catalog schema
- 14 tables, ~500 total rows
- Single Genie Space

### v2: Multi-Campus
- One schema per campus within the same catalog
- Cross-campus queries via Genie's multi-schema support
- Federated opportunity discovery

### v3: City Layer
- Industry partnership tables
- Alumni network connections
- City-wide internship pool
- Real-time event integration

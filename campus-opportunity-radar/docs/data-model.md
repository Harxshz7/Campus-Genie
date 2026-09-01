# Data Model — Campus Opportunity Radar

## Design Philosophy

The data model is built around one core principle: **Skills are the universal connector.**

Every entity in the campus ecosystem — students, projects, clubs, events, research, hackathons, placements — connects through skills. This creates a **traversable Opportunity Graph** where Genie can reason about multi-hop paths from a student's current state to their career goal.

---

## Entity-Relationship Diagram

```
                            ┌──────────────┐
                            │   students   │
                            │──────────────│
                            │ student_id   │
                            │ name         │
                            │ year         │
                            │ department   │
                            │ career_goal  │
                            │ avail_hrs/wk │
                            └──────┬───────┘
                                   │
                          ┌────────┴────────┐
                          │ student_skills  │
                          │────────────────│
                          │ student_id (FK)│
                          │ skill_id (FK)  │
                          │ proficiency    │
                          └────────┬───────┘
                                   │
                            ┌──────┴───────┐
                            │    skills    │
                            │──────────────│
                            │ skill_id     │
                            │ skill_name   │
                            │ category     │
                            │ difficulty   │
                            └──────┬───────┘
                                   │
            ┌──────────┬───────────┼───────────┬──────────┬──────────┐
            │          │           │           │          │          │
     ┌──────┴──────┐ ┌─┴────────┐ ┌┴─────────┐│   ┌──────┴──────┐  │
     │project_skill│ │club_skill│ │event_skill││   │research_    │  │
     │─────────────│ │──────────│ │───────────││   │  skills     │  │
     │project_id   │ │club_id   │ │event_id   ││   │research_id │  │
     │skill_id     │ │skill_id  │ │skill_id   ││   │skill_id    │  │
     │relation_type│ │rel_type  │ │rel_type   ││   │rel_type    │  │
     └──────┬──────┘ └─┬────────┘ └┬──────────┘│   └──────┬─────┘  │
            │          │           │            │          │         │
     ┌──────┴──────┐ ┌─┴────────┐ ┌┴─────────┐│   ┌──────┴──────┐ │
     │  projects   │ │  clubs   │ │  events  │ │   │  research   │ │
     │─────────────│ │──────────│ │──────────│ │   │─────────────│ │
     │ project_id  │ │ club_id  │ │ event_id │ │   │ research_id │ │
     │ title       │ │ name     │ │ title    │ │   │ title       │ │
     │ difficulty  │ │ focus    │ │ type     │ │   │ faculty_id  │ │
     │ weekly_hrs  │ │ wkly_hrs │ │ date     │ │   │ weekly_hrs  │ │
     │ duration_wk │ │          │ │ wkly_hrs │ │   │ duration_wk │ │
     └─────────────┘ └──────────┘ └──────────┘ │   └─────────────┘ │
                                                │                   │
                                         ┌──────┴──────┐    ┌──────┴───────┐
                                         │hackathon_   │    │placement_    │
                                         │  skills     │    │  skills      │
                                         │─────────────│    │──────────────│
                                         │hackathon_id │    │placement_id  │
                                         │skill_id     │    │skill_id      │
                                         │rel_type     │    │min_proficiency│
                                         └──────┬──────┘    └──────┬───────┘
                                                │                  │
                                         ┌──────┴──────┐    ┌─────┴────────┐
                                         │ hackathons  │    │  placements  │
                                         │─────────────│    │──────────────│
                                         │hackathon_id │    │placement_id  │
                                         │ title       │    │ company      │
                                         │ theme       │    │ role         │
                                         │ date        │    │ package_lpa  │
                                         │ team_size   │    │ min_year     │
                                         └─────────────┘    └──────────────┘
```

---

## Table Definitions

### Core Entities

#### `students`
The student profile — who they are, where they are, and where they want to go.

| Column | Type | Description |
|--------|------|-------------|
| `student_id` | INT (PK) | Unique student identifier |
| `name` | STRING | Full name |
| `email` | STRING | Campus email |
| `year` | INT | Current year (1–4) |
| `department` | STRING | e.g., CSE, ECE, MBA |
| `career_goal` | STRING | Target role (e.g., "AI Engineer", "Product Manager") |
| `available_hours_per_week` | INT | Hours available for extracurriculars |
| `gpa` | FLOAT | Current GPA (on 10-point scale) |

#### `skills`
The skill taxonomy — the shared vocabulary that connects everything.

| Column | Type | Description |
|--------|------|-------------|
| `skill_id` | INT (PK) | Unique skill identifier |
| `skill_name` | STRING | e.g., "Python", "Machine Learning", "Public Speaking" |
| `category` | STRING | "Programming", "AI/ML", "Data", "Soft Skills", "Domain" |
| `difficulty_level` | INT | How hard to learn (1=easy, 5=very hard) |

#### `student_skills`
What each student currently knows and how well.

| Column | Type | Description |
|--------|------|-------------|
| `student_id` | INT (FK) | References `students` |
| `skill_id` | INT (FK) | References `skills` |
| `proficiency_level` | INT | 1=Awareness, 2=Beginner, 3=Intermediate, 4=Advanced, 5=Expert |

---

### Opportunity Entities

#### `projects`
Campus projects that students can join to build skills.

| Column | Type | Description |
|--------|------|-------------|
| `project_id` | INT (PK) | Unique project identifier |
| `title` | STRING | Project title |
| `description` | STRING | What the project does |
| `difficulty` | STRING | "Beginner", "Intermediate", "Advanced" |
| `weekly_hours` | INT | Time commitment per week |
| `duration_weeks` | INT | Total duration |
| `status` | STRING | "Open", "In Progress", "Completed" |
| `max_members` | INT | Maximum team size |

#### `project_skills`
Skills that a project requires and/or teaches.

| Column | Type | Description |
|--------|------|-------------|
| `project_id` | INT (FK) | References `projects` |
| `skill_id` | INT (FK) | References `skills` |
| `relation_type` | STRING | "requires" or "teaches" |
| `proficiency_level` | INT | Min level required or level taught to |

#### `clubs`
Student organizations and clubs.

| Column | Type | Description |
|--------|------|-------------|
| `club_id` | INT (PK) | Unique club identifier |
| `name` | STRING | Club name |
| `description` | STRING | What the club does |
| `focus_area` | STRING | "AI/ML", "Web Dev", "Entrepreneurship", etc. |
| `weekly_hours` | INT | Typical time commitment |
| `meeting_day` | STRING | Regular meeting day |

#### `club_skills`
Skills associated with club membership.

| Column | Type | Description |
|--------|------|-------------|
| `club_id` | INT (FK) | References `clubs` |
| `skill_id` | INT (FK) | References `skills` |
| `relation_type` | STRING | "requires" or "teaches" |
| `proficiency_level` | INT | Min level required or level taught to |

#### `events`
One-time or recurring campus events (workshops, seminars, bootcamps).

| Column | Type | Description |
|--------|------|-------------|
| `event_id` | INT (PK) | Unique event identifier |
| `title` | STRING | Event title |
| `description` | STRING | What the event covers |
| `event_type` | STRING | "Workshop", "Seminar", "Bootcamp", "Guest Lecture" |
| `date` | DATE | Event date |
| `duration_hours` | INT | Total event duration in hours |
| `weekly_hours` | INT | If multi-week, hours per week |
| `capacity` | INT | Max attendees |

#### `event_skills`
Skills associated with events.

| Column | Type | Description |
|--------|------|-------------|
| `event_id` | INT (FK) | References `events` |
| `skill_id` | INT (FK) | References `skills` |
| `relation_type` | STRING | "requires" or "teaches" |
| `proficiency_level` | INT | Min level required or level taught to |

#### `faculty`
Faculty members who lead research and projects.

| Column | Type | Description |
|--------|------|-------------|
| `faculty_id` | INT (PK) | Unique faculty identifier |
| `name` | STRING | Full name |
| `department` | STRING | Department |
| `research_area` | STRING | Primary research focus |
| `email` | STRING | Contact email |

#### `research`
Research opportunities under faculty supervision.

| Column | Type | Description |
|--------|------|-------------|
| `research_id` | INT (PK) | Unique research opportunity ID |
| `title` | STRING | Research project title |
| `description` | STRING | What the research involves |
| `faculty_id` | INT (FK) | Supervising faculty |
| `weekly_hours` | INT | Time commitment per week |
| `duration_weeks` | INT | Expected duration |
| `open_positions` | INT | Spots available |
| `min_year` | INT | Minimum student year |

#### `research_skills`
Skills required for and taught by research.

| Column | Type | Description |
|--------|------|-------------|
| `research_id` | INT (FK) | References `research` |
| `skill_id` | INT (FK) | References `skills` |
| `relation_type` | STRING | "requires" or "teaches" |
| `proficiency_level` | INT | Min level required or level taught to |

#### `hackathons`
Hackathon events.

| Column | Type | Description |
|--------|------|-------------|
| `hackathon_id` | INT (PK) | Unique hackathon identifier |
| `title` | STRING | Hackathon title |
| `description` | STRING | Theme and focus |
| `theme` | STRING | "AI/ML", "Web3", "Social Good", etc. |
| `date` | DATE | Event date |
| `duration_hours` | INT | Duration in hours (e.g., 24, 48) |
| `team_size_min` | INT | Min team size |
| `team_size_max` | INT | Max team size |
| `prize_pool` | STRING | Prize description |

#### `hackathon_skills`
Skills useful for and developed through hackathons.

| Column | Type | Description |
|--------|------|-------------|
| `hackathon_id` | INT (FK) | References `hackathons` |
| `skill_id` | INT (FK) | References `skills` |
| `relation_type` | STRING | "requires" or "teaches" |
| `proficiency_level` | INT | Level useful/taught |

#### `placements`
Company placement/internship opportunities.

| Column | Type | Description |
|--------|------|-------------|
| `placement_id` | INT (PK) | Unique placement identifier |
| `company` | STRING | Company name |
| `role` | STRING | Job title |
| `description` | STRING | Role description |
| `package_lpa` | FLOAT | Annual package in LPA |
| `min_year` | INT | Minimum year to apply |
| `application_deadline` | DATE | When to apply by |
| `positions_available` | INT | Number of openings |

#### `placement_skills`
Skills required for placement roles.

| Column | Type | Description |
|--------|------|-------------|
| `placement_id` | INT (FK) | References `placements` |
| `skill_id` | INT (FK) | References `skills` |
| `relation_type` | STRING | "requires" |
| `min_proficiency` | INT | Minimum proficiency level needed |

---

## Intentional Multi-Hop Paths

### Golden Path: "Java+SQL Student → AI Engineer"

This is the primary demo path. Every table is seeded to ensure this traversal works:

```
Student: Arjun (2nd year CSE, knows Java[3] + SQL[3], goal: AI Engineer)
    │
    ├──→ Skill Gap: Python[0], ML[0], TensorFlow[0], NLP[0], Statistics[0]
    │
    ├──→ Step 1: "Backend API Project" (requires Java[2], teaches REST APIs[3], Python[2])
    │        └── Fills: Python (0→2), REST APIs (0→3)
    │
    ├──→ Step 2: "AI/ML Club" (requires Python[1], teaches ML[2], Statistics[2])
    │        └── Fills: ML (0→2), Statistics (0→2)
    │
    ├──→ Step 3: "Applied AI Workshop" (requires Python[2]+ML[1], teaches TensorFlow[3], Model Deployment[2])
    │        └── Fills: TensorFlow (0→3), Model Deployment (0→2)
    │
    ├──→ Step 4: "Prof. Kumar's NLP Research" (requires ML[2]+Python[2], teaches NLP[3], Research Methods[3])
    │        └── Fills: NLP (0→3), Research Methods (0→3)
    │
    ├──→ Step 5: "DataHack Hackathon" (requires ML[2]+Python[2], teaches End-to-End ML[3], Teamwork[3])
    │        └── Fills: End-to-End ML (0→3), Teamwork (0→3)
    │
    └──→ Step 6: "TechCorp AI Engineer" placement
             └── Requires: Python[3], ML[3], TensorFlow[2], NLP[2] ✓ ALL MET
```

### Secondary Paths (for "What if?" demonstrations)

| Scenario | Path Variation |
|----------|----------------|
| "What if I only have 5 hrs/week?" | Skip research (8 hrs/wk), do lighter workshop + hackathon |
| "What if I already know Python?" | Skip Backend Project, go straight to AI Club |
| "What if I want Data Science instead?" | Different club (Data Analytics) + different events + different placements |
| "What if I'm a 3rd-year student?" | Compress timeline, skip beginner steps |
| "What if I'm from ECE, not CSE?" | Same skills path, different starting point, additional bridge courses |

### Additional Curated Paths

#### Path 2: "Frontend Dev → Product Manager"
```
Student knows HTML/CSS/JS → UX Design Club → PM Workshop → 
Startup Weekend Hackathon → Industry Capstone Project → PM Placement
```

#### Path 3: "Statistics Student → Data Scientist"
```
Student knows R/Statistics → Data Analytics Club → Python Bootcamp → 
ML Workshop → Prof. Sharma's Predictive Analytics Research → 
Data Science Hackathon → Analytics Placement
```

#### Path 4: "Mechanical Eng → IoT Developer"
```
Student knows circuits/CAD → Embedded Systems Project → 
IoT Club → Sensor Data Workshop → Smart Campus Research → 
IoT Hackathon → Embedded Systems Placement
```

---

## Relationship Density Requirements

For the Opportunity Graph to work well with Genie, we need minimum density:

| Metric | Minimum | Target |
|--------|---------|--------|
| Skills per student | 2 | 4–6 |
| Skills per project | 2 (req) + 2 (teach) | 3+3 |
| Skills per club | 1 (req) + 2 (teach) | 2+3 |
| Skills per event | 1 (req) + 2 (teach) | 1+3 |
| Skills per research | 2 (req) + 2 (teach) | 3+3 |
| Skills per hackathon | 2 (req) + 1 (teach) | 3+2 |
| Skills per placement | 3 (req) | 4–6 |
| Avg opportunities per skill | 3 | 5+ |
| Connected paths (student→placement) | 3 | 8+ |

These numbers ensure Genie always has rich data to reason over.

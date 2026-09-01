# Genie Space Setup — Campus Opportunity Radar

> **Complete step-by-step guide to load data into Databricks and configure the Genie Space.**

---

## Prerequisites

- ✅ Databricks account (Free Trial / Community Edition / Workspace)
- ✅ CSV files generated (run `python scripts/generate_synthetic_data.py`)
- ✅ 16 CSV files in `data/raw/`

---

## Step 1: Create a Catalog and Schema

In your Databricks workspace:

1. Go to **Catalog** (left sidebar)
2. Click **Create Catalog** → Name: `campus_radar`
3. Inside `campus_radar`, click **Create Schema** → Name: `opportunity_graph`

Your namespace will be: `campus_radar.opportunity_graph`

> **If using Community Edition** (no Unity Catalog): Use the default `hive_metastore` catalog and create a database:
> ```sql
> CREATE DATABASE IF NOT EXISTS campus_opportunity_radar;
> USE campus_opportunity_radar;
> ```

---

## Step 2: Upload CSV Files

### Option A: Via Databricks UI (Recommended for quick setup)

1. Go to **Catalog** → `campus_radar` → `opportunity_graph`
2. Click **Create Table** → **Upload File**
3. Upload each CSV file from `data/raw/`:

Upload in this order (respecting foreign key dependencies):

| Order | File | Table Name |
|-------|------|------------|
| 1 | `skills.csv` | `skills` |
| 2 | `students.csv` | `students` |
| 3 | `student_skills.csv` | `student_skills` |
| 4 | `faculty.csv` | `faculty` |
| 5 | `projects.csv` | `projects` |
| 6 | `project_skills.csv` | `project_skills` |
| 7 | `clubs.csv` | `clubs` |
| 8 | `club_skills.csv` | `club_skills` |
| 9 | `events.csv` | `events` |
| 10 | `event_skills.csv` | `event_skills` |
| 11 | `research.csv` | `research` |
| 12 | `research_skills.csv` | `research_skills` |
| 13 | `hackathons.csv` | `hackathons` |
| 14 | `hackathon_skills.csv` | `hackathon_skills` |
| 15 | `placements.csv` | `placements` |
| 16 | `placement_skills.csv` | `placement_skills` |

4. For each upload:
   - Databricks will auto-detect columns and types
   - Verify column names match the schema
   - Click **Create Table**

### Option B: Via Notebook (Programmatic)

Create a new notebook and run:

```python
# Cell 1: Upload CSVs (upload to DBFS first via UI or CLI)
import os

# If files are uploaded to DBFS /FileStore/campus_radar/
base_path = "/FileStore/campus_radar/"

tables = [
    "skills", "students", "student_skills", "faculty",
    "projects", "project_skills", "clubs", "club_skills",
    "events", "event_skills", "research", "research_skills",
    "hackathons", "hackathon_skills", "placements", "placement_skills"
]

for table in tables:
    df = spark.read.csv(f"{base_path}{table}.csv", header=True, inferSchema=True)
    df.write.mode("overwrite").saveAsTable(f"campus_radar.opportunity_graph.{table}")
    print(f"✅ Loaded {table}: {df.count()} rows")
```

### Option C: Using Databricks CLI

```bash
# Upload all CSVs to DBFS
databricks fs cp data/raw/ dbfs:/FileStore/campus_radar/ --recursive

# Then use Option B notebook to create tables
```

---

## Step 3: Verify Data Loaded Correctly

Run these queries in a SQL notebook or SQL Editor:

```sql
-- Check all tables exist and have data
SELECT 'students' as tbl, COUNT(*) as cnt FROM campus_radar.opportunity_graph.students
UNION ALL SELECT 'skills', COUNT(*) FROM campus_radar.opportunity_graph.skills
UNION ALL SELECT 'student_skills', COUNT(*) FROM campus_radar.opportunity_graph.student_skills
UNION ALL SELECT 'projects', COUNT(*) FROM campus_radar.opportunity_graph.projects
UNION ALL SELECT 'project_skills', COUNT(*) FROM campus_radar.opportunity_graph.project_skills
UNION ALL SELECT 'clubs', COUNT(*) FROM campus_radar.opportunity_graph.clubs
UNION ALL SELECT 'club_skills', COUNT(*) FROM campus_radar.opportunity_graph.club_skills
UNION ALL SELECT 'events', COUNT(*) FROM campus_radar.opportunity_graph.events
UNION ALL SELECT 'event_skills', COUNT(*) FROM campus_radar.opportunity_graph.event_skills
UNION ALL SELECT 'faculty', COUNT(*) FROM campus_radar.opportunity_graph.faculty
UNION ALL SELECT 'research', COUNT(*) FROM campus_radar.opportunity_graph.research
UNION ALL SELECT 'research_skills', COUNT(*) FROM campus_radar.opportunity_graph.research_skills
UNION ALL SELECT 'hackathons', COUNT(*) FROM campus_radar.opportunity_graph.hackathons
UNION ALL SELECT 'hackathon_skills', COUNT(*) FROM campus_radar.opportunity_graph.hackathon_skills
UNION ALL SELECT 'placements', COUNT(*) FROM campus_radar.opportunity_graph.placements
UNION ALL SELECT 'placement_skills', COUNT(*) FROM campus_radar.opportunity_graph.placement_skills;
```

Expected output: 16 rows, all with counts matching the generated data.

```sql
-- Quick sanity check: Arjun's profile
SELECT s.name, s.year, s.department, s.career_goal, 
       sk.skill_name, ss.proficiency_level
FROM campus_radar.opportunity_graph.students s
JOIN campus_radar.opportunity_graph.student_skills ss ON s.student_id = ss.student_id
JOIN campus_radar.opportunity_graph.skills sk ON ss.skill_id = sk.skill_id
WHERE s.student_id = 1;
```

---

## Step 4: Add Table Comments and Column Descriptions

This helps Genie understand the data better. Run in SQL Editor:

```sql
-- Table comments
COMMENT ON TABLE campus_radar.opportunity_graph.students IS 'Student profiles including year, department, career goals, and available hours per week for extracurricular activities.';
COMMENT ON TABLE campus_radar.opportunity_graph.skills IS 'Skill taxonomy with categories (Programming, AI/ML, Data, Web, Soft Skills, Domain, Cloud, DevOps) and difficulty levels (1-5).';
COMMENT ON TABLE campus_radar.opportunity_graph.student_skills IS 'Maps students to their current skills with proficiency levels (1=Awareness, 2=Beginner, 3=Intermediate, 4=Advanced, 5=Expert).';
COMMENT ON TABLE campus_radar.opportunity_graph.projects IS 'Campus projects students can join. Includes difficulty level, weekly time commitment, and duration in weeks.';
COMMENT ON TABLE campus_radar.opportunity_graph.project_skills IS 'Maps projects to skills they require or teach, with proficiency levels. relation_type is either requires or teaches.';
COMMENT ON TABLE campus_radar.opportunity_graph.clubs IS 'Student clubs and organizations with focus areas and weekly time commitments.';
COMMENT ON TABLE campus_radar.opportunity_graph.club_skills IS 'Maps clubs to skills they require or teach, with proficiency levels. relation_type is either requires or teaches.';
COMMENT ON TABLE campus_radar.opportunity_graph.events IS 'Campus events including workshops, seminars, bootcamps, and guest lectures with dates and capacities.';
COMMENT ON TABLE campus_radar.opportunity_graph.event_skills IS 'Maps events to skills they require or teach, with proficiency levels. relation_type is either requires or teaches.';
COMMENT ON TABLE campus_radar.opportunity_graph.faculty IS 'Faculty members with their departments and research areas.';
COMMENT ON TABLE campus_radar.opportunity_graph.research IS 'Research opportunities under faculty supervision with time commitments and position availability.';
COMMENT ON TABLE campus_radar.opportunity_graph.research_skills IS 'Maps research opportunities to skills they require or teach, with proficiency levels. relation_type is either requires or teaches.';
COMMENT ON TABLE campus_radar.opportunity_graph.hackathons IS 'Hackathon events with themes, dates, team sizes, and prize pools.';
COMMENT ON TABLE campus_radar.opportunity_graph.hackathon_skills IS 'Maps hackathons to skills they require or teach, with proficiency levels. relation_type is either requires or teaches.';
COMMENT ON TABLE campus_radar.opportunity_graph.placements IS 'Company placement and internship roles with packages (in LPA), deadlines, and positions available.';
COMMENT ON TABLE campus_radar.opportunity_graph.placement_skills IS 'Maps placement roles to required skills with minimum proficiency levels needed. relation_type is always requires.';
```

---

## Step 5: Create the Genie Space

1. Go to **Genie** (left sidebar) → **New Genie Space**
2. **Name**: `Campus Opportunity Radar`
3. **Description**: `Turn fragmented campus data into personalized opportunity paths for students`
4. **Add Tables**: Select ALL 16 tables from `campus_radar.opportunity_graph`:
   - `students`, `skills`, `student_skills`
   - `projects`, `project_skills`
   - `clubs`, `club_skills`
   - `events`, `event_skills`
   - `faculty`, `research`, `research_skills`
   - `hackathons`, `hackathon_skills`
   - `placements`, `placement_skills`

5. **Add Instructions**: Copy the FULL contents of `genie/genie_instructions.md` into the Instructions field

6. **Add Sample Questions**: Add the questions from `genie/sample_questions.md`

7. Click **Save**

---

## Step 6: Test the Genie Space

Try these questions in order:

### Quick Smoke Test
```
How many students are in the database?
```
Expected: 100 students

### Golden Demo Question
```
I'm Arjun Mehta, a 2nd-year CSE student. I know Java and SQL. I want to become an AI Engineer. What campus opportunities should I pursue and in what order?
```
Expected: Multi-step opportunity path from Backend Project → AI Club → Workshop → Research → Hackathon → Placement

### What-If Test
```
What if Arjun only has 5 hours per week? Which opportunities still fit?
```
Expected: Filtered list based on `weekly_hours <= 5`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Genie can't find tables | Ensure all 16 tables are added to the Genie Space |
| Genie gives shallow answers | Check that Instructions are properly pasted from `genie_instructions.md` |
| Genie doesn't join tables | Add table comments (Step 4) — they help Genie understand relationships |
| "No data found" errors | Verify data loaded correctly with the sanity check queries in Step 3 |
| Community Edition limitations | Genie may not be available on free Community Edition — use Databricks Free Trial instead |

---

## Quick Reference: Run Commands

```bash
# Set up environment
python3 -m venv .venv
source .venv/bin/activate
pip install faker pandas numpy

# Generate data
python3 scripts/generate_synthetic_data.py

# Validate data
python3 scripts/validate_data.py

# Check generated files
ls -la data/raw/
```

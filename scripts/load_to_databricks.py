#!/usr/bin/env python3
"""
Campus Opportunity Radar — Databricks Data Loader
===================================================
Helper script with notebook-ready code to load CSVs into Databricks.

This script generates a ready-to-paste Databricks notebook that:
1. Creates the catalog and schema
2. Loads all CSV files into tables
3. Adds table/column comments for Genie
4. Runs verification queries

Usage:
  python scripts/load_to_databricks.py

This will print notebook-ready code blocks to paste into Databricks.
"""

import os

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw")

TABLES = [
    "skills", "students", "student_skills", "faculty",
    "projects", "project_skills", "clubs", "club_skills",
    "events", "event_skills", "research", "research_skills",
    "hackathons", "hackathon_skills", "placements", "placement_skills"
]

TABLE_COMMENTS = {
    "students": "Student profiles including year, department, career goals, and available hours per week.",
    "skills": "Skill taxonomy with categories and difficulty levels (1-5). Central node connecting all entities.",
    "student_skills": "Maps students to current skills with proficiency (1=Awareness to 5=Expert).",
    "projects": "Campus projects with difficulty, weekly hours, and duration in weeks.",
    "project_skills": "Maps projects to skills. relation_type: requires or teaches.",
    "clubs": "Student clubs with focus areas and weekly time commitment.",
    "club_skills": "Maps clubs to skills. relation_type: requires or teaches.",
    "events": "Workshops, seminars, bootcamps with dates and capacities.",
    "event_skills": "Maps events to skills. relation_type: requires or teaches.",
    "faculty": "Faculty members with departments and research areas.",
    "research": "Research opportunities under faculty with time commitment and positions.",
    "research_skills": "Maps research to skills. relation_type: requires or teaches.",
    "hackathons": "Hackathon events with themes, team sizes, and prize pools.",
    "hackathon_skills": "Maps hackathons to skills. relation_type: requires or teaches.",
    "placements": "Company placement roles with packages (LPA) and deadlines.",
    "placement_skills": "Maps placements to required skills with minimum proficiency levels.",
}


def generate_notebook_code():
    """Generate notebook-ready code blocks."""

    print("=" * 70)
    print("DATABRICKS NOTEBOOK CODE — Copy each cell into a new notebook")
    print("=" * 70)

    # Cell 1: Setup
    print("\n" + "─" * 70)
    print("CELL 1: Create Catalog and Schema")
    print("─" * 70)
    print("""
-- Run this in a SQL cell
CREATE CATALOG IF NOT EXISTS campus_radar;
USE CATALOG campus_radar;
CREATE SCHEMA IF NOT EXISTS opportunity_graph;
USE SCHEMA opportunity_graph;
""")

    # Cell 2: Upload instructions
    print("\n" + "─" * 70)
    print("CELL 2: Upload CSVs")
    print("─" * 70)
    print("""
# INSTRUCTIONS:
# 1. In Databricks, go to Catalog > campus_radar > opportunity_graph
# 2. Click "Create Table" > "Upload File"
# 3. Upload each CSV file from data/raw/ in this order:
#
#    skills.csv, students.csv, student_skills.csv, faculty.csv,
#    projects.csv, project_skills.csv, clubs.csv, club_skills.csv,
#    events.csv, event_skills.csv, research.csv, research_skills.csv,
#    hackathons.csv, hackathon_skills.csv, placements.csv, placement_skills.csv
#
# ALTERNATIVE: Upload to DBFS first, then run the cell below
""")

    # Cell 3: Programmatic loading
    print("\n" + "─" * 70)
    print("CELL 3: Programmatic Loading (if CSVs are on DBFS)")
    print("─" * 70)
    print("""
# Upload CSVs to DBFS first:  databricks fs cp data/raw/ dbfs:/FileStore/campus_radar/ --recursive

base_path = "/FileStore/campus_radar/"
catalog_schema = "campus_radar.opportunity_graph"

tables = [
    "skills", "students", "student_skills", "faculty",
    "projects", "project_skills", "clubs", "club_skills",
    "events", "event_skills", "research", "research_skills",
    "hackathons", "hackathon_skills", "placements", "placement_skills"
]

for table in tables:
    try:
        df = spark.read.csv(f"{base_path}{table}.csv", header=True, inferSchema=True)
        df.write.mode("overwrite").saveAsTable(f"{catalog_schema}.{table}")
        print(f"✅ Loaded {table}: {df.count()} rows")
    except Exception as e:
        print(f"❌ Failed to load {table}: {e}")
""")

    # Cell 4: Add table comments
    print("\n" + "─" * 70)
    print("CELL 4: Add Table Comments (helps Genie understand the data)")
    print("─" * 70)
    print("-- Run this in a SQL cell")
    for table, comment in TABLE_COMMENTS.items():
        print(f"COMMENT ON TABLE campus_radar.opportunity_graph.{table} IS '{comment}';")

    # Cell 5: Verification
    print("\n" + "─" * 70)
    print("CELL 5: Verify All Tables Loaded")
    print("─" * 70)
    print("""
-- Run this in a SQL cell
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
UNION ALL SELECT 'placement_skills', COUNT(*) FROM campus_radar.opportunity_graph.placement_skills
ORDER BY tbl;
""")

    # Cell 6: Golden path check
    print("\n" + "─" * 70)
    print("CELL 6: Verify Golden Path (Arjun's profile)")
    print("─" * 70)
    print("""
-- Run this in a SQL cell
SELECT s.name, s.year, s.department, s.career_goal, s.available_hours_per_week,
       sk.skill_name, ss.proficiency_level
FROM campus_radar.opportunity_graph.students s
JOIN campus_radar.opportunity_graph.student_skills ss ON s.student_id = ss.student_id
JOIN campus_radar.opportunity_graph.skills sk ON ss.skill_id = sk.skill_id
WHERE s.student_id = 1
ORDER BY sk.skill_name;
""")

    print("\n" + "=" * 70)
    print("✅ DONE — After running all cells, proceed to Genie Space setup")
    print("   See docs/genie-setup.md Step 5 for Genie Space configuration")
    print("=" * 70)


def check_csv_files():
    """Check that all CSV files exist."""
    print("📂 Checking CSV files in:", DATA_DIR)
    all_exist = True
    for table in TABLES:
        filepath = os.path.join(DATA_DIR, f"{table}.csv")
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"  ✅ {table}.csv ({size:,} bytes)")
        else:
            print(f"  ❌ {table}.csv MISSING")
            all_exist = False

    if not all_exist:
        print("\n❌ Some CSV files are missing. Run generate_synthetic_data.py first.")
        return False

    print(f"\n✅ All {len(TABLES)} CSV files present")
    return True


def main():
    print("=" * 70)
    print("Campus Opportunity Radar — Databricks Data Loader")
    print("=" * 70)

    if not check_csv_files():
        return

    print()
    generate_notebook_code()


if __name__ == "__main__":
    main()

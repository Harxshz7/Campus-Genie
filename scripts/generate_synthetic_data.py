#!/usr/bin/env python3
"""
Campus Opportunity Radar — Synthetic Data Generator
====================================================
Generates high-quality, relationship-rich synthetic data for the Opportunity Graph.

Key design principles:
- Every relationship serves the opportunity graph story
- Golden multi-hop paths are intentionally seeded
- Proficiency levels enable nuanced matching
- Time costs enable "What if I only have X hours?" queries
- Data is realistic but compact (~500 rows across 14 tables)

Golden Path (primary demo):
  Arjun (2nd yr CSE, Java[3]+SQL[3]) → wants AI Engineer
  → Backend API Project → AI/ML Club → Applied AI Workshop
  → Prof. Kumar's NLP Research → DataHack Hackathon → TechCorp AI Engineer

Usage:
  python scripts/generate_synthetic_data.py
"""

import os
import random
import pandas as pd
import numpy as np
from datetime import date, timedelta

# Reproducibility
random.seed(42)
np.random.seed(42)

# Output directory
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw")
os.makedirs(OUTPUT_DIR, exist_ok=True)


# ============================================================
# SKILL TAXONOMY — The central node connecting everything
# ============================================================
SKILLS = [
    # Programming (category, difficulty)
    (1, "Python", "Programming", 2),
    (2, "Java", "Programming", 2),
    (3, "JavaScript", "Programming", 2),
    (4, "C++", "Programming", 3),
    (5, "SQL", "Data", 2),
    (6, "R", "Programming", 2),
    (7, "HTML/CSS", "Web", 1),
    (8, "TypeScript", "Programming", 3),

    # AI/ML
    (9, "Machine Learning", "AI/ML", 4),
    (10, "Deep Learning", "AI/ML", 5),
    (11, "Natural Language Processing", "AI/ML", 5),
    (12, "Computer Vision", "AI/ML", 5),
    (13, "TensorFlow", "AI/ML", 3),
    (14, "PyTorch", "AI/ML", 3),
    (15, "Scikit-Learn", "AI/ML", 3),
    (16, "Data Analysis", "Data", 2),
    (17, "Statistics", "Data", 3),

    # Data & Cloud
    (18, "Data Visualization", "Data", 2),
    (19, "Big Data (Spark)", "Data", 4),
    (20, "Cloud Computing (AWS)", "Cloud", 3),
    (21, "Databricks", "Data", 3),
    (22, "Data Engineering", "Data", 4),
    (23, "ETL Pipelines", "Data", 3),

    # Web & App
    (24, "React", "Web", 3),
    (25, "Node.js", "Web", 3),
    (26, "REST APIs", "Web", 2),
    (27, "Django/Flask", "Web", 3),
    (28, "UI/UX Design", "Design", 2),
    (29, "Mobile Development", "Web", 3),

    # DevOps & Systems
    (30, "Docker", "DevOps", 3),
    (31, "Git/Version Control", "DevOps", 1),
    (32, "Linux", "DevOps", 2),
    (33, "CI/CD", "DevOps", 3),

    # Domain & Soft Skills
    (34, "IoT/Embedded Systems", "Domain", 3),
    (35, "Cybersecurity", "Domain", 4),
    (36, "Blockchain", "Domain", 4),
    (37, "Product Management", "Soft Skills", 3),
    (38, "Public Speaking", "Soft Skills", 2),
    (39, "Technical Writing", "Soft Skills", 2),
    (40, "Teamwork", "Soft Skills", 1),
    (41, "Leadership", "Soft Skills", 2),
    (42, "Problem Solving", "Soft Skills", 2),
    (43, "Agile/Scrum", "Soft Skills", 2),
    (44, "Model Deployment", "AI/ML", 4),
    (45, "Research Methods", "Soft Skills", 3),
    (46, "End-to-End ML", "AI/ML", 4),
    (47, "Presentation Skills", "Soft Skills", 2),
    (48, "CAD/3D Modeling", "Domain", 3),
    (49, "Circuits & Electronics", "Domain", 3),
    (50, "Sensor Data Processing", "Domain", 4),
]


# ============================================================
# STUDENTS — 100 students with intentional profiles
# ============================================================
DEPARTMENTS = ["CSE", "ECE", "ME", "MATH", "MBA", "IT", "EEE", "Civil"]
CAREER_GOALS = [
    "AI Engineer", "Data Scientist", "Full Stack Developer",
    "Product Manager", "Backend Developer", "Cloud Architect",
    "IoT Developer", "Cybersecurity Analyst", "ML Researcher",
    "Data Engineer", "DevOps Engineer", "Mobile Developer",
    "UX Designer", "Business Analyst", "Software Engineer"
]

# Named students for golden paths
GOLDEN_STUDENTS = [
    # (id, name, email, year, dept, goal, avail_hrs, gpa, skills: [(skill_id, prof)])
    (1, "Arjun Mehta", "arjun.mehta@university.edu", 2, "CSE", "AI Engineer", 15, 8.5,
     [(2, 3), (5, 3), (31, 2), (32, 2), (42, 2)]),  # Java[3], SQL[3], Git[2], Linux[2], Problem Solving[2]

    (2, "Priya Sharma", "priya.sharma@university.edu", 2, "CSE", "Product Manager", 12, 8.8,
     [(7, 3), (3, 3), (28, 2), (38, 2), (40, 2)]),  # HTML/CSS[3], JS[3], UI/UX[2], Speaking[2], Teamwork[2]

    (3, "Rahul Gupta", "rahul.gupta@university.edu", 3, "MATH", "Data Scientist", 10, 9.1,
     [(6, 3), (17, 4), (16, 3), (5, 2), (42, 3)]),  # R[3], Stats[4], DataAnalysis[3], SQL[2], ProbSolving[3]

    (4, "Sneha Reddy", "sneha.reddy@university.edu", 2, "ECE", "IoT Developer", 14, 7.9,
     [(49, 3), (48, 3), (4, 2), (32, 2), (31, 2)]),  # Circuits[3], CAD[3], C++[2], Linux[2], Git[2]

    (5, "Vikram Singh", "vikram.singh@university.edu", 3, "CSE", "ML Researcher", 18, 9.3,
     [(1, 3), (9, 2), (17, 3), (5, 2), (31, 3), (42, 3)]),  # Python[3], ML[2], Stats[3], SQL[2]

    (6, "Ananya Patel", "ananya.patel@university.edu", 2, "IT", "Full Stack Developer", 16, 8.2,
     [(3, 3), (7, 4), (5, 2), (31, 2), (40, 2)]),  # JS[3], HTML/CSS[4], SQL[2], Git[2], Teamwork[2]

    (7, "Karthik Nair", "karthik.nair@university.edu", 3, "CSE", "Cloud Architect", 12, 8.6,
     [(1, 3), (32, 3), (5, 3), (31, 3), (30, 2)]),  # Python[3], Linux[3], SQL[3], Git[3], Docker[2]

    (8, "Deepa Krishnan", "deepa.krishnan@university.edu", 2, "CSE", "Data Engineer", 14, 8.4,
     [(1, 2), (5, 3), (32, 2), (31, 2), (16, 2)]),  # Python[2], SQL[3], Linux[2], Git[2], DataAnalysis[2]

    (9, "Rohan Iyer", "rohan.iyer@university.edu", 4, "CSE", "Software Engineer", 8, 8.7,
     [(2, 4), (1, 3), (5, 3), (31, 3), (26, 3), (30, 2)]),  # Java[4], Python[3], SQL[3], Git[3], REST[3], Docker[2]

    (10, "Meera Joshi", "meera.joshi@university.edu", 2, "MBA", "Business Analyst", 10, 8.9,
     [(5, 2), (16, 2), (18, 2), (38, 3), (40, 3)]),  # SQL[2], DataAnalysis[2], DataViz[2], Speaking[3], Teamwork[3]
]

def generate_students():
    """Generate 100 students: 10 golden + 90 realistic."""
    from faker import Faker
    fake = Faker("en_IN")

    students = []
    student_skills = []

    # Golden students first
    for s in GOLDEN_STUDENTS:
        sid, name, email, year, dept, goal, hrs, gpa, skills = s
        students.append({
            "student_id": sid,
            "name": name,
            "email": email,
            "year": year,
            "department": dept,
            "career_goal": goal,
            "available_hours_per_week": hrs,
            "gpa": gpa
        })
        for skill_id, prof in skills:
            student_skills.append({
                "student_id": sid,
                "skill_id": skill_id,
                "proficiency_level": prof
            })

    # Generate 90 more students
    for sid in range(11, 101):
        dept = random.choice(DEPARTMENTS)
        year = random.choice([1, 2, 2, 3, 3, 4])  # weight toward 2nd/3rd year
        goal = random.choice(CAREER_GOALS)

        # Assign 3-6 skills based on department and year
        dept_skill_pools = {
            "CSE": [1, 2, 3, 4, 5, 7, 24, 26, 30, 31, 32, 42],
            "ECE": [4, 34, 49, 32, 31, 1, 50, 42],
            "IT": [1, 3, 5, 7, 24, 25, 26, 27, 31, 42],
            "ME": [4, 48, 49, 32, 42, 31],
            "MATH": [1, 5, 6, 16, 17, 18, 42],
            "MBA": [5, 16, 18, 37, 38, 39, 40, 41, 43],
            "EEE": [4, 32, 34, 49, 31, 42],
            "Civil": [4, 48, 32, 42, 31, 5],
        }

        pool = dept_skill_pools.get(dept, [1, 5, 31, 42])
        num_skills = random.randint(3, min(6, len(pool)))
        chosen_skills = random.sample(pool, num_skills)

        # Add 1-2 soft skills
        soft_skills = random.sample([38, 39, 40, 41, 42, 43, 47], random.randint(1, 2))
        chosen_skills = list(set(chosen_skills + soft_skills))

        # Proficiency based on year
        max_prof = min(year + 1, 4)

        students.append({
            "student_id": sid,
            "name": fake.name(),
            "email": f"student{sid}@university.edu",
            "year": year,
            "department": dept,
            "career_goal": goal,
            "available_hours_per_week": random.choice([5, 8, 10, 12, 15, 18, 20]),
            "gpa": round(random.uniform(6.0, 9.8), 1)
        })

        for skill_id in chosen_skills:
            student_skills.append({
                "student_id": sid,
                "skill_id": skill_id,
                "proficiency_level": random.randint(1, max_prof)
            })

    return pd.DataFrame(students), pd.DataFrame(student_skills)


# ============================================================
# PROJECTS — 30 projects with intentional skill mappings
# ============================================================
PROJECTS = [
    # (id, title, desc, difficulty, weekly_hrs, dur_weeks, status, max_members,
    #  requires: [(skill_id, prof)], teaches: [(skill_id, prof)])

    (1, "Campus Backend API", "Build RESTful APIs for campus services using Java Spring Boot",
     "Intermediate", 6, 8, "Open", 5,
     [(2, 2), (5, 2)],  # requires Java[2], SQL[2]
     [(26, 3), (1, 2), (30, 2)]),  # teaches REST[3], Python[2], Docker[2]

    (2, "Student Dashboard Web App", "Full-stack dashboard with React frontend and Node.js backend",
     "Intermediate", 8, 10, "Open", 4,
     [(3, 2), (7, 2)],  # requires JS[2], HTML/CSS[2]
     [(24, 3), (25, 3), (26, 2)]),  # teaches React[3], Node.js[3], REST[2]

    (3, "ML Sentiment Analyzer", "Build a sentiment analysis tool using Python and NLP",
     "Advanced", 8, 8, "Open", 3,
     [(1, 3), (9, 2)],  # requires Python[3], ML[2]
     [(11, 3), (15, 3), (46, 2)]),  # teaches NLP[3], Scikit-Learn[3], E2E ML[2]

    (4, "IoT Smart Classroom", "Sensor-based classroom monitoring with embedded systems",
     "Intermediate", 6, 10, "Open", 4,
     [(4, 2), (49, 2)],  # requires C++[2], Circuits[2]
     [(34, 3), (50, 3), (1, 2)]),  # teaches IoT[3], Sensor Data[3], Python[2]

    (5, "Data Pipeline for Campus Analytics", "ETL pipeline using Spark and Databricks",
     "Advanced", 8, 8, "Open", 3,
     [(1, 3), (5, 3)],  # requires Python[3], SQL[3]
     [(19, 3), (21, 3), (23, 3)]),  # teaches Spark[3], Databricks[3], ETL[3]

    (6, "Mobile Campus Guide App", "Cross-platform mobile app for campus navigation",
     "Intermediate", 6, 10, "Open", 4,
     [(3, 2), (7, 2)],  # requires JS[2], HTML/CSS[2]
     [(29, 3), (28, 2), (24, 2)]),  # teaches Mobile Dev[3], UI/UX[2], React[2]

    (7, "Cyber Threat Detection System", "Network traffic analysis for security threats",
     "Advanced", 8, 12, "Open", 3,
     [(1, 3), (32, 3)],  # requires Python[3], Linux[3]
     [(35, 3), (9, 2), (16, 2)]),  # teaches Cybersecurity[3], ML[2], DataAnalysis[2]

    (8, "Blockchain Voting System", "Decentralized voting on Ethereum",
     "Advanced", 8, 10, "Open", 3,
     [(3, 3), (4, 2)],  # requires JS[3], C++[2]
     [(36, 3), (35, 2)]),  # teaches Blockchain[3], Cybersecurity[2]

    (9, "Campus Chatbot", "AI-powered chatbot for student FAQs",
     "Intermediate", 5, 6, "Open", 4,
     [(1, 2), (5, 1)],  # requires Python[2], SQL[1]
     [(11, 2), (26, 2), (9, 2)]),  # teaches NLP[2], REST[2], ML[2]

    (10, "Computer Vision for Attendance", "Face recognition attendance system",
     "Advanced", 8, 10, "Open", 3,
     [(1, 3), (9, 2)],  # requires Python[3], ML[2]
     [(12, 3), (10, 2), (14, 2)]),  # teaches CV[3], DL[2], PyTorch[2]

    (11, "Cloud Infrastructure Manager", "Automated cloud resource provisioning tool",
     "Advanced", 6, 8, "Open", 3,
     [(1, 3), (32, 3), (30, 2)],  # requires Python[3], Linux[3], Docker[2]
     [(20, 3), (33, 3)]),  # teaches Cloud[3], CI/CD[3]

    (12, "Interactive Data Dashboard", "Real-time data visualization with Plotly and Dash",
     "Beginner", 4, 6, "Open", 5,
     [(1, 2), (5, 1)],  # requires Python[2], SQL[1]
     [(18, 3), (16, 2), (27, 2)]),  # teaches DataViz[3], DataAnalysis[2], Django/Flask[2]

    (13, "Recommendation Engine", "Movie/course recommendation system using collaborative filtering",
     "Intermediate", 6, 8, "Open", 4,
     [(1, 2), (9, 1)],  # requires Python[2], ML[1]
     [(9, 3), (15, 3), (16, 2)]),  # teaches ML[3], Scikit-Learn[3], DataAnalysis[2]

    (14, "DevOps Automation Suite", "CI/CD pipeline with Docker and GitHub Actions",
     "Intermediate", 5, 6, "Open", 3,
     [(32, 2), (31, 2)],  # requires Linux[2], Git[2]
     [(30, 3), (33, 3), (20, 2)]),  # teaches Docker[3], CI/CD[3], Cloud[2]

    (15, "E-commerce Microservices", "Microservice architecture for an online store",
     "Advanced", 8, 12, "Open", 4,
     [(2, 3), (5, 2), (26, 2)],  # requires Java[3], SQL[2], REST[2]
     [(30, 3), (20, 2), (43, 2)]),  # teaches Docker[3], Cloud[2], Agile[2]

    (16, "NLP Text Summarizer", "Automatic text summarization using transformer models",
     "Advanced", 7, 8, "Open", 3,
     [(1, 3), (11, 2)],  # requires Python[3], NLP[2]
     [(10, 3), (13, 3), (46, 3)]),  # teaches DL[3], TensorFlow[3], E2E ML[3]

    (17, "Startup Business Plan Tool", "Interactive tool for business model canvas creation",
     "Beginner", 4, 6, "Open", 5,
     [(3, 1), (7, 2)],  # requires JS[1], HTML/CSS[2]
     [(37, 2), (28, 2), (43, 2)]),  # teaches PM[2], UI/UX[2], Agile[2]

    (18, "Real-time Chat Application", "WebSocket-based messaging app",
     "Intermediate", 6, 8, "Open", 4,
     [(3, 2), (25, 2)],  # requires JS[2], Node.js[2]
     [(8, 3), (26, 3), (30, 2)]),  # teaches TypeScript[3], REST[3], Docker[2]

    (19, "Predictive Analytics for Placements", "ML model to predict placement outcomes",
     "Intermediate", 6, 8, "Open", 4,
     [(1, 2), (5, 2), (17, 2)],  # requires Python[2], SQL[2], Stats[2]
     [(9, 3), (16, 3), (18, 2)]),  # teaches ML[3], DataAnalysis[3], DataViz[2]

    (20, "AR Campus Navigator", "Augmented reality campus tour app",
     "Advanced", 8, 12, "Open", 3,
     [(3, 3), (29, 2)],  # requires JS[3], Mobile Dev[2]
     [(12, 2), (28, 3), (29, 3)]),  # teaches CV[2], UI/UX[3], Mobile[3]

    (21, "Smart Energy Monitor", "IoT-based energy consumption tracking for campus buildings",
     "Intermediate", 5, 8, "Open", 4,
     [(49, 2), (1, 2)],  # requires Circuits[2], Python[2]
     [(34, 3), (18, 2), (50, 2)]),  # teaches IoT[3], DataViz[2], Sensor Data[2]

    (22, "API Gateway Framework", "Build a lightweight API gateway with rate limiting and auth",
     "Advanced", 6, 8, "Open", 3,
     [(2, 3), (26, 2), (32, 2)],  # requires Java[3], REST[2], Linux[2]
     [(20, 2), (35, 2), (30, 2)]),  # teaches Cloud[2], Cybersecurity[2], Docker[2]

    (23, "Document Intelligence System", "Extract and classify info from campus documents using AI",
     "Advanced", 7, 10, "Open", 3,
     [(1, 3), (9, 2)],  # requires Python[3], ML[2]
     [(11, 3), (13, 3), (44, 3)]),  # teaches NLP[3], TensorFlow[3], Model Deployment[3]

    (24, "Open Source Contribution Tracker", "Platform to track and gamify open source contributions",
     "Beginner", 3, 6, "Open", 6,
     [(3, 1), (31, 1)],  # requires JS[1], Git[1]
     [(31, 3), (7, 2), (40, 2)]),  # teaches Git[3], HTML/CSS[2], Teamwork[2]

    (25, "Campus Data Warehouse", "Central data repository for all campus systems",
     "Advanced", 8, 12, "Open", 3,
     [(5, 3), (1, 3)],  # requires SQL[3], Python[3]
     [(22, 3), (23, 3), (19, 2)]),  # teaches Data Engineering[3], ETL[3], Spark[2]

    (26, "Technical Blog Platform", "Medium-like platform for campus tech articles",
     "Beginner", 4, 6, "Open", 5,
     [(3, 2), (7, 2)],  # requires JS[2], HTML/CSS[2]
     [(25, 2), (39, 3), (24, 2)]),  # teaches Node.js[2], Tech Writing[3], React[2]

    (27, "Automated Testing Framework", "Build a testing framework for campus applications",
     "Intermediate", 5, 8, "Open", 4,
     [(1, 2), (31, 2)],  # requires Python[2], Git[2]
     [(33, 3), (43, 2), (42, 3)]),  # teaches CI/CD[3], Agile[2], Problem Solving[3]

    (28, "Health & Fitness Tracker", "Wearable data analytics for student wellness",
     "Intermediate", 5, 8, "Open", 4,
     [(1, 2), (16, 1)],  # requires Python[2], DataAnalysis[1]
     [(16, 3), (18, 3), (29, 2)]),  # teaches DataAnalysis[3], DataViz[3], Mobile[2]

    (29, "Supply Chain Optimizer", "ML-based optimization for campus supply chain",
     "Advanced", 7, 10, "Open", 3,
     [(1, 3), (9, 2), (17, 2)],  # requires Python[3], ML[2], Stats[2]
     [(46, 3), (44, 2), (16, 3)]),  # teaches E2E ML[3], Model Deployment[2], DataAnalysis[3]

    (30, "Peer Learning Matchmaker", "Algorithm to match students for peer learning sessions",
     "Beginner", 3, 4, "Open", 6,
     [(1, 1), (5, 1)],  # requires Python[1], SQL[1]
     [(1, 2), (5, 2), (42, 2)]),  # teaches Python[2], SQL[2], Problem Solving[2]
]


# ============================================================
# CLUBS — 12 clubs
# ============================================================
CLUBS = [
    # (id, name, desc, focus_area, weekly_hrs, meeting_day,
    #  requires: [(skill_id, prof)], teaches: [(skill_id, prof)])

    (1, "AI/ML Club", "Explore artificial intelligence and machine learning through projects and talks",
     "AI/ML", 4, "Wednesday",
     [(1, 1)],  # requires Python[1]
     [(9, 2), (17, 2), (15, 2), (42, 2)]),  # teaches ML[2], Stats[2], Scikit-Learn[2], Problem Solving[2]

    (2, "Web Development Society", "Build modern web applications and learn latest frameworks",
     "Web Dev", 4, "Monday",
     [(7, 1)],  # requires HTML/CSS[1]
     [(3, 2), (24, 2), (25, 2), (26, 2)]),  # teaches JS[2], React[2], Node.js[2], REST[2]

    (3, "Data Analytics Club", "Data-driven insights and visualization for real-world problems",
     "Data Science", 3, "Thursday",
     [(5, 1)],  # requires SQL[1]
     [(16, 3), (18, 3), (1, 2), (17, 2)]),  # teaches DataAnalysis[3], DataViz[3], Python[2], Stats[2]

    (4, "Robotics & IoT Lab", "Build robots and IoT devices for campus automation",
     "IoT/Robotics", 5, "Friday",
     [(4, 1), (49, 1)],  # requires C++[1], Circuits[1]
     [(34, 3), (50, 2), (1, 2), (42, 2)]),  # teaches IoT[3], Sensor Data[2], Python[2], Problem Solving[2]

    (5, "Entrepreneurship Cell", "Startup culture, business planning, and pitching",
     "Entrepreneurship", 3, "Tuesday",
     [],  # no technical prereqs
     [(37, 3), (38, 3), (41, 2), (43, 2)]),  # teaches PM[3], Speaking[3], Leadership[2], Agile[2]

    (6, "Cybersecurity Club", "Ethical hacking, CTF competitions, and security audits",
     "Cybersecurity", 4, "Saturday",
     [(32, 2), (1, 1)],  # requires Linux[2], Python[1]
     [(35, 3), (32, 3), (42, 3)]),  # teaches Cybersecurity[3], Linux[3], Problem Solving[3]

    (7, "Open Source Contributors", "Contribute to major open-source projects together",
     "Open Source", 3, "Wednesday",
     [(31, 1)],  # requires Git[1]
     [(31, 3), (40, 3), (39, 2), (1, 2)]),  # teaches Git[3], Teamwork[3], Tech Writing[2], Python[2]

    (8, "Cloud Computing Club", "Learn and implement cloud solutions on AWS/Azure/GCP",
     "Cloud", 4, "Thursday",
     [(1, 2), (32, 1)],  # requires Python[2], Linux[1]
     [(20, 3), (30, 2), (33, 2)]),  # teaches Cloud[3], Docker[2], CI/CD[2]

    (9, "Design Thinking Lab", "User research, prototyping, and design sprints",
     "Design", 3, "Monday",
     [],  # no prereqs
     [(28, 3), (37, 2), (47, 2), (40, 2)]),  # teaches UI/UX[3], PM[2], Presentation[2], Teamwork[2]

    (10, "Competitive Programming Club", "DSA practice and competitive programming contests",
     "Programming", 5, "Saturday",
     [(4, 1)],  # requires C++[1] (or any programming)
     [(4, 3), (42, 3), (2, 2)]),  # teaches C++[3], Problem Solving[3], Java[2]

    (11, "Blockchain & Web3 Society", "Explore decentralized tech, smart contracts, and DeFi",
     "Blockchain", 3, "Friday",
     [(3, 2)],  # requires JS[2]
     [(36, 3), (35, 2), (8, 2)]),  # teaches Blockchain[3], Cybersecurity[2], TypeScript[2]

    (12, "Research & Publications Cell", "Support student research and academic paper writing",
     "Research", 3, "Tuesday",
     [],  # no prereqs
     [(45, 3), (39, 3), (47, 2)]),  # teaches Research Methods[3], Tech Writing[3], Presentation[2]
]


# ============================================================
# EVENTS — 20 events (workshops, seminars, bootcamps)
# ============================================================
EVENTS = [
    # (id, title, desc, type, date, dur_hrs, weekly_hrs, capacity,
    #  requires, teaches)

    (1, "Applied AI Workshop", "Hands-on workshop on building AI applications with TensorFlow",
     "Workshop", "2026-10-15", 16, 4, 50,
     [(1, 2), (9, 1)],  # requires Python[2], ML[1]
     [(13, 3), (44, 2), (46, 2)]),  # teaches TensorFlow[3], Model Deployment[2], E2E ML[2]

    (2, "Python for Data Science Bootcamp", "3-day intensive bootcamp on Python data science stack",
     "Bootcamp", "2026-09-20", 24, 8, 60,
     [],  # no prereqs
     [(1, 3), (16, 2), (15, 2), (18, 2)]),  # teaches Python[3], DataAnalysis[2], Scikit-Learn[2], DataViz[2]

    (3, "React Masterclass", "Advanced React patterns, hooks, and state management",
     "Workshop", "2026-10-05", 12, 4, 40,
     [(3, 2), (7, 2)],  # requires JS[2], HTML/CSS[2]
     [(24, 3), (8, 2), (28, 2)]),  # teaches React[3], TypeScript[2], UI/UX[2]

    (4, "Cloud Deployment on AWS Seminar", "Deploy applications on AWS: EC2, Lambda, S3",
     "Seminar", "2026-11-01", 6, 3, 80,
     [(1, 1)],  # requires Python[1]
     [(20, 2), (30, 2), (44, 2)]),  # teaches Cloud[2], Docker[2], Model Deployment[2]

    (5, "Intro to Machine Learning", "Beginner-friendly ML workshop with hands-on exercises",
     "Workshop", "2026-09-15", 12, 4, 60,
     [(1, 1)],  # requires Python[1]
     [(9, 2), (15, 2), (17, 2)]),  # teaches ML[2], Scikit-Learn[2], Stats[2]

    (6, "Cybersecurity CTF Challenge", "Capture-the-flag competition for all skill levels",
     "Workshop", "2026-10-25", 8, 0, 100,
     [(32, 1)],  # requires Linux[1]
     [(35, 2), (42, 3), (40, 2)]),  # teaches Cybersecurity[2], Problem Solving[3], Teamwork[2]

    (7, "UX Design Sprint", "2-day design thinking and prototyping workshop",
     "Workshop", "2026-10-10", 16, 0, 35,
     [],  # no prereqs
     [(28, 3), (37, 2), (47, 2)]),  # teaches UI/UX[3], PM[2], Presentation[2]

    (8, "DevOps Bootcamp", "Docker, Kubernetes, and CI/CD pipelines in practice",
     "Bootcamp", "2026-11-15", 24, 8, 40,
     [(32, 2), (31, 2)],  # requires Linux[2], Git[2]
     [(30, 3), (33, 3), (20, 2)]),  # teaches Docker[3], CI/CD[3], Cloud[2]

    (9, "Big Data with Spark and Databricks", "Process large datasets using Apache Spark",
     "Workshop", "2026-11-20", 12, 4, 45,
     [(1, 2), (5, 2)],  # requires Python[2], SQL[2]
     [(19, 3), (21, 3), (22, 2)]),  # teaches Spark[3], Databricks[3], Data Engineering[2]

    (10, "Startup Pitch Night", "Learn to pitch your startup idea to investors",
     "Seminar", "2026-10-20", 4, 0, 100,
     [],  # no prereqs
     [(38, 3), (47, 3), (41, 2)]),  # teaches Speaking[3], Presentation[3], Leadership[2]

    (11, "Deep Learning with PyTorch", "Build neural networks using PyTorch framework",
     "Workshop", "2026-11-05", 16, 4, 40,
     [(1, 3), (9, 2)],  # requires Python[3], ML[2]
     [(10, 3), (14, 3), (12, 2)]),  # teaches DL[3], PyTorch[3], CV[2]

    (12, "REST API Design Patterns", "Design scalable and maintainable REST APIs",
     "Seminar", "2026-09-25", 6, 0, 60,
     [(31, 1)],  # requires Git[1]
     [(26, 3), (43, 2)]),  # teaches REST[3], Agile[2]

    (13, "IoT Hands-On Lab", "Build IoT prototypes with Arduino and Raspberry Pi",
     "Workshop", "2026-10-30", 12, 4, 30,
     [(49, 1)],  # requires Circuits[1]
     [(34, 3), (1, 2), (50, 2)]),  # teaches IoT[3], Python[2], Sensor Data[2]

    (14, "Technical Writing Workshop", "Write clear documentation, blogs, and research papers",
     "Workshop", "2026-09-18", 8, 0, 50,
     [],  # no prereqs
     [(39, 3), (47, 2), (45, 2)]),  # teaches Tech Writing[3], Presentation[2], Research Methods[2]

    (15, "NLP with Transformers Seminar", "Latest advances in NLP: BERT, GPT, and beyond",
     "Seminar", "2026-11-10", 6, 3, 50,
     [(1, 2), (9, 2)],  # requires Python[2], ML[2]
     [(11, 3), (10, 2), (13, 2)]),  # teaches NLP[3], DL[2], TensorFlow[2]

    (16, "Mobile App Development Workshop", "Build cross-platform apps with React Native",
     "Workshop", "2026-10-08", 12, 4, 40,
     [(3, 2)],  # requires JS[2]
     [(29, 3), (24, 2), (28, 2)]),  # teaches Mobile Dev[3], React[2], UI/UX[2]

    (17, "Data Engineering on Databricks", "Build production ETL pipelines on Databricks",
     "Workshop", "2026-11-25", 16, 4, 35,
     [(1, 2), (5, 3)],  # requires Python[2], SQL[3]
     [(22, 3), (23, 3), (21, 3)]),  # teaches Data Engineering[3], ETL[3], Databricks[3]

    (18, "Agile & Scrum Workshop", "Practice agile methodologies and scrum ceremonies",
     "Workshop", "2026-09-22", 8, 0, 60,
     [],  # no prereqs
     [(43, 3), (40, 2), (41, 2)]),  # teaches Agile[3], Teamwork[2], Leadership[2]

    (19, "Blockchain Development Bootcamp", "Build smart contracts on Ethereum and Solana",
     "Bootcamp", "2026-12-01", 24, 8, 30,
     [(3, 2)],  # requires JS[2]
     [(36, 3), (35, 2), (30, 2)]),  # teaches Blockchain[3], Cybersecurity[2], Docker[2]

    (20, "Research Methodology Seminar", "How to conduct and publish academic research",
     "Seminar", "2026-09-28", 6, 0, 80,
     [],  # no prereqs
     [(45, 3), (39, 2), (17, 2)]),  # teaches Research Methods[3], Tech Writing[2], Stats[2]
]


# ============================================================
# FACULTY — 12 faculty members
# ============================================================
FACULTY = [
    (1, "Dr. Rajesh Kumar", "CSE", "Natural Language Processing", "rajesh.kumar@university.edu"),
    (2, "Dr. Sunita Sharma", "CSE", "Computer Vision", "sunita.sharma@university.edu"),
    (3, "Dr. Amit Patel", "CSE", "Distributed Systems", "amit.patel@university.edu"),
    (4, "Dr. Priya Nair", "MATH", "Predictive Analytics", "priya.nair@university.edu"),
    (5, "Dr. Vikram Reddy", "ECE", "IoT & Embedded Systems", "vikram.reddy@university.edu"),
    (6, "Dr. Kavita Singh", "CSE", "Cybersecurity", "kavita.singh@university.edu"),
    (7, "Dr. Arjun Desai", "CSE", "Machine Learning", "arjun.desai@university.edu"),
    (8, "Dr. Meera Gupta", "IT", "Cloud Computing", "meera.gupta@university.edu"),
    (9, "Dr. Sanjay Iyer", "CSE", "Data Engineering", "sanjay.iyer@university.edu"),
    (10, "Dr. Rekha Menon", "MBA", "Product Strategy", "rekha.menon@university.edu"),
    (11, "Dr. Deepak Joshi", "ECE", "Robotics", "deepak.joshi@university.edu"),
    (12, "Dr. Anita Rao", "CSE", "Deep Learning", "anita.rao@university.edu"),
]


# ============================================================
# RESEARCH — 15 research opportunities
# ============================================================
RESEARCH = [
    # (id, title, desc, faculty_id, weekly_hrs, dur_weeks, positions, min_year,
    #  requires, teaches)

    (1, "NLP for Indian Languages", "Build NLP models for Hindi, Tamil, and Telugu text processing",
     1, 8, 16, 2, 2,
     [(1, 3), (9, 2), (11, 1)],  # requires Python[3], ML[2], NLP[1]
     [(11, 4), (10, 3), (45, 3), (13, 3)]),  # teaches NLP[4], DL[3], Research Methods[3], TensorFlow[3]

    (2, "Autonomous Drone Navigation", "Computer vision for drone obstacle avoidance",
     2, 10, 20, 2, 3,
     [(1, 3), (12, 2), (10, 2)],  # requires Python[3], CV[2], DL[2]
     [(12, 4), (14, 3), (45, 3)]),  # teaches CV[4], PyTorch[3], Research Methods[3]

    (3, "Distributed Database Optimization", "Performance tuning for distributed NoSQL systems",
     3, 6, 12, 3, 3,
     [(2, 3), (5, 3), (32, 2)],  # requires Java[3], SQL[3], Linux[2]
     [(19, 3), (22, 3), (45, 3)]),  # teaches Spark[3], Data Engineering[3], Research Methods[3]

    (4, "Predictive Student Outcomes", "ML models to predict student academic performance",
     4, 6, 12, 2, 2,
     [(1, 2), (17, 3), (16, 2)],  # requires Python[2], Stats[3], DataAnalysis[2]
     [(9, 3), (15, 3), (45, 3), (18, 2)]),  # teaches ML[3], Scikit-Learn[3], Research Methods[3], DataViz[2]

    (5, "Smart Campus IoT Network", "Large-scale IoT sensor network for campus monitoring",
     5, 8, 16, 2, 2,
     [(4, 2), (34, 2), (49, 2)],  # requires C++[2], IoT[2], Circuits[2]
     [(50, 4), (34, 4), (1, 3), (45, 3)]),  # teaches Sensor Data[4], IoT[4], Python[3], Research Methods[3]

    (6, "Network Intrusion Detection using AI", "Deep learning for network security threat detection",
     6, 8, 16, 2, 3,
     [(1, 3), (9, 2), (35, 2)],  # requires Python[3], ML[2], Cybersecurity[2]
     [(10, 3), (35, 4), (45, 3)]),  # teaches DL[3], Cybersecurity[4], Research Methods[3]

    (7, "Reinforcement Learning for Robotics", "Apply RL to robot motion planning",
     7, 10, 20, 2, 3,
     [(1, 3), (9, 3), (10, 2)],  # requires Python[3], ML[3], DL[2]
     [(9, 4), (14, 3), (45, 3)]),  # teaches ML[4], PyTorch[3], Research Methods[3]

    (8, "Serverless Architecture Patterns", "Research efficient serverless computing patterns on AWS",
     8, 6, 12, 2, 2,
     [(1, 2), (20, 2), (30, 2)],  # requires Python[2], Cloud[2], Docker[2]
     [(20, 4), (33, 3), (45, 3)]),  # teaches Cloud[4], CI/CD[3], Research Methods[3]

    (9, "Real-time Data Pipeline Optimization", "Optimize streaming data pipelines using Kafka and Spark",
     9, 8, 16, 2, 3,
     [(1, 3), (5, 3), (19, 2)],  # requires Python[3], SQL[3], Spark[2]
     [(22, 4), (23, 3), (21, 3), (45, 3)]),  # teaches Data Engineering[4], ETL[3], Databricks[3], Research Methods[3]

    (10, "AI for Product Analytics", "Use ML to analyze user behavior and product metrics",
     10, 5, 10, 2, 2,
     [(1, 2), (16, 2), (37, 1)],  # requires Python[2], DataAnalysis[2], PM[1]
     [(37, 3), (9, 2), (18, 3), (45, 2)]),  # teaches PM[3], ML[2], DataViz[3], Research Methods[2]

    (11, "Swarm Robotics", "Coordinate multiple robots for collaborative tasks",
     11, 10, 20, 2, 2,
     [(4, 3), (49, 2), (34, 2)],  # requires C++[3], Circuits[2], IoT[2]
     [(34, 4), (42, 3), (45, 3), (40, 3)]),  # teaches IoT[4], Problem Solving[3], Research Methods[3], Teamwork[3]

    (12, "Generative AI for Education", "Apply LLMs and generative AI to personalized learning",
     12, 8, 16, 2, 3,
     [(1, 3), (10, 2), (11, 2)],  # requires Python[3], DL[2], NLP[2]
     [(10, 4), (11, 4), (13, 3), (45, 3)]),  # teaches DL[4], NLP[4], TensorFlow[3], Research Methods[3]

    (13, "Federated Learning for Privacy", "ML without sharing raw data across institutions",
     7, 8, 16, 2, 3,
     [(1, 3), (9, 3), (10, 2)],  # requires Python[3], ML[3], DL[2]
     [(10, 4), (44, 3), (35, 2), (45, 3)]),  # teaches DL[4], Model Deployment[3], Cybersecurity[2], Research Methods[3]

    (14, "Blockchain for Academic Credentials", "Decentralized academic credential verification",
     3, 6, 12, 2, 2,
     [(3, 3), (36, 2)],  # requires JS[3], Blockchain[2]
     [(36, 4), (35, 3), (45, 3)]),  # teaches Blockchain[4], Cybersecurity[3], Research Methods[3]

    (15, "Explainable AI for Healthcare", "Make ML model decisions interpretable for clinicians",
     12, 8, 16, 2, 3,
     [(1, 3), (9, 2), (17, 2)],  # requires Python[3], ML[2], Stats[2]
     [(9, 4), (46, 3), (45, 3), (18, 3)]),  # teaches ML[4], E2E ML[3], Research Methods[3], DataViz[3]
]


# ============================================================
# HACKATHONS — 10 hackathons
# ============================================================
HACKATHONS = [
    # (id, title, desc, theme, date, dur_hrs, team_min, team_max, prize,
    #  requires, teaches)

    (1, "DataHack 2026", "48-hour data science and ML hackathon",
     "AI/ML", "2026-11-15", 48, 2, 4, "₹1,00,000 + Internship offers",
     [(1, 2), (9, 2)],  # requires Python[2], ML[2]
     [(46, 3), (40, 3), (47, 3)]),  # teaches E2E ML[3], Teamwork[3], Presentation[3]

    (2, "WebCraft Hackathon", "Build innovative web applications in 24 hours",
     "Web Dev", "2026-10-20", 24, 2, 4, "₹75,000 + Cloud credits",
     [(3, 2), (7, 2)],  # requires JS[2], HTML/CSS[2]
     [(24, 3), (26, 3), (40, 3)]),  # teaches React[3], REST[3], Teamwork[3]

    (3, "IoT Innovation Challenge", "Build IoT solutions for campus problems",
     "IoT", "2026-12-05", 36, 2, 4, "₹80,000 + Hardware kits",
     [(34, 2), (1, 1)],  # requires IoT[2], Python[1]
     [(34, 3), (50, 3), (40, 3), (42, 3)]),  # teaches IoT[3], Sensor Data[3], Teamwork[3], Problem Solving[3]

    (4, "CyberShield CTF", "Cybersecurity capture-the-flag competition",
     "Cybersecurity", "2026-10-28", 24, 2, 3, "₹60,000 + Security certifications",
     [(32, 2), (35, 1)],  # requires Linux[2], Cybersecurity[1]
     [(35, 3), (42, 3), (40, 2)]),  # teaches Cybersecurity[3], Problem Solving[3], Teamwork[2]

    (5, "Cloud Deploy Challenge", "Deploy scalable applications on cloud in 24 hours",
     "Cloud", "2026-11-22", 24, 2, 3, "₹50,000 + AWS credits",
     [(1, 2), (30, 1)],  # requires Python[2], Docker[1]
     [(20, 3), (33, 2), (40, 3)]),  # teaches Cloud[3], CI/CD[2], Teamwork[3]

    (6, "Startup Weekend", "From idea to prototype in 54 hours",
     "Entrepreneurship", "2026-11-08", 54, 3, 5, "₹1,50,000 + Incubation support",
     [],  # no prereqs
     [(37, 3), (38, 3), (47, 3), (40, 3)]),  # teaches PM[3], Speaking[3], Presentation[3], Teamwork[3]

    (7, "Blockchain Build", "Build decentralized applications on Ethereum/Solana",
     "Blockchain", "2026-12-12", 36, 2, 4, "₹1,00,000 + Crypto prizes",
     [(3, 2), (36, 1)],  # requires JS[2], Blockchain[1]
     [(36, 3), (30, 2), (40, 3)]),  # teaches Blockchain[3], Docker[2], Teamwork[3]

    (8, "HealthTech Hackathon", "AI solutions for healthcare challenges",
     "AI/ML", "2026-12-08", 48, 2, 4, "₹1,20,000 + Hospital partnerships",
     [(1, 2), (9, 1)],  # requires Python[2], ML[1]
     [(9, 3), (46, 2), (40, 3), (47, 2)]),  # teaches ML[3], E2E ML[2], Teamwork[3], Presentation[2]

    (9, "Data Engineering Challenge", "Build production-grade data pipelines",
     "Data Engineering", "2026-11-30", 36, 2, 3, "₹80,000 + Databricks licenses",
     [(1, 2), (5, 2)],  # requires Python[2], SQL[2]
     [(22, 3), (23, 2), (21, 2), (40, 3)]),  # teaches Data Eng[3], ETL[2], Databricks[2], Teamwork[3]

    (10, "Mobile App Jam", "Build a mobile app prototype in 24 hours",
     "Mobile", "2026-10-15", 24, 2, 4, "₹50,000 + Play Store credits",
     [(3, 2)],  # requires JS[2]
     [(29, 3), (28, 2), (40, 3)]),  # teaches Mobile Dev[3], UI/UX[2], Teamwork[3]
]


# ============================================================
# PLACEMENTS — 18 placement roles
# ============================================================
PLACEMENTS = [
    # (id, company, role, desc, package_lpa, min_year, deadline, positions,
    #  requires: [(skill_id, min_prof)])

    (1, "TechCorp India", "AI Engineer", "Build and deploy ML models for product features",
     18.0, 3, "2027-01-15", 5,
     [(1, 3), (9, 3), (13, 2), (11, 2), (44, 2)]),  # Python[3], ML[3], TensorFlow[2], NLP[2], Model Deploy[2]

    (2, "DataMinds Analytics", "Data Scientist", "Statistical modeling and data analysis for business insights",
     15.0, 3, "2027-01-20", 8,
     [(1, 3), (9, 2), (17, 3), (16, 3), (18, 2)]),  # Python[3], ML[2], Stats[3], DataAnalysis[3], DataViz[2]

    (3, "WebNova Solutions", "Full Stack Developer", "Build scalable web applications using React and Node.js",
     12.0, 3, "2027-02-01", 10,
     [(3, 3), (24, 3), (25, 2), (26, 3), (5, 2)]),  # JS[3], React[3], Node.js[2], REST[3], SQL[2]

    (4, "CloudFirst Technologies", "Cloud Engineer", "Design and manage cloud infrastructure on AWS",
     16.0, 3, "2027-01-25", 6,
     [(1, 3), (20, 3), (30, 2), (32, 3), (33, 2)]),  # Python[3], Cloud[3], Docker[2], Linux[3], CI/CD[2]

    (5, "SecureNet Systems", "Security Analyst", "Conduct security assessments and build defense systems",
     14.0, 3, "2027-02-10", 4,
     [(1, 2), (35, 3), (32, 3), (42, 3)]),  # Python[2], Cybersecurity[3], Linux[3], Problem Solving[3]

    (6, "InnoBot Robotics", "IoT Engineer", "Design and deploy IoT solutions for smart buildings",
     13.0, 3, "2027-01-30", 5,
     [(4, 2), (34, 3), (50, 2), (1, 2)]),  # C++[2], IoT[3], Sensor Data[2], Python[2]

    (7, "FinTech Global", "Backend Developer", "Build high-throughput financial transaction systems",
     16.5, 3, "2027-02-05", 6,
     [(2, 3), (5, 3), (26, 3), (30, 2), (32, 2)]),  # Java[3], SQL[3], REST[3], Docker[2], Linux[2]

    (8, "AppWorks Mobile", "Mobile Developer", "Develop cross-platform mobile applications",
     11.0, 3, "2027-02-15", 8,
     [(3, 3), (29, 3), (24, 2), (28, 2)]),  # JS[3], Mobile Dev[3], React[2], UI/UX[2]

    (9, "DataPipe Systems", "Data Engineer", "Build and maintain large-scale data pipelines",
     17.0, 3, "2027-01-28", 4,
     [(1, 3), (5, 3), (22, 3), (19, 2), (23, 2)]),  # Python[3], SQL[3], Data Eng[3], Spark[2], ETL[2]

    (10, "QuantumLeap AI", "ML Research Engineer", "Research and develop novel ML algorithms",
     22.0, 4, "2027-01-10", 3,
     [(1, 4), (9, 3), (10, 3), (14, 2), (45, 2)]),  # Python[4], ML[3], DL[3], PyTorch[2], Research Methods[2]

    (11, "ProductHive", "Associate Product Manager", "Drive product strategy and user experience",
     14.0, 3, "2027-02-20", 5,
     [(37, 3), (16, 2), (28, 2), (38, 2), (43, 2)]),  # PM[3], DataAnalysis[2], UI/UX[2], Speaking[2], Agile[2]

    (12, "ChainLogic", "Blockchain Developer", "Build decentralized applications and smart contracts",
     15.0, 3, "2027-02-25", 3,
     [(3, 3), (36, 3), (35, 2), (30, 2)]),  # JS[3], Blockchain[3], Cybersecurity[2], Docker[2]

    (13, "DevOpsHub", "DevOps Engineer", "Automate infrastructure and deployment pipelines",
     15.5, 3, "2027-02-08", 5,
     [(32, 3), (30, 3), (33, 3), (1, 2), (20, 2)]),  # Linux[3], Docker[3], CI/CD[3], Python[2], Cloud[2]

    (14, "DesignStudio", "UX Designer", "Create intuitive user experiences through research and design",
     11.5, 3, "2027-02-28", 4,
     [(28, 3), (47, 3), (37, 2), (40, 2)]),  # UI/UX[3], Presentation[3], PM[2], Teamwork[2]

    (15, "MegaCorp Software", "Software Engineer", "General software engineering across the stack",
     14.0, 3, "2027-01-20", 15,
     [(1, 2), (5, 2), (31, 3), (42, 3), (40, 2)]),  # Python[2], SQL[2], Git[3], Problem Solving[3], Teamwork[2]

    (16, "NeuralTech Labs", "Computer Vision Engineer", "Build CV systems for autonomous vehicles",
     20.0, 4, "2027-01-15", 3,
     [(1, 3), (12, 3), (10, 3), (14, 2)]),  # Python[3], CV[3], DL[3], PyTorch[2]

    (17, "SmartData Inc.", "Business Analyst", "Translate business needs into data-driven insights",
     10.0, 3, "2027-03-01", 8,
     [(5, 2), (16, 3), (18, 2), (38, 2), (43, 2)]),  # SQL[2], DataAnalysis[3], DataViz[2], Speaking[2], Agile[2]

    (18, "TechCorp India", "Data Platform Engineer", "Build and scale data platforms on Databricks",
     19.0, 3, "2027-01-18", 4,
     [(1, 3), (5, 3), (21, 3), (22, 3), (19, 2)]),  # Python[3], SQL[3], Databricks[3], Data Eng[3], Spark[2]
]


# ============================================================
# GENERATOR FUNCTIONS
# ============================================================

def generate_skills():
    """Generate skills DataFrame."""
    data = [{"skill_id": s[0], "skill_name": s[1], "category": s[2], "difficulty_level": s[3]}
            for s in SKILLS]
    return pd.DataFrame(data)


def generate_projects():
    """Generate projects and project_skills DataFrames."""
    projects = []
    project_skills = []

    for p in PROJECTS:
        pid, title, desc, diff, hrs, dur, status, members, requires, teaches = p
        projects.append({
            "project_id": pid,
            "title": title,
            "description": desc,
            "difficulty": diff,
            "weekly_hours": hrs,
            "duration_weeks": dur,
            "status": status,
            "max_members": members
        })
        for skill_id, prof in requires:
            project_skills.append({
                "project_id": pid,
                "skill_id": skill_id,
                "relation_type": "requires",
                "proficiency_level": prof
            })
        for skill_id, prof in teaches:
            project_skills.append({
                "project_id": pid,
                "skill_id": skill_id,
                "relation_type": "teaches",
                "proficiency_level": prof
            })

    return pd.DataFrame(projects), pd.DataFrame(project_skills)


def generate_clubs():
    """Generate clubs and club_skills DataFrames."""
    clubs = []
    club_skills = []

    for c in CLUBS:
        cid, name, desc, focus, hrs, day, requires, teaches = c
        clubs.append({
            "club_id": cid,
            "name": name,
            "description": desc,
            "focus_area": focus,
            "weekly_hours": hrs,
            "meeting_day": day
        })
        for skill_id, prof in requires:
            club_skills.append({
                "club_id": cid,
                "skill_id": skill_id,
                "relation_type": "requires",
                "proficiency_level": prof
            })
        for skill_id, prof in teaches:
            club_skills.append({
                "club_id": cid,
                "skill_id": skill_id,
                "relation_type": "teaches",
                "proficiency_level": prof
            })

    return pd.DataFrame(clubs), pd.DataFrame(club_skills)


def generate_events():
    """Generate events and event_skills DataFrames."""
    events = []
    event_skills = []

    for e in EVENTS:
        eid, title, desc, etype, dt, dur_hrs, wkly_hrs, cap, requires, teaches = e
        events.append({
            "event_id": eid,
            "title": title,
            "description": desc,
            "event_type": etype,
            "date": dt,
            "duration_hours": dur_hrs,
            "weekly_hours": wkly_hrs,
            "capacity": cap
        })
        for skill_id, prof in requires:
            event_skills.append({
                "event_id": eid,
                "skill_id": skill_id,
                "relation_type": "requires",
                "proficiency_level": prof
            })
        for skill_id, prof in teaches:
            event_skills.append({
                "event_id": eid,
                "skill_id": skill_id,
                "relation_type": "teaches",
                "proficiency_level": prof
            })

    return pd.DataFrame(events), pd.DataFrame(event_skills)


def generate_faculty():
    """Generate faculty DataFrame."""
    data = [{"faculty_id": f[0], "name": f[1], "department": f[2],
             "research_area": f[3], "email": f[4]} for f in FACULTY]
    return pd.DataFrame(data)


def generate_research():
    """Generate research and research_skills DataFrames."""
    research = []
    research_skills = []

    for r in RESEARCH:
        rid, title, desc, fac_id, hrs, dur, positions, min_yr, requires, teaches = r
        research.append({
            "research_id": rid,
            "title": title,
            "description": desc,
            "faculty_id": fac_id,
            "weekly_hours": hrs,
            "duration_weeks": dur,
            "open_positions": positions,
            "min_year": min_yr
        })
        for skill_id, prof in requires:
            research_skills.append({
                "research_id": rid,
                "skill_id": skill_id,
                "relation_type": "requires",
                "proficiency_level": prof
            })
        for skill_id, prof in teaches:
            research_skills.append({
                "research_id": rid,
                "skill_id": skill_id,
                "relation_type": "teaches",
                "proficiency_level": prof
            })

    return pd.DataFrame(research), pd.DataFrame(research_skills)


def generate_hackathons():
    """Generate hackathons and hackathon_skills DataFrames."""
    hackathons = []
    hackathon_skills = []

    for h in HACKATHONS:
        hid, title, desc, theme, dt, dur, t_min, t_max, prize, requires, teaches = h
        hackathons.append({
            "hackathon_id": hid,
            "title": title,
            "description": desc,
            "theme": theme,
            "date": dt,
            "duration_hours": dur,
            "team_size_min": t_min,
            "team_size_max": t_max,
            "prize_pool": prize
        })
        for skill_id, prof in requires:
            hackathon_skills.append({
                "hackathon_id": hid,
                "skill_id": skill_id,
                "relation_type": "requires",
                "proficiency_level": prof
            })
        for skill_id, prof in teaches:
            hackathon_skills.append({
                "hackathon_id": hid,
                "skill_id": skill_id,
                "relation_type": "teaches",
                "proficiency_level": prof
            })

    return pd.DataFrame(hackathons), pd.DataFrame(hackathon_skills)


def generate_placements():
    """Generate placements and placement_skills DataFrames."""
    placements = []
    placement_skills = []

    for p in PLACEMENTS:
        pid, company, role, desc, pkg, min_yr, deadline, positions, requires = p
        placements.append({
            "placement_id": pid,
            "company": company,
            "role": role,
            "description": desc,
            "package_lpa": pkg,
            "min_year": min_yr,
            "application_deadline": deadline,
            "positions_available": positions
        })
        for skill_id, min_prof in requires:
            placement_skills.append({
                "placement_id": pid,
                "skill_id": skill_id,
                "relation_type": "requires",
                "min_proficiency": min_prof
            })

    return pd.DataFrame(placements), pd.DataFrame(placement_skills)


# ============================================================
# MAIN — Generate all data and save to CSV
# ============================================================
def main():
    print("=" * 60)
    print("Campus Opportunity Radar — Synthetic Data Generator")
    print("=" * 60)

    # Generate all DataFrames
    print("\n📊 Generating data...")

    skills_df = generate_skills()
    print(f"  ✅ Skills: {len(skills_df)} rows")

    students_df, student_skills_df = generate_students()
    print(f"  ✅ Students: {len(students_df)} rows")
    print(f"  ✅ Student Skills: {len(student_skills_df)} rows")

    projects_df, project_skills_df = generate_projects()
    print(f"  ✅ Projects: {len(projects_df)} rows")
    print(f"  ✅ Project Skills: {len(project_skills_df)} rows")

    clubs_df, club_skills_df = generate_clubs()
    print(f"  ✅ Clubs: {len(clubs_df)} rows")
    print(f"  ✅ Club Skills: {len(club_skills_df)} rows")

    events_df, event_skills_df = generate_events()
    print(f"  ✅ Events: {len(events_df)} rows")
    print(f"  ✅ Event Skills: {len(event_skills_df)} rows")

    faculty_df = generate_faculty()
    print(f"  ✅ Faculty: {len(faculty_df)} rows")

    research_df, research_skills_df = generate_research()
    print(f"  ✅ Research: {len(research_df)} rows")
    print(f"  ✅ Research Skills: {len(research_skills_df)} rows")

    hackathons_df, hackathon_skills_df = generate_hackathons()
    print(f"  ✅ Hackathons: {len(hackathons_df)} rows")
    print(f"  ✅ Hackathon Skills: {len(hackathon_skills_df)} rows")

    placements_df, placement_skills_df = generate_placements()
    print(f"  ✅ Placements: {len(placements_df)} rows")
    print(f"  ✅ Placement Skills: {len(placement_skills_df)} rows")

    # Save to CSV
    print(f"\n💾 Saving CSVs to {OUTPUT_DIR}...")

    all_dfs = {
        "students": students_df,
        "skills": skills_df,
        "student_skills": student_skills_df,
        "projects": projects_df,
        "project_skills": project_skills_df,
        "clubs": clubs_df,
        "club_skills": club_skills_df,
        "events": events_df,
        "event_skills": event_skills_df,
        "faculty": faculty_df,
        "research": research_df,
        "research_skills": research_skills_df,
        "hackathons": hackathons_df,
        "hackathon_skills": hackathon_skills_df,
        "placements": placements_df,
        "placement_skills": placement_skills_df,
    }

    total_rows = 0
    for name, df in all_dfs.items():
        filepath = os.path.join(OUTPUT_DIR, f"{name}.csv")
        df.to_csv(filepath, index=False)
        total_rows += len(df)
        print(f"  💾 {name}.csv ({len(df)} rows)")

    print(f"\n{'=' * 60}")
    print(f"✅ COMPLETE: {len(all_dfs)} CSV files, {total_rows} total rows")
    print(f"📁 Output: {OUTPUT_DIR}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()

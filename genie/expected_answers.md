# Expected Answers — Campus Opportunity Radar

> **Expected reasoning traces and outputs for the golden demo questions.**
> Use these to validate that Genie is working correctly.

---

## Q1: The Golden Question (Arjun → AI Engineer)

### Expected Reasoning Chain
1. Look up Arjun Mehta (student_id=1): 2nd year, CSE, goal=AI Engineer, 15 hrs/week
2. Get current skills: Java[3], SQL[3], Git[2], Linux[2], Problem Solving[2]
3. Find AI Engineer placements → TechCorp AI Engineer (placement_id=1)
4. Required skills: Python[3], ML[3], TensorFlow[2], NLP[2], Model Deployment[2]
5. Skill gaps: Python (missing), ML (missing), TensorFlow (missing), NLP (missing), Model Deployment (missing)
6. Find opportunities that teach these skills, check prerequisites

### Expected SQL Queries (approximate)
```sql
-- Step 1: Student profile
SELECT * FROM students WHERE name = 'Arjun Mehta';

-- Step 2: Current skills
SELECT s.skill_name, ss.proficiency_level
FROM student_skills ss
JOIN skills s ON ss.skill_id = s.skill_id
WHERE ss.student_id = 1;

-- Step 3: Target role requirements
SELECT p.role, p.company, sk.skill_name, ps.min_proficiency
FROM placements p
JOIN placement_skills ps ON p.placement_id = ps.placement_id
JOIN skills sk ON ps.skill_id = sk.skill_id
WHERE p.role LIKE '%AI Engineer%';

-- Step 4: Find opportunities that teach missing skills
SELECT 'Project' as type, p.title, sk.skill_name, ps.proficiency_level
FROM projects p
JOIN project_skills ps ON p.project_id = ps.project_id
JOIN skills sk ON ps.skill_id = sk.skill_id
WHERE ps.relation_type = 'teaches'
  AND sk.skill_name IN ('Python', 'Machine Learning', 'TensorFlow', 'NLP', 'Model Deployment')
UNION ALL
SELECT 'Club', c.name, sk.skill_name, cs.proficiency_level
FROM clubs c
JOIN club_skills cs ON c.club_id = cs.club_id
JOIN skills sk ON cs.skill_id = sk.skill_id
WHERE cs.relation_type = 'teaches'
  AND sk.skill_name IN ('Python', 'Machine Learning', 'TensorFlow', 'NLP', 'Model Deployment')
-- ... similar for events, research, hackathons
```

### Expected Opportunity Path

| Step | Weeks | Opportunity | Type | Hours/wk | Skills Gained |
|------|-------|-------------|------|----------|---------------|
| 1 | 1–8 | Campus Backend API | Project | 6 | Python[2], REST APIs[3], Docker[2] |
| 2 | 3–ongoing | AI/ML Club | Club | 4 | ML[2], Statistics[2], Scikit-Learn[2] |
| 3 | 5–6 | Applied AI Workshop | Event | 4 | TensorFlow[3], Model Deployment[2], E2E ML[2] |
| 4 | 7–22 | NLP for Indian Languages | Research | 8 | NLP[4], Deep Learning[3], Research Methods[3] |
| 5 | 9–10 | DataHack 2026 | Hackathon | (weekend) | E2E ML[3], Teamwork[3], Presentation[3] |
| 6 | 12+ | TechCorp AI Engineer | Placement | — | Apply with accumulated skills |

### Expected Explanation Highlights
- "Join the Backend API Project first because it teaches Python (which you'll need for everything else) and you already have the Java and SQL prerequisites"
- "The AI/ML Club introduces Machine Learning fundamentals — you can join this alongside the project since it's only 4 hours/week"
- "The Applied AI Workshop deepens your ML knowledge with hands-on TensorFlow, which is directly required by TechCorp"
- "Prof. Kumar's NLP research is the capstone — it builds research skills and deepens NLP to level 4"
- "DataHack hackathon gives you end-to-end ML experience and teamwork skills that round out your profile"

---

## Q2: What-If — Only 5 Hours/Week

### Expected Changes from Q1
- Campus Backend API (6 hrs/wk) → **Too heavy**, suggest lighter alternatives
- Possible substitution: Peer Learning Matchmaker (3 hrs/wk) for basic Python, then Campus Chatbot (5 hrs/wk)
- AI/ML Club (4 hrs/wk) → **Still fits**
- Applied AI Workshop → **Still fits** (4 hrs/wk, temporary)
- Research (8 hrs/wk) → **Too heavy**, skip or defer
- Alternative: Attend NLP with Transformers Seminar (6 hrs total, one-time) instead of full research
- Timeline extends significantly

### Key Insight
"With only 5 hours per week, the path takes longer but is still achievable. Focus on the AI/ML Club and workshops first, then consider increasing availability for research in later semesters."

---

## Q3: What-If — Already Knows Python

### Expected Changes from Q1
- Skip Backend API Project (was mainly for learning Python)
- Go directly to AI/ML Club + Intro to ML Workshop
- Path compresses by ~8 weeks
- Can start with more advanced opportunities sooner

---

## Q4: What-If — Data Scientist Instead

### Expected Changes
- Different target: DataMinds Analytics Data Scientist (placement_id=2)
- Required skills: Python[3], ML[2], Statistics[3], Data Analysis[3], Data Visualization[2]
- Different path: Data Analytics Club → Python Bootcamp → Predictive Analytics Research → Data Engineering Challenge
- Arjun's SQL[3] becomes more directly useful here

---

## Q5: Skills for TechCorp AI Engineer

### Expected Output
| Required Skill | Min Proficiency | Opportunities That Teach It |
|---------------|-----------------|---------------------------|
| Python | 3 | Backend API Project, Python Bootcamp, Multiple clubs |
| Machine Learning | 3 | AI/ML Club, Intro to ML Workshop, Recommendation Engine |
| TensorFlow | 2 | Applied AI Workshop, NLP Summarizer Project |
| NLP | 2 | NLP Research, Campus Chatbot, NLP Transformers Seminar |
| Model Deployment | 2 | Applied AI Workshop, Cloud Deployment Seminar |

---

## Q8: Priya → Product Manager

### Expected Path
| Step | Opportunity | Type | Skills Gained |
|------|-------------|------|---------------|
| 1 | Design Thinking Lab | Club | UI/UX[3], PM[2], Presentation[2] |
| 2 | UX Design Sprint | Event | UI/UX[3], PM[2], Presentation[2] |
| 3 | Entrepreneurship Cell | Club | PM[3], Speaking[3], Leadership[2] |
| 4 | Startup Weekend | Hackathon | PM[3], Speaking[3], Presentation[3] |
| 5 | AI for Product Analytics Research | Research | PM[3], ML[2], DataViz[3] |
| 6 | ProductHive APM | Placement | Apply |

---

## Q12: Students for Dr. Kumar's NLP Research

### Expected SQL
```sql
SELECT s.name, s.year, s.department, 
       sk.skill_name, ss.proficiency_level
FROM students s
JOIN student_skills ss ON s.student_id = ss.student_id
JOIN skills sk ON ss.skill_id = sk.skill_id
WHERE sk.skill_id IN (
    SELECT skill_id FROM research_skills 
    WHERE research_id = 1 AND relation_type = 'requires'
)
AND ss.proficiency_level >= (
    SELECT proficiency_level FROM research_skills 
    WHERE research_id = 1 AND relation_type = 'requires' AND skill_id = ss.skill_id
)
ORDER BY s.name;
```

### Expected Result
Students who have Python[3]+, ML[2]+, and some NLP knowledge. Likely candidates: Vikram Singh (Python[3], ML[2], Stats[3]).

---

## Q15: Top In-Demand Skills

### Expected SQL
```sql
SELECT sk.skill_name, COUNT(DISTINCT ps.placement_id) as demand_count,
       COUNT(DISTINCT CASE WHEN ss.proficiency_level >= ps.min_proficiency THEN ss.student_id END) as qualified_students
FROM placement_skills ps
JOIN skills sk ON ps.skill_id = sk.skill_id
LEFT JOIN student_skills ss ON ps.skill_id = ss.skill_id
GROUP BY sk.skill_name
ORDER BY demand_count DESC
LIMIT 10;
```

### Expected Insight
Python and SQL are the most demanded skills. Soft skills like Problem Solving and Teamwork are also highly valued. Advanced skills like ML, Cloud, and Docker have fewer qualified students — indicating campus-wide skill gaps.

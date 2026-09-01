-- ============================================================
-- Campus Opportunity Radar — Full Schema Definition
-- Databricks Unity Catalog / SQL compatible
-- ============================================================

-- ===================== CORE ENTITIES ========================

CREATE TABLE IF NOT EXISTS students (
    student_id      INT PRIMARY KEY,
    name            STRING NOT NULL,
    email           STRING NOT NULL,
    year            INT NOT NULL,          -- 1, 2, 3, or 4
    department      STRING NOT NULL,       -- CSE, ECE, ME, MATH, MBA
    career_goal     STRING NOT NULL,       -- "AI Engineer", "Data Scientist", etc.
    available_hours_per_week INT NOT NULL,  -- hours for extracurriculars
    gpa             FLOAT NOT NULL         -- on 10-point scale
);

CREATE TABLE IF NOT EXISTS skills (
    skill_id        INT PRIMARY KEY,
    skill_name      STRING NOT NULL,
    category        STRING NOT NULL,       -- Programming, AI/ML, Data, Web, Soft Skills, Domain, Cloud, DevOps
    difficulty_level INT NOT NULL           -- 1=easy to 5=very hard
);

CREATE TABLE IF NOT EXISTS student_skills (
    student_id      INT NOT NULL,
    skill_id        INT NOT NULL,
    proficiency_level INT NOT NULL,        -- 1=Awareness, 2=Beginner, 3=Intermediate, 4=Advanced, 5=Expert
    PRIMARY KEY (student_id, skill_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

-- =================== OPPORTUNITY ENTITIES ===================

CREATE TABLE IF NOT EXISTS projects (
    project_id      INT PRIMARY KEY,
    title           STRING NOT NULL,
    description     STRING NOT NULL,
    difficulty      STRING NOT NULL,       -- Beginner, Intermediate, Advanced
    weekly_hours    INT NOT NULL,
    duration_weeks  INT NOT NULL,
    status          STRING NOT NULL,       -- Open, In Progress, Completed
    max_members     INT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_skills (
    project_id      INT NOT NULL,
    skill_id        INT NOT NULL,
    relation_type   STRING NOT NULL,       -- "requires" or "teaches"
    proficiency_level INT NOT NULL,
    PRIMARY KEY (project_id, skill_id, relation_type),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE IF NOT EXISTS clubs (
    club_id         INT PRIMARY KEY,
    name            STRING NOT NULL,
    description     STRING NOT NULL,
    focus_area      STRING NOT NULL,       -- AI/ML, Web Dev, Entrepreneurship, etc.
    weekly_hours    INT NOT NULL,
    meeting_day     STRING NOT NULL
);

CREATE TABLE IF NOT EXISTS club_skills (
    club_id         INT NOT NULL,
    skill_id        INT NOT NULL,
    relation_type   STRING NOT NULL,       -- "requires" or "teaches"
    proficiency_level INT NOT NULL,
    PRIMARY KEY (club_id, skill_id, relation_type),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE IF NOT EXISTS events (
    event_id        INT PRIMARY KEY,
    title           STRING NOT NULL,
    description     STRING NOT NULL,
    event_type      STRING NOT NULL,       -- Workshop, Seminar, Bootcamp, Guest Lecture
    date            DATE NOT NULL,
    duration_hours  INT NOT NULL,
    weekly_hours    INT NOT NULL,          -- if multi-session
    capacity        INT NOT NULL
);

CREATE TABLE IF NOT EXISTS event_skills (
    event_id        INT NOT NULL,
    skill_id        INT NOT NULL,
    relation_type   STRING NOT NULL,       -- "requires" or "teaches"
    proficiency_level INT NOT NULL,
    PRIMARY KEY (event_id, skill_id, relation_type),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE IF NOT EXISTS faculty (
    faculty_id      INT PRIMARY KEY,
    name            STRING NOT NULL,
    department      STRING NOT NULL,
    research_area   STRING NOT NULL,
    email           STRING NOT NULL
);

CREATE TABLE IF NOT EXISTS research (
    research_id     INT PRIMARY KEY,
    title           STRING NOT NULL,
    description     STRING NOT NULL,
    faculty_id      INT NOT NULL,
    weekly_hours    INT NOT NULL,
    duration_weeks  INT NOT NULL,
    open_positions  INT NOT NULL,
    min_year        INT NOT NULL,          -- minimum student year
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);

CREATE TABLE IF NOT EXISTS research_skills (
    research_id     INT NOT NULL,
    skill_id        INT NOT NULL,
    relation_type   STRING NOT NULL,       -- "requires" or "teaches"
    proficiency_level INT NOT NULL,
    PRIMARY KEY (research_id, skill_id, relation_type),
    FOREIGN KEY (research_id) REFERENCES research(research_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE IF NOT EXISTS hackathons (
    hackathon_id    INT PRIMARY KEY,
    title           STRING NOT NULL,
    description     STRING NOT NULL,
    theme           STRING NOT NULL,       -- AI/ML, Web3, Social Good, etc.
    date            DATE NOT NULL,
    duration_hours  INT NOT NULL,
    team_size_min   INT NOT NULL,
    team_size_max   INT NOT NULL,
    prize_pool      STRING NOT NULL
);

CREATE TABLE IF NOT EXISTS hackathon_skills (
    hackathon_id    INT NOT NULL,
    skill_id        INT NOT NULL,
    relation_type   STRING NOT NULL,       -- "requires" or "teaches"
    proficiency_level INT NOT NULL,
    PRIMARY KEY (hackathon_id, skill_id, relation_type),
    FOREIGN KEY (hackathon_id) REFERENCES hackathons(hackathon_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE IF NOT EXISTS placements (
    placement_id    INT PRIMARY KEY,
    company         STRING NOT NULL,
    role            STRING NOT NULL,
    description     STRING NOT NULL,
    package_lpa     FLOAT NOT NULL,        -- annual package in lakhs
    min_year        INT NOT NULL,
    application_deadline DATE NOT NULL,
    positions_available INT NOT NULL
);

CREATE TABLE IF NOT EXISTS placement_skills (
    placement_id    INT NOT NULL,
    skill_id        INT NOT NULL,
    relation_type   STRING NOT NULL DEFAULT 'requires',
    min_proficiency INT NOT NULL,
    PRIMARY KEY (placement_id, skill_id),
    FOREIGN KEY (placement_id) REFERENCES placements(placement_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

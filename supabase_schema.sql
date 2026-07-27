-- Tabel Projects
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar NOT NULL,
  description text NOT NULL,
  images text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  repo_url varchar,
  demo_url varchar,
  drive_url varchar,
  lang varchar(2) DEFAULT 'id'
);

-- Tabel Experiences
CREATE TABLE experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role varchar NOT NULL,
  organization varchar NOT NULL,
  period varchar NOT NULL,
  description text[] DEFAULT '{}',
  type varchar,
  lang varchar(2) DEFAULT 'id'
);

-- Tabel Educations
CREATE TABLE educations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution varchar NOT NULL,
  degree varchar NOT NULL,
  period varchar NOT NULL,
  gpa varchar,
  thesis text,
  relevant_courses text,
  achievements text[] DEFAULT '{}',
  lang varchar(2) DEFAULT 'id'
);

-- Menambahkan RLS (Row Level Security) agar data bisa dibaca publik
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE educations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone." ON experiences FOR SELECT USING (true);
CREATE POLICY "Public educations are viewable by everyone." ON educations FOR SELECT USING (true);

-- Tabel Social Links
CREATE TABLE social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  url varchar NOT NULL,
  icon varchar NOT NULL
);

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public social links are viewable by everyone." ON social_links FOR SELECT USING (true);

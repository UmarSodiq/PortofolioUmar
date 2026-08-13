export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Experience {
  role: string;
  organization: string;
  start_period: string;
  end_period: string;
  description: string[];
  type?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  thesis: string;
  relevantCourses: string;
  achievements: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  driveUrl?: string;
}

export interface Profile {
  aboutMe: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  year: string;
  url?: string;
  description?: string;
}

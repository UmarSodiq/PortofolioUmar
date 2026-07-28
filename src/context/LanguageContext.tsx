import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const translations = {
    id: {
      navHome: 'Beranda',
      navEducation: 'Pendidikan',
      navExperience: 'Pengalaman',
      navProjects: 'Proyek',
      navSkills: 'Keterampilan',
      navPublications: 'Publikasi',
      availableForInternship: 'Tersedia untuk Magang',
      jobTitle: 'Fresh Graduate | Mathematics | Artificial Intelligence Enthusiast',
      viewExperience: 'Lihat Pengalaman',
      viewProjects: 'Lihat Proyek',
      educationTitle: 'Pendidikan',
      gpa: 'IPK',
      thesis: 'Judul Skripsi',
      relevantCourses: 'Mata Kuliah Relevan',
      achievements: 'Pencapaian',
      experienceTitle: 'Pengalaman Kerja & Organisasi',
      workExperience: 'Pengalaman Kerja/Magang',
      orgExperience: 'Pengalaman Organisasi',
      projectsTitle: 'Proyek',
      projectsDesc: 'Berikut adalah beberapa proyek yang pernah saya kerjakan. Anda dapat melihat tangkapan layar, tautan demonstrasi, serta repositori kode untuk setiap proyek di bawah ini.',
      noProjects: 'Belum ada proyek yang ditambahkan.',
      noProjects: 'Belum ada proyek yang ditambahkan.',
      noPublications: 'Belum ada publikasi yang ditambahkan.',
      swipeToView: 'Geser untuk melihat',
      noPreview: 'Pratinjau tidak tersedia',
      demo: 'Demonstrasi',
      repo: 'Repository',
      drive: 'Google Drive',
      skillsTitle: 'Keterampilan & Sertifikasi',
      skillsTab: 'Kemampuan',
      certTab: 'Pelatihan & Sertifikasi',
      madeWith: 'Dibuat dengan',
      by: 'oleh',
      copyright: 'Hak Cipta Dilindungi.',
      location: 'Magelang, Jawa Tengah',
      connectTitle: 'Mari Terhubung',
      publicationsTitle: 'Publikasi',
      publicationsDesc: 'Beberapa publikasi dan tulisan yang pernah saya buat.',
      seoTitle: 'Umar. | Analis Data & AI',
      seoDescription: 'Portofolio Umar, S1 Matematika dari UIN Sunan Kalijaga dengan fokus Analisis Data dan AI. Lihat proyek, pengalaman, dan keahlian di bidang data.',
      emailCopied: 'Email disalin ke clipboard!',
    },
    en: {
      navHome: 'Home',
      navEducation: 'Education',
      navExperience: 'Experience',
      navProjects: 'Projects',
      navSkills: 'Skills',
      navPublications: 'Publications',
      availableForInternship: 'Available for Internship',
      jobTitle: 'Fresh Graduate | Mathematics | Artificial Intelligence Enthusiast',
      viewExperience: 'View Experience',
      viewProjects: 'View Projects',
      educationTitle: 'Education',
      gpa: 'GPA',
      thesis: 'Thesis Title',
      relevantCourses: 'Relevant Courses',
      achievements: 'Achievements',
      experienceTitle: 'Work & Organization Experience',
      workExperience: 'Work/Internship Experience',
      orgExperience: 'Organization Experience',
      projectsTitle: 'Projects',
      projectsDesc: 'Here are some of the projects I have worked on. You can view screenshots, demonstration links, and code repositories for each project below.',
      noProjects: 'No projects added yet.',
      noProjects: 'No projects added yet.',
      noPublications: 'No publications added yet.',
      swipeToView: 'Swipe to view',
      noPreview: 'Preview not available',
      demo: 'Live Demo',
      repo: 'Repository',
      drive: 'Google Drive',
      skillsTitle: 'Skills & Certifications',
      skillsTab: 'Skills',
      certTab: 'Training & Certifications',
      madeWith: 'Made with',
      by: 'by',
      copyright: 'All Rights Reserved.',
      location: 'Magelang, Central Java',
      connectTitle: 'Let\'s Connect',
      publicationsTitle: 'Publications',
      publicationsDesc: 'Some of the publications and articles I have written.',
      seoTitle: 'Umar. | Data Analyst & AI',
      seoDescription: 'Portfolio of Umar, Mathematics graduate from UIN Sunan Kalijaga focusing on Data Analysis and AI. View projects, experience, and data skills.',
      emailCopied: 'Email copied to clipboard!',
    },
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['id']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

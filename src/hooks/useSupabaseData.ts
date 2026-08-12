import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Project, Experience, Education, SocialLink, Certification, SkillCategory, Profile, Publication } from '../types';
import { dummyProjects, experiences, organizations, education as staticEducation, certifications as staticCerts, skills as staticSkills, aboutMe as staticAboutMe, dummyPublications } from '../data';

const parseDate = (dateStr: string) => {
  if (!dateStr) return 0;
  
  const lowerStr = dateStr.toLowerCase();
  if (lowerStr.includes('sekarang') || lowerStr.includes('present') || lowerStr.includes('saat ini')) {
    return new Date().getTime();
  }

  const months: Record<string, number> = {
    'januari': 0, 'january': 0, 'jan': 0,
    'februari': 1, 'february': 1, 'feb': 1,
    'maret': 2, 'march': 2, 'mar': 2,
    'april': 3, 'apr': 3,
    'mei': 4, 'may': 4,
    'juni': 5, 'june': 5, 'jun': 5,
    'juli': 6, 'july': 6, 'jul': 6,
    'agustus': 7, 'august': 7, 'aug': 7,
    'september': 8, 'sep': 8,
    'oktober': 9, 'october': 9, 'oct': 9,
    'november': 10, 'nov': 10,
    'desember': 11, 'december': 11, 'dec': 11
  };

  const parts = lowerStr.trim().split(/\s+/);
  let month = 0;
  let year = 1970;

  for (const part of parts) {
    if (part.length === 4 && !isNaN(Number(part))) {
      year = Number(part);
    } else {
      const cleanPart = part.replace(/[^a-z]/g, '');
      if (months[cleanPart] !== undefined) {
        month = months[cleanPart];
      }
    }
  }

  return new Date(year, month).getTime();
};

const getSortValue = (period: string) => {
  if (!period) return 0;
  const parts = period.split(/-|–/); 
  const startDateStr = parts[0];
  const endDateStr = parts.length > 1 ? parts[1] : startDateStr;
  return parseDate(endDateStr);
};

const sortExperiences = (experiences: Experience[]) => {
  return [...experiences].sort((a, b) => getSortValue(b.period) - getSortValue(a.period));
};

import toast from 'react-hot-toast';

export function useSupabaseData() {
  const { language, t } = useLanguage();
  
  const [projects, setProjects] = useState<Project[]>(dummyProjects[language] || []);
  const [workExperiences, setWorkExperiences] = useState<Experience[]>(sortExperiences(experiences[language]));
  const [orgExperiences, setOrgExperiences] = useState<Experience[]>(sortExperiences(organizations[language]));
  const [education, setEducation] = useState<Education>(staticEducation[language]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>(staticCerts[language]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(staticSkills[language]);
  const [profile, setProfile] = useState<Profile>({ aboutMe: staticAboutMe[language] });
  const [publications, setPublications] = useState<Publication[]>(dummyPublications[language] || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set fallback immediately on language change
    setProjects(dummyProjects[language] || []);
    setWorkExperiences(sortExperiences(experiences[language]));
    setOrgExperiences(sortExperiences(organizations[language]));
    setEducation(staticEducation[language]);
    setCertifications(staticCerts[language]);
    setSkillCategories(staticSkills[language]);
    setProfile({ aboutMe: staticAboutMe[language] });
    setPublications(dummyPublications[language] || []);

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const cacheKey = `portfolio_data_${language}`;
        const cachedData = sessionStorage.getItem(cacheKey);
        
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setProfile(parsed.profile);
          setProjects(parsed.projects);
          setWorkExperiences(parsed.workExperiences);
          setOrgExperiences(parsed.orgExperiences);
          setEducation(parsed.education);
          setCertifications(parsed.certifications);
          setSkillCategories(parsed.skillCategories);
          setPublications(parsed.publications);
          setSocialLinks(parsed.socialLinks);
          setLoading(false);
          return;
        }

        let finalProfile = { aboutMe: staticAboutMe[language] };
        let finalProjects = dummyProjects[language] || [];
        let finalWork = sortExperiences(experiences[language]);
        let finalOrg = sortExperiences(organizations[language]);
        let finalEdu = staticEducation[language];
        let finalCert = staticCerts[language];
        let finalSkills = staticSkills[language];
        let finalPubs = dummyPublications[language] || [];
        let finalSocial: SocialLink[] = [
            { id: '1', name: 'LinkedIn', url: 'https://linkedin.com/in/umarsodiq', icon: 'linkedin' },
            { id: '2', name: 'GitHub', url: 'https://github.com/umarsodiq', icon: 'github' },
            { id: '3', name: 'Email', url: 'mailto:umarsodiq.work@gmail.com', icon: 'mail' },
            { id: '4', name: 'Instagram', url: 'https://instagram.com/umarsodiq', icon: 'instagram' },
        ];

        // Fetch Profile
        let { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('lang', language)
          .limit(1);
          
        if (profileError) throw profileError;
          
        if (!profileData || profileData.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackProfile } = await supabase.from('profiles').select('*').eq('lang', fallbackLang).limit(1);
          if (fallbackProfile && fallbackProfile.length > 0) profileData = fallbackProfile;
        }
        
        if (profileData && profileData.length > 0) {
          finalProfile = { aboutMe: profileData[0].about_me };
          setProfile(finalProfile);
        }

        // Fetch Projects
        let { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('lang', language);
          
        if (projectsError) throw projectsError;
          
        if (!projectsData || projectsData.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackData } = await supabase
            .from('projects')
            .select('*')
            .eq('lang', fallbackLang);
          if (fallbackData && fallbackData.length > 0) projectsData = fallbackData;
        }
          
        if (projectsData) {
          const mappedProjects = projectsData.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            images: p.images || [],
            tags: p.tags || [],
            repoUrl: p.repo_url,
            demoUrl: p.demo_url,
            driveUrl: p.drive_url
          }));
          if (mappedProjects.length > 0) {
            finalProjects = mappedProjects;
            setProjects(finalProjects);
          } else {
            finalProjects = [];
            setProjects(finalProjects);
          }
        }

        // Fetch Experiences
        let { data: expData, error: expError } = await supabase
          .from('experiences')
          .select('*')
          .eq('lang', language);
          
        if (expError) throw expError;
          
        if (!expData || expData.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackExp } = await supabase
            .from('experiences')
            .select('*')
            .eq('lang', fallbackLang);
          if (fallbackExp && fallbackExp.length > 0) expData = fallbackExp;
        }
          
        if (expData) {
          const isOrg = (t?: string) => t && (t.toLowerCase() === 'organisasi' || t.toLowerCase() === 'organization');
          const work = expData.filter(e => !isOrg(e.type));
          const org = expData.filter(e => isOrg(e.type));
          
          if (work.length > 0) {
            finalWork = sortExperiences(work as any);
            setWorkExperiences(finalWork);
          } else if (expData.length > 0) {
            finalWork = [];
            setWorkExperiences(finalWork);
          }
          
          if (org.length > 0) {
            finalOrg = sortExperiences(org as any);
            setOrgExperiences(finalOrg);
          } else if (expData.length > 0) {
            finalOrg = [];
            setOrgExperiences(finalOrg);
          }
        }

        // Fetch Education
        let { data: eduData, error: eduError } = await supabase
          .from('educations')
          .select('*')
          .eq('lang', language)
          .limit(1);
          
        if (eduError) throw eduError;
          
        if (!eduData || eduData.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackEdu } = await supabase
            .from('educations')
            .select('*')
            .eq('lang', fallbackLang)
            .limit(1);
          if (fallbackEdu && fallbackEdu.length > 0) eduData = fallbackEdu;
        }
          
        if (eduData && eduData.length > 0) {
          const dbEdu = eduData[0];
          finalEdu = {
            institution: dbEdu.institution,
            degree: dbEdu.degree,
            period: dbEdu.period,
            gpa: dbEdu.gpa || '',
            thesis: dbEdu.thesis || '',
            relevantCourses: dbEdu.relevant_courses || '',
            achievements: dbEdu.achievements || [],
          };
          setEducation(finalEdu);
        }

        // Fetch Certifications
        let { data: certData, error: certError } = await supabase
          .from('certifications')
          .select('*')
          .eq('lang', language);
          
        if (certError) throw certError;
          
        if (!certData || certData.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackCert } = await supabase.from('certifications').select('*').eq('lang', fallbackLang);
          if (fallbackCert && fallbackCert.length > 0) certData = fallbackCert;
        }
        
        if (certData && certData.length > 0) {
          finalCert = certData;
          setCertifications(finalCert);
        }

        // Fetch Skills
        let { data: skillsData, error: skillsError } = await supabase
          .from('skills')
          .select('*')
          .eq('lang', language);
          
        if (skillsError) throw skillsError;
          
        if (!skillsData || skillsData.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackSkills } = await supabase.from('skills').select('*').eq('lang', fallbackLang);
          if (fallbackSkills && fallbackSkills.length > 0) skillsData = fallbackSkills;
        }
        
        if (skillsData && skillsData.length > 0) {
          finalSkills = skillsData.map((s: any) => ({
            title: s.title,
            skills: s.items || []
          }));
          setSkillCategories(finalSkills);
        }

        // Fetch Publications
        let { data: pubData, error: pubError } = await supabase
          .from('publications')
          .select('*')
          .eq('lang', language);
          
        if (pubError) throw pubError;
          
        if (!pubData || pubData.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackPub } = await supabase.from('publications').select('*').eq('lang', fallbackLang);
          if (fallbackPub && fallbackPub.length > 0) pubData = fallbackPub;
        }
        
        if (pubData && pubData.length > 0) {
          finalPubs = pubData;
          setPublications(finalPubs);
        } else {
          finalPubs = dummyPublications[language];
          setPublications(finalPubs);
        }

        // Fetch Social Links
        const { data: socialData, error: socialError } = await supabase
          .from('social_links')
          .select('*');

        if (socialError) throw socialError;

        if (socialData && socialData.length > 0) {
          finalSocial = socialData;
          setSocialLinks(finalSocial);
        } else {
          setSocialLinks(finalSocial);
        }
        
        sessionStorage.setItem(cacheKey, JSON.stringify({
          profile: finalProfile,
          projects: finalProjects,
          workExperiences: finalWork,
          orgExperiences: finalOrg,
          education: finalEdu,
          certifications: finalCert,
          skillCategories: finalSkills,
          publications: finalPubs,
          socialLinks: finalSocial,
        }));

      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        toast.error(language === 'id' ? 'Gagal memuat data terbaru.' : 'Failed to load latest data.', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { projects, workExperiences, orgExperiences, education, certifications, skillCategories, socialLinks, profile, publications, loading };
}

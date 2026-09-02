import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { useLanguage } from '../context/LanguageContext';
import { Project, Experience, Education, SocialLink, Certification, SkillCategory, Profile, Publication } from '../types';
import { 
  dummyProjects, 
  experiences, 
  organizations, 
  education as staticEducation, 
  certifications as staticCerts, 
  skills as staticSkills, 
  aboutMe as staticAboutMe, 
  dummyPublications 
} from '../data';
import toast from 'react-hot-toast';

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

const getSortValue = (end_period: string) => {
  if (!end_period) return 0;
  return parseDate(end_period);
};

const sortExperiences = (experiences: Experience[]) => {
  return [...experiences].sort((a, b) => getSortValue(b.end_period) - getSortValue(a.end_period));
};

export function useFirebaseData() {
  const { language } = useLanguage();
  
  const [projects, setProjects] = useState<Project[]>(dummyProjects[language] || []);
  const [workExperiences, setWorkExperiences] = useState<Experience[]>(sortExperiences(experiences[language]));
  const [orgExperiences, setOrgExperiences] = useState<Experience[]>(sortExperiences(organizations[language]));
  const [education, setEducation] = useState<Education>(staticEducation[language]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: '1', name: 'LinkedIn', url: 'https://linkedin.com/in/umarsodiq', icon: 'linkedin' },
    { id: '2', name: 'GitHub', url: 'https://github.com/umarsodiq', icon: 'github' },
    { id: '3', name: 'Email', url: 'mailto:umarsodiq.work@gmail.com', icon: 'mail' },
    { id: '4', name: 'Instagram', url: 'https://instagram.com/umarsodiq', icon: 'instagram' },
  ]);
  const [certifications, setCertifications] = useState<Certification[]>(staticCerts[language]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(staticSkills[language]);
  const [profile, setProfile] = useState<Profile>({ aboutMe: staticAboutMe[language] });
  const [publications, setPublications] = useState<Publication[]>(dummyPublications[language] || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set immediate fallback on language switch
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

        // If Firebase is not configured, remain on static fallback
        if (!isFirebaseConfigured) {
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

        // Fetch Profiles
        const profileQ = query(collection(db, 'profiles'), where('lang', '==', language));
        const profileSnap = await getDocs(profileQ);
        let profileDocs = profileSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (profileDocs.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const fallbackProfileQ = query(collection(db, 'profiles'), where('lang', '==', fallbackLang));
          const fallbackProfileSnap = await getDocs(fallbackProfileQ);
          profileDocs = fallbackProfileSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        }

        if (profileDocs.length > 0) {
          finalProfile = { aboutMe: profileDocs[0].about_me };
          setProfile(finalProfile);
        }

        // Fetch Projects
        const projectsQ = query(collection(db, 'projects'), where('lang', '==', language));
        const projectsSnap = await getDocs(projectsQ);
        let projectsDocs = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (projectsDocs.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const fallbackProjQ = query(collection(db, 'projects'), where('lang', '==', fallbackLang));
          const fallbackProjSnap = await getDocs(fallbackProjQ);
          projectsDocs = fallbackProjSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        }

        if (projectsDocs.length > 0) {
          const mappedProjects = projectsDocs.map(p => ({
            id: p.id,
            title: p.title || '',
            description: p.description || '',
            images: p.images || [],
            tags: p.tags || [],
            repoUrl: p.repo_url || p.repoUrl,
            demoUrl: p.demo_url || p.demoUrl,
            driveUrl: p.drive_url || p.driveUrl
          }));
          finalProjects = mappedProjects;
          setProjects(finalProjects);
        }

        // Fetch Experiences
        const expQ = query(collection(db, 'experiences'), where('lang', '==', language));
        const expSnap = await getDocs(expQ);
        let expDocs = expSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (expDocs.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const fallbackExpQ = query(collection(db, 'experiences'), where('lang', '==', fallbackLang));
          const fallbackExpSnap = await getDocs(fallbackExpQ);
          expDocs = fallbackExpSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        }

        if (expDocs.length > 0) {
          const isOrg = (t?: string) => t && (t.toLowerCase() === 'organisasi' || t.toLowerCase() === 'organization');

          const mappedExp = expDocs.map((e: any) => {
            const periodParts = e.period ? e.period.split(/[-–]/) : [];
            return {
              ...e,
              start_period: e.start_period || (periodParts.length > 0 ? periodParts[0].trim() : ''),
              end_period: e.end_period || (periodParts.length > 1 ? periodParts[1].trim() : (e.period || ''))
            };
          });

          const work = mappedExp.filter((e: any) => !isOrg(e.type));
          const org = mappedExp.filter((e: any) => isOrg(e.type));

          if (work.length > 0) {
            finalWork = sortExperiences(work as any);
            setWorkExperiences(finalWork);
          }
          if (org.length > 0) {
            finalOrg = sortExperiences(org as any);
            setOrgExperiences(finalOrg);
          }
        }

        // Fetch Education
        const eduQ = query(collection(db, 'educations'), where('lang', '==', language));
        const eduSnap = await getDocs(eduQ);
        let eduDocs = eduSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (eduDocs.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const fallbackEduQ = query(collection(db, 'educations'), where('lang', '==', fallbackLang));
          const fallbackEduSnap = await getDocs(fallbackEduQ);
          eduDocs = fallbackEduSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        }

        if (eduDocs.length > 0) {
          const dbEdu = eduDocs[0];
          finalEdu = {
            institution: dbEdu.institution || '',
            degree: dbEdu.degree || '',
            period: dbEdu.period || '',
            gpa: dbEdu.gpa || '',
            thesis: dbEdu.thesis || '',
            relevantCourses: dbEdu.relevant_courses || dbEdu.relevantCourses || '',
            achievements: dbEdu.achievements || [],
          };
          setEducation(finalEdu);
        }

        // Fetch Certifications
        const certQ = query(collection(db, 'certifications'), where('lang', '==', language));
        const certSnap = await getDocs(certQ);
        let certDocs = certSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (certDocs.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const fallbackCertQ = query(collection(db, 'certifications'), where('lang', '==', fallbackLang));
          const fallbackCertSnap = await getDocs(fallbackCertQ);
          certDocs = fallbackCertSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        }

        if (certDocs.length > 0) {
          finalCert = certDocs;
          setCertifications(finalCert);
        }

        // Fetch Skills
        const skillsQ = query(collection(db, 'skill_categories'), where('lang', '==', language));
        const skillsSnap = await getDocs(skillsQ);
        let skillsDocs = skillsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (skillsDocs.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const fallbackSkillsQ = query(collection(db, 'skill_categories'), where('lang', '==', fallbackLang));
          const fallbackSkillsSnap = await getDocs(fallbackSkillsQ);
          skillsDocs = fallbackSkillsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        }

        if (skillsDocs.length > 0) {
          finalSkills = skillsDocs.map((s: any) => ({
            title: s.title,
            skills: s.skills || s.items || []
          }));
          setSkillCategories(finalSkills);
        }

        // Fetch Publications
        const pubQ = query(collection(db, 'publications'), where('lang', '==', language));
        const pubSnap = await getDocs(pubQ);
        let pubDocs = pubSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (pubDocs.length === 0) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const fallbackPubQ = query(collection(db, 'publications'), where('lang', '==', fallbackLang));
          const fallbackPubSnap = await getDocs(fallbackPubQ);
          pubDocs = fallbackPubSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        }

        if (pubDocs.length > 0) {
          finalPubs = pubDocs;
          setPublications(finalPubs);
        }

        // Fetch Social Links
        const socialSnap = await getDocs(collection(db, 'social_links'));
        const socialDocs = socialSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        if (socialDocs.length > 0) {
          finalSocial = socialDocs;
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
        console.warn('Could not fetch data from Firebase, using static fallback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { projects, workExperiences, orgExperiences, education, certifications, skillCategories, socialLinks, profile, publications, loading };
}

// Alias for backwards compatibility
export const useSupabaseData = useFirebaseData;
export const usePortfolioData = useFirebaseData;

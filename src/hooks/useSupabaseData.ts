import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Project, Experience, Education, SocialLink, Certification, SkillCategory, Profile, Publication } from '../types';
import { dummyProjects, experiences, organizations, education as staticEducation, certifications as staticCerts, skills as staticSkills, aboutMe as staticAboutMe, dummyPublications } from '../data';

export function useSupabaseData() {
  const { language } = useLanguage();
  
  const [projects, setProjects] = useState<Project[]>(dummyProjects[language] || []);
  const [workExperiences, setWorkExperiences] = useState<Experience[]>(experiences[language]);
  const [orgExperiences, setOrgExperiences] = useState<Experience[]>(organizations[language]);
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
    setWorkExperiences(experiences[language]);
    setOrgExperiences(organizations[language]);
    setEducation(staticEducation[language]);
    setCertifications(staticCerts[language]);
    setSkillCategories(staticSkills[language]);
    setProfile({ aboutMe: staticAboutMe[language] });
    setPublications(dummyPublications[language] || []);

    const fetchData = async () => {
      try {
        setLoading(true);
        

        // Fetch Profile
        let { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('lang', language)
          .limit(1);
          
        if (!profileError && (!profileData || profileData.length === 0)) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackProfile } = await supabase.from('profiles').select('*').eq('lang', fallbackLang).limit(1);
          if (fallbackProfile && fallbackProfile.length > 0) profileData = fallbackProfile;
        }
        
        if (!profileError && profileData && profileData.length > 0) {
          setProfile({ aboutMe: profileData[0].about_me });
        }

        // Fetch Projects
        let { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('lang', language);
          
        // Fallback to 'id' if no data found for current language
        if (!projectsError && (!projectsData || projectsData.length === 0)) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('projects')
            .select('*')
            .eq('lang', fallbackLang);
          if (!fallbackError && fallbackData && fallbackData.length > 0) {
            projectsData = fallbackData;
          }
        }
          
        if (!projectsError && projectsData) {
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
            setProjects(mappedProjects);
          } else {
            setProjects([]); // Clear dummy data if db is empty
          }
        } else {
          console.error('Projects Error:', projectsError);
        }

        // Fetch Experiences (both work and org, separated by type)
        let { data: expData, error: expError } = await supabase
          .from('experiences')
          .select('*')
          .eq('lang', language);
          
        if (!expError && (!expData || expData.length === 0)) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackExp, error: fallbackExpErr } = await supabase
            .from('experiences')
            .select('*')
            .eq('lang', fallbackLang);
          if (!fallbackExpErr && fallbackExp && fallbackExp.length > 0) {
            expData = fallbackExp;
          }
        }
          
        if (!expError && expData) {
          const isOrg = (t?: string) => t && (t.toLowerCase() === 'organisasi' || t.toLowerCase() === 'organization');
          const work = expData.filter(e => !isOrg(e.type));
          const org = expData.filter(e => isOrg(e.type));
          if (work.length > 0) {
            setWorkExperiences(work as any);
          } else if (expData.length > 0) {
            setWorkExperiences([]);
          }
          if (org.length > 0) {
            setOrgExperiences(org as any);
          } else if (expData.length > 0) {
            setOrgExperiences([]);
          }
        }

        // Fetch Education
        let { data: eduData, error: eduError } = await supabase
          .from('educations')
          .select('*')
          .eq('lang', language)
          .limit(1);
          
        if (!eduError && (!eduData || eduData.length === 0)) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackEdu, error: fallbackEduErr } = await supabase
            .from('educations')
            .select('*')
            .eq('lang', fallbackLang)
            .limit(1);
          if (!fallbackEduErr && fallbackEdu && fallbackEdu.length > 0) {
            eduData = fallbackEdu;
          }
        }
          
        if (!eduError && eduData && eduData.length > 0) {
          // Map DB columns to our interface
          const dbEdu = eduData[0];
          setEducation({
            institution: dbEdu.institution,
            degree: dbEdu.degree,
            period: dbEdu.period,
            gpa: dbEdu.gpa || '',
            thesis: dbEdu.thesis || '',
            relevantCourses: dbEdu.relevant_courses || '',
            achievements: dbEdu.achievements || [],
          });
        }

        // Fetch Certifications
        let { data: certData, error: certError } = await supabase
          .from('certifications')
          .select('*')
          .eq('lang', language);
          
        if (!certError && (!certData || certData.length === 0)) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackCert } = await supabase.from('certifications').select('*').eq('lang', fallbackLang);
          if (fallbackCert && fallbackCert.length > 0) certData = fallbackCert;
        }
        
        if (!certError && certData && certData.length > 0) {
          setCertifications(certData);
        }

        // Fetch Skills
        let { data: skillsData, error: skillsError } = await supabase
          .from('skills')
          .select('*')
          .eq('lang', language);
          
        if (!skillsError && (!skillsData || skillsData.length === 0)) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackSkills } = await supabase.from('skills').select('*').eq('lang', fallbackLang);
          if (fallbackSkills && fallbackSkills.length > 0) skillsData = fallbackSkills;
        }
        
        if (!skillsError && skillsData && skillsData.length > 0) {
          setSkillCategories(skillsData.map((s: any) => ({
            title: s.title,
            skills: s.items || []
          })));
        }


        // Fetch Publications
        let { data: pubData, error: pubError } = await supabase
          .from('publications')
          .select('*')
          .eq('lang', language);
          
        if (!pubError && (!pubData || pubData.length === 0)) {
          const fallbackLang = language === 'id' ? 'en' : 'id';
          const { data: fallbackPub } = await supabase.from('publications').select('*').eq('lang', fallbackLang);
          if (fallbackPub && fallbackPub.length > 0) pubData = fallbackPub;
        }
        
        if (!pubError && pubData && pubData.length > 0) {
          setPublications(pubData);
        } else {
          setPublications(dummyPublications[language]);
        }

        // Fetch Social Links
        const { data: socialData, error: socialError } = await supabase
          .from('social_links')
          .select('*');

        if (!socialError && socialData && socialData.length > 0) {
          setSocialLinks(socialData);
        } else {
          setSocialLinks([
            { id: '1', name: 'LinkedIn', url: 'https://linkedin.com/in/umarsodiq', icon: 'linkedin' },
            { id: '2', name: 'GitHub', url: 'https://github.com/umarsodiq', icon: 'github' },
            { id: '3', name: 'Email', url: 'mailto:umarsodiq.work@gmail.com', icon: 'mail' },
            { id: '4', name: 'Instagram', url: 'https://instagram.com/umarsodiq', icon: 'instagram' },
          ]);
        }

      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  return { projects, workExperiences, orgExperiences, education, certifications, skillCategories, socialLinks, profile, publications, loading };
}

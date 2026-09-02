import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { 
  aboutMe, 
  education, 
  experiences, 
  organizations, 
  dummyProjects, 
  certifications, 
  skills, 
  dummyPublications 
} from '../data';

export async function seedAllDataToFirestore(onProgress?: (msg: string) => void) {
  const log = (msg: string) => {
    console.log(msg);
    if (onProgress) onProgress(msg);
  };

  log('Memulai proses seeding data ke Firestore...');

  // 1. Profiles
  log('Mengunggah data Profile (id & en)...');
  await addDoc(collection(db, 'profiles'), {
    about_me: aboutMe.id,
    lang: 'id',
    created_at: serverTimestamp()
  });
  await addDoc(collection(db, 'profiles'), {
    about_me: aboutMe.en,
    lang: 'en',
    created_at: serverTimestamp()
  });

  // 2. Educations
  log('Mengunggah data Pendidikan (id & en)...');
  await addDoc(collection(db, 'educations'), {
    institution: education.id.institution,
    degree: education.id.degree,
    period: education.id.period,
    gpa: education.id.gpa,
    thesis: education.id.thesis,
    relevant_courses: education.id.relevantCourses,
    achievements: education.id.achievements,
    lang: 'id',
    created_at: serverTimestamp()
  });
  await addDoc(collection(db, 'educations'), {
    institution: education.en.institution,
    degree: education.en.degree,
    period: education.en.period,
    gpa: education.en.gpa,
    thesis: education.en.thesis,
    relevant_courses: education.en.relevantCourses,
    achievements: education.en.achievements,
    lang: 'en',
    created_at: serverTimestamp()
  });

  // 3. Experiences (Work & Organization)
  log('Mengunggah Pengalaman Kerja & Organisasi...');
  for (const exp of experiences.id) {
    await addDoc(collection(db, 'experiences'), {
      role: exp.role,
      organization: exp.organization,
      start_period: exp.start_period,
      end_period: exp.end_period,
      description: exp.description,
      type: exp.type || 'Work',
      lang: 'id',
      created_at: serverTimestamp()
    });
  }
  for (const exp of experiences.en) {
    await addDoc(collection(db, 'experiences'), {
      role: exp.role,
      organization: exp.organization,
      start_period: exp.start_period,
      end_period: exp.end_period,
      description: exp.description,
      type: exp.type || 'Work',
      lang: 'en',
      created_at: serverTimestamp()
    });
  }

  for (const org of organizations.id) {
    await addDoc(collection(db, 'experiences'), {
      role: org.role,
      organization: org.organization,
      start_period: org.start_period,
      end_period: org.end_period,
      description: org.description,
      type: 'Organisasi',
      lang: 'id',
      created_at: serverTimestamp()
    });
  }
  for (const org of organizations.en) {
    await addDoc(collection(db, 'experiences'), {
      role: org.role,
      organization: org.organization,
      start_period: org.start_period,
      end_period: org.end_period,
      description: org.description,
      type: 'Organization',
      lang: 'en',
      created_at: serverTimestamp()
    });
  }

  // 4. Projects
  log('Mengunggah Projects...');
  for (const p of dummyProjects.id) {
    await addDoc(collection(db, 'projects'), {
      title: p.title,
      description: p.description,
      images: p.images || [],
      tags: p.tags || [],
      repo_url: p.repoUrl || '',
      demo_url: p.demoUrl || '',
      drive_url: p.driveUrl || '',
      lang: 'id',
      created_at: serverTimestamp()
    });
  }
  for (const p of dummyProjects.en) {
    await addDoc(collection(db, 'projects'), {
      title: p.title,
      description: p.description,
      images: p.images || [],
      tags: p.tags || [],
      repo_url: p.repoUrl || '',
      demo_url: p.demoUrl || '',
      drive_url: p.driveUrl || '',
      lang: 'en',
      created_at: serverTimestamp()
    });
  }

  // 5. Certifications
  log('Mengunggah Sertifikasi...');
  for (const c of certifications.id) {
    await addDoc(collection(db, 'certifications'), {
      name: c.name,
      issuer: c.issuer,
      year: c.year,
      lang: 'id',
      created_at: serverTimestamp()
    });
  }
  for (const c of certifications.en) {
    await addDoc(collection(db, 'certifications'), {
      name: c.name,
      issuer: c.issuer,
      year: c.year,
      lang: 'en',
      created_at: serverTimestamp()
    });
  }

  // 6. Skills
  log('Mengunggah Kategori Skill...');
  for (const s of skills.id) {
    await addDoc(collection(db, 'skill_categories'), {
      title: s.title,
      skills: s.skills,
      lang: 'id',
      created_at: serverTimestamp()
    });
  }
  for (const s of skills.en) {
    await addDoc(collection(db, 'skill_categories'), {
      title: s.title,
      skills: s.skills,
      lang: 'en',
      created_at: serverTimestamp()
    });
  }

  // 7. Publications
  log('Mengunggah Publikasi...');
  for (const pub of dummyPublications.id) {
    await addDoc(collection(db, 'publications'), {
      title: pub.title,
      publisher: pub.publisher,
      year: pub.year,
      url: (pub as any).url || '',
      description: pub.description || '',
      lang: 'id',
      created_at: serverTimestamp()
    });
  }
  for (const pub of dummyPublications.en) {
    await addDoc(collection(db, 'publications'), {
      title: pub.title,
      publisher: pub.publisher,
      year: pub.year,
      url: (pub as any).url || '',
      description: pub.description || '',
      lang: 'en',
      created_at: serverTimestamp()
    });
  }

  // 8. Social Links
  log('Mengunggah Tautan Sosial...');
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/umarsodiq', icon: 'linkedin' },
    { name: 'GitHub', url: 'https://github.com/umarsodiq', icon: 'github' },
    { name: 'Email', url: 'mailto:umarsodiq.work@gmail.com', icon: 'mail' },
    { name: 'Instagram', url: 'https://instagram.com/umarsodiq', icon: 'instagram' },
  ];
  for (const link of socialLinks) {
    await addDoc(collection(db, 'social_links'), {
      ...link,
      lang: 'id',
      created_at: serverTimestamp()
    });
  }

  log('Semua data berhasil di-seed ke Firestore!');
}

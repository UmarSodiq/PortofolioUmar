import { Certification, Education, Experience, Project, SkillCategory } from './types';

export const aboutMe = {
  id: `Lulusan S1 Matematika UIN Sunan Kalijaga Yogyakarta dengan konsentrasi di statistika, memiliki kemampuan analisis data dan minat mendalam pada Artificial Intelligence. Senang mempelajari hal baru dan berorientasi pada detail, serta terbiasa bekerja secara adaptif dalam lingkungan yang dinamis dan penuh tantangan. Memiliki keterampilan dalam analisis dan visualisasi data, pengolahan data, desain grafis, serta kerja tim dan organisasi. Saat ini sedang mencari peluang di Program Pemagangan Nasional untuk mengembangkan kompetensi sekaligus memberikan kontribusi nyata.`,
  en: `Mathematics graduate from UIN Sunan Kalijaga Yogyakarta concentrating in statistics, possessing data analysis skills and a deep interest in Artificial Intelligence. Enjoys learning new things and is detail-oriented, as well as accustomed to working adaptively in a dynamic and challenging environment. Has skills in data analysis and visualization, data processing, graphic design, as well as teamwork and organization. Currently seeking opportunities in the National Internship Program to develop competencies while making a real contribution.`
};

export const education: Record<'id' | 'en', Education> = {
  id: {
    institution: 'Universitas Islam Negeri Sunan Kalijaga Yogyakarta',
    degree: 'S1 Matematika',
    period: 'September 2022 – Maret 2026',
    gpa: '3.54/4.00',
    thesis: 'Analisis Risiko Portofolio Saham Menggunakan Value at Risk dengan Pendekatan Extreme Value Theory dengan Studi Kasus Saham Subsektor Perbankan Periode 1 Mei 2019 – 31 Mei 2025',
    relevantCourses: 'Analisis Data, Analisis Multivariat, Analisis Regresi Terapan, Basis Data, Komputasi Statistika, Analisis Data Kategorik, Analisis Runtun Waktu, Kapita Selekta Statistika, Pengantar Matematika Aktuaria',
    achievements: [
      'Penerima Beasiswa Bank Indonesia Periode 2024 dan 2025',
      'Peneliti dan Presenter dalam International Conference on Religion, Science and Education 2025',
      'Peneliti dan Presenter dalam 2nd Forstat International Conference 2026',
      'Juara 2 Olimpiade Matematika Tingkat Nasional, University ID Educational Platform'
    ]
  },
  en: {
    institution: 'State Islamic University Sunan Kalijaga Yogyakarta',
    degree: 'Bachelor of Mathematics',
    period: 'September 2022 – March 2026',
    gpa: '3.54/4.00',
    thesis: 'Stock Portfolio Risk Analysis Using Value at Risk with Extreme Value Theory Approach: A Case Study of Banking Subsector Stocks for the Period May 1, 2019 – May 31, 2025',
    relevantCourses: 'Data Analysis, Multivariate Analysis, Applied Regression Analysis, Database, Statistical Computing, Categorical Data Analysis, Time Series Analysis, Capita Selecta of Statistics, Introduction to Actuarial Mathematics',
    achievements: [
      'Bank Indonesia Scholarship Grantee Period 2024 and 2025',
      'Researcher and Presenter at International Conference on Religion, Science and Education 2025',
      'Researcher and Presenter at 2nd Forstat International Conference 2026',
      '2nd Place in National Mathematics Olympiad, University ID Educational Platform'
    ]
  }
};

export const experiences: Record<'id' | 'en', Experience[]> = {
  id: [
    {
      role: 'Staff Seksi Verifikasi dan Akuntansi',
      organization: 'KPPN A1 Magelang',
      type: 'Magang Reguler Kementerian Keuangan Periode I Tahun 2026',
      period: 'April 2026 – Juli 2026',
      description: [
        'Membantu menyelesaikan 8 translasi Laporan Keuangan BUMD ke Kertas Kerja Excel',
        'Membuat materi presentasi untuk sosialisasi ke Satuan Kerja',
        'Mengembangkan aplikasi untuk penilaian ketepatan pengiriman Laporan Pertanggungjawaban Bendahara Satuan Kerja'
      ]
    },
    {
      role: 'Staff Multimedia',
      organization: 'UPT. PTIPD UIN Sunan Kalijaga Yogyakarta',
      type: 'Magang Paruh Waktu UPT. PTIPD 2025',
      period: 'Januari 2025 – Desember 2025',
      description: [
        'Membuat konten visual yang menarik untuk akun media sosial resmi UPT. PTIPD',
        'Membantu dokumentasi kegiatan yang diselenggarakan oleh UPT. PTIPD',
        'Membuat konten untuk website resmi UPT. PTIPD yang meningkatkan traffic website'
      ]
    },
    {
      role: 'Asisten Instruktur',
      organization: 'ITTC UIN Sunan Kalijaga Yogyakarta',
      period: 'Februari 2025 – Maret 2025',
      description: [
        'Menyiapkan serta menyusun materi pembelajaran, slide presentasi, dan modul praktik laboratorium',
        'Memberikan dukungan teknis secara one-on-one bagi peserta yang mengalami kendala',
        'Memelihara dan memastikan peralatan serta perangkat lunak laboratorium berfungsi dengan baik'
      ]
    }
  ],
  en: [
    {
      role: 'Verification and Accounting Section Staff',
      organization: 'KPPN A1 Magelang',
      type: 'Ministry of Finance Regular Internship Period I 2026',
      period: 'April 2026 – July 2026',
      description: [
        'Assisted in completing 8 translations of BUMD Financial Reports to Excel Working Papers',
        'Created presentation materials for socialization to Work Units',
        'Developed an application for assessing the timeliness of the submission of the Work Unit Treasurer\'s Accountability Report'
      ]
    },
    {
      role: 'Multimedia Staff',
      organization: 'UPT. PTIPD UIN Sunan Kalijaga Yogyakarta',
      type: 'UPT. PTIPD Part-time Internship 2025',
      period: 'January 2025 – December 2025',
      description: [
        'Created engaging visual content for UPT. PTIPD official social media accounts',
        'Assisted with documentation of activities organized by UPT. PTIPD',
        'Created content for the UPT. PTIPD official website which increased website traffic'
      ]
    },
    {
      role: 'Instructor Assistant',
      organization: 'ITTC UIN Sunan Kalijaga Yogyakarta',
      period: 'February 2025 – March 2025',
      description: [
        'Prepared and compiled learning materials, presentation slides, and laboratory practice modules',
        'Provided one-on-one technical support for participants experiencing difficulties',
        'Maintained and ensured laboratory equipment and software functioned properly'
      ]
    }
  ]
};

export const organizations: Record<'id' | 'en', Experience[]> = {
  id: [
    {
      role: 'Wakil Ketua',
      organization: 'Himpunan Mahasiswa Program Studi Matematika',
      period: 'Desember 2023 – Desember 2024',
      description: [
        'Memimpin koordinasi antar divisi dalam menjalankan 3 program kerja besar',
        'Menjadi penghubung antara mahasiswa dan program studi dalam menyampaikan aspirasi',
        'Mengevaluasi program kerja yang berhasil meningkatkan partisipasi mahasiswa hingga 50% dibanding periode sebelumnya'
      ]
    },
    {
      role: 'Staff Media dan Informasi Kreatif',
      organization: 'Generasi Baru Indonesia (GenBI)',
      period: 'Juli 2024 – Maret 2025',
      description: [
        'Membuat dan merancang konten untuk media sosial GenBI UIN Sunan Kalijaga',
        'Membantu pengelolaan dokumentasi setiap kegiatan yang dilaksanakan',
        'Membuat materi visual (poster, pamflet, banner) untuk setiap kegiatan komunitas'
      ]
    },
    {
      role: 'Staff Media dan Informasi',
      organization: 'HMPS Matematika',
      period: 'Desember 2022 – Desember 2023',
      description: [
        'Mengelola akun media sosial himpunan dari membuat konten hingga menjadwalkan unggahan',
        'Membuat desain poster dan dokumentasi acara untuk kebutuhan publikasi kegiatan himpunan',
        'Menyebarkan informasi program kerja ke mahasiswa melalui media sosial dan grup komunikasi'
      ]
    }
  ],
  en: [
    {
      role: 'Vice Chairman',
      organization: 'Mathematics Study Program Student Association',
      period: 'December 2023 – December 2024',
      description: [
        'Led coordination between divisions in carrying out 3 major work programs',
        'Acted as a liaison between students and the study program in conveying aspirations',
        'Evaluated work programs which successfully increased student participation by up to 50% compared to the previous period'
      ]
    },
    {
      role: 'Creative Media and Information Staff',
      organization: 'New Generation of Indonesia (GenBI)',
      period: 'July 2024 – March 2025',
      description: [
        'Created and designed content for GenBI UIN Sunan Kalijaga social media',
        'Assisted in managing documentation for every activity carried out',
        'Created visual materials (posters, pamphlets, banners) for all community activities'
      ]
    },
    {
      role: 'Media and Information Staff',
      organization: 'Mathematics HMPS',
      period: 'December 2022 – December 2023',
      description: [
        'Managed association social media accounts, from creating content to scheduling posts',
        'Created poster designs and event documentation for association event publication needs',
        'Disseminated work program information to students through social media and communication groups'
      ]
    }
  ]
};

export const certifications: Record<'id' | 'en', Certification[]> = {
  id: [
    { name: 'Google Data Analysis With Python', issuer: 'Google Career Certificate via Coursera', year: '2026' },
    { name: 'Google AI Course', issuer: 'Google Career Certificate via Coursera', year: '2026' },
    { name: 'Introduction to Modern AI and Data Science', issuer: 'Cisco Networking Academy', year: '2026' },
    { name: 'Productivity with AI Bootcamp', issuer: 'Kementerian Ekonomi Kreatif dan Dicoding Indonesia', year: '2026' },
    { name: 'Microsoft Elevate Training Center 2026', issuer: 'Microsoft Indonesia dan Dicoding Indonesia', year: '2026' },
    { name: 'Pelatihan dan Sertifikasi Content Creator', issuer: 'Inixindo dan Badan Nasional Serfitikasi Profesi', year: '2025' },
    { name: 'Pelatihan dan Sertifikasi Public Relation', issuer: 'Inixindo dan Badan Nasional Sertifikasi Profesi', year: '2025' },
    { name: 'Pelatihan dan Sertifikasi Digital Marketing', issuer: 'Belajarlagi.id dan Badan Nasional Sertifikasi Profesi', year: '2024' },
    { name: 'Pelatihan dan Sertifikasi TOEC', issuer: 'Center for language Development of UIN Sunan Kalijaga Yogyakarta', year: '2025' },
    { name: 'Pelatihan dan Sertifikasi ICT', issuer: 'ITTC of UIN Sunan Kalijaga Yogyakarta', year: '2022' }
  ],
  en: [
    { name: 'Google Data Analysis With Python', issuer: 'Google Career Certificate via Coursera', year: '2026' },
    { name: 'Google AI Course', issuer: 'Google Career Certificate via Coursera', year: '2026' },
    { name: 'Introduction to Modern AI and Data Science', issuer: 'Cisco Networking Academy', year: '2026' },
    { name: 'Productivity with AI Bootcamp', issuer: 'Ministry of Tourism and Creative Economy & Dicoding Indonesia', year: '2026' },
    { name: 'Microsoft Elevate Training Center 2026', issuer: 'Microsoft Indonesia & Dicoding Indonesia', year: '2026' },
    { name: 'Content Creator Training and Certification', issuer: 'Inixindo and National Professional Certification Board', year: '2025' },
    { name: 'Public Relation Training and Certification', issuer: 'Inixindo and National Professional Certification Board', year: '2025' },
    { name: 'Digital Marketing Training and Certification', issuer: 'Belajarlagi.id and National Professional Certification Board', year: '2024' },
    { name: 'TOEC Training and Certification', issuer: 'Center for language Development of UIN Sunan Kalijaga Yogyakarta', year: '2025' },
    { name: 'ICT Training and Certification', issuer: 'ITTC of UIN Sunan Kalijaga Yogyakarta', year: '2022' }
  ]
};

export const skills: Record<'id' | 'en', SkillCategory[]> = {
  id: [
    {
      title: 'Softskills',
      skills: ['Disiplin', 'Adaptif', 'Kolaboratif', 'Ketelitian', 'Kerja Sama Tim', 'Manajemen Waktu', 'Komunikasi', 'Agile Learner']
    },
    {
      title: 'Teknis',
      skills: ['R – Intermediate', 'Python – Novice', 'Data Entry', 'Data Cleaning', 'Data Visualization', 'Prompt Engineering', 'Desain Grafis', 'Digital Marketing']
    },
    {
      title: 'Software / Tools',
      skills: ['Microsoft Office (Word, Excel, PowerPoint)', 'Google Workspace (Google Sheet, Google Documents)', 'Artificial Intelligence (Gemini, Claude, ChatGPT, Google AI Studio)', 'Canva – Advanced']
    },
    {
      title: 'Bahasa',
      skills: ['Bahasa Indonesia – Advanced', 'Bahasa Inggris – Intermediate (TOEC 463)']
    }
  ],
  en: [
    {
      title: 'Softskills',
      skills: ['Discipline', 'Adaptive', 'Collaborative', 'Detail-oriented', 'Teamwork', 'Time Management', 'Communication', 'Agile Learner']
    },
    {
      title: 'Technical',
      skills: ['R – Intermediate', 'Python – Novice', 'Data Entry', 'Data Cleaning', 'Data Visualization', 'Prompt Engineering', 'Graphic Design', 'Digital Marketing']
    },
    {
      title: 'Software / Tools',
      skills: ['Microsoft Office (Word, Excel, PowerPoint)', 'Google Workspace (Google Sheet, Google Documents)', 'Artificial Intelligence (Gemini, Claude, ChatGPT, Google AI Studio)', 'Canva – Advanced']
    },
    {
      title: 'Languages',
      skills: ['Indonesian – Advanced', 'English – Intermediate (TOEC 463)']
    }
  ]
};

export const dummyProjects: Record<'id' | 'en', Project[]> = {
  id: [
    {
      id: 'proj-1',
      title: 'Aplikasi Penilaian Laporan',
      description: 'Sebuah aplikasi yang dikembangkan untuk menilai ketepatan pengiriman laporan pertanggungjawaban bendahara satuan kerja.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['Google Apps Script', 'Data Processing', 'Automation'],
      repoUrl: 'https://github.com/umarsodiq',
      demoUrl: 'https://example.com/demo1'
    },
    {
      id: 'proj-2',
      title: 'Analisis Risiko Portofolio Saham (Skripsi)',
      description: 'Analisis risiko portofolio saham menggunakan Value at Risk (VaR) dengan pendekatan Extreme Value Theory (EVT). Studi kasus pada saham subsektor perbankan periode Mei 2019 hingga Mei 2025.',
      images: [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['R', 'Data Analysis', 'Finance', 'Statistics'],
      driveUrl: 'https://drive.google.com'
    }
  ],
  en: [
    {
      id: 'proj-1',
      title: 'Report Assessment Application',
      description: 'An application developed to assess the timeliness of the submission of accountability reports by work unit treasurers.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['Google Apps Script', 'Data Processing', 'Automation'],
      repoUrl: 'https://github.com/umarsodiq',
      demoUrl: 'https://example.com/demo1'
    },
    {
      id: 'proj-2',
      title: 'Stock Portfolio Risk Analysis (Thesis)',
      description: 'Stock portfolio risk analysis using Value at Risk (VaR) with Extreme Value Theory (EVT) approach. Case study on banking subsector stocks from May 2019 to May 2025.',
      images: [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['R', 'Data Analysis', 'Finance', 'Statistics'],
      driveUrl: 'https://drive.google.com'
    }
  ]
};

export const dummyPublications = {
  id: [
    {
      id: '1',
      title: 'Contoh Publikasi',
      publisher: 'Publisher Name',
      year: '2026',
      description: 'Ini adalah contoh deskripsi publikasi. Tambahkan data publikasi Anda ke Supabase agar tampil di sini.',
    }
  ],
  en: [
    {
      id: '1',
      title: 'Example Publication',
      publisher: 'Publisher Name',
      year: '2026',
      description: 'This is an example publication description. Add your publication data to Supabase to show it here.',
    }
  ]
};

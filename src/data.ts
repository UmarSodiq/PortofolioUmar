import { Certification, Education, Experience, Project, SkillCategory, Publication } from './types';

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
      role: 'Pengembangan Mata Uang dan Produk Keamanan',
      organization: 'PERUM PERURI',
      type: 'Magang',
      start_period: 'Agustus 2026',
      end_period: 'Sekarang',
      description: []
    },
    {
      role: 'Staff Seksi Verifikasi dan Akuntansi',
      organization: 'KPPN A1 Magelang',
      type: 'Magang',
      start_period: 'April 2026',
      end_period: 'Juli 2026',
      description: [
        'Membantu menyelesaikan 8 translasi Laporan Keuangan BUMD ke Kertas Kerja Excel',
        'Membuat materi presentasi untuk sosialisasi ke Satuan Kerja',
        'Mengembangkan aplikasi untuk penilaian ketepatan pengiriman Laporan Pertanggungjawaban Bendahara Satuan Kerja'
      ]
    },
    {
      role: 'Staff Multimedia',
      organization: 'UPT. PTIPD UIN Sunan Kalijaga Yogyakarta',
      type: 'Magang Paruh Waktu',
      start_period: 'Januari 2025',
      end_period: 'Desember 2025',
      description: [
        'Membuat konten visual yang menarik untuk akun media sosial resmi UPT. PTIPD',
        'Membantu dokumentasi kegiatan yang diselenggarakan oleh UPT. PTIPD',
        'Membuat konten untuk website resmi UPT. PTIPD yang meningkatkan traffic website'
      ]
    },
    {
      role: 'Asisten Instruktur',
      organization: 'ITTC UIN Sunan Kalijaga Yogyakarta',
      type: 'Kerja',
      start_period: 'Februari 2025',
      end_period: 'Maret 2025',
      description: [
        'Menyiapkan serta menyusun materi pembelajaran, slide presentasi, dan modul praktik laboratorium',
        'Memberikan dukungan teknis secara one-on-one bagi peserta yang mengalami kendala',
        'Memelihara dan memastikan peralatan serta perangkat lunak laboratorium berfungsi dengan baik'
      ]
    }
  ],
  en: [
    {
      role: 'Currency and Security Product Development',
      organization: 'PERUM PERURI',
      type: 'Internship',
      start_period: 'August 2026',
      end_period: 'Now',
      description: []
    },
    {
      role: 'Verification and Accounting Section Staff',
      organization: 'KPPN A1 Magelang',
      type: 'Internship',
      start_period: 'April 2026',
      end_period: 'July 2026',
      description: [
        'Assisted in completing 8 translations of BUMD Financial Reports to Excel Working Papers',
        'Created presentation materials for socialization to Work Units',
        'Developed an application for assessing the timeliness of the submission of the Work Unit Treasurer\'s Accountability Report'
      ]
    },
    {
      role: 'Multimedia Staff',
      organization: 'UPT. PTIPD UIN Sunan Kalijaga Yogyakarta',
      type: 'Part Time Internship',
      start_period: 'January 2025',
      end_period: 'December 2025',
      description: [
        'Created engaging visual content for UPT. PTIPD official social media accounts',
        'Assisted with documentation of activities organized by UPT. PTIPD',
        'Created content for the UPT. PTIPD official website which increased website traffic'
      ]
    },
    {
      role: 'Instructor Assistant',
      organization: 'ITTC UIN Sunan Kalijaga Yogyakarta',
      type: 'Work',
      start_period: 'February 2025',
      end_period: 'March 2025',
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
      type: 'Organisasi',
      start_period: 'Desember 2023',
      end_period: 'Desember 2024',
      description: [
        'Memimpin koordinasi antar divisi dalam menjalankan 3 program kerja besar',
        'Menjadi penghubung antara mahasiswa dan program studi dalam menyampaikan aspirasi',
        'Mengevaluasi program kerja yang berhasil meningkatkan partisipasi mahasiswa hingga 50% dibanding periode sebelumnya'
      ]
    },
    {
      role: 'Staff Media dan Informasi Kreatif',
      organization: 'Generasi Baru Indonesia (GenBI)',
      type: 'Organisasi',
      start_period: 'Juli 2024',
      end_period: 'Maret 2025',
      description: [
        'Membuat dan merancang konten untuk media sosial GenBI UIN Sunan Kalijaga',
        'Membantu pengelolaan dokumentasi setiap kegiatan yang dilaksanakan',
        'Membuat materi visual (poster, pamflet, banner) untuk setiap kegiatan komunitas'
      ]
    },
    {
      role: 'Staff Media dan Informasi',
      organization: 'HMPS Matematika',
      type: 'Organisasi',
      start_period: 'Desember 2022',
      end_period: 'Desember 2023',
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
      type: 'Organization',
      start_period: 'December 2023',
      end_period: 'December 2024',
      description: [
        'Led coordination between divisions in carrying out 3 major work programs',
        'Acted as a liaison between students and the study program in conveying aspirations',
        'Evaluated work programs which successfully increased student participation by up to 50% compared to the previous period'
      ]
    },
    {
      role: 'Creative Media and Information Staff',
      organization: 'New Generation of Indonesia (GenBI)',
      type: 'Organization',
      start_period: 'July 2024',
      end_period: 'March 2025',
      description: [
        'Created and designed content for GenBI UIN Sunan Kalijaga social media',
        'Assisted in managing documentation for every activity carried out',
        'Created visual materials (posters, pamphlets, banners) for all community activities'
      ]
    },
    {
      role: 'Media and Information Staff',
      organization: 'Mathematics HMPS',
      type: 'Organization',
      start_period: 'December 2022',
      end_period: 'December 2023',
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
      title: 'Enterprise Architecture UPT. Pusat Teknologi Informasi dan Pangkalan Data',
      description: 'Pengembangan dan pemetaan arsitektur enterprise pada UPT. Pusat Teknologi Informasi dan Pangkalan Data. Proyek ini mencakup analisis dan desain domain utama arsitektur (Bisnis, Data, Aplikasi, dan Teknologi) menggunakan kerangka kerja standar untuk mengoptimalkan tata kelola TI dan integrasi sistem layanan digital.',
      images: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['Enterprise Architecture', 'System Analysis', 'IT Governance'],
      driveUrl: 'https://drive.google.com/file/d/1FRkIumgmiprhnQwQQDMOJVQa8CtRgiel/view'
    },
    {
      id: 'proj-2',
      title: 'Buku Kaleidoskop Bank Indonesia KPw Daerah Istimewa Yogyakarta 2025',
      description: 'Proyek penyusunan Buku Kaleidoskop untuk Bank Indonesia Kantor Perwakilan (KPw) Daerah Istimewa Yogyakarta. Buku ini merupakan dokumentasi komprehensif yang merangkum jejak langkah, program strategis, kegiatan utama, serta pencapaian Bank Indonesia KPw DIY dalam kurun waktu satu tahun.',
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['Editorial', 'Publication', 'Design', 'Bank Indonesia'],
      driveUrl: 'https://drive.google.com/file/d/1Ur-qivLyobIPIJZD6FTEQaCz1jA-I2ud/view?usp=sharing&usp=embed_facebook'
    },
    {
      id: 'proj-3',
      title: 'Aplikasi Dashbord Monitoring dan Penilaian Satker',
      description: 'Aplikasi Dashboard Monitoring dan Penilaian Satker (Seksi Verifikasi dan Akuntansi KPPN Magelang) adalah sistem manajemen, penilaian, pemantauan, dan pelaporan kepatuhan bagi Satuan Kerja (Satker) di bawah wilayah kerja KPPN Magelang. Aplikasi ini mempermudah proses evaluasi kepatuhan pajak, pengelolaan saldo kas tunai, serta penilaian kinerja bulanan secara otomatis.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['React', 'Vite', 'Tailwind CSS', 'Finance', 'Dashboard'],
      repoUrl: 'https://github.com/UmarSodiq/monitoringpenilaian',
      demoUrl: 'https://monitoringpenilaian.vercel.app/'
    },
    {
      id: 'proj-4',
      title: 'Website Portofolio',
      description: 'Website portofolio pribadi yang dibangun menggunakan React, Vite, Tailwind CSS, dan Firebase dengan bantuan Google AI Studio. Memiliki fitur mode gelap, dukungan multi-bahasa, dan konten dinamis.',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['React', 'Vite', 'Tailwind CSS', 'Firebase'],
      repoUrl: 'https://github.com/UmarSodiq/PortofolioUmar',
      demoUrl: 'https://portofolio.umarsodiq.workers.dev/'
    }
  ],
  en: [
    {
      id: 'proj-1',
      title: 'Enterprise Architecture of the Center for Information Technology and Database (UPT PTIPD)',
      description: 'Enterprise architecture development and mapping for the Center for Information Technology and Database (UPT PTIPD). This project covers the analysis and design of key architectural domains (Business, Data, Application, and Technology) to optimize IT governance and digital service integration.',
      images: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['Enterprise Architecture', 'System Analysis', 'IT Governance'],
      driveUrl: 'https://drive.google.com/file/d/1FRkIumgmiprhnQwQQDMOJVQa8CtRgiel/view'
    },
    {
      id: 'proj-2',
      title: '2025 Kaleidoscope Book of Bank Indonesia Special Region of Yogyakarta',
      description: 'The compilation project of the Kaleidoscope Book for the Bank Indonesia Representative Office of the Special Region of Yogyakarta. This book serves as comprehensive documentation summarizing the milestones, strategic programs, key activities, and achievements of Bank Indonesia Special Region of Yogyakarta within a one-year period.',
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['Editorial', 'Publication', 'Design', 'Bank Indonesia'],
      driveUrl: 'https://drive.google.com/file/d/1Ur-qivLyobIPIJZD6FTEQaCz1jA-I2ud/view?usp=sharing&usp=embed_facebook'
    },
    {
      id: 'proj-3',
      title: 'Work Unit Monitoring and Assessment Dashboard Application',
      description: 'The Work Unit Monitoring and Assessment Dashboard Application (Verification and Accounting Section of KPPN Magelang) is a management, assessment, monitoring, and compliance reporting system for Work Units (Satker) under the KPPN Magelang working area. This application streamlines the evaluation of tax compliance, cash balance management, and automated monthly performance assessments.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['React', 'Vite', 'Tailwind CSS', 'Finance', 'Dashboard'],
      repoUrl: 'https://github.com/UmarSodiq/monitoringpenilaian',
      demoUrl: 'https://monitoringpenilaian.vercel.app/'
    },
    {
      id: 'proj-4',
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with React, Vite, Tailwind CSS, and Firebase, developed with the assistance of Google AI Studio. Features dark mode, multi-language support, and dynamic content.',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      ],
      tags: ['React', 'Vite', 'Tailwind CSS', 'Firebase'],
      repoUrl: 'https://github.com/UmarSodiq/PortofolioUmar',
      demoUrl: 'https://portofolio.umarsodiq.workers.dev/'
    }
  ]
};

export const dummyPublications: Record<'id' | 'en', Publication[]> = {
  id: [
    {
      id: '1',
      title: 'Value at Risk Berbasis Extreme Value Theory untuk Estimasi Risiko Portofolio Saham: Studi Komparatif Model GEV dan GPD pada Saham Perbankan Indonesia',
      publisher: 'FORSTAT International Conference',
      year: '2026',
      url: 'https://proceeding.unram.ac.id/index.php/ficon/article/view/3695',
      description: 'Penelitian ini menganalisis risiko portofolio saham dan mengestimasi potensi kerugian pada saham subsektor perbankan Indonesia menggunakan pendekatan Value at Risk (VaR) yang diintegrasikan dengan Extreme Value Theory (EVT). Studi ini membandingkan metode Block Maxima (GEV) dan Peak Over Threshold (GPD), dengan kesimpulan bahwa model VaR-GPD lebih valid dan akurat untuk mengestimasi risiko pasar pada kondisi ekstrem.'
    },
    {
      id: '2',
      title: 'Batik Parang Harmoni Epidemi: Mathematical Modeling of Dengue Hemorrhagic Fever Transmission Incorporating Social Awareness (Analysis and Simulation)',
      publisher: 'Proceeding International Conference on Religion, Science and Education',
      year: '2026',
      url: 'https://sunankalijaga.org/prosiding/index.php/icrse/article/view/1895',
      description: 'Penelitian ini memodelkan penularan Demam Berdarah Dengue (DBD) untuk melihat dampak kesadaran sosial terhadap risiko epidemi. Hasil analisis dan simulasi menunjukkan bahwa peningkatan kesadaran masyarakat secara efektif menekan penyebaran DBD, sementara penurunan kesadaran akan memicu lonjakan infeksi dan kondisi endemik. Temuan ilmiah ini kemudian diwujudkan dalam karya seni Batik Parang Harmoni Epidemi, yang menyimbolkan pentingnya kolaborasi antara sains, perilaku sosial, dan budaya dalam mewujudkan pengendalian DBD yang berkelanjutan.'
    },
    {
      id: '3',
      title: 'Analisis Risiko Portofolio Saham Menggunakan Value at Risk (VaR) dengan Pendekatan Extreme Value Theory',
      publisher: 'Umar Sodiq di Posit Connect Cloud',
      year: '2026',
      url: 'https://umarsodiq-value-at-risk-evt.share.connect.posit.cloud/',
      description: 'Dashboard interaktif dan analisis risiko portofolio saham berbasis Posit Connect Cloud.'
    }
  ],
  en: [
    {
      id: '1',
      title: 'Extreme Value Theory-Based Value at Risk for Stock Portfolio Risk Estimation: A Comparative Study of GEV and GPD Models in Indonesian Banking Stocks',
      publisher: 'FORSTAT International Conference',
      year: '2026',
      url: 'https://proceeding.unram.ac.id/index.php/ficon/article/view/3695',
      description: 'This study analyzes stock portfolio risk and estimates potential losses in Indonesian banking stocks using Value at Risk (VaR) integrated with Extreme Value Theory (EVT). It compares the Block Maxima (GEV) and Peak Over Threshold (GPD) methods, concluding that the VaR-GPD model is the most valid and accurate approach for estimating market risk under extreme conditions.'
    },
    {
      id: '2',
      title: 'Batik Parang Harmoni Epidemi: Mathematical Modeling of Dengue Hemorrhagic Fever Transmission Incorporating Social Awareness (Analysis and Simulation)',
      publisher: 'Proceeding International Conference on Religion, Science and Education',
      year: '2026',
      url: 'https://sunankalijaga.org/prosiding/index.php/icrse/article/view/1895',
      description: 'This study models Dengue Hemorrhagic Fever (DHF) transmission to examine the impact of social awareness on epidemic risks. Analysis and simulations show that increased public awareness effectively reduces DHF spread, while declining awareness triggers infection surges and endemic conditions. These scientific findings are artistically visualized in the Batik Parang Harmoni Epidemi artwork, symbolizing the importance of integrating science, social behavior, and culture for sustainable DHF control.'
    },
    {
      id: '3',
      title: 'Analysis of Stock Portfolio Risk Using Value at Risk (VaR) and the Extreme Value Theory Approach',
      publisher: 'Umar Sodiq on Posit Connect Cloud',
      year: '2026',
      url: 'https://umarsodiq-value-at-risk-evt.share.connect.posit.cloud/',
      description: 'Interactive dashboard and stock portfolio risk analysis powered by Posit Connect Cloud.'
    }
  ]
};

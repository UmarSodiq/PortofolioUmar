import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export function DataDashboard() {
  const { t, language } = useLanguage();

  // Mock data for radar chart (Skills proficiency)
  const skillsData = [
    { subject: 'Data Analysis', A: 90, fullMark: 100 },
    { subject: 'R Programming', A: 85, fullMark: 100 },
    { subject: 'Statistics', A: 95, fullMark: 100 },
    { subject: 'Machine Learning', A: 70, fullMark: 100 },
    { subject: 'Python', A: 65, fullMark: 100 },
    { subject: 'Data Viz', A: 85, fullMark: 100 },
  ];

  // Mock data for bar chart (Activity over years)
  const activityData = [
    { name: '2022', projects: 1, certs: 1 },
    { name: '2023', projects: 2, certs: 0 },
    { name: '2024', projects: 4, certs: 2 },
    { name: '2025', projects: 3, certs: 5 },
    { name: '2026', projects: 2, certs: 3 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-black/[0.04] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colors duration-300">
      <div className="mb-10 text-center">
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-white mb-4">
          {language === 'id' ? 'Keahlian & Aktivitas' : 'Skills & Activity'}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {language === 'id' 
            ? 'Sebagai seorang analis data, saya suka mengukur perkembangan saya. Berikut adalah visualisasi sederhana dari keahlian teknis dan aktivitas saya selama beberapa tahun terakhir.'
            : 'As a data analyst, I love measuring my progress. Here is a simple visualization of my technical skills and activity over the past few years.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Radar Chart: Skills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-[400px] w-full flex flex-col items-center bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl p-6 border border-zinc-100 dark:border-white/5"
        >
          <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">
            {language === 'id' ? 'Peta Kompetensi Teknis' : 'Technical Competency Map'}
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
              <PolarGrid stroke="#a1a1aa" opacity={0.3} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Proficiency" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart: Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[400px] w-full flex flex-col items-center bg-zinc-50 dark:bg-zinc-950/50 rounded-3xl p-6 border border-zinc-100 dark:border-white/5"
        >
          <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">
            {language === 'id' ? 'Proyek & Sertifikasi per Tahun' : 'Projects & Certs per Year'}
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activityData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#a1a1aa" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a' }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(161, 161, 170, 0.1)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="projects" name={language === 'id' ? 'Proyek' : 'Projects'} fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="certs" name={language === 'id' ? 'Sertifikasi' : 'Certifications'} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
}

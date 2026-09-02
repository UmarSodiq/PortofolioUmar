import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import { seedAllDataToFirestore } from '../lib/seedFirestore';
import { 
  LogOut, LayoutDashboard, FolderKanban, Briefcase, Plus, Trash2, Edit2, Loader2,
  GraduationCap, Award, Lightbulb, BookOpen, User, Link as LinkIcon, Sparkles, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminFormModal, FieldConfig } from '../components/AdminFormModal';

type TableName = 'projects' | 'experiences' | 'educations' | 'certifications' | 'skill_categories' | 'publications' | 'profiles' | 'social_links';

const tableConfigs: Record<TableName, { title: string, icon: any, fields: FieldConfig[] }> = {
  profiles: {
    title: 'Profiles',
    icon: User,
    fields: [
      { key: 'about_me', label: 'About Me', type: 'textarea', required: true }
    ]
  },
  experiences: {
    title: 'Experiences',
    icon: Briefcase,
    fields: [
      { key: 'role', label: 'Role', type: 'text', required: true },
      { key: 'organization', label: 'Organization', type: 'text', required: true },
      { key: 'type', label: 'Type (e.g. Work, Org)', type: 'text', required: true },
      { key: 'start_period', label: 'Start Period', type: 'text', required: true },
      { key: 'end_period', label: 'End Period', type: 'text', required: true },
      { key: 'description', label: 'Description Points', type: 'array', required: true }
    ]
  },
  educations: {
    title: 'Educations',
    icon: GraduationCap,
    fields: [
      { key: 'institution', label: 'Institution', type: 'text', required: true },
      { key: 'degree', label: 'Degree', type: 'text', required: true },
      { key: 'period', label: 'Period', type: 'text', required: true },
      { key: 'gpa', label: 'GPA', type: 'text', required: true },
      { key: 'thesis', label: 'Thesis', type: 'textarea', required: true },
      { key: 'relevant_courses', label: 'Relevant Courses', type: 'textarea', required: true },
      { key: 'achievements', label: 'Achievements', type: 'array', required: true }
    ]
  },
  projects: {
    title: 'Projects',
    icon: FolderKanban,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
      { key: 'tags', label: 'Tags', type: 'array', required: true },
      { key: 'images', label: 'Images (URLs)', type: 'array', required: false },
      { key: 'repo_url', label: 'Repo URL', type: 'url', required: false },
      { key: 'demo_url', label: 'Demo URL', type: 'url', required: false },
      { key: 'drive_url', label: 'Drive URL', type: 'url', required: false }
    ]
  },
  certifications: {
    title: 'Certifications',
    icon: Award,
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'issuer', label: 'Issuer', type: 'text', required: true },
      { key: 'year', label: 'Year', type: 'text', required: true }
    ]
  },
  skill_categories: {
    title: 'Skills',
    icon: Lightbulb,
    fields: [
      { key: 'title', label: 'Category Title', type: 'text', required: true },
      { key: 'skills', label: 'Skills', type: 'array', required: true }
    ]
  },
  publications: {
    title: 'Publications',
    icon: BookOpen,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'publisher', label: 'Publisher', type: 'text', required: true },
      { key: 'year', label: 'Year', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', required: false },
      { key: 'url', label: 'URL', type: 'url', required: false }
    ]
  },
  social_links: {
    title: 'Social Links',
    icon: LinkIcon,
    fields: [
      { key: 'name', label: 'Platform Name', type: 'text', required: true },
      { key: 'icon', label: 'Icon Name (e.g. github, linkedin)', type: 'text', required: true },
      { key: 'url', label: 'URL', type: 'url', required: true }
    ]
  }
};

const tableOrder: TableName[] = [
  'profiles', 'experiences', 'educations', 'projects', 
  'certifications', 'skill_categories', 'publications', 'social_links'
];

export default function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TableName>('profiles');
  const [isSeeding, setIsSeeding] = useState(false);
  
  const [dataCache, setDataCache] = useState<Record<TableName, any[]>>({
    projects: [], experiences: [], educations: [], certifications: [],
    skill_categories: [], publications: [], profiles: [], social_links: []
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate('/login');
      } else {
        fetchAllData();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchAllData = async () => {
    if (!isFirebaseConfigured) return;
    try {
      const newCache = { ...dataCache };
      for (const table of tableOrder) {
        const snap = await getDocs(collection(db, table));
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Client-side sort by created_at desc if present
        list.sort((a: any, b: any) => {
          const timeA = a.created_at?.toMillis ? a.created_at.toMillis() : (a.created_at ? new Date(a.created_at).getTime() : 0);
          const timeB = b.created_at?.toMillis ? b.created_at.toMillis() : (b.created_at ? new Date(b.created_at).getTime() : 0);
          return timeB - timeA;
        });
        newCache[table] = list;
      }
      setDataCache(newCache);
    } catch (err: any) {
      console.error('Error fetching all Firestore data:', err);
    }
  };

  const fetchTableData = async (table: TableName) => {
    if (!isFirebaseConfigured) return;
    try {
      const snap = await getDocs(collection(db, table));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a: any, b: any) => {
        const timeA = a.created_at?.toMillis ? a.created_at.toMillis() : (a.created_at ? new Date(a.created_at).getTime() : 0);
        const timeB = b.created_at?.toMillis ? b.created_at.toMillis() : (b.created_at ? new Date(b.created_at).getTime() : 0);
        return timeB - timeA;
      });
      setDataCache(prev => ({ ...prev, [table]: list }));
    } catch (error) {
      toast.error(`Error fetching ${table}`);
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success('Signed out');
    navigate('/login');
  };

  const handleDelete = async (table: TableName, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, table, id));
      toast.success('Item deleted');
      fetchTableData(table);
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to delete item: ' + (error.message || 'Permission denied'));
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        // Update document
        const docRef = doc(db, activeTab, editingItem.id);
        await updateDoc(docRef, {
          ...formData,
          updated_at: serverTimestamp()
        });
        toast.success('Item updated successfully!');
      } else {
        // Insert new document
        await addDoc(collection(db, activeTab), {
          ...formData,
          created_at: serverTimestamp()
        });
        toast.success('Item created successfully!');
      }
      setModalOpen(false);
      fetchTableData(activeTab);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeedData = async () => {
    if (!confirm('Apakah Anda yakin ingin mengunggah seluruh data default dari data.ts ke Firestore?')) return;
    setIsSeeding(true);
    const toastId = toast.loading('Memulai seeding data ke Firestore...');
    try {
      await seedAllDataToFirestore((msg) => {
        toast.loading(msg, { id: toastId });
      });
      toast.success('Berhasil mengisi seluruh data ke Firestore!', { id: toastId });
      fetchAllData();
    } catch (err: any) {
      console.error(err);
      toast.error('Gagal melakukan seeding: ' + (err.message || 'Unknown error'), { id: toastId });
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-zinc-950 dark:text-white"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (!user) return null;

  const currentConfig = tableConfigs[activeTab];
  const currentData = dataCache[activeTab];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/5 h-screen sticky top-0 flex flex-col overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-emerald-500" />
            Admin Panel
          </h2>
          <p className="text-xs text-zinc-500 mt-1 truncate">{user.email}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 pb-4">
          {tableOrder.map(table => {
            const Icon = tableConfigs[table].icon;
            const isActive = activeTab === table;
            return (
              <button 
                key={table}
                onClick={() => setActiveTab(table)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${isActive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400'}`}
              >
                <Icon className="w-5 h-5" />
                {tableConfigs[table].title}
              </button>
            )
          })}
        </nav>

        {/* Seed Data Button */}
        <div className="p-4 border-t border-zinc-200 dark:border-white/5 space-y-2">
          <button
            onClick={handleSeedData}
            disabled={isSeeding}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Seed Default Data
          </button>

          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {!isFirebaseConfigured && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Koneksi Firebase belum lengkap di file <code className="font-mono bg-amber-500/20 px-1 py-0.5 rounded">.env</code>. Pastikan Anda mengonfigurasinya untuk menyimpan data secara live.</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">{currentConfig.title}</h1>
              <p className="text-zinc-500 text-sm mt-1">Kelola data {currentConfig.title.toLowerCase()} di Firestore</p>
            </div>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-medium cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-sm border-b border-zinc-200 dark:border-white/5">
                  <th className="px-6 py-4 font-medium">Identifier</th>
                  <th className="px-6 py-4 font-medium w-24">Language</th>
                  <th className="px-6 py-4 font-medium text-right w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-white/5">
                {currentData.map((item) => {
                  const identifier = item.title || item.role || item.institution || item.name || (item.about_me ? item.about_me.substring(0, 50) + '...' : 'Item');
                  
                  return (
                    <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-6 py-4 font-medium">
                        {identifier}
                      </td>
                      <td className="px-6 py-4">
                        <span className="uppercase text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                          {item.lang || 'all'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(activeTab, item.id)}
                          className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
                
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-zinc-500">
                      Belum ada data di Firestore. Klik <strong>'Add New'</strong> atau gunakan tombol <strong>'Seed Default Data'</strong> di sidebar untuk mengisi data otomatis.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AdminFormModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? `Edit ${currentConfig.title}` : `Add ${currentConfig.title}`}
        fields={currentConfig.fields}
        initialData={editingItem}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

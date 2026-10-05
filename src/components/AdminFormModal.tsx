import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, UploadCloud, Trash2, Plus, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from '../lib/firebase';
import toast from 'react-hot-toast';

export type FieldType = 'text' | 'textarea' | 'array' | 'url' | 'image-upload';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  title: string;
  fields: FieldConfig[];
  isSubmitting: boolean;
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/webp', 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function AdminFormModal({ isOpen, onClose, onSubmit, initialData, title, fields, isSubmitting }: AdminFormModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Convert arrays to comma-separated strings for editing, keep image arrays as array
        const mappedData = { ...initialData };
        fields.forEach(f => {
          if (f.type === 'array' && Array.isArray(mappedData[f.key])) {
            mappedData[f.key] = mappedData[f.key].join(',\n');
          } else if (f.type === 'image-upload') {
            mappedData[f.key] = Array.isArray(mappedData[f.key])
              ? mappedData[f.key]
              : mappedData[f.key]
              ? [mappedData[f.key]]
              : [];
          }
        });
        setFormData(mappedData);
      } else {
        // Init empty form
        const defaultData: any = { lang: 'id' };
        fields.forEach(f => {
          if (f.type === 'image-upload') {
            defaultData[f.key] = [];
          }
        });
        setFormData(defaultData);
      }
      setCustomImageUrl('');
    }
  }, [isOpen, initialData, fields]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar (PNG, JPG, WEBP, SVG, dll).');
      return;
    }

    try {
      setUploadingImage(true);
      let downloadUrl = '';

      // Try Firebase Storage first if configured
      if (isFirebaseConfigured && storage) {
        try {
          const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const storageRef = ref(storage, `projects/${Date.now()}_${safeName}`);
          const snapshot = await uploadBytes(storageRef, file);
          downloadUrl = await getDownloadURL(snapshot.ref);
        } catch (storageErr) {
          console.warn('Firebase Storage upload failed, fallback to canvas WebP:', storageErr);
        }
      }

      // If Firebase Storage did not yield a URL (e.g. storage rules or not set up), use compressed WebP
      if (!downloadUrl) {
        downloadUrl = await compressImage(file);
      }

      // Append image URL
      setFormData((prev: any) => {
        const existing = Array.isArray(prev[fieldKey]) ? prev[fieldKey] : [];
        return { ...prev, [fieldKey]: [...existing, downloadUrl] };
      });
      toast.success('Thumbnail berhasil diunggah!');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      toast.error('Gagal mengunggah gambar.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddCustomImageUrl = (fieldKey: string) => {
    if (!customImageUrl.trim()) return;
    setFormData((prev: any) => {
      const existing = Array.isArray(prev[fieldKey]) ? prev[fieldKey] : [];
      return { ...prev, [fieldKey]: [...existing, customImageUrl.trim()] };
    });
    setCustomImageUrl('');
    toast.success('URL gambar ditambahkan!');
  };

  const handleRemoveImage = (fieldKey: string, indexToRemove: number) => {
    setFormData((prev: any) => {
      const existing = Array.isArray(prev[fieldKey]) ? prev[fieldKey] : [];
      return { ...prev, [fieldKey]: existing.filter((_: any, idx: number) => idx !== indexToRemove) };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process form data
    const submitData = { ...formData };
    
    // Convert comma/newline separated strings back to arrays
    fields.forEach(f => {
      if (f.type === 'array' && typeof submitData[f.key] === 'string') {
        submitData[f.key] = submitData[f.key]
          .split(/,|\n/)
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0);
      } else if (f.type === 'image-upload') {
        if (!Array.isArray(submitData[f.key])) {
          submitData[f.key] = submitData[f.key] ? [submitData[f.key]] : [];
        }
      }
    });

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-zinc-200 dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Language Selector (Global for all tables) */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Language
              </label>
              <select
                required
                value={formData.lang || 'id'}
                onChange={(e) => handleChange('lang', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="id">Indonesian (id)</option>
                <option value="en">English (en)</option>
              </select>
            </div>

            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'image-upload' ? (
                  <div className="space-y-3">
                    {/* Thumbnail Preview Grid */}
                    {Array.isArray(formData[field.key]) && formData[field.key].length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {formData[field.key].map((imgUrl: string, idx: number) => (
                          <div 
                            key={idx} 
                            className="relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 aspect-video flex items-center justify-center shadow-sm"
                          >
                            <img
                              src={imgUrl}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {idx === 0 && (
                              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/75 text-[10px] font-semibold text-white tracking-wide backdrop-blur-xs">
                                Utama (Cover)
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(field.key, idx)}
                              className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-600/90 hover:bg-red-700 text-white transition-all shadow-md cursor-pointer"
                              title="Hapus gambar ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload File Input / Drop Area */}
                    <div className="flex flex-col gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFile(e, field.key)}
                        className="hidden"
                        id={`file-upload-${field.key}`}
                      />
                      <label
                        htmlFor={`file-upload-${field.key}`}
                        className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer ${
                          uploadingImage ? 'opacity-60 pointer-events-none' : ''
                        }`}
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                            <span>Mengunggah thumbnail...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-4 h-4 text-red-500" />
                            <span>Unggah File Gambar (PNG, JPG, WEBP)</span>
                          </>
                        )}
                      </label>
                    </div>

                    {/* Add by Custom URL / Path */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          value={customImageUrl}
                          onChange={(e) => setCustomImageUrl(e.target.value)}
                          placeholder="Atau tempel URL gambar / path (/projects/...)"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomImageUrl(field.key);
                            }
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddCustomImageUrl(field.key)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah URL</span>
                      </button>
                    </div>
                  </div>
                ) : field.type === 'text' || field.type === 'url' ? (
                  <input
                    type={field.type}
                    required={field.required}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div>
                    <textarea
                      required={field.required}
                      rows={field.type === 'array' ? 3 : 4}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 resize-y"
                    />
                    {field.type === 'array' && (
                      <p className="text-xs text-zinc-500 mt-1">
                        Separate items with a comma or new line.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-200 dark:border-white/10 flex justify-end gap-3 bg-zinc-50 dark:bg-zinc-800/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            form="admin-form"
            type="submit"
            disabled={isSubmitting || uploadingImage}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors font-medium flex items-center gap-2 disabled:opacity-70 cursor-pointer shadow-sm"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export type FieldType = 'text' | 'textarea' | 'array' | 'url';

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

export function AdminFormModal({ isOpen, onClose, onSubmit, initialData, title, fields, isSubmitting }: AdminFormModalProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Convert arrays to comma-separated strings for editing
        const mappedData = { ...initialData };
        fields.forEach(f => {
          if (f.type === 'array' && Array.isArray(mappedData[f.key])) {
            mappedData[f.key] = mappedData[f.key].join(',\n');
          }
        });
        setFormData(mappedData);
      } else {
        // Init empty form
        const defaultData: any = { lang: 'id' };
        setFormData(defaultData);
      }
    }
  }, [isOpen, initialData, fields]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
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
      }
    });

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-zinc-200 dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
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
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
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
                
                {field.type === 'text' || field.type === 'url' ? (
                  <input
                    type={field.type}
                    required={field.required}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <div>
                    <textarea
                      required={field.required}
                      rows={field.type === 'array' ? 3 : 4}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
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
            className="px-5 py-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            form="admin-form"
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors font-medium flex items-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}

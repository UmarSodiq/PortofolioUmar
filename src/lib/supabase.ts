import { createClient } from '@supabase/supabase-js';

const cleanUrl = (url: string) => {
  if (url.includes('google.com/url?')) {
    try {
      const urlObj = new URL(url);
      const q = urlObj.searchParams.get('q');
      if (q) return q;
    } catch (e) {
      // ignore
    }
  }
  return url;
};

const resolveSupabaseConfig = () => {
  const val1 = ((import.meta as any).env.VITE_SUPABASE_URL || '') as string;
  const val2 = ((import.meta as any).env.VITE_SUPABASE_ANON_KEY || '') as string;
  
  let url = 'https://sgijdqwlgunmlwkqszus.supabase.co';
  let key = 'sb_publishable_Nx2mpybmrZMOSr1AJGH9_Q_UbTd-0n8';
  
  const processValue = (v: string) => {
    if (!v) return;
    const trimmed = v.trim();
    if (trimmed.startsWith('http') || trimmed.includes('supabase.co')) {
      url = cleanUrl(trimmed);
    } else if (trimmed.startsWith('sb_') || trimmed.startsWith('ey')) {
      key = trimmed;
    }
  };
  
  processValue(val1);
  processValue(val2);
  
  return { url, key };
};

const config = resolveSupabaseConfig();
export const supabase = createClient(config.url, config.key);


import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://sgijdqwlgunmlwkqszus.supabase.co', 'sb_publishable_Nx2mpybmrZMOSr1AJGH9_Q_UbTd-0n8');

async function check() {
  const { data, error } = await supabase.from('projects').select('*').eq('lang', 'id');
  console.log('Projects ID:', JSON.stringify(data, null, 2));
  console.log('Error:', error);
}

check();

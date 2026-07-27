import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://sgijdqwlgunmlwkqszus.supabase.co', 'sb_publishable_Nx2mpybmrZMOSr1AJGH9_Q_UbTd-0n8');

async function check() {
  const { data, error } = await supabase.from('projects').select('*');
  console.log('Data:', JSON.stringify(data, null, 2));
  if (error) console.error('Error:', error);
}

check();

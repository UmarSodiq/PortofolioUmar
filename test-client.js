import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://sgijdqwlgunmlwkqszus.supabase.co', 'https://www.google.com/url?sa=E&q=https%3A%2F%2Fsgijdqwlgunmlwkqszus.supabase.co');

async function test() {
  const { data, error } = await supabase.from('projects').select('*');
  console.log('Error:', error);
}
test();

const val1 = 'sb_publishable_Nx2mpybmrZMOSr1AJGH9_Q_UbTd-0n8';
const val2 = 'https://www.google.com/url?sa=E&q=https%3A%2F%2Fsgijdqwlgunmlwkqszus.supabase.co';

const cleanUrl = (url) => {
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

let url = 'https://sgijdqwlgunmlwkqszus.supabase.co';
let key = 'sb_publishable_Nx2mpybmrZMOSr1AJGH9_Q_UbTd-0n8';

const processValue = (v) => {
  if (!v) return;
  if (v.startsWith('http') || v.includes('supabase.co')) {
    url = cleanUrl(v);
  } else if (v.startsWith('sb_') || v.startsWith('ey')) {
    key = v;
  }
};

processValue(val1);
processValue(val2);

console.log('URL:', url);
console.log('KEY:', key);

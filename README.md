# Umar Sodiq - Personal Portfolio 🚀

Website portofolio pribadi yang modern, responsif, dan interaktif. Dibangun menggunakan teknologi web terkini untuk menampilkan pengalaman kerja, proyek, pendidikan, dan keahlian secara dinamis.

## ✨ Fitur Utama

- **Desain Modern & Responsif:** Tampilan yang bersih dan menyesuaikan dengan berbagai ukuran layar (Mobile, Tablet, Desktop).
- **Mode Gelap / Terang (Dark/Light Mode):** Pengalaman visual yang nyaman disesuaikan dengan preferensi pengguna.
- **Multi-Bahasa (Bilingual):** Mendukung Bahasa Indonesia dan Bahasa Inggris (i18n).
- **Animasi Halus:** Transisi dan animasi elemen yang mulus menggunakan Framer Motion.
- **Data Dinamis:** Terintegrasi dengan **Supabase** sebagai backend/database untuk mengelola konten portofolio secara real-time tanpa perlu mengubah kode sumber.
- **SEO Friendly:** Dioptimalkan untuk mesin pencari menggunakan `react-helmet-async`.

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework:** [React.js](https://react.dev/) (dengan TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [Motion (Framer Motion)](https://motion.dev/)
- **Ikon:** [Lucide React](https://lucide.dev/)
- **Database / BaaS:** [Supabase](https://supabase.com/)

## 🚀 Cara Menjalankan di Komputer Lokal (Local Development)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer Anda:

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/umarsodiq/nama-repo-kamu.git
   cd nama-repo-kamu
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Atur Environment Variables:**
   Buat file `.env` di direktori root proyek dan masukkan kredensial Supabase Anda:
   ```env
   VITE_SUPABASE_URL=url_supabase_anda
   VITE_SUPABASE_ANON_KEY=anon_key_supabase_anda
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000` (atau port lain yang tersedia).

## 📦 Deployment (Cloudflare Pages)

Proyek ini sangat mudah di-deploy ke Cloudflare Pages:
1. Hubungkan repositori GitHub Anda ke Cloudflare Pages.
2. Atur **Framework preset** ke `Vite` atau `React`.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. **Penting:** Jangan lupa tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di bagian **Environment variables (Build & Runtime)** pada pengaturan Cloudflare Pages.

## 📄 Lisensi

[MIT License](LICENSE)

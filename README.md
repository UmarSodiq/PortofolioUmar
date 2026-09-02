# Umar Sodiq - Personal Portfolio 🚀

Website portofolio pribadi yang modern, responsif, dan interaktif. Dibangun menggunakan teknologi web terkini untuk menampilkan pengalaman kerja, proyek, pendidikan, dan keahlian secara dinamis.

## ✨ Fitur Utama

- **Desain Modern & Responsif:** Tampilan yang bersih dan menyesuaikan dengan berbagai ukuran layar (Mobile, Tablet, Desktop).
- **Mode Gelap / Terang (Dark/Light Mode):** Pengalaman visual yang nyaman disesuaikan dengan preferensi pengguna.
- **Multi-Bahasa (Bilingual):** Mendukung Bahasa Indonesia dan Bahasa Inggris (i18n).
- **Animasi Halus:** Transisi dan animasi elemen yang mulus menggunakan Framer Motion.
- **Database Bebas Pause (Firebase Firestore):** Terintegrasi dengan **Firebase Firestore** sebagai database realtime yang tidak pernah tertidur / ter-pause meskipun tanpa traffic berbulan-bulan.
- **Admin Panel & Firebase Authentication:** Kelola seluruh isi portofolio langsung dari browser via `/admin`.
- **1-Click Seed Data:** Fitur pengisian otomatis seluruh data awal portofolio ke Firestore dengan satu kali klik dari Admin Panel.
- **SEO Friendly:** Dioptimalkan untuk mesin pencari menggunakan `react-helmet-async`.

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework:** [React.js](https://react.dev/) (dengan TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [Motion (Framer Motion)](https://motion.dev/)
- **Ikon:** [Lucide React](https://lucide.dev/)
- **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore & Firebase Auth)

---

## 🚀 Panduan Setup Firebase (Hanya Sekali)

1. **Buat Project Firebase:**
   - Buka [Firebase Console](https://console.firebase.google.com/) dan buat project baru (gratis).
2. **Aktifkan Firebase Authentication:**
   - Masuk ke menu **Build** > **Authentication** > **Get Started**.
   - Di tab **Sign-in method**, aktifkan provider **Email/Password**.
   - Di tab **Users**, klik **Add user** untuk membuat akun Admin (masukkan Email & Password Anda).
3. **Aktifkan Firestore Database:**
   - Masuk ke menu **Build** > **Firestore Database** > **Create database**.
   - Pilih lokasi server (misal: `asia-southeast2` Jakarta atau `asia-southeast1` Singapore).
   - Di tab **Rules**, salin isi dari file [`firestore.rules`](./firestore.rules) lalu klik **Publish**.
4. **Dapatkan Kredensial Web App:**
   - Masuk ke **Project settings** (ikon gerigi) > tab **General** > scroll ke bawah ke bagian **Your apps**.
   - Klik ikon Web `</>` untuk mendaftarkan web app.
   - Salin konfigurasi `firebaseConfig` yang muncul.

---

## 💻 Cara Menjalankan di Komputer Lokal (Local Development)

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
   Buat file `.env` di root direktori proyek dan masukkan kredensial Firebase Anda:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=project-kamu.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=project-kamu
   VITE_FIREBASE_STORAGE_BUCKET=project-kamu.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

5. **Inisialisasi Data Otomatis (Opsional):**
   - Buka `http://localhost:3000/login` dan masuk dengan akun admin Firebase Anda.
   - Di dashboard Admin, klik tombol **"Seed Default Data"** di sidebar bawah untuk memasukkan semua data portofolio awal ke Firestore secara otomatis.

---

## 📦 Deployment (Cloudflare Pages / Vercel / Netlify)

1. Hubungkan repositori GitHub Anda ke penyedia hosting (Cloudflare Pages / Vercel).
2. Konfigurasi build:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. Tambahkan semua variabel `VITE_FIREBASE_*` dari file `.env` ke pengaturan **Environment variables** di dashboard hosting Anda.

---

## 📄 Lisensi

[MIT License](LICENSE)

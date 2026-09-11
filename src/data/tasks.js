import { Layers, Server, Layout, Rocket } from 'lucide-react'

export const FASAS = {
  1: { romawi: 'I', judul: 'Fondasi', tanggal: '10–14 Sep', gate: 'Gate 14: login + master data jalan' },
  2: { romawi: 'II', judul: 'Inti', tanggal: '15–21 Sep', gate: 'Gate 21: kader input → dashboard tampil' },
  3: { romawi: 'III', judul: 'Finalisasi, Deploy & Demo', tanggal: '22–27 Sep', gate: 'Demo online 27 Sep' },
}

export const JALUR = {
  A: {
    label: 'Data & Desain',
    icon: Layers,
    text: 'text-emerald-600 dark:text-emerald-400',
    top: 'border-t-emerald-300 dark:border-t-emerald-800',
    chip: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
  },
  B: {
    label: 'Backend',
    icon: Server,
    text: 'text-sky-600 dark:text-sky-400',
    top: 'border-t-sky-300 dark:border-t-sky-800',
    chip: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900',
  },
  C: {
    label: 'Frontend',
    icon: Layout,
    text: 'text-violet-600 dark:text-violet-400',
    top: 'border-t-violet-300 dark:border-t-violet-800',
    chip: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900',
  },
  D: {
    label: 'Demo & Packing',
    icon: Rocket,
    text: 'text-amber-600 dark:text-amber-400',
    top: 'border-t-amber-300 dark:border-t-amber-800',
    chip: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
  },
}

export const LEVEL = {
  S: { icon: '🟢', label: 'S', nama: 'Sederhana', penjelasan: 'Tugas kecil — cepat selesai (hitungan jam), risiko kecil.', cls: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200' },
  M: { icon: '🟡', label: 'M', nama: 'Menengah', penjelasan: 'Butuh 1–2 hari kerja, risiko sedang, perlu perhatian.', cls: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200' },
  L: { icon: '🔴', label: 'L', nama: 'Besar / Kompleks', penjelasan: 'Tugas besar — butuh waktu lama & berisiko tinggi; harus didahulukan agar tidak menghambat.', cls: 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200' },
}

export const TASKS = [
  { id: 'B1', fasa: 1, jalur: 'B', nama: 'Scaffold repo client+server, env, ESLint, script migrate/seed', clear: 'Menyiapkan kerangka proyek: struktur folder untuk kode tampilan (frontend) dan data (backend) dirapikan, lengkap dengan alat otomatis untuk menjaga kualitas kode dan menyiapkan basis data.', level: 'M', jam: 6, dep: [] },
  { id: 'B2', fasa: 1, jalur: 'B', nama: 'Skema DB + migration (dari Field Checklist)', clear: 'Merancang struktur tempat semua data disimpan (keluarga, kader, kunjungan, isian form) mengikuti dokumen Field Checklist, plus alat penyesuai struktur tanpa kehilangan data.', level: 'L', jam: 12, dep: ['B1'] },
  { id: 'B3', fasa: 1, jalur: 'B', nama: 'Auth & role (3 peran) + middleware', clear: 'Membuat sistem masuk dan aturan hak akses: kader hanya mengisi, pengawas membaca, admin mengelola.', level: 'M', jam: 10, dep: ['B1'] },
  { id: 'B4', fasa: 1, jalur: 'B', nama: 'API CRUD master data (kelurahan, RW/RT, posyandu, kader)', clear: 'Membuat "jembatan" yang menghubungkan tampilan dengan data untuk mengelola kelurahan, RW/RT, posyandu, dan kader (buat, lihat, ubah, hapus).', level: 'M', jam: 10, dep: ['B3'] },
  { id: 'C1', fasa: 1, jalur: 'C', nama: 'Scaffold React + routing + layout + guard peran', clear: 'Menyiapkan kerangka tampilan aplikasi: susunan halaman, alur pindah halaman, dan gerbang masuk per peran.', level: 'M', jam: 8, dep: [] },
  { id: 'C2', fasa: 1, jalur: 'C', nama: 'Halaman login', clear: 'Membuat halaman masuk yang sederhana dan mudah dipakai 3 peran pengguna.', level: 'S', jam: 5, dep: ['C1'] },
  { id: 'C3', fasa: 1, jalur: 'C', nama: 'Halaman master data + definisi field (admin)', clear: 'Membuat halaman bagi admin untuk mengelola kelurahan, posyandu, kader, dan daftar isian form.', level: 'M', jam: 10, dep: ['C1', 'B4'] },
  { id: 'A1', fasa: 1, jalur: 'A', nama: 'Seed definisi field 8 kelompok sasaran (dari ekstraksi)', clear: 'Mengisi katalog awal semua kolom isian form resmi untuk 8 kelompok sasaran dari dokumen Field Checklist — pondasi agar form bisa menyesuaikan perubahan format Kemenkes.', level: 'L', jam: 10, dep: [] },
  { id: 'A2', fasa: 1, jalur: 'A', nama: 'Dummy data 4 kelurahan (KK, anggota, kunjungan)', clear: 'Membuat contoh data 4 kelurahan (keluarga, anggota, kunjungan) agar aplikasi terasa "hidup" untuk dicoba, karena data asli menunggu izin.', level: 'S', jam: 6, dep: ['A1'] },
  { id: 'A3', fasa: 1, jalur: 'A', nama: 'Wireframe & user flow mobile-first', clear: 'Menggambar tampak kasar (sketsa) halaman dan alur pemakaian dari HP kader — pegangan bersama sebelum tampilan dikoding.', level: 'S', jam: 8, dep: [] },

  { id: 'B5', fasa: 2, jalur: 'B', nama: 'API definisi field (CRUD, urutan, aktif/wajib)', clear: 'Membuat jembatan data untuk mengelola daftar isian form: urutan tampil, mana yang wajib, mana yang dinonaktifkan — inilah kunci fitur "form fleksibel".', level: 'L', jam: 10, dep: ['B4'] },
  { id: 'B6', fasa: 2, jalur: 'B', nama: 'API kunjungan KR (keluarga+anggota+sasaran+masalah)', clear: 'Membuat jembatan data untuk menyimpan hasil kunjungan rumah: data keluarga, anggota, isian kelompok sasaran, dan masalah kesehatan yang ditemukan.', level: 'L', jam: 14, dep: ['B5'] },
  { id: 'B7', fasa: 2, jalur: 'B', nama: 'API dashboard agregat per RT/RW/kelurahan + filter', clear: 'Membuat mesin perhitungan yang meringkas data menjadi angka per RT/RW/kelurahan (misal urutan masalah terbanyak) beserta penyaringnya.', level: 'L', jam: 14, dep: ['B6'] },
  { id: 'C4', fasa: 2, jalur: 'C', nama: 'Form input KR dinamis (render dari definisi field, mobile)', clear: 'Membuat halaman isian kunjungan di HP yang kolomnya otomatis mengikuti daftar field dari admin — tanpa perlu ubah kode bila format berubah.', level: 'L', jam: 16, dep: ['B5', 'B6'] },
  { id: 'C5', fasa: 2, jalur: 'C', nama: 'Dashboard PWS (visualisasi, filter, drill-down)', clear: 'Membuat halaman dashboard dengan angka/grafik yang bisa disaring dan ditelusuri dari kelurahan → RW → RT.', level: 'L', jam: 14, dep: ['B7'] },
  { id: 'A4', fasa: 2, jalur: 'A', nama: 'Uji isi field dengan dummy + kasus demo kader', clear: 'Menguji kelengkapan kolom isian memakai data contoh dan menyusun skenario demo "kader di lapangan".', level: 'S', jam: 4, dep: ['A2', 'C4'] },

  { id: 'B8', fasa: 3, jalur: 'B', nama: 'API notifikasi/pengingat jadwal + email (free-tier)', clear: 'Membuat mesin pengingat: sistem menghitung jadwal yang mendekati/terlewati dan mengirim pemberitahuan email otomatis (paket gratis).', level: 'M', jam: 12, dep: ['B6'] },
  { id: 'B9', fasa: 3, jalur: 'B', nama: 'API rekap & ekspor', clear: 'Membuat mesin rekap otomatis per kelompok sasaran/wilayah yang siap diunduh — menggantikan rekap manual di Excel.', level: 'M', jam: 8, dep: ['B6'] },
  { id: 'C6', fasa: 3, jalur: 'C', nama: 'Notifikasi in-app + daftar jadwal kader', clear: 'Membuat tempat pemberitahuan di dalam aplikasi dan daftar jadwal kunjungan milik kader.', level: 'M', jam: 8, dep: ['B8'] },
  { id: 'C7', fasa: 3, jalur: 'C', nama: 'Rekap & ekspor Excel/PDF', clear: 'Membuat tombol unduh rekap dalam format Excel & PDF yang mudah dibuka siapa saja.', level: 'S', jam: 6, dep: ['B9'] },
  { id: 'C8', fasa: 3, jalur: 'C', nama: 'Polish mobile, loading/error, aksesibilitas', clear: 'Merapikan tampilan di HP, menangani kondisi memuat/gagal dengan baik, dan memastikan aplikasi nyaman dipakai.', level: 'M', jam: 8, dep: ['C4', 'C5'] },
  { id: 'D1', fasa: 3, jalur: 'D', nama: 'Deploy online: Vercel (frontend) + backend (Render/Railway) + Supabase (PostgreSQL)', clear: 'Menayangkan aplikasi ke internet: tampilan di Vercel, mesin di Render/Railway, basis data di Supabase — semua paket gratis.', level: 'M', jam: 6, dep: ['B/C inti'] },
  { id: 'D2', fasa: 3, jalur: 'D', nama: 'Akun demo 3 peran + data placeholder', clear: 'Menyiapkan 3 akun contoh (kader, pengawas, admin) dengan data pengisi agar klien langsung bisa mencoba dari HP/PC.', level: 'S', jam: 2, dep: ['D1'] },
  { id: 'D3', fasa: 3, jalur: 'D', nama: 'Script demo 15 menit + uji dari HP client', clear: 'Menyusun naskah demo 15 menit dan memastikan aplikasi berjalan mulus saat dibuka dari HP klien.', level: 'S', jam: 3, dep: ['D2'] },
  { id: 'D4', fasa: 3, jalur: 'D', nama: 'Dokumentasi ringkas + draft handover', clear: 'Menulis panduan singkat penggunaan dan catatan penyerahan proyek kepada mitra.', level: 'S', jam: 4, dep: [] },
]

export const TOTAL_JAM = TASKS.reduce((s, t) => s + t.jam, 0)
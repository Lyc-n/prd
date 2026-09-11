import {
  Users, FileText, Wand2, Eye, Bell, Download, Database, Kanban, X, Check, PackageCheck,
  Minus, Flag, CheckCircle2, XCircle, Box, AlertTriangle, BookOpen, CircleHelp,
} from 'lucide-react'
import { TASKS, TOTAL_JAM } from './tasks'

export const TEKS_HERO = {
  judul: 'Dashboard PWS Posyandu',
  deskripsi:
    'Aplikasi web responsif untuk digitalisasi pendataan kunjungan rumah (KR) kader Posyandu di wilayah kerja Puskesmas Trajeng (4 kelurahan). Kader menginput hasil kunjungan, data otomatis tampil pada dashboard PWS kondisi kesehatan per wilayah, dan kader menerima pengingat jadwal kunjungan. Format form Kemenkes belum stabil, sehingga sistem wajib mendukung perubahan tanpa pembangunan ulang.',
  koreksi:
    'Update 11 Sep: KPI % cakupan dikunjungi vs belum + % prevalensi TBC/terpapar, filter 5 program prioritas (Stunting/ODGJ/bumil risti/balita risti/TB), 4 modul kandidat v2 (nakes/UKGK/pemberdayaan/biodata kader), opsi deploy gabung website Puskesmas. · 10 Sep: Workflow 6 alur Mermaid + Gherkin · 8 sasaran · demo 27 Sep.',
}

export const TAG_TEKNOLOGI = ['React', 'Express / Node.js', 'PostgreSQL (data fleksibel)', 'REST API', 'Web responsif (mobile)', 'Ekspor Excel/PDF', 'Deploy online']

export const STATS = [
  { label: 'Task terencana', value: String(TASKS.length), isBig: true },
  { label: 'Estimasi total', value: `±${TOTAL_JAM} jam`, isBig: true },
  { label: 'Fasa', value: '3', sub: '10–27 Sep', isBig: true },
  { label: 'Demo online', value: '27 Sep', accent: true },
]

export const FITUR = [
  { icon: Users, judul: 'Login & peran', teks: 'Kader, pengawas, dan admin masuk dengan hak akses berbeda (input vs baca vs kelola).' },
  { icon: FileText, judul: 'Input kunjungan rumah digital', teks: 'Kader mengisi hasil kunjungan mengikuti struktur form resmi (data keluarga + per kelompok sasaran), termasuk menandai masalah kesehatan.' },
  { icon: Wand2, judul: 'Form fleksibel', teks: 'Admin mengubah struktur form (tambah/edit/nonaktifkan field) tanpa menulis ulang aplikasi, mengikuti format Kemenkes yang masih berubah.' },
  { icon: Eye, judul: 'Dashboard PWS + KPI %', teks: 'Penyakit tertinggi per RT/RW/kelurahan (contoh: hipertensi tidak patuh berobat) + KPI % cakupan dikunjungi vs belum / total sasaran & % prevalensi TBC/terpapar (rekaman 11 Sep 00:07–00:12). Filter wilayah/kelompok sasaran/periode + filter 5 program prioritas (Stunting, ODGJ, bumil risti, balita risti, TB).' },
  { icon: Bell, judul: 'Pengingat jadwal (in-app + email)', teks: 'Kader tahu kapan waktunya kunjungan rumah (rutin 1×/tahun atau khusus door-to-door) dan ketika jadwal terlewat; pengingat email otomatis (gratis) sebagai saluran kedua. WhatsApp tidak termasuk v1.' },
  { icon: Download, judul: 'Rekap & ekspor', teks: 'Rekap otomatis per kelompok sasaran/wilayah menggantikan rekap manual Excel, dapat diekspor ke Excel & PDF — ikut filter prioritas 5 program.' },
  { icon: Database, judul: 'Master data', teks: 'Admin mengelola kelurahan, posyandu, kader, dan wilayah RW/RT.' },
  { icon: Kanban, judul: 'Task board interaktif', teks: 'Rencana kerja bisa disaring per jalur/level, progress dicentang langsung (tersimpan di perangkat ini).', highlight: true },
  { icon: PackageCheck, judul: '5 program prioritas (filter sasaran)', teks: 'View “data sasaran yang akan dikunjungi” hanya 5 prioritas: Stunting, ODGJ, bumil risti, balita risti, TB (bukan 8 sasaran penuh) — usulan supervisi 11 Sep [01:24], pending validasi.', highlight: true },
]

export const TERSEDIA = [
  'URS & prioritas kebutuhan [M]/[S] + update 11 Sep (KPI % & 5 prioritas)',
  'Struktur form checklist KR (PDF 35 hlm)',
  '8 kelompok sasaran siklus hidup (koreksi 9 Sep)',
  'Alur proses kunjungan saat ini (form fisik → Excel tok 11 Sep)',
  'Konteks kebijakan ILP & timeline KR',
  'Pemetaan stakeholder & rencana 3-fasa (demo 27 Sep)',
  'Workflow Aplikasi 6 alur (Mermaid) + User Journey per role + Gherkin (online only, 10 Sep)',
  'Rekaman 05:50 11 Sep — persentase dashboard + 4 modul kandidat v2 (nakes/UKGK/pemberdayaan/biodata kader) + opsi deploy gabung website Puskesmas (Bu Marten)',
]
export const CATATAN_TERSEDIA = 'Tidak ada kode atau starter template yang sudah ada — pembangunan dimulai dari nol di Milestone 1.'

export const OUT_OF_SCOPE = [
  { judul: 'Bukan pengganti aplikasi Kemenkes', teks: 'sistem ini alat PWS tingkat kelurahan/Puskesmas; data tidak dikirim ke server pusat/SatuSehat.' },
  { judul: 'Tanpa diagnosis medis', teks: 'hanya pencatatan & visualisasi kondisi, bukan sistem pakar.' },
  { judul: 'Tanpa aplikasi mobile native', teks: 'cukup web responsif yang bisa dibuka dari HP kader.' },
  { judul: 'Tanpa notifikasi WhatsApp di v1', teks: 'WhatsApp dibuka sebagai pengembangan lanjutan (validasi mitra + biaya). Email reminder free-tier termasuk v1 sebagai pelengkap notifikasi in-app.' },
  { judul: 'Tanpa analitik prediktif / machine learning', teks: 'dashboard menggambarkan kondisi aktual, bukan peramalan.' },
  { judul: 'Tanpa akses publik / multi-bahasa', teks: 'seluruh pengguna harus login.' },
  { judul: 'Tanpa mode offline/draft di v1', teks: 'asumsi online only (10 Sep); kader harus online saat input, error jaringan = retry tanpa antrian offline.' },
  { judul: 'Data aktual 4 kelurahan menunggu izin DPMPTSP', teks: 'demo 27 Sep memakai data dummy; data nyata masuk saat izin jadi. Saat ini Excel tok (11 Sep).' },
  { judul: 'Kandidat v2 — usulan supervisi 11 Sep (pending, tidak masuk v1)', teks: 'Fitur Nakes, UKGK/UKGM (singkatan perlu klarifikasi), Kegiatan Pemberdayaan Kader (tanggal, peserta hadir, foto), Biodata Kader per Pos — lihat Transkrip Rekaman 11 Sep. Butuh definisi field & validasi beban sebelum masuk scope.' },
  { judul: 'Tanpa subsumsi 8 sasaran menjadi 5 prioritas', teks: '8 siklus hidup tetap; 5 program Stunting/ODGJ/bumil risti/balita risti/TB hanya filter view “sasaran yang akan dikunjungi” (11 Sep [01:24]), bukan mengganti struktur data.' },
]

export const KELOMPOK_SASARAN = [
  'Ibu Hamil',
  'Bersalin/Nifas',
  'Bayi',
  'Balita/Apras',
  'Usia Sekolah/Remaja',
  'Dewasa',
  'Lansia',
  'TBC',
]

export const ENTITIES = [
  {
    id: 'user',
    nama: 'Pengguna & Role',
    fields: [
      ['nama', 'nama lengkap pengguna'],
      ['peran', 'kader, pengawas, admin'],
      ['wilayah binaan', 'posyandu/kelurahan tanggung jawab (kader & pengawas)'],
      ['kontak', 'No. HP & email untuk koordinasi & notifikasi'],
      ['kredensial', 'akun masuk sistem (bukan pihak ketiga)'],
    ],
    related: [
      { id: 'posyandu', label: 'Posyandu' },
      { id: 'kelurahan', label: 'Kelurahan' },
      { id: 'kunjungan', label: 'Kunjungan Rumah' },
      { id: 'jadwal', label: 'Jadwal Kunjungan' },
    ],
  },
  {
    id: 'kelurahan',
    nama: 'Kelurahan',
    fields: [
      ['nama', 'Ngemplakrejo, Tambaan, Trajeng, Mayangan'],
      ['wilayah kerja', 'Puskesmas Trajeng (4 kelurahan wajib)'],
      ['data wilayah', 'jumlah posyandu & target KK (terisi setelah data aktual)'],
    ],
    related: [
      { id: 'rwrt', label: 'RW/RT' },
      { id: 'posyandu', label: 'Posyandu' },
      { id: 'keluarga', label: 'Keluarga' },
    ],
  },
  {
    id: 'rwrt',
    nama: 'RW / RT',
    fields: [
      ['nomor', 'nomor RW dan nomor RT'],
      ['kelurahan', 'kelurahan tempat RW/RT berada'],
    ],
    related: [
      { id: 'kelurahan', label: 'Kelurahan' },
      { id: 'keluarga', label: 'Keluarga' },
    ],
    notes: ['Dashboard PWS'],
  },
  {
    id: 'posyandu',
    nama: 'Posyandu',
    fields: [
      ['nama', 'nama posyandu'],
      ['kelurahan', 'kelurahan tempat posyandu berada'],
      ['kader', 'kader yang bertugas'],
      ['jadwal kegiatan', 'jadwal posyandu (pendukung penjadwalan)'],
    ],
    related: [
      { id: 'kelurahan', label: 'Kelurahan' },
      { id: 'user', label: 'Pengguna (kader)' },
      { id: 'jadwal', label: 'Jadwal Kunjungan' },
    ],
  },
  {
    id: 'keluarga',
    nama: 'Keluarga (KK)',
    fields: [
      ['identitas', 'nama kepala keluarga & No. KK'],
      ['alamat', 'jalan/kampung, RT, RW, kelurahan'],
      ['anggota', 'jumlah anggota keluarga'],
      ['sanitasi', 'jamban, air bersih, ventilasi'],
      ['kesehatan', 'jaminan kesehatan & penyakit kronis keluarga (TBC, hipertensi, DM, gangguan jiwa)'],
    ],
    related: [
      { id: 'anggota', label: 'Anggota Keluarga' },
      { id: 'rwrt', label: 'RW/RT' },
      { id: 'kunjungan', label: 'Kunjungan Rumah' },
      { id: 'jadwal', label: 'Jadwal Kunjungan' },
    ],
  },
  {
    id: 'anggota',
    nama: 'Anggota Keluarga',
    fields: [
      ['identitas', 'nama, NIK, tanggal lahir, jenis kelamin'],
      ['sosial', 'hubungan dengan KK, status perkawinan, pendidikan, pekerjaan'],
      ['kelompok sasaran', 'siklus hidup (8): Ibu Hamil, Bersalin/Nifas, Bayi, Balita/Apras, Usia Sekolah/Remaja, Dewasa, Lansia, TBC'],
    ],
    related: [
      { id: 'keluarga', label: 'Keluarga' },
      { id: 'masalah', label: 'Masalah & Tindak Lanjut' },
      { id: 'kunjungan', label: 'Kunjungan Rumah' },
    ],
  },
  {
    id: 'kunjungan',
    nama: 'Kunjungan Rumah',
    fields: [
      ['pelaksana', 'kader yang melaksanakan'],
      ['target', 'keluarga yang dikunjungi & tanggal kunjungan'],
      ['jenis', 'rutin (1×/tahun seluruh KK) atau khusus (door-to-door)'],
      ['data sasaran', 'isi per kelompok sasaran mengikuti definisi field (fleksibel)'],
      ['status', 'dalam proses / selesai'],
    ],
    related: [
      { id: 'user', label: 'Pengguna' },
      { id: 'keluarga', label: 'Keluarga' },
      { id: 'def-field', label: 'Definisi Field Form' },
      { id: 'jadwal', label: 'Jadwal Kunjungan' },
    ],
  },
  {
    id: 'def-field',
    nama: 'Definisi Field Form',
    bintang: true,
    fields: [
      ['identitas', 'nama field, label tampil, bagian form, kelompok sasaran'],
      ['tipe isian', 'pilihan / angka / tanggal / kotak centang / teks'],
      ['aturan', 'wajib/opsional, urutan tampil, aktif/nonaktif'],
    ],
    related: [{ id: 'kunjungan', label: 'Kunjungan Rumah' }],
    notes: ['administrasi field menyerap perubahan format Kemenkes'],
  },
  {
    id: 'masalah',
    nama: 'Masalah & Tindak Lanjut',
    fields: [
      ['terkait', 'anggota keluarga yang bermasalah'],
      ['masalah', 'masalah kesehatan yang ditemukan'],
      ['tindak lanjut', 'tindak lanjut yang diberikan'],
      ['status', 'belum / selesai / dirujuk'],
    ],
    related: [
      { id: 'anggota', label: 'Anggota Keluarga' },
      { id: 'kunjungan', label: 'Kunjungan Rumah' },
    ],
  },
  {
    id: 'jadwal',
    nama: 'Jadwal Kunjungan',
    fields: [
      ['target', 'keluarga yang dijadwalkan'],
      ['petugas', 'kader penanggung jawab'],
      ['waktu', 'waktu kunjungan yang dijadwalkan'],
      ['status', 'terjadwal / selesai / terlewat (dasar pengingat)'],
    ],
    related: [
      { id: 'keluarga', label: 'Keluarga' },
      { id: 'user', label: 'Pengguna (kader)' },
      { id: 'posyandu', label: 'Posyandu' },
      { id: 'kunjungan', label: 'Kunjungan Rumah' },
    ],
  },
  {
    id: 'kegiatan',
    nama: 'Kegiatan Pemberdayaan (kandidat v2)',
    bintang: true,
    fields: [
      ['tanggal', 'tanggal kegiatan pengumpulan warga (atasi masalah UKGK)'],
      ['peserta', 'daftar peserta hadir (siapa yang sudah dikumpulkan)'],
      ['foto', 'foto kegiatan (opsional, bisa dimasukkan)'],
      ['kait posyandu', 'posyandu/UKGK terkait'],
    ],
    related: [
      { id: 'posyandu', label: 'Posyandu' },
      { id: 'user', label: 'Pengguna (kader)' },
    ],
    notes: ['usulan supervisi 11 Sep [02:39] — pending validasi, tidak masuk ERD v1'],
  },
  {
    id: 'nakes',
    nama: 'Nakes & UKGK/UKGM (kandidat v2)',
    bintang: true,
    fields: [
      ['nakes', 'biodata tenaga kesehatan Puskesmas (belum detail)'],
      ['biodata kader', 'kader per pos: profil di pos (nama, pendidikan, foto?)'],
      ['ukgk', 'UKGK/UKGM — singkatan perlu klarifikasi (Usaha Kesehatan Gigi?)'],
    ],
    related: [
      { id: 'posyandu', label: 'Posyandu' },
      { id: 'user', label: 'Pengguna' },
    ],
    notes: ['usulan supervisi 11 Sep [01:30][01:39] — pending, tidak masuk v1'],
  },
]

export const MILESTONES = [
  {
    id: 'ms-1',
    nomor: 1,
    judul: 'Fondasi, Autentikasi & Master Data',
    deskripsi:
      'Kerangka aplikasi yang bisa diakses pengguna dengan peran berbeda, plus master data wilayah/posyandu/kader dan definisi field form sebagai landasan milestone berikutnya.',
    dibangun: [
      'Proyek berjalan (React + Express/Node + PostgreSQL) yang terbuka di browser',
      'Login untuk 3 peran dengan hak akses berbeda',
      'Master data: kelurahan, RW/RT, posyandu, pengguna/kader',
      'Pengelolaan definisi field form (fondasi fleksibilitas)',
      'Profil & manajemen akun dasar',
    ],
    bukan: ['Form isian kunjungan rumah (M2)', 'Dashboard visualisasi (M3)', 'Notifikasi & pengingat (M4)', 'Ekspor rekap (M4)'],
    selesaiKetika: 'Admin bisa login, membuat kelurahan/posyandu/kader, mendefinisikan struktur field form, dan pengguna lain login sesuai perannya tanpa kendala.',
  },
  {
    id: 'ms-2',
    nomor: 2,
    judul: 'Input Data Kunjungan Rumah (Fleksibel)',
    deskripsi:
      'Kader menginput hasil kunjungan rumah digital mengikuti struktur form resmi yang didefinisikan admin. Milestone paling berisiko karena format form Kemenkes belum stabil.',
    dibangun: [
      'Form input yang isiannya mengikuti definisi field admin (data keluarga + kelompok sasaran)',
      'Alur kader: pilih jadwal/keluarga → isi data → simpan',
      'Tambah anggota & menandai masalah kesehatan + tindak lanjut',
      'Validasi wajib/opsional sesuai definisi field',
      'Pencarian & daftar kunjungan milik kader',
    ],
    bukan: ['Dashboard visualisasi (M3)', 'Notifikasi & pengingat (M4)', 'Rekap & ekspor (M4)'],
    selesaiKetika:
      'Kader di lapangan (dari HP) bisa membuat kunjungan baru, data tersimpan, dan isian mengikuti definisi admin — mengubah definisi field tidak memerlukan perubahan kode.',
  },
  {
    id: 'ms-3',
    nomor: 3,
    judul: 'Dashboard PWS',
    deskripsi:
      'Pengawas melihat kondisi kesehatan per wilayah — inti kebutuhan "penyakit tertinggi per RT/RW" + KPI % cakupan (dikunjungi vs belum / total sasaran) & % prevalensi TBC (11 Sep).',
    dibangun: [
      'Halaman dashboard: ringkasan kondisi + KPI % cakupan per kelurahan (11 Sep)',
      'Visualisasi masalah kesehatan tertinggi per RT/RW/kelurahan + % prevalensi per penyakit',
      'Filter wilayah, kelompok sasaran, periode waktu + filter 5 program prioritas (Stunting/ODGJ/bumil risti/balita risti/TB, 11 Sep)',
      'Drill-down kelurahan → RW → RT',
      'Kuota akses per peran: kader hanya wilayahnya; pengawas 4 kelurahan',
    ],
    bukan: ['Notifikasi & pengingat (M4)', 'Rekap & ekspor (M4)', 'Analitik prediktif', 'Data aktual nyata (pakai contoh sampai izin DPMPTSP)', 'Modul kandidat v2 (nakes/UKGK/pemberdayaan/biodata) — out of scope v1'],
    selesaiKetika: 'Pengawas bisa memfilter dashboard (termasuk 5 prioritas) dan langsung melihat urutan masalah + KPI % per wilayah dari data yang diinput kader.',
  },
  {
    id: 'ms-4',
    nomor: 4,
    judul: 'Notifikasi, Rekap & Uji Lapangan',
    deskripsi:
      'Melengkapi siklus kerja: rekap otomatis + ekspor menggantikan rekap manual, pengingat jadwal kader, dan penyempurnaan untuk uji lapangan/penyerahan.',
    dibangun: [
      'Pengingat jadwal kunjungan untuk kader: in-app + email otomatis free-tier',
      'Status jadwal: terjadwal / selesai / terlewat',
      'Rekap otomatis per kelompok sasaran & per wilayah',
      'Ekspor rekap ke Excel & PDF',
      'Penyempurnaan penggunaan HP (hasil uji kader)',
      'Panduan penggunaan singkat + dokumentasi handover',
    ],
    bukan: ['Notifikasi WhatsApp (lanjutan, butuh validasi mitra & biaya)', 'Aplikasi mobile native', 'Integrasi ke server pusat Kemenkes'],
    selesaiKetika:
      'Kader bisa melihat & menandai jadwalnya, pengawas bisa mengekspor rekap, dan aplikasi stabil dipakai dari ponsel pada uji lapangan, ditutup dengan dokumen handover.',
  },
]

export const PERINGATAN_RENCANA = [
  { icon: AlertTriangle, tone: 'text-amber-500', teks: 'Data real 4 kelurahan menunggu izin DPMPTSP → demo memakai <strong>data dummy</strong>; data nyata disuntik setelah izin jadi. Saat ini <strong>Excel tok</strong> (11 Sep).' },
  { icon: AlertTriangle, tone: 'text-amber-500', teks: 'Format form Kemenkes belum stabil → seluruh rancangan bergantung pada <strong>definisi field</strong> (tidak boleh hard-code).' },
  { icon: AlertTriangle, tone: 'text-amber-500', teks: 'Notifikasi (B8–C6) & rekap/ekspor (B9–C7) bersifat <strong>bonus</strong> bila waktu Fasa III menipis; prioritas demo: D1–D3. Deploy opsi gabung website Puskesmas (Bu Marten) perlu validasi — fallback Vercel tetap.' },
  { icon: AlertTriangle, tone: 'text-amber-500', teks: 'Kandidat v2 11 Sep (nakes/UKGK/pemberdayaan/biodata kader) <strong>tidak masuk v1</strong> — pending validasi field & beban. 5 prioritas hanya filter view, bukan ganti 8 sasaran.' },
  { icon: BookOpen, tone: 'text-zinc-400 dark:text-zinc-600', teks: 'L-01 <em>Logbook</em> Asah/Dicoding per individu berjalan di sela-sela (bukan task bersama).' },
]

export const QNA = [
  'Bentuk notifikasi final — v1 = in-app + email; konfirmasi saluran yang benar-benar dipakai kader (WhatsApp/email/app) serta kepada siapa dan trigger-nya.',
  'Rencana demo 27 Sep 2026 — konfirmasi kesediaan mitra (Bu Dian / Kepala Puskesmas) menerima demo online, bisa dari HP/PC.',
  'Data individu vs agregat — tampilkan per orang atau cukup per wilayah (privasi).',
  'Batasan akses data — siapa boleh melihat data apa (kader, pengawas, admin).',
  'Tren waktu — perlu perbandingan data antar tahun?',
  'Jumlah pasti posyandu & target KK per kelurahan (dari Bu Dian setelah DPMPTSP).',
  'Operator harian sistem setelah handover.',
  'Update 11 Sep — 5 program prioritas: pemetaan Stunting/ODGJ/bumil risti/balita risti/TB ke field checklist & 8 sasaran; view 5 prioritas menggantikan atau filter tambahan? (rekaman 01:24)',
  'Update 11 Sep — UKGK/UKGM: klarifikasi singkatan & field yang diharapkan (Usaha Kesehatan Gigi?).',
  'Update 11 Sep — Biodata Kader & Nakes: field detail (pendidikan, foto, KTP?), apakah nakes = master Puskesmas?',
  'Update 11 Sep — Pemberdayaan: butuh Kegiatan (tanggal, peserta, foto) — izin foto & retensi?',
  'Update 11 Sep — Metrik %: rumus pasti % dikunjungi/total sasaran & % penderita/terpapar + level agregat (RT/RW/kel)?',
  'Update 11 Sep — Deploy gabung: hosting website Puskesmas jenis apa (shared/VPS), akses Bu Marten, subpath/subdomain, backup?',
]

export const DISCLAIMER =
  'PRD ini beserta folder 01 Notes/milestones/ adalah artefak dokumentasi sementara untuk pembangunan awal aplikasi. Berkas-berkas ini bukan bagian fungsional aplikasi — kode, konfigurasi, logika runtime, pengujian, maupun proses deployment tidak boleh mengimpor, merujuk, atau bergantung pada apa pun di dalamnya. Setelah seluruh milestone awal terbangun dan dirilis, berkas-berkas ini dihapus.'
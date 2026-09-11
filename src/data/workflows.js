export const ROLE_PALETTE = [
  { role: 'Kader', jalur: 'A', desc: 'Pelaksana kunjungan — input data di lapangan', color: 'emerald', chip: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900', dot: 'bg-emerald-500' },
  { role: 'Pengawas', jalur: 'B', desc: 'Kesmas & Kepala Puskesmas (satu peran) — pantau 4 kelurahan', color: 'sky', chip: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900', dot: 'bg-sky-500' },
  { role: 'Admin', jalur: 'D', desc: 'Kelola master data & definisi field', color: 'amber', chip: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900', dot: 'bg-amber-500' },
  { role: 'System', jalur: '-', desc: 'Proses otomatis (cron, agregat, email)', color: 'zinc', chip: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700', dot: 'bg-zinc-500' },
]

export const OVERVIEW_MERMAID = `flowchart LR
  A[Admin<br/>W-B<br/>Master & Field] -->|definisi field| B[Kader<br/>W-C<br/>Input KR]
  B -->|kunjungan selesai| C{System<br/>W-D<br/>Jadwal}
  C -->|pengingat| B
  B -->|agregat + %| D[Pengawas<br/>W-E<br/>Dashboard PWS<br/>KPI % & 5 prioritas]
  D --> E[Pengawas<br/>W-F<br/>Rekap & Ekspor]
  B -.-> E
  D -.->|kandidat v2| F[Pemberdayaan/Nakes/UKGK<br/>di luar v1]
  style A fill:#fffbeb,stroke:#f59e0b,stroke-width:2px
  style B fill:#ecfdf5,stroke:#10b981,stroke-width:2px
  style C fill:#f4f4f5,stroke:#71717a,stroke-width:2px
  style D fill:#f0f9ff,stroke:#0ea5e9,stroke-width:2px
  style E fill:#f0f9ff,stroke:#0ea5e9,stroke-width:2px
  style F fill:#fefce8,stroke:#ca8a04,stroke-dasharray: 5 5`

export const WORKFLOWS = [
  {
    id: 'W-A',
    kode: 'W-A',
    judul: 'Auth & Guard',
    peran: 'Semua Role',
    roleKey: 'zinc',
    file: 'W-A-auth.md',
    ringkas: 'Login 3 peran → guard → redirect per role → profil/logout. Session habis kembali ke login.',
    journey: 'Masuk → Login (3 peran) → Guard peran → Redirect (Kader→Jadwal, Pengawas→Dashboard, Admin→Master) → Profil/Logout. Session habis → kembali ke Login.',
    steps: [
      { no: 1, label: 'Buka halaman Login', actor: 'Semua', icon: 'LogIn' },
      { no: 2, label: 'Masukkan kredensial', actor: 'Semua', icon: 'Key' },
      { no: 3, label: 'Sistem cek peran', actor: 'System', icon: 'Shield' },
      { no: 4, label: 'Masuk ke beranda peran', actor: 'Semua', icon: 'Layout' },
    ],
    mermaid: `flowchart TD
  A[Buka /login] --> B{Masukkan kredensial}
  B -->|Benar| C[Sistem cek peran<br/>Kader / Pengawas / Admin]
  B -->|Salah| B1[Tampilkan pesan<br/>'Kredensial salah'] --> B
  C --> D{Peran?}
  D -->|Kader| E[Ke /jadwal<br/>hijau]
  D -->|Pengawas| F[Ke /dashboard<br/>biru]
  D -->|Admin| G[Ke /master<br/>kuning]
  E --> H{Guard cek izin}
  F --> H
  G --> H
  H -->|Diizinkan| I[Buka halaman]
  H -->|Tidak berhak| J[Pesan 'Tidak berhak'<br/>kembali ke beranda peran]
  H -->|Sesi habis| K[Kembali ke /login<br/>'Sesi habis']
  I --> L[Profil / Keluar] --> A
  style E fill:#ecfdf5,stroke:#10b981
  style F fill:#f0f9ff,stroke:#0ea5e9
  style G fill:#fffbeb,stroke:#f59e0b
  style J fill:#fef2f2,stroke:#ef4444
  style K fill:#fef2f2,stroke:#ef4444`,
    gherkin: [
      { title: 'Login sukses sebagai Kader', given: 'Akun Kader "kader_a" aktif dengan posyandu Ngemplakrejo', when: 'Masukkan username dan password dengan benar', then: 'Masuk ke /jadwal dan bisa buka /kunjungan miliknya' },
      { title: 'Akses terlarang Kader ke Master', given: 'Sudah login sebagai Kader', when: 'Buka /admin/master-kelurahan', then: 'Muncul "Tidak berhak" dan kembali ke /jadwal' },
      { title: 'Sesi habis', given: 'Token sudah kedaluwarsa saat buka /dashboard', when: 'Sistem cek izin', then: 'Kembali ke /login dengan pesan "Sesi habis"' },
    ],
  },
  {
    id: 'W-B',
    kode: 'W-B',
    judul: 'Master Data & Definisi Field Fleksibel',
    peran: 'Admin',
    roleKey: 'amber',
    file: 'W-B-master-field.md',
    ringkas: 'Kelola Kelurahan→RW/RT→Posyandu→Kader→Definisi Field 8 sasaran (tipe/wajib/urutan/aktif).',
    journey: 'Kelola Kelurahan → RW/RT → Posyandu → Kader → Definisi Field per 8 sasaran (Ibu Hamil, Bersalin & Nifas, Bayi 0–6, Balita 6–71, Sekolah/Remaja 6–18, Dewasa 18–59, Lansia >60, TBC) → atur tipe, wajib/opsional, urutan, aktif/nonaktif → Simpan.',
    steps: [
      { no: 1, label: 'Kelola Kelurahan & RW/RT', actor: 'Admin', icon: 'Map' },
      { no: 2, label: 'Kelola Posyandu & Kader', actor: 'Admin', icon: 'Users' },
      { no: 3, label: 'Atur Daftar Isian (Field) per 8 sasaran', actor: 'Admin', icon: 'List' },
      { no: 4, label: 'Simpan & lihat preview', actor: 'Admin', icon: 'Eye' },
    ],
    mermaid: `flowchart TD
  A[Admin masuk] --> B[Kelola Kelurahan]
  B --> C[Kelola RW/RT]
  C --> D[Kelola Posyandu]
  D --> E[Kelola Kader]
  E --> F[Atur Daftar Isian<br/>per 8 sasaran]
  F --> G{Pilih aksi}
  G --> G1[Tambah baru]
  G --> G2[Ubah label/tipe/wajib/urutan]
  G --> G3[Nonaktifkan]
  G1 --> H{Cek duplikat}
  G2 --> H
  G3 --> H
  H -->|OK| I[Simpan]
  H -->|Nama sudah ada| J[Pesan 'Nama sudah ada']
  I --> K[Preview form W-C<br/>Kunjungan baru pakai yang baru<br/>Kunjungan lama tetap tampil]
  style A fill:#fffbeb,stroke:#f59e0b
  style I fill:#ecfdf5,stroke:#10b981
  style J fill:#fef2f2,stroke:#ef4444`,
    gherkin: [
      { title: 'Tambah isian baru saat format Kemenkes berubah', given: 'Isian "Tekanan darah" sudah aktif untuk Dewasa', when: 'Admin tambah "Lingkar perut" tipe angka, tidak wajib, urutan 5', then: 'Isian muncul di form kunjungan Dewasa baru tanpa update aplikasi' },
      { title: 'Nonaktifkan isian lama histori tetap tampil', given: 'Ada kunjungan lama memakai isian "PMO" (TBC)', when: 'Admin nonaktifkan "PMO"', then: 'Kunjungan lama tetap tampil, kunjungan baru tidak menampilkan isian itu' },
      { title: 'Cek duplikat nama isian', given: 'Isian "NIK" sudah ada di Data Keluarga', when: 'Admin buat "NIK" lagi di kelompok sama', then: 'Pesan "Nama sudah ada" dan simpan diblok' },
    ],
  },
  {
    id: 'W-C',
    kode: 'W-C',
    judul: 'Input Kunjungan Rumah Dinamis',
    peran: 'Kader',
    roleKey: 'emerald',
    badge: 'Paling Kritis',
    file: 'W-C-input-kr.md',
    ringkas: 'Kader pilih jadwal/KK → isi Data Keluarga & Anggota → pilih 1 dari 8 sasaran → form dinamis dari W-B → validasi → simpan (1 Jadwal→1 Kunjungan).',
    journey: 'Login Kader → Daftar Jadwal/Kunjungan miliknya → Pilih Jadwal/Keluarga (Cari KK) → Isi Data Keluarga & Anggota → Pilih 1 dari 8 sasaran → Form ter-render dinamis dari W-B → Tandai Masalah & Tindak Lanjut → Validasi wajib → Simpan → status dalam_proses → selesai.',
    steps: [
      { no: 1, label: 'Pilih jadwal / keluarga', actor: 'Kader', icon: 'Calendar' },
      { no: 2, label: 'Isi Data Keluarga & Anggota', actor: 'Kader', icon: 'Users' },
      { no: 3, label: 'Pilih 1 dari 8 sasaran & isi form', actor: 'Kader', icon: 'FileText' },
      { no: 4, label: 'Tandai masalah & tindak lanjut', actor: 'Kader', icon: 'Alert' },
      { no: 5, label: 'Simpan & selesai', actor: 'System', icon: 'Check' },
    ],
    mermaid: `flowchart TD
  A[Kader masuk] --> B[Daftar Jadwal & Kunjungan milikku]
  B --> C{Pilih Jadwal/Keluarga}
  C -->|Cari KK| D[Detail Keluarga<br/>No KK, RT/RW, alamat]
  C -->|Belum ada| D1[Minta Admin buatkan KK]
  D --> E[Isi Data Keluarga & Anggota]
  E --> F[Pilih 1 dari 8 sasaran]
  F --> G[Form otomatis muncul<br/>dari pengaturan Admin]
  G --> H[Isi form + Tandai masalah]
  H --> I{Cek isian}
  I -->|Tidak valid| J[Pesan 'Tidak valid'<br/>perbaiki isian] --> H
  I -->|Jaringan putus| K[Pesan 'Gagal simpan<br/>coba lagi'] --> H
  I -->|OK| L[Simpan kunjungan]
  L --> M[Jadwal jadi selesai]
  M --> N[Masuk ke Dashboard & Rekap]
  style A fill:#ecfdf5,stroke:#10b981
  style G fill:#fffbeb,stroke:#f59e0b
  style J fill:#fef2f2,stroke:#ef4444
  style K fill:#fef3c7,stroke:#f59e0b
  style L fill:#ecfdf5,stroke:#10b981`,
    gherkin: [
      { title: 'Kasus hipertensi tidak patuh (contoh dashboard)', given: 'Keluarga KK-001 RT02/RW04 dan anggota Dewasa Budi sudah ada', when: 'Isi Dewasa: hipertensi sejak 2025-08-01, ada obat ya, minum 24 jam tidak, lalu Simpan', then: 'Kunjungan selesai dan Dashboard hitung +1 hipertensi tidak patuh di RT02' },
      { title: 'Isian wajib kosong diblok', given: 'Isian "NIK" wajib diisi', when: 'Kosongkan NIK lalu Simpan', then: 'Pesan "NIK wajib diisi" dan simpan gagal' },
      { title: 'NIK duplikat ditolak', given: 'NIK 357... sudah ada di anggota lain', when: 'Pakai NIK yang sama lalu Simpan', then: 'Pesan "NIK sudah terdaftar"' },
      { title: 'Jaringan putus', given: 'Koneksi putus saat Simpan', when: 'Tekan Simpan', then: 'Pesan "Gagal simpan, coba lagi" — tidak ada simpan offline' },
    ],
  },
  {
    id: 'W-D',
    kode: 'W-D',
    judul: 'Jadwal & Pengingat',
    peran: 'Kader + System',
    roleKey: 'zinc',
    file: 'W-D-jadwal-notifikasi.md',
    ringkas: 'Admin/Pengawas buat jadwal → Kader lihat miliknya → cron H-1 & terlewat → in-app + email → selesai via W-C.',
    journey: 'Admin/Pengawas buat Jadwal (dusun, RT/RW, nama KK, waktu, kader PJ) → Kader lihat Daftar Jadwal miliknya (filter posyandu/minggu) → System cron cek H-1 & terlewat → Notifikasi in-app + email → Kader tandai Selesai → terhubung ke W-C (1 Jadwal → 1 Kunjungan).',
    steps: [
      { no: 1, label: 'Buat jadwal untuk KK', actor: 'Admin/Pengawas', icon: 'Calendar' },
      { no: 2, label: 'Kader lihat jadwal miliknya', actor: 'Kader', icon: 'Eye' },
      { no: 3, label: 'H-1: pengingat', actor: 'System', icon: 'Bell' },
      { no: 4, label: 'Terlewat: peringatan', actor: 'System', icon: 'Alert' },
      { no: 5, label: 'Selesai via kunjungan', actor: 'Kader', icon: 'Check' },
    ],
    mermaid: `flowchart TD
  A[Admin/Pengawas buat jadwal<br/>KK, kader, waktu] --> B[Jadwal: terjadwal]
  B --> C[Kader lihat daftar jadwal]
  C --> D{Apakah H-1?}
  D -->|Ya 07:00| E[Kirim pengingat<br/>in-app + email<br/>'Besok: KK-002']
  D -->|Tidak| F{Sudah lewat tanggal?}
  F -->|Ya| G[Jadi 'terlewat'<br/>in-app + email<br/>'Terlewat: KK-002']
  F -->|Tidak| C
  E --> H[Kader buat kunjungan W-C]
  G --> H
  H --> I{Kunjungan tersimpan?}
  I -->|Ya| J[Jadwal jadi selesai]
  I -->|Tidak| H
  style A fill:#fffbeb,stroke:#f59e0b
  style E fill:#f0f9ff,stroke:#0ea5e9
  style G fill:#fef2f2,stroke:#ef4444
  style J fill:#ecfdf5,stroke:#10b981`,
    gherkin: [
      { title: 'H-1 kirim pengingat', given: 'Jadwal KK-002 untuk kader A tanggal 2026-09-20', when: 'Jam 07:00 H-1 (2026-09-19)', then: 'In-app badge + email "Besok kunjungan KK-002" ke kader A' },
      { title: 'Jadwal terlewat', given: 'Jadwal 2026-09-10 tanpa kunjungan', when: 'Jam 00:00 tanggal 2026-09-11', then: 'Status jadi terlewat + in-app + email "Terlewat"' },
      { title: 'Tandai selesai', given: 'Jadwal terlewat untuk KK-002', when: 'Kader buat kunjungan untuk KK-002 dan Simpan', then: 'Jadwal jadi selesai dan badge hilang' },
    ],
  },
  {
    id: 'W-E',
    kode: 'W-E',
    judul: 'Dashboard PWS',
    peran: 'Pengawas (+ Kader terbatas)',
    roleKey: 'sky',
    file: 'W-E-dashboard.md',
    ringkas: 'KPI % cakupan + ranking penyakit per RT/RW/kelurahan → filter wilayah/sasaran/5 prioritas/periode → drill-down → agregat anonim (update 11 Sep).',
    journey: 'Login Pengawas → Dashboard ringkasan 4 kelurahan (KPI % cakupan dikunjungi vs belum / total sasaran) → Ranking penyakit + % prevalensi (TBC terpapar) → Filter wilayah/kelompok sasaran/5 program prioritas (Stunting/ODGJ/bumil risti/balita risti/TB)/periode → Drill-down Kelurahan→RW→RT → Rekap anonim.',
    steps: [
      { no: 1, label: 'Lihat ringkasan + KPI % cakupan', actor: 'Pengawas', icon: 'Layout' },
      { no: 2, label: 'Lihat ranking + % prevalensi', actor: 'Semua', icon: 'BarChart' },
      { no: 3, label: 'Filter 5 prioritas & drill-down', actor: 'Semua', icon: 'Filter' },
      { no: 4, label: 'Kader: hanya wilayahnya', actor: 'Kader', icon: 'Shield' },
    ],
    mermaid: `flowchart TD
  A[Masuk sebagai Pengawas/Kader] --> B[Ringkasan 4 kelurahan<br/>KPI % cakupan]
  B --> C[Ranking penyakit + %<br/>per Kelurahan]
  C --> D{Pilih filter}
  D --> E[Wilayah / Sasaran / 5 Prioritas / Periode]
  E --> F[Data terfilter]
  F --> G{Mau drill-down?}
  G -->|Kelurahan ke RW| H[Tampil RW]
  G -->|RW ke RT| I[Tampil RT + jumlah + %]
  G -->|Tidak| J[Ranking agregat]
  H --> I
  I --> K{Siapa yang lihat?}
  K -->|Kader| L[Hanya wilayah binaannya]
  K -->|Pengawas| M[Full 4 kelurahan]
  J --> N[Klik masalah → Rekap]
  style B fill:#f0f9ff,stroke:#0ea5e9
  style L fill:#ecfdf5,stroke:#10b981
  style M fill:#f5f3ff,stroke:#8b5cf6`,
    gherkin: [
      { title: 'KPI % cakupan per kelurahan (baru 11 Sep)', given: 'Total sasaran 100 KK di Ngemplakrejo, 60 sudah dikunjungi', when: 'Buka Dashboard', then: 'Tampil KPI "60% dikunjungi, 40% belum" di card Ngemplakrejo' },
      { title: '% prevalensi TBC (baru 11 Sep)', given: '10 dari 100 warga TBC terpapar', when: 'Lihat ranking TBC', then: 'Tampil "TBC: 10% terpapar" agregat anonim' },
      { title: 'Filter 5 program prioritas (baru 11 Sep)', given: 'Dashboard ada kunjungan semua sasaran', when: 'Filter Prioritas = Stunting', then: 'Hanya tampil sasaran Stunting; 8 siklus hidup tetap di master' },
      { title: 'Drill-down hipertensi per RT', given: 'Ada 18 kunjungan hipertensi tidak patuh di RT02/RW04 periode 2026-09', when: 'Filter Ngemplakrejo + Dewasa + 2026-09 lalu drill-down RW04 → RT02', then: 'Tampil "Hipertensi tidak patuh: 18 — peringkat 1" di RT02' },
      { title: 'Kader hanya lihat wilayahnya', given: 'Kader Ngemplakrejo RT02 sudah login', when: 'Buka dashboard', then: 'Hanya tampil RT02/RW04, filter kelurahan lain tidak aktif — KPI % hanya wilayahnya' },
      { title: 'Filter kosong', given: 'Filter Periode 2025-01 belum ada data', when: 'Terapkan filter', then: 'Pesan "Belum ada kunjungan" + tombol Buat Kunjungan (jika Kader)' },
      { title: 'Agregat anonim', given: 'Kunjungan Budi hipertensi tidak patuh', when: 'Dashboard tampil ranking', then: 'Hanya hitung jumlah/%, tidak tampil NIK/nama' },
    ],
  },
  {
    id: 'W-F',
    kode: 'W-F',
    judul: 'Rekap, Masalah & Ekspor',
    peran: 'Pengawas/Admin',
    roleKey: 'sky',
    file: 'W-F-rekap-ekspor.md',
    ringkas: 'Rekap otomatis agregat + % cakupan/prevalensi per minggu/sasaran/wilayah → Masalah belum/selesai/dirujuk → Ekspor Excel/PDF sesuai filter 5 prioritas (update 11 Sep).',
    journey: 'Pengawas lihat Rekap otomatis (per minggu/sasaran/wilayah, KPI % cakupan & % prevalensi, jumlah masalah) → Ekspor Excel/PDF sesuai filter dashboard + 5 prioritas → Monitor Masalah (belum/selesai/dirujuk) dari W-C.',
    steps: [
      { no: 1, label: 'Lihat rekap otomatis', actor: 'Pengawas', icon: 'Table' },
      { no: 2, label: 'Lihat daftar masalah', actor: 'Pengawas', icon: 'Alert' },
      { no: 3, label: 'Ubah status masalah', actor: 'Pengawas', icon: 'Check' },
      { no: 4, label: 'Ekspor Excel/PDF', actor: 'Pengawas', icon: 'Download' },
    ],
    mermaid: `flowchart TD
  A[Buka Rekap] --> B[Pilih filter<br/>wilayah/sasaran/periode]
  B --> C[Sistem hitung otomatis<br/>per RT/RW/kelurahan]
  C --> D[Tabel rekap<br/>per minggu/sasaran/wilayah]
  D --> E{Lihat masalah?}
  E -->|Ya| F[Daftar: nama, masalah<br/>status belum/selesai/dirujuk]
  F --> G[Ubah status]
  G --> H[Dashboard terupdate]
  E -->|Ekspor| I[Excel / PDF<br/>sesuai filter]
  I --> J[Download file]
  style C fill:#f4f4f5,stroke:#71717a
  style D fill:#f5f3ff,stroke:#8b5cf6
  style J fill:#ecfdf5,stroke:#10b981`,
    gherkin: [
      { title: 'Rekap otomatis mingguan', given: '12 kunjungan minggu ke-2 September (5 Dewasa, 4 Balita, 3 Lansia)', when: 'Buka Rekap', then: 'Tampil angka terhitung otomatis, bukan input manual' },
      { title: 'Ekspor sesuai filter', given: 'Filter Dashboard = Ngemplakrejo + Dewasa', when: 'Klik Ekspor Excel', then: 'File hanya berisi Ngemplakrejo Dewasa sesuai filter' },
      { title: 'Masalah dirujuk', given: 'Masalah TBC pada Ani status belum', when: 'Ubah jadi dirujuk', then: 'Indikator "dirujuk" di dashboard bertambah' },
    ],
  },
]

export const MATRIKS_HAK = [
  { fitur: 'Login & Profil', kader: '✅ Bisa', pengawas: '✅ Bisa', admin: '✅ Bisa' },
  { fitur: 'Master Kelurahan/RW/RT/Posyandu/Kader', kader: '❌ Tidak', pengawas: '❌ Tidak', admin: '✅ Bisa (CRUD)' },
  { fitur: 'Definisi Field Form', kader: '❌ Tidak', pengawas: '❌ Tidak', admin: '✅ Bisa (CRUD)' },
  { fitur: 'Input KR Dinamis (W-C)', kader: '✅ Bisa (miliknya)', pengawas: '❌ Tidak', admin: '❌ Tidak' },
  { fitur: 'Jadwal & Notifikasi (W-D)', kader: '✅ Lihat miliknya', pengawas: '✅ Lihat 4 kel', admin: '✅ Kelola' },
  { fitur: 'Dashboard PWS (W-E)', kader: '✅ Wilayah sendiri', pengawas: '✅ 4 kelurahan', admin: '✅ 4 kelurahan' },
  { fitur: 'Rekap & Ekspor (W-F)', kader: '❌ Tidak', pengawas: '✅ Bisa ekspor', admin: '✅ Bisa ekspor' },
  { fitur: 'Masalah & Tindak Lanjut', kader: '✅ Input', pengawas: '✅ Pantau', admin: '—' },
]

export const STATE_DIAGRAM = [
  'Kunjungan: dalam_proses → selesai',
  'Jadwal: terjadwal → selesai | terjadwal → terlewat → selesai',
  'Masalah: belum → selesai | belum → dirujuk',
  'Field: aktif ↔ nonaktif (histori kunjungan lama tetap pakai snapshot definisi)',
]

export const STATE_MERMAID = `stateDiagram-v2
  [*] --> dalam_proses: Buat baru
  dalam_proses --> selesai: Simpan valid
  dalam_proses --> dalam_proses: Validasi gagal
  selesai --> [*]
  [*] --> terjadwal: Buat jadwal
  terjadwal --> selesai: Kunjungan disimpan
  terjadwal --> terlewat: Lewat tanggal
  terlewat --> selesai: Kunjungan susulan
  selesai --> [*]
  [*] --> belum: Masalah ditemukan
  belum --> selesai: Tindak lanjut selesai
  belum --> dirujuk: Rujuk
  selesai --> [*]
  dirujuk --> [*]`

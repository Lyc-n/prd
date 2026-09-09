---
tags: [prd, requirement, spesifikasi]
created: 2026-09-07
updated: 2026-09-09
status: resmi — acuan pembangunan (update 9 Sep)
up: ["[MOC - Project Posyandu Ngemplakrejo]"]
aliases: [PRD, Product Requirements Document, Product Requirement]
x-review: update 9 Sep — koreksi 8 sasaran, notifikasi in-app+email, Rencana Kerja & Timeline target demo 27 Sep
---

# PRD — Dashboard PWS Posyandu (Wilayah Kerja Puskesmas Trajeng)

> **Tentang berkas ini:** PRD ini beserta folder `01 Notes/milestones/` adalah **artefak dokumentasi & panduan sementara** untuk pembangunan awal aplikasi. Berkas-berkas ini bukan bagian fungsional dari aplikasi — kode, konfigurasi, logika runtime, pengujian, maupun proses deployment tidak boleh mengimpor, membaca, merujuk, atau bergantung pada apa pun di dalamnya. Setelah milestone awal terbangun dan dirilis, seluruh berkas ini dihapus. Jangan perlakukan sebagai dokumentasi jangka panjang.

---

## Ringkasan Dokumen

Dokumen ini adalah evolusi dari [[URS - Dashboard PWS Posyandu]] (draf kebutuhan pengguna) menjadi **PRD — Product Requirements Document** yang siap menjadi acuan bersama untuk pembangunan. Konten disintesis dari seluruh vault: URS, struktur form checklist KR (PDF 35 hlm), temuan interview, konteks kebijakan ILP, dan rencana kegiatan September 2026.

> **Update 9 Sep 2026:** koreksi jumlah **8 kelompok sasaran** (temuan ekstraksi field), keputusan **notifikasi v1 = in-app + email**, dan penambahan **Rencana Kerja & Timeline** (jalur paralel, target demo online 27 Sep).

---

## Yang Kita Bangun

Aplikasi web responsif untuk **digitalisasi pendataan kunjungan rumah (KR) kader Posyandu** di wilayah kerja Puskesmas Trajeng (4 kelurahan: Ngemplakrejo, Tambaan, Trajeng, Mayangan). Kader menginput hasil kunjungan rumah secara digital, data otomatis tampil pada **dashboard PWS (Pemantauan Wilayah Setempat)** sehingga pembina posyandu dan kepala Puskesmas dapat melihat kondisi kesehatan per wilayah, dan kader menerima **pengingat jadwal kunjungan**.

Saat ini proses bersifat manual: form kertas → rekap manual ke Excel → tidak ada dashboard & tidak ada notifikasi. KR baru efektif 2024 dan **format form dari Kementerian Kesehatan belum stabil**, sehingga sistem wajib mendukung perubahan format tanpa pembangunan ulang.

**Stack:** React (frontend web responsif) + Express/Node.js (backend REST API) + PostgreSQL (kolom data fleksibel). Pembangunan dibagi menjadi **4 milestone**, masing-masing menghasilkan fungsi yang bisa diuji langsung di browser.

---

## Apa yang Aplikasi Lakukan

- **Login & peran** — Kader, pembina (Bu Dian), kepala Puskesmas, dan admin masuk dengan hak akses berbeda (input vs baca vs kelola).
- **Input kunjungan rumah digital** — Kader mengisi hasil kunjungan mengikuti struktur form resmi (data keluarga + per kelompok sasaran), termasuk menandai masalah kesehatan yang ditemukan.
- **Form fleksibel** — Admin mengubah struktur form (tambah/edit/nonaktifkan field) **tanpa menulis ulang aplikasi**, mengikuti format Kemenkes yang masih berubah.
- **Dashboard PWS** — Penyakit/masalah kesehatan tertinggi per RT/RW/kelurahan (contoh nyata: hipertensi tidak patuh berobat), dengan filter wilayah, kelompok sasaran, dan waktu.
- **Pengingat jadwal (in-app + email)** — Kader tahu kapan waktunya kunjungan rumah (rutin 1×/tahun atau khusus door-to-door) dan ketika jadwal terlewat; pengingat email otomatis (gratis) sebagai saluran kedua. WhatsApp tidak termasuk v1.
- **Rekap & ekspor** — Rekap otomatis per kelompok sasaran/wilayah menggantikan rekap manual Excel, bisa diekspor ke Excel/PDF.
- **Master data** — Admin mengelola kelurahan, posyandu, kader, dan wilayah RW/RT.

---

## Sudah Tersedia dari Riset Vault

Hasil discovery yang **tidak perlu diulang** saat pembangunan dimulai:

- URS & prioritas kebutuhan [M]/[S]
- Struktur form checklist KR resmi (PDF 35 hlm) — bagian, kelompok sasaran, field, rekapitulasi, jadwal
- **8 kelompok sasaran siklus hidup** (koreksi 9 Sep dari [[Field Checklist KR - Ekstraksi Definisi Operasional]]): Ibu Hamil, Ibu Bersalin & Nifas, Bayi (0–6 bln), Bayi/Balita & Anak Prasekolah (6–71 bln), **Usia Sekolah/Remaja (6–18 thn)**, Usia Dewasa, Lansia, Pengendalian Penyakit Menular (TBC)
- Masalah inti & alur proses kunjungan saat ini (form fisik → rekap manual Excel → tanpa tindak lanjut)
- Konteks kebijakan ILP & timeline KR (dasar keputusan fleksibilitas form)
- Pemetaan stakeholder, pembagian peran tim, dan rencana 3-fasa (target demo online 27 Sep)

> Catatan: **tidak ada kode atau starter template yang sudah ada.** Pembangunan dimulai dari nol di Milestone 1.

---

## Di Luar Cakupan (v1)

- **Bukan pengganti aplikasi resmi Kemenkes** — sistem ini alat PWS tingkat kelurahan/Puskesmas; data tidak dikirim ke server pusat/SatuSehat.
- **Tanpa diagnosis medis** — hanya pencatatan & visualisasi kondisi, bukan sistem pakar penyedia keputusan medis.
- **Tanpa aplikasi mobile native** — cukup web responsif yang bisa dibuka dari HP kader di lapangan.
- **Tanpa notifikasi WhatsApp di v1** — WhatsApp dibuka sebagai pengembangan lanjutan (validasi mitra + pertimbangan biaya). Email reminder free-tier **termasuk v1** sebagai pelengkap notifikasi in-app.
- **Tanpa analitik prediktif / machine learning** — dashboard menggambarkan kondisi aktual, bukan peramalan.
- **Tanpa akses publik / multi-bahasa** — seluruh pengguna harus login.
- **Data aktual 4 kelurahan menunggu izin DPMPTSP** — selama pengembangan, gunakan data contoh/placeholder; data nyata masuk saat izin jadi.

---

## Data Model

Apa yang perlu diingat aplikasi (menjadi dasar ERD/skema pada saat pembangunan; bukan definisi kolom teknis).

### Pengguna & Role
- nama lengkap
- peran: kader, pembina kesmas (Bu Dian), kepala Puskesmas, admin
- posyandu / wilayah binaan (khusus kader & pembina)
- kontak No HP (untuk notifikasi & koordinasi)
- kredensial masuk (sistem login, bukan akun pihak ketiga)

### Kelurahan
- nama kelurahan (Ngemplakrejo, Tambaan, Trajeng, Mayangan)
- wilayah kerja Puskesmas Trajeng
- jumlah posyandu & target KK (terisi setelah data aktual masuk)

### RW / RT
- nomor RW dan nomor RT
- kelurahan tempat berada

### Posyandu
- nama posyandu
- kelurahan tempat berada
- kader yang bertugas
- jadwal kegiatan posyandu (pendukung penjadwalan)

### Keluarga (KK)
- nama kepala keluarga & No. KK
- alamat: jalan/kampung, RT, RW, kelurahan
- jumlah anggota keluarga
- kondisi sanitasi: jamban, air bersih, ventilasi
- jaminan kesehatan yang dimiliki
- penyakit kronis dalam keluarga (TBC, hipertensi, diabetes melitus, gangguan jiwa)

### Anggota Keluarga
- nama lengkap, NIK, tanggal lahir, jenis kelamin
- hubungan dengan kepala keluarga, status perkawinan, pendidikan terakhir, pekerjaan
- kelompok sasaran siklus hidup (satu anggota bisa masuk lebih dari satu penilaian sesuai umur)

### Kunjungan Rumah
- kader yang melaksanakan
- keluarga yang dikunjungi & tanggal kunjungan
- jenis kunjungan: rutin (1×/tahun seluruh KK) atau khusus (door-to-door untuk yang tidak hadir)
- data per kelompok sasaran — isian mengikuti definisi field form (fleksibel)
- status kunjungan (dalam proses / selesai)

### Definisi Field Form ⭐ (kunci fleksibilitas)
- nama field, label yang tampil, bagian form, dan kelompok sasaran terkait
- tipe isian: pilihan / angka / tanggal / kotak centang / teks
- sifat: wajib atau opsional, urutan tampil, aktif atau nonaktif
- Edit oleh admin ini yang menyerap perubahan format Kemenkes tanpa rebuild

### Masalah & Tindak Lanjut
- anggota keluarga terkait
- masalah kesehatan yang ditemukan
- tindak lanjut yang diberikan
- status: belum / selesai / dirujuk

### Jadwal Kunjungan
- keluarga yang dijadwalkan, kader penanggung jawab, waktu kunjungan
- status: terjadwal / selesai / terlewat (dasar pengingat)

**Relasi utama:**
- 1 Kelurahan → banyak RW/RT dan banyak Posyandu
- 1 Posyandu → banyak kader (pengguna)
- 1 Kader → banyak Kunjungan dan banyak Jadwal
- 1 Keluarga → banyak Anggota; 1 Anggota → banyak Masalah & Tindak Lanjut
- Kunjungan mengisi field yang didefinisikan di Definisi Field Form
- 1 Jadwal → 1 Kunjungan (ketika jadwal direalisasikan)

---

## Milestone 1 — Fondasi, Autentikasi & Master Data

Membangun kerangka aplikasi yang bisa diakses pengguna dengan peran berbeda, plus master data wilayah/posyandu/kader dan definisi field form yang menjadi landasan milestonen berikutnya.

### Yang dibangun

- Proyek berjalan (React + Express/Node + PostgreSQL) yang bisa dibuka di browser lokal
- Login untuk 4 peran (kader, pembina, kepala Puskesmas, admin) dengan hak akses berbeda
- Pengelolaan master data: kelurahan, RW/RT, posyandu, pengguna/kader
- Pengelolaan **definisi field form** (tambah/edit/nonaktifkan) sebagai fondasi fleksibilitas form
- Halaman profil & manajemen akun dasar

### Yang TIDAK termasuk di Milestone 1

- Form isian kunjungan rumah (Milestone 2)
- Dashboard visualisasi (Milestone 3)
- Notifikasi & pengingat (Milestone 4)
- Ekspor rekap (Milestone 4)

### Selesai ketika

Admin bisa login, membuat kelurahan/posyandu/kader, mendefinisikan struktur field form, dan pengguna lain bisa login sesuai perannya tanpa kendala.

---

## Milestone 2 — Input Data Kunjungan Rumah (Fleksibel)

Kader bisa menginput hasil kunjungan rumah secara digital mengikuti struktur form resmi yang didefinisikan admin. Ini milestone paling berisiko karena struktur form Kemenkes belum stabil.

### Yang dibangun

- Form input kunjungan yang isiannya mengikuti **definisi field** yang dikelola admin (data keluarga + per kelompok sasaran)
- Alur kader: pilih jadwal/keluarga → isi data keluarga & anggota → isi kelompok sasaran → simpan
- Tambah anggota keluarga & menandai masalah kesehatan beserta tindak lanjut
- Validasi dasar isian (wajib/opsional sesuai definisi field)
- Pencarian & daftar kunjungan milik kader yang sedang login

### Yang TIDAK termasuk di Milestone 2

- Dashboard visualisasi (Milestone 3)
- Notifikasi & pengingat (Milestone 4)
- Rekap & ekspor (Milestone 4)

### Selesai ketika

Kader di lapangan (dari HP) bisa membuat kunjungan baru, data tersimpan, dan isian yang tampil mengikuti definisi admin — mengubah definisi field tidak memerlukan perubahan kode.

---

## Milestone 3 — Dashboard PWS

Pembina dan kepala Puskesmas bisa melihat kondisi kesehatan per wilayah — inti kebutuhan "penyakit tertinggi per RT/RW" dari wawancara.

### Yang dibangun

- Halaman dashboard: ringkasan kondisi per kelurahan
- Visualisasi masalah kesehatan tertinggi per RT/RW/kelurahan (contoh: hipertensi tidak patuh berobat)
- Filter: wilayah, kelompok sasaran, dan periode waktu
- Drill-down dari tingkat kelurahan → RW → RT
- Kuota akses per peran: kader hanya melihat wilayahnya sendiri; pembina/kepala Puskesmas melihat 4 kelurahan

### Yang TIDAK termasuk di Milestone 3

- Notifikasi & pengingat (Milestone 4)
- Rekap & ekspor (Milestone 4)
- Analitik prediktif
- Data aktual nyata (ganti contoh/placeholder sampai izin DPMPTSP)

### Selesai ketika

Pembina bisa memfilter dashboard dan langsung melihat urutan masalah kesehatan per wilayah dari data yang diinput kader.

---

## Milestone 4 — Notifikasi, Rekap & Uji Lapangan

Melengkapi siklus kerja: rekap otomatis + ekspor menggantikan rekap manual, pengingat jadwal untuk kader, dan penyempurnaan untuk uji lapangan/penyerahan.

### Yang dibangun

- Pengingat jadwal kunjungan untuk kader: **in-app** + **email otomatis free-tier** — kunjungan rutin 1×/tahun & khusus
- Penanda status jadwal: terjadwal / selesai / terlewat
- Rekap otomatis per kelompok sasaran dan per wilayah
- Ekspor rekap ke Excel & PDF
- Penyempurnaan kenyamanan penggunaan di HP (hasil pengujian bersama kader)
- Panduan penggunaan singkat untuk kader & admin
- Dokumentasi handover: cara menjalankan & memelihara aplikasi

### Yang TIDAK termasuk di Milestone 4

- Notifikasi WhatsApp (lanjutan, butuh validasi mitra & pertimbangan biaya)
- Aplikasi mobile native
- Integrasi ke server pusat Kemenkes

### Selesai ketika

Kader bisa melihat & menandai jadwalnya, pembina bisa mengekspor rekap, dan aplikasi stabil dipakai dari ponsel pada uji lapangan, ditutup dengan dokumen handover.

---

## Rencana Kerja & Timeline

Rencana kerja paralel tim (3 orang, berbasis task — colek sendiri, tanpa posisi tetap) sampai **target: aplikasi bisa dicoba klien secara online pada 27 September 2026**. Model eksekusi mencatut dari [[Rencana Kegiatan September 2026]] (task board harian). Semua task berjalan paralel di **4 jalur**:

- 🅰️ **Data & Desain** — definisi field, dummy data, wireframe, kasus demo
- 🅱️ **Backend** — API & database
- 🅲️ **Frontend** — antarmuka web responsif
- 🅳️ **Demo & Packing** — deploy online, akun demo, skenario demo, dokumentasi

Task diberi level (🟢 S / 🟡 M / 🔴 L) dan estimasi **tentatif** (dikoreksi setelah URS acc). Tenggat kunci: **14 Sep** (fondasi), **21 Sep** (alur inti kader→dashboard), **27 Sep** (demo online).

### Fasa I — Fondasi (10–14 Sep) · Gate 14 Sep: login + master data jalan

| Task | Deliverable | Level | Est | Depends |
|---|---|---|---|---|
| B1 | Scaffold repo client+server, env, ESLint, script migrate/seed | 🟡 M | 6 jam | — |
| B2 | Skema DB + migration (dari Field Checklist) | 🔴 L | 12 jam | B1 |
| B3 | Auth & role (4 peran) + middleware | 🟡 M | 10 jam | B1 |
| B4 | API CRUD master data (kelurahan, RW/RT, posyandu, kader) | 🟡 M | 10 jam | B3 |
| C1 | Scaffold React + routing + layout + guard peran | 🟡 M | 8 jam | — |
| C2 | Halaman login | 🟢 S | 5 jam | C1 |
| C3 | Halaman master data + definisi field (admin) | 🟡 M | 10 jam | C1, B4 |
| A1 | Seed definisi field 8 kelompok sasaran (dari ekstraksi) | 🔴 L | 10 jam | — |
| A2 | Dummy data 4 kelurahan (KK, anggota, kunjungan) | 🟢 S | 6 jam | A1 |
| A3 | Wireframe & user flow mobile-first | 🟢 S | 8 jam | — |

### Fasa II — Inti (15–21 Sep) · Gate 21 Sep: kader input → dashboard tampil (dummy)

| Task | Deliverable | Level | Est | Depends |
|---|---|---|---|---|
| B5 | API definisi field (CRUD, urutan, aktif/wajib) | 🔴 L | 10 jam | B4 |
| B6 | API kunjungan KR (keluarga+anggota+sasaran+masalah) | 🔴 L | 14 jam | B5 |
| B7 | API dashboard agregat per RT/RW/kelurahan + filter | 🔴 L | 14 jam | B6 |
| C4 | Form input KR **dinamis** (render dari definisi field, mobile) | 🔴 L | 16 jam | B5, B6 |
| C5 | Dashboard PWS (visualisasi, filter, drill-down) | 🔴 L | 14 jam | B7 |
| A4 | Uji isi field dengan dummy + kasus demo kader | 🟢 S | 4 jam | A2, C4 |

### Fasa III — Finalisasi, Deploy, Demo (22–27 Sep) · Demo online 27 Sep

| Task | Deliverable | Level | Est | Depends |
|---|---|---|---|---|
| B8 | API notifikasi/pengingat jadwal + email (free-tier) | 🟡 M | 12 jam | B6 |
| B9 | API rekap & ekspor | 🟡 M | 8 jam | B6 |
| C6 | Notifikasi in-app + daftar jadwal kader | 🟡 M | 8 jam | B8 |
| C7 | Rekap & ekspor Excel/PDF | 🟢 S | 6 jam | B9 |
| C8 | Polish mobile, loading/error, aksesibilitas | 🟡 M | 8 jam | C4, C5 |
| D1 | **Deploy online**: Vercel (frontend) + backend (Render/Railway) + Supabase (PostgreSQL) | 🟡 M | 6 jam | inti B/C |
| D2 | Akun demo 4 peran + data placeholder | 🟢 S | 2 jam | D1 |
| D3 | Script demo 15 menit + uji dari HP client | 🟢 S | 3 jam | D2 |
| D4 | Dokumentasi ringkas + draft handover | 🟢 S | 4 jam | — |

**Perhatian & risiko:**
- Data real 4 kelurahan menunggu izin DPMPTSP → demo memakai **data dummy**; data nyata disuntik setelah izin keluar.
- Format form Kemenkes belum stabil → seluruh rancangan bergantung pada **definisi field** (tidak boleh hard-code).
- Notifikasi (B8, C6), rekap/ekspor (B9, C7) bersifat **bonus** bila waktu Fasa III menipis; prioritas demo: D1–D3.
- L-01 *Logbook* Asah/Dicoding per individu berjalan terus di sela-sela (bukan task bersama).

---

## Pertanyaan Terbuka (perlu validasi mitra)

Ditandai sebagai risiko yang belum terkunci di PRD ini:

- [ ] **Bentuk notifikasi final** — v1 = in-app + email; konfirmasi saluran yang benar-benar dipakai kader (WhatsApp/email/app) serta kepada siapa dan trigger-nya
- [ ] **Rencana demo 27 Sep 2026** — konfirmasi kesediaan mitra (Bu Dian / Kepala Puskesmas) menerima demo online (link, bisa dari HP/PC) sesuai [[Rencana Kegiatan September 2026]]
- [ ] **Data individu vs agregat** — tampilkan per orang atau cukup per wilayah (privasi)?
- [ ] **Batasan akses data** — siapa boleh melihat data apa (kader, pembina, kepala Puskesmas, admin)?
- [ ] **Tren waktu** — perlu perbandingan data antar tahun?
- [ ] **Jumlah pasti posyandu & target KK** per kelurahan (dari Bu Dian setelah DPMPTSP)
- [ ] **Operator harian sistem** setelah handover

## Terkait
- [[URS - Dashboard PWS Posyandu]]
- [[Checklist Kunjungan Rumah - Dokumentasi Form]]
- [[Temuan Interview - Ekstraksi]]
- [[Konteks Kebijakan ILP dan Siklus Hidup]]
- [[Field Checklist KR - Ekstraksi Definisi Operasional]]
- [[Rencana Kegiatan September 2026]]
- [[MOC - Project Posyandu Ngemplakrejo]]
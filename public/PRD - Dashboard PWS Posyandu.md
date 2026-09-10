---
tags: [prd, requirement, spesifikasi]
created: 2026-09-07
updated: 2026-09-11
status: resmi — acuan pembangunan (update 11 Sep: persentase dashboard + 5 program prioritas + usulan supervisi kandidat v2)
up: ["[MOC - Project Posyandu Ngemplakrejo]"]
aliases: [PRD, Product Requirements Document, Product Requirement]
x-review: update 11 Sep — tambah metrik % cakupan dashboard, filter 5 prioritas (stunting/ODGJ/bumil risti/balita risti/TB), modul usulan supervisi (nakes/UKGK/pemberdayaan/biodata kader) kandidat v2, opsi deploy gabung website Puskesmas
---

# PRD — Dashboard PWS Posyandu (Wilayah Kerja Puskesmas Trajeng)

> **Tentang berkas ini:** PRD ini beserta folder `01 Notes/milestones/` adalah **artefak dokumentasi & panduan sementara** untuk pembangunan awal aplikasi. Berkas-berkas ini bukan bagian fungsional dari aplikasi — kode, konfigurasi, logika runtime, pengujian, maupun proses deployment tidak boleh mengimpor, membaca, merujuk, atau bergantung pada apa pun di dalamnya. Setelah milestone awal terbangun dan dirilis, seluruh berkas ini dihapus. Jangan perlakukan sebagai dokumentasi jangka panjang.

---

## Ringkasan Dokumen

Dokumen ini adalah evolusi dari [[URS - Dashboard PWS Posyandu]] (draf kebutuhan pengguna) menjadi **PRD — Product Requirements Document** yang siap menjadi acuan bersama untuk pembangunan. Konten disintesis dari seluruh vault: URS, struktur form checklist KR (PDF 35 hlm), temuan interview, konteks kebijakan ILP, dan rencana kegiatan September 2026.

> **Update 9 Sep 2026:** koreksi jumlah **8 kelompok sasaran** (temuan ekstraksi field), keputusan **notifikasi v1 = in-app + email**, dan penambahan **Rencana Kerja & Timeline** (jalur paralel, target demo online 27 Sep).
> **Update 10 Sep 2026:** tambah **Workflow Aplikasi** (6 alur inti, User Journey per role, 25+ skenario Gherkin, diagram Mermaid di Obsidian). Asumsi: **online only** (tanpa mode offline/draft). Artefak workflow disimpan di **vault (`01 Notes/workflows/`) + repo (`docs/workflows/`)** — keduanya sinkron.
> **Update 11 Sep 2026:** Rekaman 05:50 — **persentase cakupan dashboard** (`% dikunjungi vs belum dari total sasaran`), **% penderita TBC/terpapar**, filter **5 program prioritas** (Stunting, ODGJ, bumil risti, balita risti, TB) untuk "data sasaran yang akan dikunjungi", serta **4 modul usulan supervisi kandidat v2** (nakes, UKGK/UKGM, pemberdayaan kader+tanggal/peserta/foto, biodata kader per pos) + konfirmasi **Excel tok** & **opsi deploy gabung website Puskesmas (Bu Marten)**. Lihat [[Transkrip - Rekaman Diskusi Persentase dan Tambahan Supervisi]].

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
- **Dashboard PWS** — Penyakit/masalah kesehatan tertinggi per RT/RW/kelurahan (contoh nyata: hipertensi tidak patuh berobat), dengan filter wilayah, kelompok sasaran, dan waktu; plus **% cakupan kunjungan** (`dikunjungi vs belum / total sasaran`) dan **% prevalensi per penyakit** (mis. TBC terpapar) — *update 11 Sep rekaman 00:07–00:12*.
- **Filter prioritas 5 program** — view "data sasaran yang akan dikunjungi" **hanya 5 prioritas**: Stunting, ODGJ, bumil risti, balita risti, TB (bukan 8 sasaran penuh) — *usulan supervisi 11 Sep [01:24]*, pending validasi.
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
> **Konvensi Workflow (10 Sep):** diagram alur memakai **Mermaid di Obsidian**; setiap alur dilengkapi **User Journey per role + skenario Given-When-Then**; asumsi **online** (tanpa sync offline); artefak disimpan di **vault dan repo**.

---

## Di Luar Cakupan (v1)

- **Bukan pengganti aplikasi resmi Kemenkes** — sistem ini alat PWS tingkat kelurahan/Puskesmas; data tidak dikirim ke server pusat/SatuSehat.
- **Tanpa diagnosis medis** — hanya pencatatan & visualisasi kondisi, bukan sistem pakar penyedia keputusan medis.
- **Tanpa aplikasi mobile native** — cukup web responsif yang bisa dibuka dari HP kader di lapangan.
- **Tanpa notifikasi WhatsApp di v1** — WhatsApp dibuka sebagai pengembangan lanjutan (validasi mitra + pertimbangan biaya). Email reminder free-tier **termasuk v1** sebagai pelengkap notifikasi in-app.
- **Tanpa analitik prediktif / machine learning** — dashboard menggambarkan kondisi aktual, bukan peramalan.
- **Tanpa akses publik / multi-bahasa** — seluruh pengguna harus login.
- **Data aktual 4 kelurahan menunggu izin DPMPTSP** — selama pengembangan, gunakan data contoh/placeholder; data nyata masuk saat izin jadi.
- **Tanpa mode offline/draft di v1** — asumsi online only (keputusan 10 Sep); kader harus terhubung internet saat input (sesuai URS availability seluler, tapi tanpa queue offline).
- **Kandidat v2 — usulan supervisi 11 Sep (pending validasi, tidak masuk v1 sebelum definisi jelas):** **Fitur Nakes**, **UKGK/UKGM** (Usaha Kesehatan Gigi — singkatan perlu klarifikasi), **Kegiatan Pemberdayaan Kader** (tanggal, peserta hadir, foto — untuk lihat siapa yang dikumpulkan atasi masalah UKGK), **Biodata Kader per Pos** — lihat [[Transkrip - Rekaman Diskusi Persentase dan Tambahan Supervisi]] § Implikasi. Jika diminta masuk v1, tambah risiko & task.

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

### Kandidat v2 — Entitas Usulan Supervisi 11 Sep (pending, tidak masuk ERD v1)
- **Nakes** — master tenaga kesehatan Puskesmas (biodata nakes) — belum ada field pasti [rekaman 01:18]
- **Biodata Kader per Pos** — profil kader di pos (nama, pendidikan, foto?) [01:39]
- **Kegiatan Pemberdayaan** — tanggal kegiatan, peserta hadir (list nama), foto — untuk UKGK [02:39]
- **UKGK / UKGM** — kegiatan UKG (gigi) — singkatan perlu klarifikasi [01:58]
> Catatan: jangan masuk skema v1 sebelum validasi — lihat `Di Luar Cakupan` kandidat v2.

**Relasi utama:**
- 1 Kelurahan → banyak RW/RT dan banyak Posyandu
- 1 Posyandu → banyak kader (pengguna)
- 1 Kader → banyak Kunjungan dan banyak Jadwal
- 1 Keluarga → banyak Anggota; 1 Anggota → banyak Masalah & Tindak Lanjut
- Kunjungan mengisi field yang didefinisikan di Definisi Field Form
- 1 Jadwal → 1 Kunjungan (ketika jadwal direalisasikan)

---

## Persyaratan Non-Fungsional (NFR)

> 7 NFR terukur untuk v1. Sumber: `URS §5` (6 aspek) + keputusan 10 Sep `online only` + `Batasan Kegiatan Sebelum Izin` + `Perizinan DPMPTSP`. Tiap NFR punya target ukur, kriteria penerimaan, dan cara uji — agar dev & mitra sepakat "selesai itu seperti apa".

| ID | Aspek | Target Ukur (v1) | Kriteria Penerimaan | Cara Uji | Prioritas | Sumber |
|---|---|---|---|---|---|---|
| **NFR-01** | **Kegunaan (Usability)** — kader non-teknis, minim pelatihan, mobile-first | Alur W-C (input KR) selesai <3 menit di HP 360px; 90% kader coba pertama berhasil tanpa bantuan | Form langkah 1→5 jelas, label plain, inline error di field yang salah, tombol besar untuk jempol | Uji 5 kader pakai HP sendiri (360–414px) rekam waktu + error rate | **[M]** | `URS §5 Usability`, `W-C`, `Rencana C8` |
| **NFR-02** | **Keluwesan (Fleksibilitas)** — adaptasi format Kemenkes tanpa rebuild | Tambah/nonaktifkan field via W-B tanpa deploy; perubahan tampil di W-C <5 detik setelah simpan | Definisi field `tipe/wajib/urutan/aktif` tersimpan, kunjungan lama pakai snapshot (histori tidak hilang) | Admin tambah field `Lingkar perut` → buat kunjungan baru → cek render | **[M]** | `URS §4.6`, `Konteks ILP:92`, `Field Checklist:124` |
| **NFR-03** | **Ketersediaan & Akses** — ponsel/data terbatas, online only | TTI <3s di 3G; error jaringan = toast retry (tanpa antrian offline) | Semua simpan langsung ke server; `Gagal simpan, periksa koneksi, coba lagi` `W-C` | Throttle 3G di DevTools → buka dashboard & simpan | **[M]** | `URS Availability`, `PRD Di Luar Cakupan:73` |
| **NFR-04** | **Keamanan & Privasi** — data kesehatan sensitif, guard peran, agregat anonim | 4 peran guard benar; Kader tidak bisa paksa `?kelurahan=Tambaan` (403); Dashboard tanpa NIK | Matriks hak akses `Workflow:160`, JWT expiry → login `W-A`, dashboard tanpa NIK `W-E` | Coba akses silang peran + cek response 403/401 | **[M]** | `URS Keamanan`, `Batasan:36`, `W-A/W-E` |
| **NFR-05** | **Skalabilitas** — 4 kelurahan + Pustu, banyak KK | Mendukung 4 kelurahan wajib + 8 sasaran + ratusan KK/kelurahan tanpa perubahan skema | Kelurahan `Ngemplakrejo/Tambaan/Trajeng/Mayangan` + RW/RT + Posyandu + Kader seed `Rencana A1/A2` | Seed 500 KK dummy → cek dashboard & filter tetap lancar | **[S]** | `URS Skalabilitas`, `Stakeholder:55`, `Rencana A2` |
| **NFR-06** | **Kinerja (Performance)** — dashboard agregat responsif | p95 `GET /api/dashboard` agregat <500ms (100 kunjungan); pagination/lazy untuk 500+ baris | Agregat `COUNT per RT/RW` + filter `wilayah/sasaran/periode` `W-E`, pagination | k6/Artillery 100 kunjungan → ukur p95 | **[S]** | `URS Performance`, `W-E` |
| **NFR-07** | **Keteramatan (Observability)** — audit & keterlacakan untuk demo/handover | Setiap kunjungan punya `created_by/at`, rekap ekspor jejak filter, log audit | `created_by/at` di Kunjungan/Jadwal/Masalah, ekspor sesuai filter `W-F` | Buat kunjungan → cek audit trail + ekspor | **[S]** | `W-F`, `Data Model` |

---

## Ketergantungan & Asumsi & Risiko (Dependencies & Assumptions & Risks)

> Dibuat 10 Sep — keputusan `1 digabung, 2 setuju, 3 cukup di vault (hak cipta tidak masuk PRD)`. Risiko hak cipta tetap di vault `Isu Pembagian Hak Cipta` saja (tidak dimasukkan PRD sesuai instruksi).

### Ketergantungan (Dependencies)

| Jenis | Apa | Dampak jika telat/gagal | Mitigasi / Pemilik |
|---|---|---|---|
| **Eksternal** | **DPMPTSP** — Surat universitas → MPP 10 menit → izin → data 4 kelurahan `Perizinan:17` `Temuan:54` | Data real tertunda; demo pakai dummy | **Dummy 4 kelurahan** `Rencana A2` + `PRD Perhatian:72` (5 Sep, 9 Sep). Pemilik: Feri (Pasuruan) U-03 |
| **Eksternal** | **Format Kemenkes** belum fix `Konteks:92` `Temuan:165` | Field berubah | **Definisi Field fleksibel** `NFR-02` `W-B` (tanpa rebuild). Pemilik: Admin |
| **Eksternal** | **Dinkes** — cetak form akhir 2025 `Konteks:64` | Acuan field | Pakai PDF 35 hlm `Checklist:37` + `Field Checklist:13` 8 sasaran |
| **Eksternal** | **Mitra (Bu Dian/Kepala Puskesmas)** — validasi URS & demo 27 Sep `QNA:299` | Scope meleset | **Validasi U-01/U-02** `Rencana:72` (follow-up WA) |
| **Eksternal** | **Infra free-tier** — Vercel + Render/Railway + Supabase `Rencana D1` | Limit kuota | Pilih free-tier + fallback, akun demo D2 |
| **Internal** | **W-B → W-C → W-E/W-F** `Workflow:153` + **B1→B2→B3→…** `tasks.js:46` | Jika B2/B5 telat, L besar menghambat | Prioritas L dulu (B2, B5, B6, C4, C5), jalur paralel A/B/C |

### Asumsi (Assumptions)

| # | Asumsi | Dasar | Jika salah |
|---|---|---|---|
| A-01 | KR belum matang (baru 2024, sedikit) `Konteks:62` — sistem dukung proses berkembang, bukan otomasi stabil | `Konteks:74` | Perlu onboarding kader lebih intensif (notifikasi W-D) |
| A-02 | Kader butuh pengingat (sering terlambat) `Temuan:88` | `Temuan:88` | Pengingat jadi fitur utama, bukan bonus |
| A-03 | Dashboard agregat dulu (privasi) `Batasan:36` — tanpa NIK di ranking | `Batasan:36` `W-E:66` | Jika butuh detail individu → guard ketat `BR-19` |
| A-04 | Online only `PRD:73` — kader online saat input | Keputusan 10 Sep | Jika offline dibutuhkan → tambah queue (di luar v1) |
| A-05 | Demo pakai dummy, data real setelah izin `PRD:72` | `Rencana A2` | Jika izin cepat → ganti seed dengan data real (migrasi) |

### Risiko (Risks)

| ID | Risiko | Dampak | Mitigasi | Pemilik |
|---|---|---|---|---|
| R-01 | Format berubah lagi | Field tidak cocok | **NFR-02** fleksibel + snapshot histori `W-B:22` | Admin |
| R-02 | DPMPTSP telat | Data real telat | Dummy `Rencana A2`, 4 kelurahan wajib `Stakeholder:55` | Feri |
| R-03 | Beban 4 kelurahan (ratusan KK) lambat | Dashboard lemot | **NFR-06** p95 <500ms + pagination `W-E:102` | Backend |
| R-04 | Notifikasi bonus terpotong waktu | Demo tanpa pengingat | Prioritas D1–D3 `PRD:518`, B8/C6 bonus `Rencana` | Tim |
| R-05 | Guard peran bocor | Privasi | **NFR-04** + BR-01…04 + test 403 `W-A` | Backend |

> Hak cipta Unesa vs putra daerah `Isu Hak Cipta:6` **tidak dimasukkan PRD** (sesuai keputusan 3) — tetap di vault `Isu Pembagian Hak Cipta` untuk diskusi pembimbing.

---

## Aturan Bisnis (Business Rules)

> 25 aturan bernomor + label manusia. Tiap BR: Trigger → Kondisi → Aksi → Contoh → Sumber → Workflow. Traceable ke Gherkin.

### Akses & Peran (BR-01 … BR-04)

| ID | Label Manusia | Trigger → Kondisi → Aksi | Contoh | Sumber | Workflow |
|---|---|---|---|---|---|
| **BR-01** | Kader hanya wilayahnya | Buka dashboard → jika peran=Kader → hanya RT/RW binaannya; `?kelurahan=Tambaan` paksa → 403 | Kader Ngemplakrejo RT02 buka Tambaan → 403 | `W-E:66` `PRD Matriks:160` | W-E, W-A |
| **BR-02** | 4 peran guard | Request API → cek JWT + role → izinkan/tolak per matriks | `POST /api/kunjungan` hanya Kader | `PRD Matriks:160` `W-A` | W-A, W-B, W-C |
| **BR-03** | Admin kelola master & field | Jika peran≠Admin → blok `POST /api/master/*`, `POST /api/definisi-field` | Kader buka `/admin/definisi-field` → 403 | `PRD Matriks:160` `W-B` | W-B |
| **BR-04** | Sesi habis → login | Token expiry → 401 → redirect `/login` + pesan `Sesi habis` | Buka `/dashboard` expiry → `/login` | `W-A` | W-A |

### Kunjungan (BR-05 … BR-09)

| ID | Label | Trigger → Kondisi → Aksi | Contoh | Sumber | Workflow |
|---|---|---|---|---|---|
| **BR-05** | Satu Jadwal satu Kunjungan | Simpan kunjungan → `Jadwal.status=terjadwal/terlewat` → jadi `selesai` | Jadwal KK-002 → simpan kunjungan → badge hilang | `PRD:145` `W-D` `W-C` | W-D, W-C |
| **BR-06** | Status kunjungan | Buat → `dalam_proses` → simpan valid → `selesai` | Validasi gagal → tetap `dalam_proses` | `PRD:173` `W-C` | W-C |
| **BR-07** | Jenis kunjungan | Pilih jenis → `rutin 1×/tahun seluruh KK` vs `khusus door-to-door` | Rutin vs khusus jadi filter W-E | `Konteks:70` `Data Model:119` | W-C, W-E |
| **BR-08** | NIK unik | Simpan anggota → cek NIK duplikat async (online) → tolak jika ada | NIK `357...` sudah ada → `NIK sudah terdaftar` | `W-C:40` | W-C |
| **BR-09** | Validasi wajib | Simpan → cek `wajib=true` & tipe → inline error jika kosong/salah | NIK wajib kosong → `NIK wajib diisi` | `W-C:38` `W-B` | W-C, W-B |

### Field Fleksibel (BR-10 … BR-16)

| ID | Label | Trigger → Kondisi → Aksi | Contoh | Sumber | Workflow |
|---|---|---|---|---|---|
| **BR-10** | Snapshot histori | Nonaktifkan field → kunjungan lama tetap tampil snapshot, baru tidak render | PMO TBC dinonaktif → lama tampil | `W-B:22` `PRD:173` | W-B, W-C |
| **BR-11** | Tambah field tanpa deploy | Admin tambah field → simpan → kunjungan baru langsung render | `Lingkar perut` angka urutan 5 | `PRD:40` `W-B:22` | W-B, W-C |
| **BR-12** | Urutan tampil | Ubah urutan → preview & W-C ikut urutan baru | Drag B ke 1 → B(1) | `W-B:22` | W-B |
| **BR-13** | Wajib/opsional | Ubah wajib → validasi W-C ikut | `Tgl lahir` wajib→opsional → boleh kosong | `W-B:22` `BR-09` | W-B, W-C |
| **BR-14** | Tipe isian | Pilih tipe → `pilihan/angka/tanggal/checkbox/teks` | Tekanan darah angka | `Data Model:125` | W-B, W-C |
| **BR-15** | Duplikat diblok | Buat field nama sama di kelompok sama → `Nama sudah ada` | NIK duplikat di Data Keluarga | `W-B:22` | W-B |
| **BR-16** | 8 sasaran tetap | Definisi per 8 sasaran + Data Keluarga/Rekap/Jadwal | Sekolah/Remaja ⭐ 6–18 | `Field Checklist:13` | W-B |

### Dashboard & Rekap (BR-17 … BR-22)

| ID | Label | Trigger → Kondisi → Aksi | Contoh | Sumber | Workflow |
|---|---|---|---|---|---|
| **BR-17** | Agregat COUNT per wilayah | Dashboard → `COUNT` per masalah per RT/RW/Kelurahan | RT02: `Hipertensi 18` | `W-E:44` | W-E |
| **BR-18** | Hipertensi tidak patuh | Hitung → `ada_obat=true AND minum_24jam=false` | Budi hipertensi tidak patuh | `Field Checklist:84` `W-C:39` | W-C, W-E |
| **BR-19** | Agregat anonim tanpa NIK | Render ranking → tanpa NIK/nama di card | Ranking tanpa NIK, klik → rekap anonim | `W-E:66` `Batasan:36` | W-E |
| **BR-20** | Drill-down | Pilih Kelurahan→RW→RT | Ngemplakrejo→RW04→RT02 | `W-E:25` `PRD Milestone3` | W-E |
| **BR-21** | Rekap agregat terhitung | Buka Rekap → bukan input manual, hitung dari kolom sasaran | Minggu ke-2: 12 kunjungan | `Field Checklist:104` `W-F:46` | W-F |
| **BR-22** | Ekspor sesuai filter | Klik Ekspor → file sesuai filter aktif | Ngemplakrejo+Dewasa → xlsx itu saja | `W-F:46` | W-F |

### Jadwal & Notifikasi (BR-23 … BR-25)

| ID | Label | Trigger → Kondisi → Aksi | Contoh | Sumber | Workflow |
|---|---|---|---|---|---|
| **BR-23** | H-1 pengingat | Cron 07:00 H-1 → in-app + email `Besok: KK-002` | KK-002 tgl 20 → 19 07:00 kirim | `W-D:44` | W-D |
| **BR-24** | Terlewat | 00:00+1 tanpa kunjungan → `terlewat` + `Terlewat: KK-002` | 10 Sep tanpa kunjungan → 11 Sep terlewat | `PRD:173` `W-D` | W-D |
| **BR-25** | Masalah dirujuk | Ubah `belum→dirujuk` → indikator dashboard + rekap | TBC Ani dirujuk | `PRD:173` `W-F:46` | W-F, W-E |

---

## Workflow Aplikasi (App Workflows Only)

> Scope: hanya alur **di dalam aplikasi** (bukan workflow kegiatan/perizinan). 6 alur inti + User Journey per role + skenario Gherkin. Diagram: **Mermaid di Obsidian** (`01 Notes/workflows/`), sinkron ke **repo `docs/workflows/`**. Asumsi: **online only** (tanpa draft offline).

### Prinsip Workflow

- **4 peran** dengan guard berbeda: Kader (input wilayah sendiri), Pembina Kesmas & Kepala Puskesmas (baca 4 kelurahan), Admin (kelola master + field) — sesuai § Apa yang Aplikasi Lakukan.
- **Form fleksibel adalah engine:** W-B (Admin definisi) → W-C (Kader render dinamis). Perubahan field tidak rebuild — `Field Checklist KR - Ekstraksi Definisi Operasional` = sumber 8 sasaran.
- **Online only (10 Sep):** semua simpan langsung ke server; tidak ada antrian offline/draft lokal. Error jaringan = toast retry, bukan sync latar.
- **Simpan di keduanya:** vault (`01 Notes/workflows/`) = konteks domain; repo (`docs/workflows/`) = dekat kode. Keduanya Mermaid.

### Matriks Hak Akses (ringkas)

| Fitur | Kader | Pembina | Kepala Puskesmas | Admin |
|---|---|---|---|---|
| Login & Profil | ✅ | ✅ | ✅ | ✅ |
| Master Kelurahan/RW/RT/Posyandu/Kader | ❌ | ❌ (baca) | ❌ (baca) | ✅ CRUD |
| Definisi Field Form | ❌ | ❌ | ❌ | ✅ CRUD |
| Input KR Dinamis (W-C) | ✅ miliknya | ❌ | ❌ | ❌ |
| Jadwal & Notifikasi (W-D) | ✅ lihat miliknya | ✅ lihat 4 kel | ✅ lihat 4 kel | ✅ kelola |
| Dashboard PWS (W-E) | ✅ wilayah sendiri | ✅ 4 kelurahan | ✅ 4 kelurahan | ✅ 4 kelurahan |
| Rekap & Ekspor (W-F) | ❌ | ✅ ekspor | ✅ ekspor | ✅ ekspor |
| Masalah & Tindak Lanjut | ✅ input | ✅ monitor | ✅ monitor | — |

### State Diagram (ringkas)

```
Kunjungan: dalam_proses → selesai
Jadwal: terjadwal → selesai | terjadwal → terlewat → selesai
Masalah: belum → selesai | belum → dirujuk
Field: aktif ↔ nonaktif (histori kunjungan lama tetap pakai snapshot definisi)
```

### W-A — Auth & Guard (Semua Role)

**User Journey:**
Masuk → Login (4 peran) → Guard peran → Redirect (Kader→Jadwal, Pembina/Kepala→Dashboard, Admin→Master) → Profil/Logout. Session expiry → kembali ke Login.

**Mermaid:** `01 Notes/workflows/W-A-auth.md` / `docs/workflows/W-A-auth.md`

**Skenario Gherkin (pilihan):**
```gherkin
Scenario: Login sukses sebagai Kader
  Given akun Kader aktif dengan posyandu Ngemplakrejo
  When input kredensial benar
  Then redirect ke /jadwal dan guard izinkan /kunjungan/* miliknya

Scenario: Akses terlarang
  Given login sebagai Kader
  When buka /admin/master-kelurahan
  Then 403 + toast "Tidak berhak" dan redirect ke /jadwal

Scenario: Session habis
  Given token kedaluwarsa saat buka /dashboard
  When guard cek auth
  Then redirect ke /login dengan pesan "Sesi habis"
```

### W-B — Master Data & Definisi Field Fleksibel (Admin)

**User Journey (Admin):**
Kelola Kelurahan → RW/RT → Posyandu → Kader → Definisi Field per 8 sasaran (Ibu Hamil, Bersalin & Nifas, Bayi 0–6, Balita 6–71, Sekolah/Remaja 6–18 ⭐, Dewasa 18–59, Lansia >60, TBC + Data Keluarga/Rekap/Tindak Lanjut/Jadwal) → atur tipe (pilihan/angka/tanggal/checkbox/teks), wajib/opsional, urutan, aktif/nonaktif → Simpan.

**Mermaid:** `01 Notes/workflows/W-B-master-field.md` / `docs/workflows/W-B-master-field.md`

**Skenario Gherkin:**
```gherkin
Scenario: Admin tambah field baru saat format Kemenkes berubah
  Given definisi field "Tekanan darah" aktif untuk Dewasa
  When admin tambah field "Lingkar perut" tipe angka, wajib=false, urutan=5
  Then field muncul di form W-C kunjungan baru tanpa deploy

Scenario: Nonaktifkan field lama histori tetap valid
  Given ada kunjungan lama memakai field "PMO" (TBC)
  When admin nonaktifkan "PMO"
  Then kunjungan lama tetap tampil snapshot, kunjungan baru tidak render field itu

Scenario: Validasi duplikat & urutan
  Given field "NIK" sudah ada di Data Keluarga
  When admin buat field "NIK" lagi di kelompok sama
  Then error "Nama field sudah ada" dan simpan diblok
```

### W-C — Input Kunjungan Rumah Dinamis (Kader, Paling Kritis)

**User Journey (Kader, mobile-first, online):**
Login Kader → Daftar Jadwal/Kunjungan miliknya → Pilih Jadwal/Keluarga (Cari KK: nama KK/No KK/RT/RW) → Isi Data Keluarga & Anggota (NIK, tgl lahir, JK, hub KK, pendidikan, pekerjaan, kelompok sasaran) → Pilih 1 dari 8 sasaran → Form ter-render dinamis dari W-B (contoh Dewasa: periksa setahun terakhir, terdiagnosa hipertensi/DM, ada obat, minum 24 jam; BaHa, suhu, buku KIA, edukasi, paraf) → Tandai Masalah & Tindak Lanjut → Validasi wajib → Simpan → status `dalam_proses → selesai`.

**Mermaid:** `01 Notes/workflows/W-C-input-kr.md` / `docs/workflows/W-C-input-kr.md`

**Skenario Gherkin (inti 7):**
```gherkin
Scenario: Happy path hipertensi tidak patuh (kasus dashboard)
  Given keluarga KK-001 RT02/RW04 Ngemplakrejo dan anggota Dewasa Budi
  When kader isi Dewasa: terdiagnosa hipertensi=2025-08-01, ada obat=true, minum 24 jam=false
  And simpan kunjungan
  Then kunjungan selesai dan dashboard W-E hitung +1 hipertensi tidak patuh di RT02

Scenario: Field wajib kosong diblok
  Given definisi "NIK" wajib=true
  When kader kosongkan NIK dan tekan Simpan
  Then inline error "NIK wajib diisi" dan simpan gagal

Scenario: NIK duplikat
  Given NIK 357... sudah ada di anggota lain
  When kader pakai NIK sama
  Then error "NIK sudah terdaftar" (cek async, online)

Scenario: Keluarga belum di-master
  Given KK "Siti" belum ada di master
  When kader cari "Siti" tidak ketemu
  Then tampil CTA "Minta Admin buatkan KK" atau tombol Buat Keluarga (jika diizinkan) → lanjut isi

Scenario: Definisi berubah saat mengisi
  Given kader sedang isi Bayi 0–6
  When admin ubah definisi field Bayi di tab lain
  Then toast "Definisi diperbarui, muat ulang" dan form re-render terbaru sebelum simpan

Scenario: Anggota masuk 2 sasaran
  Given Balita Ani umur 5 thn juga kontak TBC
  When kader selesai isi Balita 6–71
  Then bisa Tambah Penilaian TBC untuk Ani di kunjungan sama

Scenario: Error jaringan online
  Given koneksi putus saat Simpan
  When tekan Simpan
  Then toast "Gagal simpan, periksa koneksi, coba lagi" (tidak ada draft offline)
```

### W-D — Jadwal & Pengingat (Kader + System)

**User Journey:**
Admin/Pembina buat Jadwal (dusun, RT/RW, nama KK, waktu, kader PJ) → Kader lihat Daftar Jadwal miliknya (filter posyandu/minggu) → System cron cek H-1 & terlewat → Notifikasi in-app + email → Kader tandai Selesai → terhubung ke W-C (1 Jadwal → 1 Kunjungan).

**Mermaid:** `01 Notes/workflows/W-D-jadwal-notifikasi.md` / `docs/workflows/W-D-jadwal-notifikasi.md`

**Skenario Gherkin:**
```gherkin
Scenario: Jadwal H-1 kirim pengingat
  Given jadwal KK-002 untuk kader A tgl 2026-09-20
  When cron jam 07:00 H-1
  Then in-app badge + email "Besok kunjungan KK-002" ke kader A

Scenario: Jadwal terlewat
  Given jadwal 2026-09-10 lewat tanpa kunjungan
  When cron jam 00:00+1
  Then status jadi terlewat dan in-app "Terlewat: KK-002" + email

Scenario: Tandai selesai
  Given jadwal terlewat untuk KK-002
  When kader buat kunjungan untuk KK-002 dan simpan
  Then jadwal otomatis jadi selesai dan badge hilang
```

### W-E — Dashboard PWS (Pembina/Kepala utama, Kader terbatas)

**User Journey:**
Login Pembina/Kepala → Dashboard ringkasan 4 kelurahan → KPI **% cakupan** (`dikunjungi vs belum / total sasaran` *11 Sep*) + ranking penyakit tertinggi per RT/RW/kelurahan (contoh hipertensi tidak patuh) + **% prevalensi** per penyakit (TBC terpapar *11 Sep*) → Filter wilayah/kelompok sasaran/**prioritas 5 program** (Stunting/ODGJ/bumil risti/balita risti/TB *11 Sep [01:24]*) /periode → Drill-down Kelurahan→RW→RT → Lihat rekap masalah (tanpa NIK individu, agregat anonim).

**Mermaid:** `01 Notes/workflows/W-E-dashboard.md` / `docs/workflows/W-E-dashboard.md`

**Skenario Gherkin:**
```gherkin
Scenario: Drill-down hipertensi per RT
  Given ada 18 kunjungan Dewasa hipertensi tidak patuh di RT02
  When pembina filter Kelurahan=Ngemplakrejo, Sasaran=Dewasa, Periode=2026-09
  And drill-down RW04 → RT02
  Then tampil "Hipertensi tidak patuh: 18 — peringkat 1" di RT02

Scenario: Kader hanya lihat wilayahnya
  Given kader Ngemplakrejo RT02 login
  When buka dashboard
  Then hanya tampil data RT02/RW04 Ngemplakrejo, filter kelurahan lain disabled

Scenario: Filter kosong
  Given filter Periode=2025-01 (belum ada data)
  When terapkan
  Then empty state "Belum ada kunjungan pada periode ini" + CTA ke W-C (jika kader)

Scenario: Agregat anonim
  Given kunjungan Budi (NIK ...) hipertensi tidak patuh
  When dashboard render
  Then hanya hitung agregat, tidak tampil NIK/nama di card peringkat
```

### W-F — Rekap, Masalah & Ekspor (Pembina/Admin)

> **Update 11 Sep:** rekap perlu dukung **% cakupan & % penderita** sesuai metrik dashboard baru — ekspor ikut filter prioritas 5 program jika diterapkan.

**User Journey:**
Pembina lihat Rekap otomatis (per minggu/sasaran/wilayah, jumlah dengan masalah, tindak lanjut) → Ekspor Excel/PDF sesuai filter dashboard → Monitor Masalah (belum/selesai/dirujuk) dari W-C.

**Mermaid:** `01 Notes/workflows/W-F-rekap-ekspor.md` / `docs/workflows/W-F-rekap-ekspor.md`

**Skenario Gherkin:**
```gherkin
Scenario: Rekap otomatis mingguan
  Given 12 kunjungan minggu ke-2 September (5 Dewasa, 4 Balita, 3 Lansia)
  When buka Rekap
  Then tampil agregat terhitung (bukan input manual) per sasaran/wilayah

Scenario: Ekspor sesuai filter
  Given filter Dashboard = Ngemplakrejo + Dewasa
  When klik Ekspor Excel
  Then file berisi hanya data Ngemplakrejo Dewasa sesuai filter

Scenario: Masalah dirujuk
  Given masalah TBC pada Ani status belum
  When pembina ubah jadi dirujuk
  Then dashboard hitung indikator "dirujuk" bertambah
```

### Referensi Artefak

- Folder vault: `01 Notes/workflows/` — 6 file Mermaid + `README.md` + `matriks-hak-akses.md`
- Folder repo: `docs/workflows/` — mirror sinkron (copy 1:1 untuk dekat kode)
- Sumber field: `Field Checklist KR - Ekstraksi Definisi Operasional` (8 sasaran + Rekap hlm 14 + Tindak Lanjut hlm 15 + Jadwal hlm 16 + Definisi Operasional hlm 17–35)

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
| D1 | **Deploy online**: Vercel (frontend) + backend (Render/Railway) + Supabase (PostgreSQL) — *opsi gabung website Puskesmas (Bu Marten) perlu validasi 11 Sep, fallback independent* | 🟡 M | 6 jam | inti B/C |
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
- [ ] **Update 11 Sep — 5 program prioritas**: validasi pemetaan Stunting/ODGJ/bumil risti/balita risti/TB ke field checklist & 8 sasaran; apakah view 5 prioritas menggantikan atau filter tambahan? ([[Transkrip - Rekaman Diskusi Persentase dan Tambahan Supervisi]])
- [ ] **Update 11 Sep — UKGK/UKGM**: klarifikasi singkatan & field yang diharapkan
- [ ] **Update 11 Sep — Biodata Kader & Nakes**: field detail, foto, apakah nakes = master Puskesmas?
- [ ] **Update 11 Sep — Pemberdayaan**: butuh Kegiatan (tanggal, peserta, foto) — retensi & izin foto?
- [ ] **Update 11 Sep — Metrik %**: rumus pasti `% dikunjungi/total sasaran` & `% penderita/terpapar` + level agregat (RT/RW/kel)?
- [ ] **Update 11 Sep — Deploy gabung**: hosting website Puskesmas jenis apa, akses Bu Marten, subpath/subdomain, backup? (alternatif independent Vercel tetap fallback)

## Terkait
- [[URS - Dashboard PWS Posyandu]]
- [[Checklist Kunjungan Rumah - Dokumentasi Form]]
- [[Temuan Interview - Ekstraksi]]
- [[Konteks Kebijakan ILP dan Siklus Hidup]]
- [[Field Checklist KR - Ekstraksi Definisi Operasional]]
- [[Rencana Kegiatan September 2026]]
- [[MOC - Project Posyandu Ngemplakrejo]]
- Workflows: `01 Notes/workflows/` (vault) ↔ `docs/workflows/` (repo) — Mermaid + Gherkin, online only
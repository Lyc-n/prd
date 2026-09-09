---
tags: [workflow, input-kr, mermaid, gherkin]
created: 2026-09-10
up: ["[PRD - Dashboard PWS Posyandu]"]
---

# W-C — Input Kunjungan Rumah Dinamis (Kader)

> Alur paling kritis. Form render dinamis dari W-B (8 sasaran + Data Keluarga). Mobile-first, online only, validasi wajib/opsional, 1 Jadwal → 1 Kunjungan.

## User Journey (Kader, HP, online)

| Step | Aktor | Aksi | Keluaran |
|---|---|---|---|
| 1 | Kader | Login → Daftar Jadwal/Kunjungan miliknya (filter posyandu/minggu) | List jadwal terjadwal + kunjungan selesai |
| 2 | Kader | Pilih Jadwal/Keluarga (cari KK: nama/No KK/RT/RW) | Detail KK |
| 3 | Kader | Isi Data Keluarga & Anggota (NIK, tgl lahir, JK, hub KK, pendidikan, pekerjaan, kelompok sasaran) | Data keluarga |
| 4 | Kader | Pilih 1 dari 8 sasaran | Form dinamis ter-render |
| 5 | Kader | Isi field sasaran (mis. Dewasa: periksa setahun, terdiagnosa hipertensi/DM, ada obat, minum 24 jam; BaHa, suhu, buku KIA, edukasi, paraf) | Draft isian |
| 6 | Kader | Tandai Masalah & Tindak Lanjut (nama, NIK, masalah, tindak lanjut, status belum/selesai/dirujuk) | Masalah |
| 7 | System | Validasi wajib/tipe + cek NIK duplikat (online) | OK / inline error |
| 8 | Kader | Simpan | Kunjungan `dalam_proses → selesai`, 1 Jadwal jadi selesai, data masuk agregat W-E/W-F |

8 sasaran: Ibu Hamil | Bersalin & Nifas | Bayi 0–6 | Balita 6–71 | Sekolah/Remaja 6–18 | Dewasa 18–59 | Lansia >60 | TBC.

## Diagram Mermaid — Flow Utama

```mermaid
flowchart TD
    A[Kader login] --> B[Daftar Jadwal & Kunjungan miliknya]
    B --> C{Pilih Jadwal/Keluarga}
    C -->|Cari KK| D[Detail Keluarga\nNo KK, alamat RT/RW, sanitasi]
    C -->|KK belum ada| D1[Minta Admin buatkan KK\natau Buat Keluarga jika diizinkan]
    D --> E[Isi Data Keluarga & Anggota\nNIK, tgl lahir, JK, hub KK...]
    E --> F[Pilih 1 dari 8 sasaran]
    F --> G[Form dinamis render dari W-B]
    G --> H[Isi field sasaran\n+ Masalah & Tindak Lanjut]
    H --> I{Validasi\nwajib/tipe/NIK duplikat}
    I -->|Error| J[Inline error\n'Tidak valid'] --> H
    I -->|Jaringan putus| K[Toast 'Gagal simpan,\nperiksa koneksi, coba lagi'\n-tanpa draft offline-]
    K --> H
    I -->|OK| L[Simpan kunjungan\nstatus selesai]
    L --> M[Jadwal terkait → selesai]
    M --> N[Data masuk agregat\nDashboard W-E & Rekap W-F]
```

## Diagram Mermaid — Sequence Simpan

```mermaid
sequenceDiagram
    participant K as Kader (HP)
    participant FE as Frontend
    participant BE as Backend /api/kunjungan
    participant DB as DB + Definisi Field

    K->>FE: Pilih sasaran Dewasa
    FE->>BE: GET /api/definisi-field?sasaran=Dewasa&aktif=true
    BE->>DB: ambil definisi urut
    DB-->>BE: field[]
    BE-->>FE: field[] (label, tipe, wajib, urutan)
    FE-->>K: render form dinamis
    K->>FE: Isi + Simpan
    FE->>BE: POST /api/kunjungan {keluarga, anggota, sasaran, masalah}
    BE->>DB: validasi wajib + cek NIK duplikat
    DB-->>BE: OK / error
    BE-->>FE: 201 selesai / 400 error
    FE-->>K: toast sukses / inline error
```

## Diagram State Kunjungan

```mermaid
stateDiagram-v2
    [*] --> dalam_proses: Buat baru
    dalam_proses --> selesai: Simpan valid
    dalam_proses --> dalam_proses: Validasi gagal / jaringan error
    selesai --> [*]
```

## Skenario Gherkin (7 inti)

```gherkin
Feature: Input KR Dinamis

  Scenario: Happy path hipertensi tidak patuh (kasus dashboard)
    Given keluarga KK-001 RT02/RW04 Ngemplakrejo dan anggota Dewasa "Budi" ada
    When kader isi Dewasa: terdiagnosa hipertensi=2025-08-01, ada obat=true, minum 24 jam=false
    And tandai Masalah "Hipertensi tidak patuh" dan Simpan
    Then kunjungan status selesai dan dashboard W-E hitung +1 hipertensi tidak patuh di RT02

  Scenario: Field wajib kosong diblok
    Given definisi "NIK" wajib=true di Data Keluarga
    When kader kosongkan NIK dan tekan Simpan
    Then inline error "NIK wajib diisi" di field NIK dan simpan gagal

  Scenario: NIK duplikat ditolak online
    Given NIK "357801..." sudah ada di anggota lain
    When kader pakai NIK sama dan Simpan
    Then error async "NIK sudah terdaftar" dan simpan diblok

  Scenario: Keluarga belum di-master
    Given KK "Siti" belum ada di master
    When kader cari "Siti" tidak ketemu
    Then tampil CTA "Minta Admin buatkan KK" dan opsi Buat Keluarga (jika diizinkan)

  Scenario: Definisi berubah saat mengisi
    Given kader sedang isi Bayi 0–6
    When admin ubah definisi field Bayi di sesi lain
    Then toast "Definisi diperbarui, muat ulang" dan form re-render terbaru sebelum simpan

  Scenario: Anggota masuk 2 sasaran sekaligus
    Given Balita "Ani" umur 5 thn juga kontak TBC
    When kader selesai isi Balita 6–71 dan Simpan
    Then bisa Tambah Penilaian TBC untuk Ani di kunjungan sama (2 penilaian, 1 kunjungan)

  Scenario: Error jaringan online only
    Given koneksi putus saat Simpan
    When tekan Simpan
    Then toast "Gagal simpan, periksa koneksi, coba lagi" dan tidak ada draft lokal
```

## Catatan

- Jenis kunjungan rutin 1×/tahun vs khusus door-to-door mempengaruhi filter W-E.
- BaHa, suhu, buku KIA, edukasi, paraf = pola berulang per sasaran (template field W-B).
- Error jaringan = retry, bukan queue offline (keputusan 10 Sep).

---
tags: [workflow, matrix, hak-akses]
created: 2026-09-10
up: ["[PRD - Dashboard PWS Posyandu]"]
---

# Matriks Hak Akses — 4 Peran × 6 Fitur

> Guard per route + API. Kader = wilayah sendiri; Pembina/Kepala = 4 kelurahan; Admin = full. Online only.

| Fitur / Route | Kader | Pembina (Bu Dian) | Kepala Puskesmas | Admin | Catatan Guard |
|---|---|---|---|---|---|
| `POST /api/auth/login` | ✅ | ✅ | ✅ | ✅ | Publik |
| `GET /api/profil`, `PUT /api/profil` | ✅ miliknya | ✅ miliknya | ✅ miliknya | ✅ miliknya | Auth |
| `GET /dashboard` (FE) | ✅ wilayah sendiri | ✅ 4 kel | ✅ 4 kel | ✅ 4 kel | Role guard FE |
| `GET /api/dashboard?*` | ✅ filter terkunci wilayahnya (403 jika paksa 4 kel) | ✅ | ✅ | ✅ | BE cek wilayah binaan |
| `GET /api/kunjungan` (list) | ✅ miliknya | ❌ (lihat agregat) | ❌ | ✅ (opsional) | Kader scope |
| `POST /api/kunjungan` (W-C) | ✅ | ❌ | ❌ | ❌ | Kader only |
| `GET /api/jadwal` | ✅ miliknya | ✅ 4 kel | ✅ 4 kel | ✅ | Filter per role |
| `POST /api/jadwal` | ❌ | ✅ | ❌ | ✅ | Pembina/Admin |
| `GET /api/rekap` + `GET /api/rekap/export` | ❌ 403 | ✅ | ✅ | ✅ | Pembina/Kepala/Admin |
| `GET /api/master/kelurahan/rw/rt/posyandu/kader` | ❌ (baca dashboard) | ❌ baca | ❌ baca | ✅ CRUD | Admin only |
| `GET/POST/PUT /api/definisi-field` | ❌ | ❌ | ❌ | ✅ CRUD | Admin only |
| `GET /api/masalah` + `PUT status` | ✅ input miliknya | ✅ monitor+ubah | ✅ monitor | — | Kader input, Pembina ubah status |

## Aturan Filter Dashboard (W-E)

- Kader: `kelurahan` & `rw/rt` terkunci ke wilayah binaan (`posyandu.wilayah`). Request `?kelurahan=Tambaan` padahal binaan Ngemplakrejo → 403.
- Pembina/Kepala/Admin: bebas filter 4 kelurahan.

## State & Transisi

- Kunjungan: `dalam_proses → selesai`
- Jadwal: `terjadwal → selesai` | `terjadwal → terlewat → selesai`
- Masalah: `belum → selesai` | `belum → dirujuk`

## Gherkin Ringkas Guard

```gherkin
Scenario: Kader paksa akses 4 kelurahan
  Given login Kader Ngemplakrejo
  When GET "/api/dashboard?kelurahan=Tambaan"
  Then 403 "Tidak berhak akses Tambaan"

Scenario: Admin akses master
  Given login Admin
  When POST "/api/definisi-field" {nama:"Lingkar perut"}
  Then 201 dan field aktif untuk kunjungan baru

Scenario: Pembina ekspor rekap
  Given login Pembina
  When GET "/api/rekap/export?kelurahan=Ngemplakrejo&format=xlsx"
  Then 200 file xlsx sesuai filter

Scenario: Kader coba ekspor
  Given login Kader
  When GET "/api/rekap/export"
  Then 403 hidden di FE
```

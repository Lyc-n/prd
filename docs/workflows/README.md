---
tags: [workflow, mermaid, gherkin]
created: 2026-09-10
status: resmi — mirror ke docs/workflows di repo
up: ["[PRD - Dashboard PWS Posyandu]"]
---

# Workflows — Dashboard PWS (App Only)

> 6 alur inti aplikasi. Diagram **Mermaid di Obsidian**, skenario **Gherkin Given-When-Then**, asumsi **online only** (tanpa offline/draft). Mirror sinkron ke `docs/workflows/` di repo (simpan di keduanya — keputusan 10 Sep).

## Daftar

| File | Alur | Role utama | PRD |
|---|---|---|---|
| [[W-A-auth]] | Auth & Guard | Semua | PRD W-A |
| [[W-B-master-field]] | Master & Definisi Field Fleksibel | Admin | PRD W-B |
| [[W-C-input-kr]] | Input KR Dinamis | Kader | PRD W-C |
| [[W-D-jadwal-notifikasi]] | Jadwal & Pengingat | Kader + System | PRD W-D |
| [[W-E-dashboard]] | Dashboard PWS | Pembina/Kepala (+ Kader terbatas) | PRD W-E |
| [[W-F-rekap-ekspor]] | Rekap, Masalah & Ekspor | Pembina/Admin | PRD W-F |
| [[matriks-hak-akses]] | Matriks Hak Akses 4×6 | — | PRD Matriks |

## Konvensi

- **Mermaid** — flowchart/sequence/state, render di Obsidian.
- **Gherkin** — `Given-When-Then`, siap jadi test.
- **Online only** — simpan langsung ke server; error jaringan = toast retry, tanpa antrian offline.
- **Simpan di keduanya:** `01 Notes/workflows/` (vault, konteks domain) ↔ `docs/workflows/` (repo, dekat kode).

## Sumber Field

- [[Field Checklist KR - Ekstraksi Definisi Operasional]] — 8 sasaran + Rekap + Tindak Lanjut + Jadwal + Definisi Operasional hlm 17–35
- [[Checklist Kunjungan Rumah - Dokumentasi Form]] — struktur 35 hlm

## Terkait

- [[PRD - Dashboard PWS Posyandu#Workflow Aplikasi (App Workflows Only)|PRD — Workflow Aplikasi]]
- [[MOC - Project Posyandu Ngemplakrejo]]

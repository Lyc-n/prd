# PRD — Dashboard PWS Posyandu

Aplikasi web responsif untuk digitalisasi pendataan **kunjungan rumah (KR)** kader Posyandu di wilayah kerja Puskesmas Trajeng (4 kelurahan). Kader menginput hasil kunjungan, data otomatis tampil pada dashboard PWS kondisi kesehatan per wilayah, dan kader menerima pengingat jadwal kunjungan.

Repositori ini berisi **versi web interaktif dari Product Requirements Document (PRD)**, dibangun sebagai Single-Page Application (SPA) React dan siap di-deploy ke Vercel.

## Isi repo

| | |
|---|---|
| `PRD - Dashboard PWS Posyandu.md` | Sumber PRD (markdown) — konten acuan utama |
| `src/` | Aplikasi React (Vite) — halaman interaktif PRD |
| `public/PRD - Dashboard PWS Posyandu.md` | Salinan markdown untuk tombol "Unduh PRD" di aplikasi |
| `docs/workflows/` | Mirror workflow Mermaid (6 alur + matriks) — sinkron dari `01 Notes/workflows/` vault |
| `legacy/index.html` | Versi HTML statis lama (arsip) |
| `vercel.json` | Konfigurasi deploy Vercel (SPA rewrite) |

## Tech stack

- **React 19** + **Vite 8**
- **React Router** — 9 halaman: Sekilas, Fitur, Cakupan, Data, Workflow, Tata Kelola, Milestone, Rencana Kerja, Tanya Jawab
- **Tailwind CSS 4** (dark mode via kelas `dark`)
- **lucide-react** — ikon

Fitur interaktif (task board, accordion, tema) tersimpan di `localStorage` per perangkat: `prd-done`, `prd-acc`, `prd-theme`.

## Menjalankan secara lokal

```bash
npm install
npm run dev        # development (http://localhost:5173)
npm run build      # build produksi ke dist/
npm run preview    # pratinjau build produksi
```

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Di [Vercel](https://vercel.com) → **Add New Project** → import repo `prd`.
3. Vercel mendeteksi otomatis (framework: **Vite**, build: `npm run build`, output: `dist`). `vercel.json` sudah menyediakan SPA fallback untuk semua rute.

> Catatan: aplikasi ini hanya frontend (statis). Backend + basis data dibangun terpisah (lihat rencana kerja di halaman *Rencana Kerja*).

## Rencana kerja

Menuju **demo online 27 September 2026** dalam 3 fasa:

- **Fasa I (10–14 Sep)** — Fondasi: repo, skema DB, auth & role, master data, wireframe
- **Fasa II (15–21 Sep)** — Inti: form kunjungan dinamis, dashboard PWS, API agregat
- **Fasa III (22–27 Sep)** — Finalisasi: notifikasi, rekap/ekspor, deploy online, demo

Progress task dapat dilacak langsung pada halaman *Rencana Kerja*.

## Kontribusi konten

Konten halaman disusun ulang dari `PRD - Dashboard PWS Posyandu.md` ke `src/data/` (struktur terpusat di `content.js`, `tasks.js`, `workflows.js`, `governance.js`). Jika konten markdown berubah, perbarui salinan di `public/` agar tombol "Unduh PRD" tetap sesuai. Workflow di `docs/workflows/` wajib sinkron dengan `01 Notes/workflows/` vault (copy 1:1).
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
  S: { icon: '🟢', label: 'S', cls: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200' },
  M: { icon: '🟡', label: 'M', cls: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200' },
  L: { icon: '🔴', label: 'L', cls: 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200' },
}

export const TASKS = [
  { id: 'B1', fasa: 1, jalur: 'B', nama: 'Scaffold repo client+server, env, ESLint, script migrate/seed', level: 'M', jam: 6, dep: [] },
  { id: 'B2', fasa: 1, jalur: 'B', nama: 'Skema DB + migration (dari Field Checklist)', level: 'L', jam: 12, dep: ['B1'] },
  { id: 'B3', fasa: 1, jalur: 'B', nama: 'Auth & role (4 peran) + middleware', level: 'M', jam: 10, dep: ['B1'] },
  { id: 'B4', fasa: 1, jalur: 'B', nama: 'API CRUD master data (kelurahan, RW/RT, posyandu, kader)', level: 'M', jam: 10, dep: ['B3'] },
  { id: 'C1', fasa: 1, jalur: 'C', nama: 'Scaffold React + routing + layout + guard peran', level: 'M', jam: 8, dep: [] },
  { id: 'C2', fasa: 1, jalur: 'C', nama: 'Halaman login', level: 'S', jam: 5, dep: ['C1'] },
  { id: 'C3', fasa: 1, jalur: 'C', nama: 'Halaman master data + definisi field (admin)', level: 'M', jam: 10, dep: ['C1', 'B4'] },
  { id: 'A1', fasa: 1, jalur: 'A', nama: 'Seed definisi field 8 kelompok sasaran (dari ekstraksi)', level: 'L', jam: 10, dep: [] },
  { id: 'A2', fasa: 1, jalur: 'A', nama: 'Dummy data 4 kelurahan (KK, anggota, kunjungan)', level: 'S', jam: 6, dep: ['A1'] },
  { id: 'A3', fasa: 1, jalur: 'A', nama: 'Wireframe & user flow mobile-first', level: 'S', jam: 8, dep: [] },

  { id: 'B5', fasa: 2, jalur: 'B', nama: 'API definisi field (CRUD, urutan, aktif/wajib)', level: 'L', jam: 10, dep: ['B4'] },
  { id: 'B6', fasa: 2, jalur: 'B', nama: 'API kunjungan KR (keluarga+anggota+sasaran+masalah)', level: 'L', jam: 14, dep: ['B5'] },
  { id: 'B7', fasa: 2, jalur: 'B', nama: 'API dashboard agregat per RT/RW/kelurahan + filter', level: 'L', jam: 14, dep: ['B6'] },
  { id: 'C4', fasa: 2, jalur: 'C', nama: 'Form input KR dinamis (render dari definisi field, mobile)', level: 'L', jam: 16, dep: ['B5', 'B6'] },
  { id: 'C5', fasa: 2, jalur: 'C', nama: 'Dashboard PWS (visualisasi, filter, drill-down)', level: 'L', jam: 14, dep: ['B7'] },
  { id: 'A4', fasa: 2, jalur: 'A', nama: 'Uji isi field dengan dummy + kasus demo kader', level: 'S', jam: 4, dep: ['A2', 'C4'] },

  { id: 'B8', fasa: 3, jalur: 'B', nama: 'API notifikasi/pengingat jadwal + email (free-tier)', level: 'M', jam: 12, dep: ['B6'] },
  { id: 'B9', fasa: 3, jalur: 'B', nama: 'API rekap & ekspor', level: 'M', jam: 8, dep: ['B6'] },
  { id: 'C6', fasa: 3, jalur: 'C', nama: 'Notifikasi in-app + daftar jadwal kader', level: 'M', jam: 8, dep: ['B8'] },
  { id: 'C7', fasa: 3, jalur: 'C', nama: 'Rekap & ekspor Excel/PDF', level: 'S', jam: 6, dep: ['B9'] },
  { id: 'C8', fasa: 3, jalur: 'C', nama: 'Polish mobile, loading/error, aksesibilitas', level: 'M', jam: 8, dep: ['C4', 'C5'] },
  { id: 'D1', fasa: 3, jalur: 'D', nama: 'Deploy online: Vercel (frontend) + backend (Render/Railway) + Supabase (PostgreSQL)', level: 'M', jam: 6, dep: ['B/C inti'] },
  { id: 'D2', fasa: 3, jalur: 'D', nama: 'Akun demo 4 peran + data placeholder', level: 'S', jam: 2, dep: ['D1'] },
  { id: 'D3', fasa: 3, jalur: 'D', nama: 'Script demo 15 menit + uji dari HP client', level: 'S', jam: 3, dep: ['D2'] },
  { id: 'D4', fasa: 3, jalur: 'D', nama: 'Dokumentasi ringkas + draft handover', level: 'S', jam: 4, dep: [] },
]

export const TOTAL_JAM = TASKS.reduce((s, t) => s + t.jam, 0)
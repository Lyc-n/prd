import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import { NAV_ITEMS } from '../components/Navbar'
import {
  TEKS_HERO, TAG_TEKNOLOGI, STATS, DISCLAIMER,
} from '../data/content'

const DESKRIPSI = {
  fitur: 'Apa yang bisa dilakukan + 5 program prioritas & KPI % cakupan (update 11 Sep).',
  cakupan: 'Hal-hal yang tidak dikerjakan di v1 + kandidat v2 (nakes/UKGK/pemberdayaan/biodata).',
  data: 'Data yang perlu diingat — 10 entitas v1 + 2 kandidat v2 (Kegiatan Pemberdayaan, Nakes/UKGK).',
  workflow: '6 Workflow + KPI % & filter 5 prioritas di W-E + Gherkin baru 11 Sep (online only).',
  'tata-kelola': 'NFR 7 + Dependensi/Asumsi 7 + Risiko 8 + Aturan Bisnis 28 (BR-26..28 baru 11 Sep).',
  milestone: 'Jalan pembangunan M1–M4 + KPI % di M3, kandidat v2 out-of-scope.',
  rencana: 'Rencana kerja 3 fasa sampai demo online 27 Sep, dengan task interaktif.',
  qna: '13 pertanyaan — 7 awal + 6 baru 11 Sep (UKGK, biodata, deploy Bu Marten, dsb.).',
}

const KELOMPOK = ['Ibu Hamil', 'Bersalin/Nifas', 'Bayi', 'Balita/Apras', 'Usia Sekolah/Remaja', 'Dewasa', 'Lansia', 'TBC']
const PRIORITAS_5 = ['Stunting', 'ODGJ', 'Bumil Risti', 'Balita Risti', 'TB']

export default function Home() {
  const cards = NAV_ITEMS.filter((n) => n.to !== '/')

  return (
    <div className="space-y-16 md:space-y-20">
      <div className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-900 dark:text-amber-200">
        <p>
          <strong className="font-semibold">Tentang berkas ini:</strong> {DISCLAIMER}
        </p>
      </div>

      <section className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">{TEKS_HERO.judul}</h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">{TEKS_HERO.deskripsi}</p>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs font-medium text-indigo-700 dark:text-indigo-300">
            Update 11 Sep 2026
          </span>
          {TAG_TEKNOLOGI.map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{TEKS_HERO.koreksi}</p>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className={`rounded-lg border p-4 ${
              s.accent
                ? 'border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/30'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
            }`}
          >
            <p className={`text-2xl font-bold ${s.accent ? 'text-indigo-700 dark:text-indigo-300' : ''}`}>
              {s.value} {s.sub && <span className="text-lg font-normal text-zinc-400">{s.sub}</span>}
            </p>
            <p className={`text-xs font-medium uppercase tracking-[0.12em] mt-1 ${s.accent ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
              {s.label}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-800 inline-flex items-center justify-center">
                <Icon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition" />
            </div>
            <p className="mt-3 font-medium">{label}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{DESKRIPSI[to.slice(1)]}</p>
          </Link>
        ))}
        <div className="rounded-lg border border-dashed border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20 p-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <Info className="w-3.5 h-3.5" /> Kenalan dulu
          </span>
          <p className="mt-3 font-medium">8 kelompok sasaran</p>
          <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">{KELOMPOK.join(', ')}</p>
          <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">Filter prioritas (11 Sep): {PRIORITAS_5.join(' · ')}</p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">Kandidat v2 (pending): Nakes, UKGK/UKGM, Pemberdayaan (tgl/peserta/foto), Biodata Kader per Pos</p>
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          Cara membaca dokumen ini
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
          Dokumen ini dipisah jadi beberapa halaman agar mudah dibaca. Mulai dari <strong>Sekilas</strong> untuk gambaran
          besar, lalu telusuri <strong>Fitur</strong> (apa yang dibuat), <strong>Cakupan</strong> (apa yang tidak dibuat),{' '}
          <strong>Data</strong> (informasi yang disimpan), <strong>Workflow</strong> (alur aplikasi + Gherkin), <strong>Tata Kelola</strong> (NFR + Risiko + Aturan Bisnis), <strong>Milestone</strong> (tahap pembangunan), dan{' '}
          <strong>Rencana Kerja</strong> (progres tim sampai demo 27 September 2026).
        </p>
      </section>
    </div>
  )
}
import { Sparkles, PackageCheck, Check } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import { FITUR, TERSEDIA, CATATAN_TERSEDIA } from '../data/content'
import { Link } from 'react-router-dom'

export default function Fitur() {
  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Fitur"
        desc="Apa saja yang aplikasi ini lakukan untuk tim Posyandu — dan bahan riset yang sudah tersedia dari vault tanpa perlu diteliti ulang."
      />

      <section className="space-y-5">
        <SectionTitle icon={<Sparkles className="w-3.5 h-3.5" />}>Apa yang aplikasi lakukan</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {FITUR.map(({ icon: Icon, judul, teks, highlight }) => (
            <div
              key={judul}
              className={`rounded-lg border p-4 ${
                highlight
                  ? 'border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50/60 dark:bg-indigo-950/20'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`shrink-0 mt-0.5 w-8 h-8 rounded-md inline-flex items-center justify-center ${
                    highlight ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-zinc-100 dark:bg-zinc-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${highlight ? 'text-indigo-700 dark:text-indigo-300' : 'text-zinc-700 dark:text-zinc-300'}`} />
                </span>
                <div>
                  <p className={`font-medium ${highlight ? 'text-indigo-900 dark:text-indigo-100' : ''}`}>{judul}</p>
                  <p className={`mt-1 text-sm leading-relaxed ${highlight ? 'text-indigo-700 dark:text-indigo-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
                    {teks}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle icon={<PackageCheck className="w-3.5 h-3.5" />}>Sudah tersedia dari riset vault</SectionTitle>
        <ul className="flex flex-wrap gap-2">
          {TERSEDIA.map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {t}
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{CATATAN_TERSEDIA}</p>
        <p className="text-sm">
          Lihat juga yang <Link to="/cakupan" className="text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:text-indigo-700 dark:hover:text-indigo-300">sengaja tidak dikerjakan di v1</Link>.
        </p>
      </section>
    </div>
  )
}
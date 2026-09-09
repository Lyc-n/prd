import { Database, Box, ChevronDown } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import { ENTITIES, KELOMPOK_SASARAN } from '../data/content'
import { useAccordion } from '../lib/accordion'

function EntityCard({ ent }) {
  const { acc, setOpen } = useAccordion()
  const open = acc[ent.id] ? false : true
  const bintang = ent.bintang

  const goTo = (id) => {
    const el = document.getElementById('ent-' + id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.remove('rel-hit')
    void el.offsetWidth
    el.classList.add('rel-hit')
  }

  return (
    <article
      id={'ent-' + ent.id}
      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
    >
      <button
        type="button"
        onClick={() => setOpen(ent.id, !open)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-5 text-left"
      >
        <Box className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
        <h3 className="font-semibold flex-1">
          {ent.nama}
          {bintang && <span className="ml-1 text-indigo-500">⭐</span>}
        </h3>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${open ? '' : 'rotate-180'}`} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <table className="mt-3 w-full text-sm">
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {ent.fields.map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2 pr-4 font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300 align-top whitespace-nowrap">{k}</td>
                  <td className="py-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold uppercase tracking-[0.14em] text-[11px]">Terkait dengan</span>
            <span className="mt-1.5 flex flex-wrap gap-1.5">
              {ent.related.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => goTo(r.id)}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                >
                  {r.label}
                </button>
              ))}
              {(ent.notes || []).map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500 dark:text-zinc-400"
                >
                  {n}
                </span>
              ))}
            </span>
          </p>
        </div>
      )}
    </article>
  )
}

export default function Data() {
  const { setAll } = useAccordion()
  const keys = ENTITIES.map((e) => e.id)

  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Data & Definisi Field"
        desc="Informasi yang perlu diingat aplikasi — menjadi dasar rancangan basis data (ERD) saat pembangunan. Kartu dapat dilipat untuk fokus pada satu bagian saja."
      />

      <section className="space-y-5">
        <SectionTitle
          icon={<Database className="w-3.5 h-3.5" />}
          right={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAll(keys, true)}
                className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                Perluas semua
              </button>
              <button
                type="button"
                onClick={() => setAll(keys, false)}
                className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                Sempitkan semua
              </button>
            </div>
          }
        >
          Model data
        </SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Klik chip <span className="font-medium text-zinc-600 dark:text-zinc-300">"Terkait dengan"</span> untuk langsung
          berpindah ke bagian lain. Sumber definisi field: Field Checklist KR (11 bagian, 8 kelompok sasaran).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {ENTITIES.map((e) => (
            <EntityCard key={e.id} ent={e} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Database className="w-3.5 h-3.5" />8 Kelompok sasaran siklus hidup
        </h2>
        <div className="flex flex-wrap gap-2">
          {KELOMPOK_SASARAN.map((k) => (
            <span
              key={k}
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300"
            >
              {k}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
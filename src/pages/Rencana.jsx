import { useState } from 'react'
import { Kanban, MousePointerClick, Clock, ChevronDown, Info } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import Accordion from '../components/Accordion'
import { FASAS, JALUR, LEVEL, TASKS } from '../data/tasks'
import { PERINGATAN_RENCANA } from '../data/content'
import { useAccordion } from '../lib/accordion'
import { usePersistentState } from '../lib/hooks'

const FILTER_OPTS = {
  jalur: [
    { value: 'all', label: 'Semua jalur' },
    { value: 'A', label: '🅰 Data' },
    { value: 'B', label: '🅱 Backend' },
    { value: 'C', label: '🅲 Frontend' },
    { value: 'D', label: '🅳 Demo' },
  ],
  level: [
    { value: 'all', label: 'Semua level' },
    { value: 'S', label: '🟢 S' },
    { value: 'M', label: '🟡 M' },
    { value: 'L', label: '🔴 L' },
  ],
  status: [
    { value: 'all', label: 'Semua status' },
    { value: 'todo', label: 'Belum' },
    { value: 'done', label: 'Selesai' },
  ],
}

const taskByCode = Object.fromEntries(TASKS.map((t) => [t.id, t.nama]))

function matches(t, f, done) {
  if (f.jalur !== 'all' && t.jalur !== f.jalur) return false
  if (f.level !== 'all' && t.level !== f.level) return false
  if (f.status === 'todo' && done.includes(t.id)) return false
  if (f.status === 'done' && !done.includes(t.id)) return false
  return true
}

function TaskCard({ t, done, onToggle }) {
  const j = JALUR[t.jalur]
  const lv = LEVEL[t.level]
  const JIcon = j.icon
  const isDone = done.includes(t.id)
  const [open, setOpen] = useState(false)

  return (
    <article
      className={`rounded-lg border border-zinc-200 dark:border-zinc-800 border-t-2 bg-white dark:bg-zinc-900 p-4 ${j.top} ${isDone ? 'task-done' : ''} ${open ? 'ring-2 ring-indigo-300 dark:ring-indigo-700' : ''}`}
    >
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          title="Klik untuk penjelasan sederhana"
          className="min-w-0 flex-1 flex items-start gap-2.5 text-left group"
        >
          <span className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-md border ${j.chip} font-mono text-xs font-bold`}>
            {t.id}
          </span>
          <span className="min-w-0 flex-1">
            <span className="task-title block text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug group-hover:underline">
              {t.nama}
            </span>
            <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1.5">
              <JIcon className={`w-3.5 h-3.5 ${j.text}`} />
              {j.label}
            </span>
          </span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 mt-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggle(t.id)}
          className="mt-1 w-5 h-5 cursor-pointer accent-emerald-600 shrink-0"
          aria-label={'Tandai ' + t.id + ' selesai'}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${lv.cls} font-medium`}>
          {lv.icon} {lv.label} · {lv.nama}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          <Clock className="w-3 h-3" /> ±{t.jam} jam
        </span>
      </div>

      {open && (
        <div className="mt-3 rounded-md border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
            Dalam bahasa sederhana
          </p>
          <p className="mt-1.5 text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">{t.clear}</p>
          <div className="mt-3 pt-3 border-t border-emerald-200/70 dark:border-emerald-900/70 space-y-2 text-xs text-emerald-800 dark:text-emerald-300">
            <p>
              <span className="font-semibold">Level {lv.icon} {lv.label} · {lv.nama}:</span> {lv.penjelasan}
            </p>
            <p>
              <span className="font-semibold">Dikerjakan lebih dulu:</span>{' '}
              {t.dep.length === 0 ? (
                'Tidak ada — bisa langsung dimulai.'
              ) : (
                <span className="inline-flex flex-wrap gap-1.5">
                  {t.dep.map((d) => (
                    <span key={d} className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 font-mono text-[11px]">
                      {d} · {taskByCode[d] || d}
                    </span>
                  ))}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </article>
  )
}

function LevelLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {['S', 'M', 'L'].map((k) => {
        const lv = LEVEL[k]
        return (
          <div key={k} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5">
            <p className="flex items-center gap-2 text-sm font-medium">
              <span>{lv.icon}</span>
              <span>
                {lv.label} · {lv.nama}
              </span>
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{lv.penjelasan}</p>
          </div>
        )
      })}
    </div>
  )
}

function FilterChips({ filters, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {['jalur', 'level', 'status'].map((kind) =>
        FILTER_OPTS[kind].map((o) => {
          const active = filters[kind] === o.value
          return (
            <button
              key={kind + o.value}
              type="button"
              onClick={() => onChange(kind, o.value)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition ${
                active
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
              }`}
            >
              {o.label}
            </button>
          )
        })
      )}
    </div>
  )
}

function FasaBoard({ f, filters, onFilter, done, onToggle }) {
  const meta = FASAS[f]
  const fTasks = TASKS.filter((t) => t.fasa === f)
  const totalJam = fTasks.reduce((s, t) => s + t.jam, 0)
  const doneCount = fTasks.filter((t) => done.includes(t.id)).length
  const pct = fTasks.length ? Math.round((doneCount / fTasks.length) * 100) : 0
  const shown = fTasks.filter((t) => matches(t, filters, done))
  const fId = 'fasa-' + f

  return (
    <Accordion
      id={fId}
      title={
        <span className="flex items-center gap-3">
          <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-400 text-white dark:text-zinc-900 inline-flex items-center justify-center text-sm font-semibold">
            {meta.romawi}
          </span>
          <span>
            <span className="block text-lg">{meta.judul}</span>
            <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400 mt-0.5">{meta.tanggal} · {meta.gate}</span>
          </span>
        </span>
      }
      headerClassName="w-full flex items-center gap-3 p-5 text-left border-b border-zinc-100 dark:border-zinc-800"
      bodyClassName="p-5 space-y-4"
      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Task</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {fTasks.length} task · ±{totalJam} jam
          </p>
        </div>
        <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 sm:col-span-2">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center justify-between">
            <span>Progress</span>
            <span>
              {doneCount}/{fTasks.length} selesai · {pct}%
            </span>
          </p>
          <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: pct + '%' }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <FilterChips filters={filters} onChange={onFilter} />
        <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
          Menampilkan {shown.length}/{fTasks.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {shown.map((t) => (
          <TaskCard key={t.id} t={t} done={done} onToggle={onToggle} />
        ))}
      </div>
    </Accordion>
  )
}

export default function Rencana() {
  const { setAll } = useAccordion()
  const [done, setDone] = usePersistentState('prd-done', [])
  const [filters, setFilters] = useState({
    1: { jalur: 'all', level: 'all', status: 'all' },
    2: { jalur: 'all', level: 'all', status: 'all' },
    3: { jalur: 'all', level: 'all', status: 'all' },
  })

  const toggle = (id) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const clearAll = () => {
    if (window.confirm('Bersihkan semua centang progress task?')) setDone([])
  }

  const fasaKeys = [1, 2, 3].map((f) => 'fasa-' + f)

  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Rencana Kerja & Timeline"
        desc="Rencana kerja paralel 3 fasa menuju demo online 27 September 2026. Task bisa disaring, dicentang sebagai progress, dan tersimpan otomatis di perangkat ini."
      />

      <section className="space-y-5">
        <SectionTitle
          icon={<Kanban className="w-3.5 h-3.5" />}
          right={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAll(fasaKeys, true)}
                className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                Perluas semua
              </button>
              <button
                type="button"
                onClick={() => setAll(fasaKeys, false)}
                className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                Sempitkan semua
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs px-3 py-1.5 rounded-md border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
              >
                Bersihkan centang
              </button>
            </div>
          }
        >
          Fasa & jalur kerja
        </SectionTitle>

        <div className="rounded-lg border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/30 p-4 text-sm text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
          <MousePointerClick className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            <span className="font-semibold">Target 27 September 2026:</span> aplikasi bisa dicoba klien secara online
            (deploy hosting gratis). Task di bawah bisa <strong>disaring per jalur/level/status</strong>, dicentang
            sebagai progress, dan tersimpan di perangkat ini. Estimasi tentatif, dikoreksi setelah URS acc.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <p className="flex items-start gap-2 text-sm">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />
            <span>
              <span className="font-semibold">Cara membaca:</span> level di tiap task menunjukkan tingkat kesulitan
              dan risiko — <strong>klik kartu untuk penjelasan sederhana</strong> tentang tugas itu dan arti levelnya.
            </span>
          </p>
          <div className="mt-3">
            <LevelLegend />
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((f) => (
            <FasaBoard
              key={f}
              f={f}
              filters={filters[f]}
              onFilter={(kind, value) => setFilters((prev) => ({ ...prev, [f]: { ...prev[f], [kind]: value } }))}
              done={done}
              onToggle={toggle}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          Catatan penting
        </h2>
        <div className="space-y-2.5 text-sm">
          {PERINGATAN_RENCANA.map((p) => {
            const Icon = p.icon
            return (
              <p key={p.teks} className="flex items-start gap-3">
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${p.tone}`} />
                <span className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: p.teks }} />
              </p>
            )
          })}
        </div>
      </section>
    </div>
  )
}
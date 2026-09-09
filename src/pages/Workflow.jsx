import { useState } from 'react'
import { Workflow, Shield, GitBranch, FileText, Eye, Code2, Info, ArrowRight, CheckCircle2, Play } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import Mermaid from '../components/Mermaid'
import { WORKFLOWS, MATRIKS_HAK, STATE_DIAGRAM, STATE_MERMAID, ROLE_PALETTE, OVERVIEW_MERMAID } from '../data/workflows'
import { useAccordion } from '../lib/accordion'

function RoleLegend() {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Warna peran (palet JALUR existing)</p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {ROLE_PALETTE.map((r) => (
          <div key={r.role} className={`rounded-md border p-3 flex items-start gap-2.5 ${r.chip}`}>
            <span className={`mt-0.5 w-3 h-3 rounded-full shrink-0 ${r.dot}`} />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-none">{r.role}</p>
              <p className="text-xs leading-relaxed mt-1 opacity-80">{r.desc}</p>
              <p className="text-[11px] font-mono mt-1 opacity-60">Jalur {r.jalur} · {r.color}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Warna dipakai konsisten di semua diagram & langkah. Contoh: hijau = Kader, biru = Pembina, ungu = Kepala, kuning = Admin, abu = System.</p>
    </div>
  )
}

function Pill({ label, text, color }) {
  const map = {
    zinc: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
    sky: 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 border-sky-200 dark:border-sky-900',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-900',
  }
  return (
    <div className={`rounded-md border px-3 py-2.5 ${map[color]}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.12em]">{label}</p>
      <p className="text-sm leading-relaxed mt-1">{text}</p>
    </div>
  )
}

function GherkinCard({ g, showCode, onToggle }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-medium text-sm">{g.title}</h4>
          <button
            type="button"
            onClick={onToggle}
            className="shrink-0 inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            <Code2 className="w-3 h-3" /> {showCode ? 'Sembunyikan code' : 'Lihat code'}
          </button>
        </div>
        <div className="mt-3 grid gap-2">
          <Pill label="Awal" text={g.given} color="zinc" />
          <Pill label="Aksi" text={g.when} color="sky" />
          <Pill label="Hasil" text={g.then} color="emerald" />
        </div>
      </div>
      {showCode && (
        <pre className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-3 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`Scenario: ${g.title}
  Given ${g.given}
  When ${g.when}
  Then ${g.then}`}
        </pre>
      )}
    </div>
  )
}

function WorkflowCard({ w }) {
  const { acc, setOpen } = useAccordion()
  const open = acc[w.id] ? false : true
  const [tab, setTab] = useState('visual')
  const [codeToggles, setCodeToggles] = useState({})
  const toggle = (idx) => setCodeToggles((prev) => ({ ...prev, [idx]: !prev[idx] }))

  const roleBadge = ROLE_PALETTE.find((r) => r.role === w.peran || r.role === w.peran.split(' ')[0])

  return (
    <article id={w.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(w.id, !open)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition"
      >
        <span className="shrink-0 w-7 h-7 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 inline-flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
          {w.kode}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base leading-tight flex items-center gap-2 flex-wrap">
            {w.judul}
            {w.badge && <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-[11px] font-medium text-amber-800 dark:text-amber-200">{w.badge}</span>}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5 flex-wrap">
            {roleBadge && <span className={`w-2 h-2 rounded-full ${roleBadge.dot}`} />} {w.peran} · <span className="font-mono">{w.file}</span>
          </p>
        </div>
        <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs ${open ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{w.ringkas}</p>

          {/* Steps timeline */}
          <div className="rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Langkah mudah (non-teknis)</p>
            <ol className="mt-3 space-y-2">
              {w.steps.map((s) => (
                <li key={s.no} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {s.no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{s.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">oleh {s.actor}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">User Journey (ringkas)</p>
            <p className="mt-1.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{w.journey}</p>
          </div>

          {/* Visual / Code tabs */}
          <div>
            <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setTab('visual')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 -mb-px transition ${tab === 'visual' ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              >
                <Eye className="w-3.5 h-3.5" /> Visual
              </button>
              <button
                type="button"
                onClick={() => setTab('code')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 -mb-px transition ${tab === 'code' ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              >
                <Code2 className="w-3.5 h-3.5" /> Code
              </button>
              <span className="ml-auto text-xs text-zinc-400 hidden sm:inline">Mermaid di Obsidian → dirender visual di sini</span>
            </div>
            <div className="mt-3">
              {tab === 'visual' ? (
                <Mermaid code={w.mermaid} id={w.id} />
              ) : (
                <pre className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-4 text-xs leading-relaxed overflow-x-auto whitespace-pre">
                  {w.mermaid}
                </pre>
              )}
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              File: <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">01 Notes/workflows/{w.file}</code> ↔ <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">docs/workflows/{w.file}</code>
            </p>
          </div>

          {/* Gherkin pills */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Skenario — Awal / Aksi / Hasil
              <span className="font-normal normal-case tracking-normal text-zinc-400"> (Given/When/Then untuk manusia + toggle code)</span>
            </p>
            <div className="mt-3 grid gap-3">
              {w.gherkin.map((g, i) => (
                <GherkinCard key={i} g={g} showCode={!!codeToggles[i]} onToggle={() => toggle(i)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default function WorkflowPage() {
  const { setAll } = useAccordion()
  const keys = WORKFLOWS.map((w) => w.id)
  const [overviewTab, setOverviewTab] = useState('visual')

  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Workflow Aplikasi"
        desc="Hanya alur di dalam aplikasi (bukan kegiatan/perizinan). 6 alur inti + User Journey per role + skenario Awal/Aksi/Hasil. Diagram Mermaid di Obsidian dirender visual di sini — tab Visual untuk non-teknis, Code untuk teknis. Asumsi: online only."
      />

      {/* Overview on top */}
      <section className="space-y-5">
        <SectionTitle icon={<Play className="w-3.5 h-3.5" />}>Gambaran End-to-End (di atas)</SectionTitle>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <button type="button" onClick={() => setOverviewTab('visual')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition ${overviewTab === 'visual' ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'border-transparent text-zinc-500 dark:text-zinc-400'}`}>
              <Eye className="w-3.5 h-3.5" /> Visual
            </button>
            <button type="button" onClick={() => setOverviewTab('code')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition ${overviewTab === 'code' ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'border-transparent text-zinc-500 dark:text-zinc-400'}`}>
              <Code2 className="w-3.5 h-3.5" /> Code
            </button>
            <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">Admin → Kader → System → Dashboard → Rekap</span>
          </div>
          <div className="p-5">
            {overviewTab === 'visual' ? (
              <Mermaid code={OVERVIEW_MERMAID} id="overview" />
            ) : (
              <pre className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-4 text-xs leading-relaxed overflow-x-auto whitespace-pre">{OVERVIEW_MERMAID}</pre>
            )}
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Alur besar: <strong>Admin atur field (W-B)</strong> → <strong>Kader input kunjungan (W-C)</strong> → <strong>System pengingat jadwal (W-D)</strong> → <strong>Pembina/Kepala lihat Dashboard (W-E)</strong> → <strong>Pembina rekap & ekspor (W-F)</strong>. Warna mengikuti palet peran di bawah.
            </p>
          </div>
        </div>
      </section>

      <RoleLegend />

      <section className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-900 dark:text-amber-200">
        <p><strong>Cara baca:</strong> Buka tiap kartu W-A…W-F → lihat <em>Langkah mudah</em> (1→N) → tab <strong>Visual</strong> untuk flowchart warna-warni → <strong>Awal/Aksi/Hasil</strong> untuk skenario manusia (toggle <em>Lihat code</em> jika butuh Gherkin teknis). Update PRD 10 Sep — online only.</p>
      </section>

      <section className="space-y-5">
        <SectionTitle
          icon={<Workflow className="w-3.5 h-3.5" />}
          right={
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setAll(keys, true)} className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">Perluas semua</button>
              <button type="button" onClick={() => setAll(keys, false)} className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">Sempitkan semua</button>
            </div>
          }
        >
          6 Alur Inti — Visual + Skenario
        </SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">W-B (Admin definisi <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-700 dark:text-amber-300">kuning</span>) → W-C (Kader render dinamis <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300">hijau</span>) adalah engine form fleksibel. Perubahan field tanpa rebuild.</p>
        <div className="grid gap-3">
          {WORKFLOWS.map((w) => (
            <WorkflowCard key={w.id} w={w} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle icon={<Shield className="w-3.5 h-3.5" />}>Matriks Hak Akses</SectionTitle>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-zinc-50 dark:bg-zinc-950">
              <tr className="text-left text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                <th className="px-4 py-3 font-semibold">Fitur</th>
                <th className="px-4 py-3 font-semibold"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Kader</span></th>
                <th className="px-4 py-3 font-semibold"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" /> Pembina</span></th>
                <th className="px-4 py-3 font-semibold"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" /> Kepala</span></th>
                <th className="px-4 py-3 font-semibold"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Admin</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {MATRIKS_HAK.map((r) => (
                <tr key={r.fitur}>
                  <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-200">{r.fitur}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.kader}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.pembina}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.kepala}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Warna header = palet peran. Kader hanya lihat wilayah binaannya (filter 4 kelurahan diblok). Pembina/Kepala/Admin lihat 4 kelurahan.</p>
      </section>

      <section className="space-y-5">
        <SectionTitle icon={<GitBranch className="w-3.5 h-3.5" />}>State Diagram (ringkas)</SectionTitle>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 -mx-5 px-5 pb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"><Eye className="w-3 h-3" /> Visual</span>
            <span className="text-xs text-zinc-400">Kunjungan / Jadwal / Masalah / Field</span>
          </div>
          <Mermaid code={STATE_MERMAID} id="state" />
          <div className="rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3">
            <p className="text-xs font-mono leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{STATE_DIAGRAM.join('\n')}</p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Field: nonaktif tetap simpan snapshot di kunjungan lama (histori tidak hilang).</p>
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
        <h3 className="font-semibold flex items-center gap-2"><FileText className="w-4 h-4" /> Artefak</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Vault: <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">01 Notes/workflows/</code> — 6 file Mermaid + README + matriks-hak-akses.md<br />
          Repo: <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">docs/workflows/</code> — mirror sinkron (copy 1:1 untuk dekat kode)<br />
          Sumber field: Field Checklist KR - Ekstraksi Definisi Operasional (8 sasaran + Rekap hlm 14 + Tindak Lanjut hlm 15 + Jadwal hlm 16 + Definisi Operasional hlm 17–35)
        </p>
      </section>
    </div>
  )
}

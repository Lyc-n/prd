import { Workflow, Shield, GitBranch, FileText } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import { WORKFLOWS, MATRIKS_HAK, STATE_DIAGRAM } from '../data/workflows'
import { useAccordion } from '../lib/accordion'

function WorkflowCard({ w }) {
  const { acc, setOpen } = useAccordion()
  const open = acc[w.id] ? false : true
  return (
    <article id={w.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => setOpen(w.id, !open)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-5 text-left"
      >
        <span className="shrink-0 w-7 h-7 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 inline-flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
          {w.kode}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base leading-tight">
            {w.judul}
            {w.badge && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-[11px] font-medium text-amber-800 dark:text-amber-200"> {w.badge}</span>}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{w.peran} · <span className="font-mono">{w.file}</span></p>
        </div>
        <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs ${open ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{w.ringkas}</p>
          <div className="rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">User Journey</p>
            <p className="mt-1.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{w.journey}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Skenario Gherkin (pilihan)</p>
            <div className="mt-2 space-y-2">
              {w.gherkin.map((g, i) => (
                <pre key={i} className="rounded-md bg-zinc-900 dark:bg-black border border-zinc-800 p-3 text-xs leading-relaxed text-zinc-100 overflow-x-auto whitespace-pre-wrap">
                  Scenario: {g}
                </pre>
              ))}
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Diagram Mermaid: <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">01 Notes/workflows/{w.file}</code> ↔ <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">docs/workflows/{w.file}</code>
          </p>
        </div>
      )}
    </article>
  )
}

export default function WorkflowPage() {
  const { setAll } = useAccordion()
  const keys = WORKFLOWS.map((w) => w.id)
  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Workflow Aplikasi"
        desc="Hanya alur di dalam aplikasi (bukan kegiatan/perizinan). 6 alur inti + User Journey per role + skenario Gherkin. Diagram Mermaid di Obsidian (01 Notes/workflows/) sinkron ke repo docs/workflows/. Asumsi: online only."
      />

      <section className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-900 dark:text-amber-200">
        <p><strong>Konvensi 10 Sep:</strong> Mermaid di Obsidian · Gherkin Given-When-Then · online only (tanpa draft offline) · simpan di vault + repo. Update PRD 10 Sep.</p>
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
          6 Alur Inti
        </SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">W-B (Admin definisi) → W-C (Kader render dinamis) adalah engine form fleksibel. Perubahan field tanpa rebuild.</p>
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
                <th className="px-4 py-3 font-semibold">Kader</th>
                <th className="px-4 py-3 font-semibold">Pembina</th>
                <th className="px-4 py-3 font-semibold">Kepala Puskesmas</th>
                <th className="px-4 py-3 font-semibold">Admin</th>
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
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Kader hanya lihat wilayah binaannya (filter 4 kelurahan diblok 403). Pembina/Kepala/Admin lihat 4 kelurahan.</p>
      </section>

      <section className="space-y-5">
        <SectionTitle icon={<GitBranch className="w-3.5 h-3.5" />}>State Diagram (ringkas)</SectionTitle>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <pre className="text-sm font-mono leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{STATE_DIAGRAM.join('\n')}</pre>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Field: nonaktif tetap simpan snapshot di kunjungan lama (histori tidak hilang).</p>
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

import { useState } from 'react'
import { Gauge, Link2, ShieldCheck, Search, ListChecks } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import { NFR, DEPENDENCIES, ASSUMPTIONS, RISKS, BUSINESS_RULES } from '../data/governance'

const TABS = [
  { id: 'nfr', label: 'NFR', desc: '7 persyaratan non-fungsional', icon: Gauge },
  { id: 'dep', label: 'Dependensi & Risiko', desc: 'Bergantung, anggap, risiko', icon: Link2 },
  { id: 'br', label: 'Aturan Bisnis', desc: '25 aturan BR-01…BR-25', icon: ShieldCheck },
]

const NFR_COLOR = {
  emerald: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200',
  amber: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200',
  sky: 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900 text-sky-800 dark:text-sky-200',
  violet: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-900 text-violet-800 dark:text-violet-200',
  indigo: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900 text-indigo-800 dark:text-indigo-200',
  rose: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200',
  zinc: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300',
}

function NfrCard({ n }) {
  return (
    <article className={`rounded-lg border p-4 ${NFR_COLOR[n.color]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-mono font-bold">{n.id}</p>
          <h3 className="font-semibold text-sm mt-1">{n.aspek}</h3>
          <p className="text-xs opacity-80 mt-1">{n.deskripsi}</p>
        </div>
        <span className={`shrink-0 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border bg-white/60 dark:bg-black/20 ${n.prioritas === 'M' ? 'border-amber-300 text-amber-700 dark:text-amber-300' : 'border-emerald-300 text-emerald-700 dark:text-emerald-300'}`}>
          {n.prioritas === 'M' ? 'M Wajib' : 'S Penting'}
        </span>
      </div>
      <div className="mt-3 space-y-2 text-sm">
        <p><span className="font-semibold">Target:</span> {n.target}</p>
        <p className="opacity-80"><span className="font-semibold">Kriteria:</span> {n.kriteria}</p>
        <p className="opacity-80"><span className="font-semibold">Cara uji:</span> {n.caraUji}</p>
        <p className="text-xs font-mono opacity-60">Sumber: {n.sumber}</p>
      </div>
    </article>
  )
}

export default function TataKelola() {
  const [tab, setTab] = useState('nfr')
  const [brFilter, setBrFilter] = useState('Semua')
  const [brQuery, setBrQuery] = useState('')

  const kelompokList = ['Semua', ...Array.from(new Set(BUSINESS_RULES.map((b) => b.kelompok)))]
  const filteredBR = BUSINESS_RULES.filter((b) => {
    if (brFilter !== 'Semua' && b.kelompok !== brFilter) return false
    if (brQuery) {
      const q = brQuery.toLowerCase()
      return [b.id, b.label, b.trigger, b.kondisi, b.aksi, b.contoh].join(' ').toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Tata Kelola"
        desc="Gabungan 3 bab: Persyaratan Non-Fungsional (7 NFR terukur) · Ketergantungan, Asumsi & Risiko · Aturan Bisnis 25 aturan bernomor (BR-01…BR-25) dengan label manusia — traceable ke workflow & Gherkin."
      />

      <div className="flex flex-wrap gap-2 border-b border-zinc-200 dark:border-zinc-800 -mx-4 px-4 sm:mx-0 sm:px-0 pb-3">
        {TABS.map(({ id, label, desc, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition ${tab === id ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'}`}
          >
            <Icon className="w-4 h-4" /> {label} <span className="hidden sm:inline text-xs opacity-60">· {desc}</span>
          </button>
        ))}
      </div>

      {tab === 'nfr' && (
        <section className="space-y-5">
          <SectionTitle icon={<Gauge className="w-3.5 h-3.5" />}>Persyaratan Non-Fungsional — 7 NFR terukur (setuju 10 Sep)</SectionTitle>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tiap NFR punya <strong>target ukur</strong> (TTI &lt;3s, p95 &lt;500ms, W-C &lt;3 menit), kriteria penerimaan, dan cara uji. Sumber: URS §5 + keputusan online only.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NFR.map((n) => <NfrCard key={n.id} n={n} />)}
          </div>
        </section>
      )}

      {tab === 'dep' && (
        <div className="space-y-10">
          <section className="space-y-5">
            <SectionTitle icon={<Link2 className="w-3.5 h-3.5" />}>Ketergantungan (Dependencies)</SectionTitle>
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  <tr><th className="px-4 py-3 text-left">Jenis</th><th className="px-4 py-3 text-left">Apa</th><th className="px-4 py-3 text-left">Dampak jika telat</th><th className="px-4 py-3 text-left">Mitigasi / Pemilik</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {DEPENDENCIES.map((d, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${d.jenis === 'Eksternal' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300' : 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900 text-sky-700 dark:text-sky-300'}`}>{d.jenis}</span></td>
                      <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-200">{d.apa}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{d.dampak}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{d.mitigasi} · <span className="font-medium">{d.pemilik}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-5">
            <SectionTitle icon={<ListChecks className="w-3.5 h-3.5" />}>Asumsi (Assumptions) — 5</SectionTitle>
            <div className="grid gap-3">
              {ASSUMPTIONS.map((a) => (
                <div key={a.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                  <p className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">{a.id}</p>
                  <p className="font-medium text-sm mt-1">{a.asumsi}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Dasar: {a.dasar}</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-2"><span className="font-semibold">Jika salah:</span> {a.jikaSalah}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Asumsi A-04 online only adalah keputusan 10 Sep — jika offline dibutuhkan, di luar v1.</p>
          </section>

          <section className="space-y-5">
            <SectionTitle icon={<ShieldCheck className="w-3.5 h-3.5" />}>Risiko (Risks) — 5 + mitigasi</SectionTitle>
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  <tr><th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">Risiko</th><th className="px-4 py-3 text-left">Dampak</th><th className="px-4 py-3 text-left">Mitigasi</th><th className="px-4 py-3 text-left">Pemilik</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {RISKS.map((r) => (
                    <tr key={r.id}>
                      <td className="px-4 py-3 font-mono text-xs font-bold">{r.id}</td>
                      <td className="px-4 py-3 font-medium">{r.risiko}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.dampak}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.mitigasi}</td>
                      <td className="px-4 py-3"><span className="inline-flex px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs">{r.pemilik}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Hak cipta tidak dimasukkan PRD (keputusan 3) — tetap di vault <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">Isu Pembagian Hak Cipta</code>.</p>
          </section>
        </div>
      )}

      {tab === 'br' && (
        <section className="space-y-5">
          <SectionTitle icon={<ShieldCheck className="w-3.5 h-3.5" />}>Aturan Bisnis — 25 aturan bernomor + label manusia</SectionTitle>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tiap BR: Trigger → Kondisi → Aksi → Contoh → Sumber → Workflow. Filter per kelompok & cari (mis. “NIK”, “hipertensi”, “403”).</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-wrap gap-1.5">
              {kelompokList.map((k) => (
                <button key={k} type="button" onClick={() => setBrFilter(k)} className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${brFilter === k ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>{k}</button>
              ))}
            </div>
            <div className="relative sm:ml-auto sm:w-64">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-zinc-400" />
              <input value={brQuery} onChange={(e) => setBrQuery(e.target.value)} placeholder="Cari BR, label, NIK..." className="w-full pl-9 pr-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100" />
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{filteredBR.length} dari {BUSINESS_RULES.length} aturan · kelompok: {brFilter} {brQuery && `· cari: "${brQuery}"`}</p>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
            <table className="w-full text-sm min-w-[960px]">
              <thead className="bg-zinc-50 dark:bg-zinc-950 text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                <tr><th className="px-3 py-3 text-left">ID</th><th className="px-3 py-3 text-left">Label Manusia</th><th className="px-3 py-3 text-left">Trigger → Kondisi → Aksi</th><th className="px-3 py-3 text-left">Contoh</th><th className="px-3 py-3 text-left">Sumber</th><th className="px-3 py-3 text-left">Workflow</th></tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredBR.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-3 py-3 font-mono text-xs font-bold whitespace-nowrap">{b.id}</td>
                    <td className="px-3 py-3 font-medium whitespace-nowrap">{b.label}<br /><span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{b.kelompok}</span></td>
                    <td className="px-3 py-3 text-zinc-700 dark:text-zinc-300 leading-relaxed"><span className="font-medium">{b.trigger}</span> → {b.kondisi} → <span className="font-medium">{b.aksi}</span></td>
                    <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">{b.contoh}</td>
                    <td className="px-3 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">{b.sumber}</td>
                    <td className="px-3 py-3"><span className="inline-flex px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-700 dark:text-indigo-300">{b.workflow}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}

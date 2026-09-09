import { Route, Check, Minus, Flag, CheckCircle2, XCircle } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import Accordion from '../components/Accordion'
import { MILESTONES } from '../data/content'
import { useAccordion } from '../lib/accordion'

function Bullet({ icon: Icon, cls, children }) {
  return (
    <li className="flex items-start gap-2">
      <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${cls}`} />
      <span>{children}</span>
    </li>
  )
}

function DoneWhen({ text }) {
  return (
    <div className="mt-5 rounded-md border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-sm text-emerald-900 dark:text-emerald-200">
      <p className="flex items-start gap-2">
        <Flag className="w-4 h-4 mt-0.5 shrink-0" />
        <span>
          <span className="font-semibold">Selesai ketika:</span> {text}
        </span>
      </p>
    </div>
  )
}

export default function Milestone() {
  const { setAll } = useAccordion()
  const keys = MILESTONES.map((m) => m.id)

  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Milestone"
        desc={'Jalan pembangunan bertahap M1–M4. Tiap tahap punya definisi "selesai" yang jelas — supaya tim dan mitra tahu kapan satu tahap benar-benar rampung.'}
      />

      <section className="space-y-5">
        <SectionTitle
          icon={<Route className="w-3.5 h-3.5" />}
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
          Roadmap M1–M4
        </SectionTitle>

        <div className="space-y-5">
          {MILESTONES.map((m) => (
            <Accordion
              key={m.id}
              id={m.id}
              title={
                <span className="flex items-center gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 inline-flex items-center justify-center text-sm font-semibold">
                    {m.nomor}
                  </span>
                  <span>{m.judul}</span>
                </span>
              }
              headerClassName="w-full flex items-center gap-3 p-5 text-left border-b border-zinc-100 dark:border-zinc-800"
              bodyClassName="p-5 space-y-2"
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
            >
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed pb-3">{m.deskripsi}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Yang dibangun
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {m.dibangun.map((b) => (
                      <Bullet key={b} icon={Check} cls="text-emerald-600 dark:text-emerald-400">
                        {b}
                      </Bullet>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> Bukan bagian milestone ini
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {m.bukan.map((b) => (
                      <Bullet key={b} icon={Minus} cls="text-zinc-400">
                        {b}
                      </Bullet>
                    ))}
                  </ul>
                </div>
              </div>

              <DoneWhen text={m.selesaiKetika} />
            </Accordion>
          ))}
        </div>
      </section>
    </div>
  )
}
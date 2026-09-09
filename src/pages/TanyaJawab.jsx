import { CircleHelp } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import { QNA } from '../data/content'

export default function TanyaJawab() {
  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Tanya Jawab"
        desc="Pertanyaan yang masih terbuka dan perlu dikonfirmasi ke mitra (Bu Dian / Kepala Puskesmas) agar rencana tidak meleset."
      />

      <section className="space-y-5">
        <SectionTitle icon={<CircleHelp className="w-3.5 h-3.5" />}>Pertanyaan terbuka (validasi mitra)</SectionTitle>
        <ul className="space-y-2.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
          {QNA.map((q) => (
            <li key={q} className="flex items-start gap-3">
              <span className="mt-1.5 w-3.5 h-3.5 shrink-0 rounded-sm border border-zinc-300 dark:border-zinc-700" />
              <span className="leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
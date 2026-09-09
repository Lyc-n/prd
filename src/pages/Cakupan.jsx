import { MinusCircle, X } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import PageIntro from '../components/PageIntro'
import { OUT_OF_SCOPE } from '../data/content'

export default function Cakupan() {
  return (
    <div className="space-y-16 md:space-y-20">
      <PageIntro
        title="Cakupan"
        desc="Hal-hal yang sengaja tidak dikerjakan di versi pertama (v1). Daftar ini penting agar ekspektasi mitra realistis — dan agar fokus tim tetap tajam sampai demo 27 September."
      />

      <section className="space-y-5">
        <SectionTitle icon={<MinusCircle className="w-3.5 h-3.5" />}>Di luar cakupan (v1)</SectionTitle>
        <ul className="space-y-2.5">
          {OUT_OF_SCOPE.map((o) => (
            <li key={o.judul} className="flex items-start gap-3">
              <X className="w-4 h-4 mt-1 shrink-0 text-zinc-400 dark:text-zinc-600" />
              <span className="text-zinc-700 dark:text-zinc-300">
                <span className="font-medium">{o.judul}</span>
                <span className="text-zinc-500 dark:text-zinc-400"> — {o.teks}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
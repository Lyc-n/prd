export default function PageIntro({ title, desc }) {
  return (
    <div className="space-y-3 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h1>
      {desc && <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">{desc}</p>}
    </div>
  )
}
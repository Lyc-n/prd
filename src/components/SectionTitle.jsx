export default function SectionTitle({ icon, children, right }) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
        {icon}
        {children}
      </h2>
      {right}
    </div>
  )
}
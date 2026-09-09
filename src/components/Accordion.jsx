import { ChevronDown } from 'lucide-react'
import { useAccordion } from '../lib/accordion'

export default function Accordion({
  id,
  icon: Icon,
  title,
  meta,
  right,
  defaultOpen = true,
  children,
  headerClassName = 'w-full flex items-center gap-3 p-5 text-left',
  bodyClassName = 'px-5 pb-5',
  className = 'rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900',
  hit = false,
}) {
  const { acc, setOpen } = useAccordion()
  const open = acc[id] ? false : defaultOpen

  return (
    <article id={id} className={`${className} ${hit ? 'rel-hit' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen(id, !open)}
        aria-expanded={open}
        className={headerClassName}
      >
        {Icon && <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />}
        <span className="min-w-0 flex-1 text-left">
          <span className={`block font-semibold ${meta ? '' : ''}`}>{title}</span>
          {meta && <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-normal">{meta}</span>}
        </span>
        {right}
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${open ? '' : 'rotate-180'}`} />
      </button>
      {open && <div className={bodyClassName}>{children}</div>}
    </article>
  )
}
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Sparkles, MinusCircle, Database, Route, Kanban, CircleHelp, Download, Workflow } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export const NAV_ITEMS = [
  { to: '/', label: 'Sekilas', icon: LayoutDashboard, end: true },
  { to: '/fitur', label: 'Fitur', icon: Sparkles, end: false },
  { to: '/cakupan', label: 'Cakupan', icon: MinusCircle, end: false },
  { to: '/data', label: 'Data', icon: Database, end: false },
  { to: '/workflow', label: 'Workflow', icon: Workflow, end: false },
  { to: '/milestone', label: 'Milestone', icon: Route, end: false },
  { to: '/rencana', label: 'Rencana Kerja', icon: Kanban, end: false },
  { to: '/qna', label: 'Tanya Jawab', icon: CircleHelp, end: false },
]

const DOWNLOAD_URL = '/PRD - Dashboard PWS Posyandu.md'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/85 dark:bg-zinc-950/85 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-3">
        <NavLink to="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
          PRD · Dashboard PWS Posyandu
        </NavLink>
        <div className="flex items-center gap-2">
          <a
            href={DOWNLOAD_URL}
            download="PRD - Dashboard PWS Posyandu.md"
            className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            title="Unduh berkas PRD (markdown)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh PRD</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
      <nav className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium border transition ${
                isActive
                  ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`
            }
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
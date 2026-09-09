import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePersistentState } from '../lib/hooks'

export default function ThemeToggle() {
  const [theme, setTheme] = usePersistentState('prd-theme', () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  const [, force] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    force((n) => n + 1)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti tema"
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
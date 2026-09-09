import { useEffect, useRef, useState } from 'react'

let initialized = false
let mermaidInstance = null

async function getMermaid() {
  if (mermaidInstance) return mermaidInstance
  const mod = await import('mermaid')
  mermaidInstance = mod.default
  return mermaidInstance
}

function getTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'default'
}

export default function Mermaid({ code, id }) {
  const ref = useRef(null)
  const [error, setError] = useState(null)
  const [svg, setSvg] = useState('')

  useEffect(() => {
    let cancelled = false
    async function render() {
      try {
        const mermaid = await getMermaid()
        const theme = getTheme()
        if (!initialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: theme === 'dark' ? 'dark' : 'default',
            fontFamily: 'Inter, ui-sans-serif, system-ui',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
            themeVariables: theme === 'dark'
              ? { primaryColor: '#27272a', primaryTextColor: '#e4e4e7', lineColor: '#71717a', secondaryColor: '#18181b', tertiaryColor: '#3f3f46' }
              : { primaryColor: '#f4f4f5', primaryTextColor: '#18181b', lineColor: '#71717a', secondaryColor: '#ffffff', tertiaryColor: '#e4e4e7' },
          })
          initialized = true
        } else {
          mermaid.initialize({ theme: theme === 'dark' ? 'dark' : 'default' })
        }
        setError(null)
        const uniqueId = `mermaid-${id}-${Date.now()}`
        const { svg: rendered } = await mermaid.render(uniqueId, code)
        if (!cancelled) setSvg(rendered)
      } catch (e) {
        if (!cancelled) setError(e.message || String(e))
      }
    }
    render()
    return () => { cancelled = true }
  }, [code, id])

  if (error) {
    return (
      <div className="rounded-md border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-3">
        <p className="text-xs font-medium text-amber-800 dark:text-amber-200">Diagram gagal dirender</p>
        <pre className="mt-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap break-words">{code}</pre>
        <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">{error}</p>
      </div>
    )
  }

  if (!svg) {
    return <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6 text-xs text-zinc-500 dark:text-zinc-400">Memuat diagram...</div>
  }

  return (
    <div
      ref={ref}
      className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 sm:p-4 overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

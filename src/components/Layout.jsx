import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BackToTop from './BackToTop'

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <Outlet />
      </main>
      <footer className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 text-xs text-zinc-500 dark:text-zinc-400">
        <p className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
          Dibuat dengan <span className="font-medium">bm-prd-creator</span> · update 9 Sep 2026 (SPA React, terpisah per halaman). Centang progress task tersimpan otomatis di perangkat ini.
        </p>
      </footer>
      <BackToTop />
    </div>
  )
}
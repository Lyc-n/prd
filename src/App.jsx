import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import { AccordionProvider } from './lib/accordion'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'
import Fitur from './pages/Fitur'
import Cakupan from './pages/Cakupan'
import Data from './pages/Data'
import Milestone from './pages/Milestone'
import Rencana from './pages/Rencana'
import TanyaJawab from './pages/TanyaJawab'
const Workflow = lazy(() => import('./pages/Workflow'))

export default function App() {
  return (
    <BrowserRouter>
      <AccordionProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="fitur" element={<Fitur />} />
            <Route path="cakupan" element={<Cakupan />} />
            <Route path="data" element={<Data />} />
            <Route path="workflow" element={<Suspense fallback={<div className="p-8 text-sm text-zinc-500">Memuat workflow...</div>}><Workflow /></Suspense>} />
            <Route path="milestone" element={<Milestone />} />
            <Route path="rencana" element={<Rencana />} />
            <Route path="qna" element={<TanyaJawab />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AccordionProvider>
    </BrowserRouter>
  )
}
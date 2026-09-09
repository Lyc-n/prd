import { createContext, useContext } from 'react'
import { usePersistentState } from './hooks'

const KEY = 'prd-acc'
const AccContext = createContext(null)

export function AccordionProvider({ children }) {
  const [acc, setAcc] = usePersistentState(KEY, {})

  const setOpen = (id, open) =>
    setAcc((prev) => {
      const next = { ...prev }
      if (open) delete next[id]
      else next[id] = 1
      return next
    })

  const setAll = (ids, open) =>
    setAcc((prev) => {
      const next = { ...prev }
      ids.forEach((id) => {
        if (open) delete next[id]
        else next[id] = 1
      })
      return next
    })

  const value = { acc, setOpen, setAll }
  return <AccContext.Provider value={value}>{children}</AccContext.Provider>
}

export function useAccordion() {
  const ctx = useContext(AccContext)
  if (!ctx) throw new Error('useAccordion must be used within AccordionProvider')
  return ctx
}
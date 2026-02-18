import { createContext, useContext } from 'react'
import { useTickets } from './hooks/useTickets'

type TicketsCtx = ReturnType<typeof useTickets>
const TicketsContext = createContext<TicketsCtx | null>(null)

export function TicketsProvider({ children }: { children: React.ReactNode }) {
  const value = useTickets()
  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
}

export function useTicketsCtx() {
  const ctx = useContext(TicketsContext)
  if (!ctx) throw new Error('useTicketsCtx must be used inside TicketsProvider')
  return ctx
}

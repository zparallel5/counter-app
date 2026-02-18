import { useState, useCallback } from 'react'
import type { Ticket, TicketPriority } from '../types'

const STORAGE_KEY = 'tickets'

function load(): Ticket[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function save(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(load)

  const createTicket = useCallback((data: {
    title: string
    description: string
    priority: TicketPriority
  }): Ticket => {
    const now = new Date().toISOString()
    const ticket: Ticket = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: 'open',
      priority: data.priority,
      createdAt: now,
      updatedAt: now,
      comments: [],
    }
    setTickets(prev => {
      const next = [ticket, ...prev]
      save(next)
      return next
    })
    return ticket
  }, [])

  const updateTicket = useCallback((id: string, patch: Partial<Pick<Ticket, 'title' | 'description' | 'status' | 'priority'>>) => {
    setTickets(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t)
      save(next)
      return next
    })
  }, [])

  const addComment = useCallback((id: string, body: string) => {
    setTickets(prev => {
      const next = prev.map(t => t.id === id ? {
        ...t,
        updatedAt: new Date().toISOString(),
        comments: [...t.comments, { id: crypto.randomUUID(), body, createdAt: new Date().toISOString() }]
      } : t)
      save(next)
      return next
    })
  }, [])

  const deleteTicket = useCallback((id: string) => {
    setTickets(prev => {
      const next = prev.filter(t => t.id !== id)
      save(next)
      return next
    })
  }, [])

  const getTicket = useCallback((id: string) => {
    return tickets.find(t => t.id === id)
  }, [tickets])

  return { tickets, createTicket, updateTicket, addComment, deleteTicket, getTicket }
}

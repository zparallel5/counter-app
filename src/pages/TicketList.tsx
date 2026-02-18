import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTicketsCtx } from '../TicketsContext'
import { StatusBadge, PriorityBadge } from '../components/Badge'
import type { TicketStatus, TicketPriority } from '../types'
import './TicketList.css'

const STATUSES: TicketStatus[] = ['open', 'in-progress', 'closed']
const PRIORITIES: TicketPriority[] = ['high', 'medium', 'low']

export function TicketList() {
  const { tickets } = useTicketsCtx()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = tickets.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) &&
        !t.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="ticket-list-page">
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search tickets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filters">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as TicketStatus | 'all')}>
            <option value="all">All statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as TicketPriority | 'all')}>
            <option value="all">All priorities</option>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>{tickets.length === 0 ? 'No tickets yet.' : 'No tickets match your filters.'}</p>
          {tickets.length === 0 && (
            <button className="btn btn-primary" onClick={() => navigate('/new')}>Create your first ticket</button>
          )}
        </div>
      ) : (
        <div className="ticket-grid">
          {filtered.map(ticket => (
            <div key={ticket.id} className="ticket-card" onClick={() => navigate(`/ticket/${ticket.id}`)}>
              <div className="ticket-card-header">
                <span className="ticket-title">{ticket.title}</span>
                <PriorityBadge priority={ticket.priority} />
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-card-footer">
                <StatusBadge status={ticket.status} />
                <span className="ticket-meta">
                  {ticket.comments.length} comment{ticket.comments.length !== 1 ? 's' : ''} &middot; {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

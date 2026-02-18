import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTicketsCtx } from '../TicketsContext'
import type { TicketPriority } from '../types'
import './Form.css'

export function CreateTicket() {
  const { createTicket } = useTicketsCtx()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TicketPriority>('medium')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required.'); return }
    const ticket = createTicket({ title: title.trim(), description: description.trim(), priority })
    navigate(`/ticket/${ticket.id}`)
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>New Ticket</h2>
        <form onSubmit={submit}>
          <label>
            Title <span className="required">*</span>
            <input
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setError('') }}
              placeholder="Short summary of the issue"
              autoFocus
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <label>
            Description
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Steps to reproduce, context, screenshots..."
              rows={5}
            />
          </label>
          <label>
            Priority
            <select value={priority} onChange={e => setPriority(e.target.value as TicketPriority)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Ticket</button>
          </div>
        </form>
      </div>
    </div>
  )
}

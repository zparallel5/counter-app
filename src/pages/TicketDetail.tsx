import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTicketsCtx } from '../TicketsContext'
import type { TicketStatus, TicketPriority } from '../types'
import './TicketDetail.css'
import './Form.css'

export function TicketDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getTicket, updateTicket, addComment, deleteTicket } = useTicketsCtx()
  const ticket = getTicket(id!)

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [comment, setComment] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!ticket) {
    return (
      <div className="form-page">
        <div className="form-card">
          <h2>Ticket not found</h2>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>Back to list</button>
        </div>
      </div>
    )
  }

  const startEdit = () => {
    setTitle(ticket.title)
    setDescription(ticket.description)
    setEditing(true)
  }

  const saveEdit = () => {
    if (!title.trim()) return
    updateTicket(ticket.id, { title: title.trim(), description: description.trim() })
    setEditing(false)
  }

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    addComment(ticket.id, comment.trim())
    setComment('')
  }

  const handleDelete = () => {
    deleteTicket(ticket.id)
    navigate('/')
  }

  return (
    <div className="detail-page">
      <button className="back-link" onClick={() => navigate('/')}>← Back to tickets</button>

      <div className="detail-card">
        {editing ? (
          <div className="edit-form">
            <input className="edit-title-input" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="edit-desc-input" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        ) : (
          <>
            <div className="detail-header">
              <h2>{ticket.title}</h2>
              <button className="btn btn-ghost btn-sm" onClick={startEdit}>Edit</button>
            </div>
            <p className="detail-description">{ticket.description || <em>No description.</em>}</p>
          </>
        )}

        <div className="detail-meta">
          <div className="meta-row">
            <span className="meta-label">Status</span>
            <select
              value={ticket.status}
              onChange={e => updateTicket(ticket.id, { status: e.target.value as TicketStatus })}
            >
              <option value="open">open</option>
              <option value="in-progress">in-progress</option>
              <option value="closed">closed</option>
            </select>
          </div>
          <div className="meta-row">
            <span className="meta-label">Priority</span>
            <select
              value={ticket.priority}
              onChange={e => updateTicket(ticket.id, { priority: e.target.value as TicketPriority })}
            >
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </div>
          <div className="meta-row">
            <span className="meta-label">Created</span>
            <span>{new Date(ticket.createdAt).toLocaleString()}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Updated</span>
            <span>{new Date(ticket.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h3>Comments ({ticket.comments.length})</h3>
        {ticket.comments.length === 0 && <p className="no-comments">No comments yet.</p>}
        {ticket.comments.map(c => (
          <div key={c.id} className="comment">
            <p>{c.body}</p>
            <span className="comment-date">{new Date(c.createdAt).toLocaleString()}</span>
          </div>
        ))}
        <form className="comment-form" onSubmit={submitComment}>
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
          />
          <button type="submit" className="btn btn-primary" disabled={!comment.trim()}>Add Comment</button>
        </form>
      </div>

      <div className="danger-zone">
        {confirmDelete ? (
          <>
            <p>Are you sure? This cannot be undone.</p>
            <button className="btn btn-danger" onClick={handleDelete}>Yes, delete</button>
            <button className="btn btn-ghost" onClick={() => setConfirmDelete(false)}>Cancel</button>
          </>
        ) : (
          <button className="btn btn-danger-ghost" onClick={() => setConfirmDelete(true)}>Delete ticket</button>
        )}
      </div>
    </div>
  )
}

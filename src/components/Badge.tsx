import type { TicketStatus, TicketPriority } from '../types'
import './Badge.css'

export function StatusBadge({ status }: { status: TicketStatus }) {
  return <span className={`badge status-${status}`}>{status}</span>
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return <span className={`badge priority-${priority}`}>{priority}</span>
}

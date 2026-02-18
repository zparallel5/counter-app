export type TicketStatus = 'open' | 'in-progress' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface Comment {
  id: string
  body: string
  createdAt: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

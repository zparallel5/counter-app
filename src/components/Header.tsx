import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="header">
      <Link to="/" className="header-logo">🎫 TicketBoard</Link>
      <button className="btn btn-primary" onClick={() => navigate('/new')}>+ New Ticket</button>
    </header>
  )
}

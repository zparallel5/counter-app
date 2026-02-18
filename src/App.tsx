import { HashRouter, Routes, Route } from 'react-router-dom'
import { TicketsProvider } from './TicketsContext'
import { Header } from './components/Header'
import { TicketList } from './pages/TicketList'
import { CreateTicket } from './pages/CreateTicket'
import { TicketDetail } from './pages/TicketDetail'
import './App.css'

function App() {
  return (
    <TicketsProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/new" element={<CreateTicket />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
        </Routes>
      </HashRouter>
    </TicketsProvider>
  )
}

export default App

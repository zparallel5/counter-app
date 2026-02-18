import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setCount(prev => {
          if (prev >= 10) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            setDone(true)
            return prev
          }
          return prev + 1
        })
      }, 500)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const start = () => {
    setCount(0)
    setDone(false)
    setRunning(true)
  }

  return (
    <div className="container">
      <h1>Counter App</h1>
      <div className="count">{count}</div>
      <p className="status">
        {done ? 'Done!' : running ? 'Counting...' : 'Press start'}
      </p>
      <button onClick={start} disabled={running}>
        {done ? 'Again?' : 'Start'}
      </button>
      <p className="note">⚠️ Backend sync coming soon™</p>
    </div>
  )
}

export default App

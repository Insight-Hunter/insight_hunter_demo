import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial', margin: '24px' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src="/logo.png" alt="Insight Hunter" width="32" height="32"/>
        <b>Insight Hunter — Demo</b>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <Link to="/" style={{ textDecoration: pathname==='/'?'underline':'none' }}>Dashboard</Link>
          <Link to="/forecast" style={{ textDecoration: pathname==='/forecast'?'underline':'none' }}>Forecast</Link>
          <a href="/api/health" target="_blank" rel="noreferrer">API</a>
          <Link to="/login">Demo Login</Link>
        </nav>
      </header>
      <Outlet/>
      <footer style={{ marginTop: 32, opacity: 0.7 }}>
        Cloudflare Pages + Functions (Hono) • Read-only demo
/footer>
=======
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
export default function App() {
  const { pathname } = useLocation()
  return (
    <div style={{ fontFamily:'Inter, system-ui, Arial', margin:24 }}>
      <header style={{ display:'flex', gap:12, alignItems:'center' }}>
        <img src="/logo.png" width="28" height="28" alt="IH"/>
        <b>Insight Hunter — Demo</b>
        <nav style={{ marginLeft:'auto', display:'flex', gap:12 }}>
          <Link to="/" style={{ textDecoration: pathname==='/'?'underline':'none' }}>Dashboard</Link>
          <Link to="/forecast" style={{ textDecoration: pathname==='/forecast'?'underline':'none' }}>Forecast</Link>
          <a href="/api/health" target="_blank" rel="noreferrer">API</a>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Outlet/>
    </div>
  )
}

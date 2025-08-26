import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
export default function App() {
  const { pathname } = useLocation()
  const Nav = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} style={{ textDecoration: pathname===to?'underline':'none', padding:'6px 8px' }}>{label}</Link>
  )
  return (
    <div style={{ fontFamily:'Inter, system-ui, Arial', minHeight:'100vh', display:'grid', gridTemplateRows:'auto 1fr auto' }}>
      <header style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:'1px solid #eee' }}>
        <strong>Insight Hunter — Demo</strong>
        <nav style={{ marginLeft:'auto', display:'flex', gap:10 }}>
          <Nav to="/" label="Dashboard" />
          <Nav to="/forecast" label="Forecast" />
          <Nav to="/login" label="Login" />
          <Nav to="/assistant" label="AI Assistant" />
          <Nav to="/alerts" label="Alerts" />
          <Nav to="/analytics" label="Analytics" />
          <Nav to="/planning"  label="Planning" />
          <Nav to="/profiles"  label="Profiles" />
          <Nav to="/settings"  label="Settings" />

          <a href="/api/health" target="_blank" rel="noreferrer" style={{ padding:'6px 8px' }}>API</a>
        </nav>
      </header>
      <main style={{ padding:'16px 18px' }}><Outlet/></main>
      <footer style={{ padding:'12px 18px', borderTop:'1px solid #eee', fontSize:12, color:'#666' }}>Cloudflare Pages + Functions • v0.1</footer>
    </div>
  )
}

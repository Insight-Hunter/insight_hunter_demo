import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()

  const NavLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      style={{
        textDecoration: pathname === to ? 'underline' : 'none',
        padding: '6px 8px',
        borderRadius: 6
      }}
    >
      {label}
    </Link>
  )

  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial', minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid #eee' }}>
        <img src="/logo.png" alt="Insight Hunter" width={28} height={28} onError={(e:any)=>{ e.currentTarget.style.display='none' }} />
        <strong>Insight Hunter — Demo</strong>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <NavLink to="/" label="Dashboard" />
          <NavLink to="/forecast" label="Forecast" />
          <NavLink to="/login" label="Login" />
          <a href="/api/health" target="_blank" rel="noreferrer" style={{ padding: '6px 8px' }}>API</a>
        </nav>
      </header>

      <main style={{ padding: '16px 18px' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '12px 18px', borderTop: '1px solid #eee', fontSize: 12, color: '#666' }}>
        Cloudflare Pages + Functions (Hono) • Read-only demo • <code>v0.1</code>
      </footer>
    </div>
  )
}

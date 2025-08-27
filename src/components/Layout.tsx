import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppHeader from './AppHeader'
import TabBar from './TabBar'
import Button from './Button'

export default function Layout() {
  const nav = useNavigate()
  return (
    <div style={{minHeight:'100dvh', display:'grid', gridTemplateRows:'auto 1fr auto'}}>
      <AppHeader title="Insight Hunter" right={<Button variant="outline" size="sm" onClick={() => nav('/settings')}>Profile</Button>} />
      <main className="page">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <TabBar />
      <button className="fab" aria-label="New">
        +
      </button>
    </div>
  )
}

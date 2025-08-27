import React from 'react'
import Button from '../components/Button'

export default function Dashboard() {
  return (
    <div className="v-stack">
      <div className="spread">
        <div>
          <div className="h2 heading">Welcome back 👋</div>
          <div className="text-dim">Here’s your financial snapshot</div>
        </div>
        <Button variant="primary" size="sm">Create Report</Button>
      </div>

      <div className="grid-cards">
        <div className="card v-stack">
          <div className="text-dim">MRR</div>
          <div className="h1 heading">$6,400</div>
          <div className="text-dim">+4.2% this month</div>
        </div>
        <div className="card v-stack">
          <div className="text-dim">Active Workspaces</div>
          <div className="h1 heading">41</div>
          <div className="text-dim">+3 new</div>
        </div>
      </div>

      <div className="card">
        <div className="h3 heading" style={{marginBottom:8}}>Recent Activity</div>
        <div className="v-stack">
          <div className="spread"><span className="chip">Report</span><span className="text-dim">2m ago</span></div>
          <div className="skeleton" style={{height:10}} />
          <div className="skeleton" style={{height:10, width:'80%'}} />
        </div>
      </div>
    </div>
  )
}

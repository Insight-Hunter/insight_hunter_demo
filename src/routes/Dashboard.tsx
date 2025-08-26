import React, { useEffect, useState } from 'react'
import ChartCard from '../components/ChartCard'
import CSVUpload from '../components/CSVUpload'

type Metric = { label: string; value: string }
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [rows, setRows] = useState<Point[]>([])
  const [insights, setInsights] = useState<string[]>([])

  useEffect(()=>{ fetch('/api/demo/summary').then(r=>r.json()).then(setMetrics) },[])
  useEffect(()=>{ fetch('/data/demo-financials.json').then(r=>r.json()).then(setRows) },[])
  useEffect(()=>{ fetch('/api/demo/insights').then(r=>r.json()).then(d=>setInsights(d.insights||[])) },[])

  return (
    <div className="container">
      {/* HERO */}
      <div className="row" style={{alignItems:'center', marginTop:8}}>
        <div>
          <div className="h1">AI-Powered Auto-CFO for Everyone</div>
          <p className="lead">Enterprise-grade insights, now in your hands</p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:8}}>
            <label className="btn">
              <input type="file" accept=".csv,text/csv" hidden
                     onChange={e=>{ const f=e.target.files?.[0]; if(f){ /* reuse CSV uploader parser */ }}} />
              Upload File (CSV)
            </label>
            <a className="btn secondary" href="#" onClick={e=>e.preventDefault()}>Connect QuickBooks</a>
          </div>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div style={{marginTop:18}}>
        <div className="h2">AI Insights</div>
        <ul style={{margin:'8px 0 16px'}}>
          {insights.map((t,i)=><li key={i} style={{marginBottom:6}}>{t}</li>)}
        </ul>
      </div>

      {/* KPIs + CHARTS */}
      <div className="kpi">
        {metrics.map((m,i)=>(
          <div className="card" key={i}><div className="muted">{m.label}</div><div className="val">{m.value}</div></div>
        ))}
      </div>

      <div className="row row-2" style={{marginTop:16}}>
        <div className="card"><ChartCard data={rows}/></div>
        <div className="card">
          <div style={{fontWeight:800, marginBottom:8}}>Expense Breakdown</div>
          <div style={{height:260, display:'grid', placeItems:'center', color:'#64748b'}}>Pie (demo)</div>
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{display:'flex', gap:12, marginTop:16, flexWrap:'wrap'}}>
        <a className="btn" href="/api/report/download">⬇ Download Report</a>
        <a className="btn secondary" href="/api/notify/test">✉ Email to Client</a>
      </div>

      {/* CSV Upload (actual data override) */}
      <div className="card" style={{marginTop:16}}>
        <CSVUpload onData={setRows}/>
      </div>

      {/* Reports list mock */}
      <div style={{marginTop:16}}>
        <div className="h2">Reports List</div>
        <div className="card" style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <span className="badge">March 2025</span>
          <span className="badge">April 2025</span>
          <span className="badge">May 2025</span>
        </div>
      </div>
    </div>
  )
}

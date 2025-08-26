import React, { useEffect, useState } from 'react'

type Row = { month: string; cashIn: number; cashOut: number; netCash: number; eomBalance: number }

export default function Forecast(){
  const [rows, setRows] = useState<Row[]>([])
  const [period, setPeriod] = useState<string>('July 2025')

  useEffect(()=>{ fetch('/api/demo/forecast').then(r=>r.json()).then(setRows).catch(()=>setRows([])) },[])

  return (
    <div className="container">
      <div className="h1">Forecast</div>

      <div className="card" style={{display:'grid', gap:12, gridTemplateColumns:'1fr auto auto', alignItems:'end'}}>
        <div>
          <label style={{fontWeight:700, display:'block', marginBottom:6}}>Enter forecast period:</label>
          <input className="input" value={period} onChange={e=>setPeriod(e.target.value)} />
        </div>
        <label className="btn">Upload F/G6</label>
        <button className="btn">Generate</button>
      </div>

      <div className="card" style={{marginTop:16}}>
        <div style={{fontWeight:800, marginBottom:8}}>Revenue Forecast</div>
        <table className="table">
          <thead><tr><th align="left">Month</th><th align="right">Cash In</th><th align="right">Cash Out</th><th align="right">Net</th><th align="right">EoM Balance</th></tr></thead>
          <tbody>{rows.map((r,i)=>(
            <tr key={i}><td>{r.month}</td><td align="right">{r.cashIn.toLocaleString()}</td><td align="right">{r.cashOut.toLocaleString()}</td><td align="right">{r.netCash.toLocaleString()}</td><td align="right">{r.eomBalance.toLocaleString()}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <div style={{display:'flex', gap:12, marginTop:16, flexWrap:'wrap'}}>
        <a className="btn" href="/api/report/download">⬇ Download Report</a>
        <a className="btn secondary" href="/api/notify/test">✉ Email to Client</a>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
<<<<<<< HEAD

type Metric = { label: string; value: string }
type ChartPoint = { month: string; revenue: number; grossProfit: number; netIncome: number }

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [series, setSeries] = useState<ChartPoint[]>([])

  useEffect(() => {
    fetch('/api/demo/summary').then(r=>r.json()).then(setMetrics)
    fetch('/data/demo-financials.json').then(r=>r.json()).then(setSeries)
  }, [])

  return (
    <div>
      <h2>Executive Snapshot</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
            <div style={{ opacity:0.7 }}>{m.label}</div>
            <div style={{ fontSize:24, fontWeight:700 }}>{m.value}</div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop:24 }}>Revenue / GP / Net (last 6 months)</h3>
      <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
        {/* simple table instead of a chart to avoid chart libs */}
        <table width="100%" cellPadding="8">
          <thead><tr>
            <th align="left">Month</th>
            <th align="right">Revenue</th>
            <th align="right">Gross Profit</th>
            <th align="right">Net Income</th>
          </tr></thead>
          <tbody>
            {series.map((p, i)=>(
              <tr key={i}>
                <td>{p.month}</td>
                <td align="right">{p.revenue.toLocaleString()}</td>
                <td align="right">{p.grossProfit.toLocaleString()}</td>
                <td align="right">{p.netIncome.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

=======
type Metric = { label: string; value: string }
type Row = { month: string; revenue: number; grossProfit: number; netIncome: number }
export default function Dashboard(){
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{ fetch('/api/demo/summary').then(r=>r.json()).then(setMetrics) },[])
  useEffect(()=>{ fetch('/data/demo-financials.json').then(r=>r.json()).then(setRows) },[])
  return (
    <div>
      <h2>Executive Snapshot</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {metrics.map((m,i)=>(
          <div key={i} style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
            <div style={{ opacity:0.7 }}>{m.label}</div>
            <div style={{ fontSize:22, fontWeight:700 }}>{m.value}</div>
          </div>
        ))}
      </div>
      <h3 style={{ marginTop:24 }}>Revenue / GP / Net (last 6mo)</h3>
      <table width="100%" cellPadding="8" style={{ border:'1px solid #ddd', borderRadius:8 }}>
        <thead><tr><th align="left">Month</th><th align="right">Revenue</th><th align="right">GP</th><th align="right">Net</th></tr></thead>
        <tbody>{rows.map((r,i)=>(
          <tr key={i}><td>{r.month}</td><td align="right">{r.revenue.toLocaleString()}</td><td align="right">{r.grossProfit.toLocaleString()}</td><td align="right">{r.netIncome.toLocaleString()}</td></tr>
        ))}</tbody>
      </table>
    </div>
  )
}
>>>>>>> bb868bd (update to demo files)

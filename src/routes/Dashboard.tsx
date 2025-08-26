import React, { useEffect, useState } from 'react'
import ChartCard from '../components/ChartCard'
import Insights from '../components/Insights'
import CSVUpload from '../components/CSVUpload'

type Metric = { label: string; value: string }
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [rows, setRows] = useState<Point[]>([])

  useEffect(() => { fetch('/api/demo/summary').then(r=>r.json()).then(setMetrics) }, [])
  useEffect(() => { fetch('/data/demo-financials.json').then(r=>r.json()).then(setRows) }, [])

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

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginTop:16 }}>
        <ChartCard data={rows} />
        <Insights fallback={[]} />
      </div>

      <div style={{ marginTop:16 }}>
        <CSVUpload onData={setRows} />
      </div>

      <h3 style={{ marginTop:16 }}>Data Table</h3>
      <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
        <table width="100%" cellPadding={8}>
          <thead><tr>
            <th align="left">Month</th>
            <th align="right">Revenue</th>
            <th align="right">Gross Profit</th>
            <th align="right">Net Income</th>
          </tr></thead>
          <tbody>
            {rows.map((p, i)=>(
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

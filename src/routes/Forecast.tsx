import React, { useEffect, useState } from 'react'
<<<<<<< HEAD

type Row = { month: string; cashIn: number; cashOut: number; netCash: number; eomBalance: number }

export default function Forecast() {
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{ fetch('/api/demo/forecast').then(r=>r.json()).then(setRows) },[])

=======
type Row = { month: string; cashIn: number; cashOut: number; netCash: number; eomBalance: number }
export default function Forecast(){
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{ fetch('/api/demo/forecast').then(r=>r.json()).then(setRows) },[])
>>>>>>> bb868bd (update to demo files)
  return (
    <div>
      <h2>Cash Flow Predictor (Demo)</h2>
      <table width="100%" cellPadding="8" style={{ border:'1px solid #ddd', borderRadius:8 }}>
<<<<<<< HEAD
        <thead><tr>
          <th align="left">Month</th>
          <th align="right">Cash In</th>
          <th align="right">Cash Out</th>
          <th align="right">Net</th>
          <th align="right">EoM Balance</th>
        </tr></thead>
        <tbody>
          {rows.map((r, i)=>(
            <tr key={i}>
              <td>{r.month}</td>
              <td align="right">{r.cashIn.toLocaleString()}</td>
              <td align="right">{r.cashOut.toLocaleString()}</td>
              <td align="right">{r.netCash.toLocaleString()}</td>
              <td align="right">{r.eomBalance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop:12, opacity:0.7 }}>Static demo values served by Hono API.</p>
    </div>
  )
}

=======
        <thead><tr><th align="left">Month</th><th align="right">Cash In</th><th align="right">Cash Out</th><th align="right">Net</th><th align="right">EoM Balance</th></tr></thead>
        <tbody>{rows.map((r,i)=>(
          <tr key={i}><td>{r.month}</td><td align="right">{r.cashIn.toLocaleString()}</td><td align="right">{r.cashOut.toLocaleString()}</td><td align="right">{r.netCash.toLocaleString()}</td><td align="right">{r.eomBalance.toLocaleString()}</td></tr>
        ))}</tbody>
      </table>
    </div>
  )
}
>>>>>>> bb868bd (update to demo files)

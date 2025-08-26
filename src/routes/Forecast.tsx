import React, { useEffect, useState } from 'react'

type Row = {
  month: string
  cashIn: number
  cashOut: number
  netCash: number
  eomBalance: number
}

export default function Forecast() {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    fetch('/api/demo/forecast')
      .then(r => r.json())
      .then(setRows)
      .catch(() => {
        setRows([]) // fail silently in demo
      })
  }, [])

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Cash Flow Forecast (Demo)</h2>
      {rows.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No forecast data available.</p>
      ) : (
        <table
          width="100%"
          cellPadding={8}
          style={{ border: '1px solid #ddd', borderRadius: 8, marginTop: 12 }}
        >
          <thead>
            <tr>
              <th align="left">Month</th>
              <th align="right">Cash In</th>
              <th align="right">Cash Out</th>
              <th align="right">Net</th>
              <th align="right">EoM Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
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
      )}
      <p style={{ marginTop: 12, opacity: 0.7 }}>
        Demo values are static from the API.
      </p>
    </div>
  )
}


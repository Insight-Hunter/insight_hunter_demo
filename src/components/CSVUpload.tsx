import React from 'react'
import Papa from 'papaparse'

type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }

export default function CSVUpload({ onData }: { onData: (rows: Point[]) => void }) {
  const handle = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rows = (res.data as any[]).map(r => ({
          month: String(r.month ?? r.Month ?? r.date ?? r.Date ?? ''),
          revenue: Number(r.revenue ?? r.Revenue ?? r.rev ?? 0),
          grossProfit: Number(r.grossProfit ?? r.GP ?? r.gross_profit ?? 0),
          netIncome: Number(r.netIncome ?? r.Net ?? r.net ?? 0),
        })).filter(r => r.month)
        onData(rows)
      }
    })
  }

  return (
    <div style={{ border:'1px dashed #bbb', borderRadius:8, padding:12, display:'flex', alignItems:'center', gap:12 }}>
      <div style={{ fontWeight:600 }}>Upload CSV</div>
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={(e)=>{ const f=e.target.files?.[0]; if (f) handle(f) }}
      />
      <div style={{ opacity:0.7 }}>Columns: month, revenue, grossProfit, netIncome</div>
    </div>
  )
}

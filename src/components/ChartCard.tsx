import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }
export default function ChartCard({ data }: { data: Point[] }) {
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <div style={{ fontWeight:700, marginBottom:8 }}>Revenue / GP / Net</div>
      <div style={{ width:'100%', height:260 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top:8, right:12, left:0, bottom:8 }}>
            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />
            <Line type="monotone" dataKey="revenue" dot={false} />
            <Line type="monotone" dataKey="grossProfit" dot={false} />
            <Line type="monotone" dataKey="netIncome" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

import React, { useMemo } from 'react'

type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }

export default function Insights({ data }: { data: Point[] }) {
  const insights = useMemo(() => {
    if (!data.length) return []
    const last = data[data.length - 1]
    const prev = data[data.length - 2] ?? last
    const revMoM = ((last.revenue - prev.revenue) / Math.max(prev.revenue, 1)) * 100
    const gpMargin = (last.grossProfit / Math.max(last.revenue,1)) * 100
    const niMargin = (last.netIncome / Math.max(last.revenue,1)) * 100
    const trendUp = data.slice(-4).every((p,i,arr)=> i===0 || p.revenue >= arr[i-1].revenue)

    return [
      `Revenue MoM: ${revMoM.toFixed(1)}%`,
      `GP margin last month: ${gpMargin.toFixed(1)}%`,
      `Net margin last month: ${niMargin.toFixed(1)}%`,
      trendUp ? 'Revenue is trending up for 4 consecutive months.' : 'Revenue trend not consistently up in last 4 months.'
    ]
  }, [data])

  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <div style={{ fontWeight:700, marginBottom:8 }}>Insights</div>
      <ul style={{ margin:0, paddingLeft:18 }}>
        {insights.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}

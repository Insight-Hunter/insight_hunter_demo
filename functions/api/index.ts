import { Hono } from 'hono'
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }

export const onRequest: PagesFunction = async (ctx) => {
  const app = new Hono()

  app.get('/api/health', (c) => c.json({ ok: true, service: 'insight-hunter-demo' }))

  app.get('/api/demo/summary', (c) =>
    c.json([
      { label: 'MRR', value: '$6,400' },
      { label: 'Active Workspaces', value: '41' },
      { label: 'Reports / wk', value: '183' }
    ])
  )

  app.get('/api/demo/forecast', (c) =>
    c.json([
      { month: 'Sep', cashIn: 28000, cashOut: 21000, netCash: 7000, eomBalance: 42000 },
      { month: 'Oct', cashIn: 29500, cashOut: 21900, netCash: 7600, eomBalance: 49600 },
      { month: 'Nov', cashIn: 30500, cashOut: 22750, netCash: 7750, eomBalance: 57350 }
    ])
  )

  app.get('/api/demo/insights', async (c) => {
    const origin = new URL(c.req.url).origin
    const res = await fetch(`${origin}/data/demo-financials.json`)
    const data = (await res.json()) as Point[]
    if (!Array.isArray(data) || data.length < 2) return c.json({ insights: [] })

    const last = data[data.length - 1], prev = data[data.length - 2]
    const revMoM = ((last.revenue - prev.revenue) / Math.max(prev.revenue, 1)) * 100
    const gpMargin = (last.grossProfit / Math.max(last.revenue, 1)) * 100
    const niMargin = (last.netIncome / Math.max(last.revenue, 1)) * 100
    const last4 = data.slice(-4)
    const trendUp = last4.every((p, i) => (i === 0 ? true : p.revenue >= last4[i - 1].revenue))
    return c.json({
      insights: [
        `Revenue MoM: ${revMoM.toFixed(1)}%`,
        `GP margin last month: ${gpMargin.toFixed(1)}%`,
        `Net margin last month: ${niMargin.toFixed(1)}%`,
        trendUp ? 'Revenue is trending up for 4 consecutive months.' : 'Revenue trend not consistently up in last 4 months.'
      ]
    })
  })

  return app.fetch(ctx.request)
}

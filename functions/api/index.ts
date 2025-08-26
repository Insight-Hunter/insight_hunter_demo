import { Hono } from 'hono'

// Cloudflare Pages Functions entrypoint
export const onRequest: PagesFunction = async (context) => {
  const app = new Hono()

  // Health check
  app.get('/api/health', (c) => c.json({ ok: true, service: 'insight-hunter-demo' }))

  // Executive snapshot KPIs
  app.get('/api/demo/summary', (c) =>
    c.json([
      { label: 'MRR', value: '$6,400' },
      { label: 'Active Workspaces', value: '41' },
      { label: 'Reports / wk', value: '183' }
    ])
  )

  // Cash flow forecast
  app.get('/api/demo/forecast', (c) =>
    c.json([
      { month: 'Sep', cashIn: 28000, cashOut: 21000, netCash: 7000, eomBalance: 42000 },
      { month: 'Oct', cashIn: 29500, cashOut: 21900, netCash: 7600, eomBalance: 49600 },
      { month: 'Nov', cashIn: 30500, cashOut: 22750, netCash: 7750, eomBalance: 57350 }
    ])
  )

  return app.fetch(context.request)
}

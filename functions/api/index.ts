import { Hono } from 'hono'
<<<<<<< HEAD

export const onRequestGet: PagesFunction = async (context) => {
  const app = new Hono()

  app.get('/api/health', c => c.json({ ok: true, service: 'insight-hunter-demo' }))

=======
export const onRequestGet: PagesFunction = async (ctx) => {
  const app = new Hono()
  app.get('/api/health', c => c.json({ ok: true, service: 'insight-hunter-demo' }))
>>>>>>> bb868bd (update to demo files)
  app.get('/api/demo/summary', c => c.json([
    { label: 'MRR', value: '$6,400' },
    { label: 'Active Workspaces', value: '41' },
    { label: 'Reports / wk', value: '183' }
  ]))
<<<<<<< HEAD

=======
>>>>>>> bb868bd (update to demo files)
  app.get('/api/demo/forecast', c => c.json([
    { month: 'Sep', cashIn: 28000, cashOut: 21000, netCash: 7000, eomBalance: 42000 },
    { month: 'Oct', cashIn: 29500, cashOut: 21900, netCash: 7600, eomBalance: 49600 },
    { month: 'Nov', cashIn: 30500, cashOut: 22750, netCash: 7750, eomBalance: 57350 }
  ]))
<<<<<<< HEAD

  return app.fetch(context.request)
}

=======
  return app.fetch(ctx.request)
}
>>>>>>> bb868bd (update to demo files)

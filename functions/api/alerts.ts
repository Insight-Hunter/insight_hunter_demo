type Alert = { id: string; email: string; rule: string; createdAt: string }

let alerts: Alert[] = [] // demo memory (not persisted)

export const onRequest: PagesFunction = async ({ request, env }) => {
  const url = new URL(request.url)
  if (request.method === 'GET') {
    return new Response(JSON.stringify({ alerts }), { headers: { 'content-type':'application/json'} })
  }
  if (request.method === 'POST') {
    const body = await request.json() as Partial<Alert>
    const a: Alert = {
      id: crypto.randomUUID(),
      email: body.email || (env.NOTIFY_TO as string) || 'demo@example.com',
      rule: body.rule || 'mrr_drop_gt_10',
      createdAt: new Date().toISOString()
    }
    alerts.push(a)
    return new Response(JSON.stringify({ ok:true, alert:a }), { headers: { 'content-type':'application/json'} })
  }
  if (request.method === 'DELETE') {
    const id = url.searchParams.get('id') || ''
    alerts = alerts.filter(x => x.id !== id)
    return new Response(JSON.stringify({ ok:true }), { headers: { 'content-type':'application/json'} })
  }
  return new Response('Method not allowed', { status:405 })
}

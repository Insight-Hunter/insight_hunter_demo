let memory: any = { emailDigest:true, currency:'USD', fyStart:1, aiTone:'concise' }
export const onRequest: PagesFunction = async ({ request }) => {
  if (request.method === 'GET') return new Response(JSON.stringify(memory), { headers:{'content-type':'application/json'} })
  if (request.method === 'POST') { memory = await request.json(); return new Response(JSON.stringify({ ok:true }), { headers:{'content-type':'application/json'} }) }
  return new Response('Method not allowed', { status:405 })
}
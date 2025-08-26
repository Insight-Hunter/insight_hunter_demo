export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const { to, subject = 'Insight Hunter Alert', text = 'Demo alert fired.' } = await request.json() as any
  const sender = (env.SENDER_EMAIL as string) || 'no-reply@demo.insighthunter.app'
  const rcpt = to || (env.NOTIFY_TO as string)
  if (!rcpt) {
    console.log('NO EMAIL CONFIGURED; mock success', { subject, text })
    return new Response(JSON.stringify({ ok:true, mock:true }), { headers: {'content-type':'application/json'} })
  }
  // MailChannels
  const payload = {
    personalizations: [{ to: [{ email: rcpt }] }],
    from: { email: sender, name: 'Insight Hunter' },
    subject, content: [{ type: 'text/plain', value: text }]
  }
  const resp = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload)
  })
  const ok = resp.status >= 200 && resp.status < 300
  return new Response(JSON.stringify({ ok, status: resp.status }), { headers: {'content-type':'application/json'} })
}

// convenience test endpoint
export const onRequestGet: PagesFunction = async () =>
  new Response('OK', { headers: { 'content-type': 'text/plain' } })

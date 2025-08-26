export const onRequest: PagesFunction = async ({ request, env, next }) => {
  const url = new URL(request.url)
  if (
    url.pathname.startsWith('/api/health') ||
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/data') ||
    url.pathname === '/favicon.ico'
  ) return next()

  const user = (env.DEMO_USER as string) || 'demo'
  const pass = (env.DEMO_PASS as string) || 'demo'
  const auth = request.headers.get('authorization') || ''
  if (!auth.startsWith('Basic ')) {
    return new Response('Auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Insight Hunter Demo"' } })
  }
  const [u, p] = atob(auth.slice(6)).split(':')
  if (u === user && p === pass) return next()
  return new Response('Forbidden', { status: 403 })
}

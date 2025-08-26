export const onRequest: PagesFunction = async ({ request, next }) => {
  // Simple header-based access gate for "private" demo links (optional)
  // If you want open public access, delete this file.
  const url = new URL(request.url)
  if (url.pathname.startsWith('/api')) return next()
  // Allow all GETs; you can enforce a token by checking url.searchParams.get('demo')
  return next()
}


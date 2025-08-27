import { PagesFunction } from '@cloudflare/workers-types'

export const onRequestPost: PagesFunction = async({request}) => {
  const { q = '' } = await request.json() as any
  const s = String(q).toLowerCase()

  let a = "Here's a demo response. Ask about revenue trend, margins, expenses, or runway."
  if (s.includes('revenue')) a = 'Revenue is trending up ~8–12% MoM in the last quarter. Biggest drivers: new client acquisition and improved expansion.'
  else if (s.includes('margin') || s.includes('gross')) a = 'Latest GP margin ~60–62%; net margin ~30–32%. Watch marketing and payroll cost creep.'
  else if (s.includes('runway') || s.includes('cash')) a = 'Cash runway estimate: ~10–12 months at current burn. Extends to 15+ months with 10% OpEx reduction.'
  else if (s.includes('vendor')) a = 'Top vendors by spend: AWS, Google, HubSpot. Opportunities: reserved instances, commit discounts, consolidate SaaS seats.'
  else if (s.includes('forecast')) a = 'Base case shows steady growth next 3–4 months; stress test adds ±20% demand shock and ±15% CAC delta.'

  return new Response(JSON.stringify({ a }), { headers: { 'content-type': 'application/json' } })
}

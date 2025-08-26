export const onRequest: PagesFunction = async () => {
  const items = [
    { id:'c1', kind:'client', name:'Acme Co', balance: 12500, aging:{ current:7000, d30:3000, d60:2000, d90:500 } },
    { id:'c2', kind:'client', name:'Globex',  balance:  8200, aging:{ current:4000, d30:2200, d60:1500, d90:500 } },
    { id:'v1', kind:'vendor', name:'AWS',     balance: 15400, aging:{ current:15400, d30:0, d60:0, d90:0 } }
  ]
  return new Response(JSON.stringify({ items }), { headers: { 'content-type':'application/json' } })
}

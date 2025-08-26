export const onRequestPost: PagesFunction = async ({ request }) => {
  const body = await request.json()
  console.log('Saved plan (demo):', body?.label)
  return new Response(JSON.stringify({ ok:true }), { headers: {'content-type':'application/json'} })
}

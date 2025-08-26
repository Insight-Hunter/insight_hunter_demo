import React, { useEffect, useState } from 'react'

export default function Settings(){
  const [emailDigest, setEmailDigest] = useState(true)
  const [currency, setCurrency] = useState('USD')
  const [fyStart, setFyStart] = useState(1)
  const [aiTone, setAiTone] = useState<'concise'|'detailed'|'friendly'>('concise')

  useEffect(()=>{ /* could fetch user prefs from /api/settings */ },[])

  const save = async ()=>{
    await fetch('/api/settings', { method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ emailDigest, currency, fyStart, aiTone }) })
    alert('Settings saved')
  }

  return (
    <div className="container" style={{maxWidth:720}}>
      <div className="h1">Settings & Personalization</div>

      <div className="card" style={{display:'grid', gap:12}}>
        <label><input type="checkbox" checked={emailDigest} onChange={e=>setEmailDigest(e.target.checked)} /> Send weekly digest emails</label>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div><label>Currency</label>
            <select className="select" value={currency} onChange={e=>setCurrency(e.target.value)}>
              <option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option>
            </select>
          </div>
          <div><label>Fiscal year starts (month)</label>
            <input className="input" type="number" min={1} max={12} value={fyStart} onChange={e=>setFyStart(Number(e.target.value||1))}/>
          </div>
        </div>

        <div>
          <label>AI Assistant style</label>
          <div style={{display:'flex', gap:12, marginTop:6}}>
            {(['concise','detailed','friendly'] as const).map(t =>
              <label key={t} className="badge" style={{cursor:'pointer'}}>
                <input type="radio" name="tone" checked={aiTone===t} onChange={()=>setAiTone(t)} /> {t}
              </label>
            )}
          </div>
        </div>

        <div style={{display:'flex', gap:12}}>
          <button className="btn" onClick={save}>Save</button>
          <a className="btn secondary" href="/api/notify/test">Send test email</a>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'

type Profile = { id:string; kind:'client'|'vendor'; name:string; balance:number; aging:{ current:number; d30:number; d60:number; d90:number } }

export default function Profiles(){
  const [list, setList] = useState<Profile[]>([])
  const [ask, setAsk] = useState('Which clients are least profitable?')

  useEffect(()=>{ fetch('/api/profiles').then(r=>r.json()).then(d=>setList(d.items||[])) },[])

  const askAI = async (q:string, context?:string)=>{
    const res = await fetch('/api/chat', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ q: `${q}${context ? ` | context: ${context}` : ''}` }) })
    const { a } = await res.json(); alert(a)
  }

  return (
    <div className="container">
      <div className="h1">Vendor & Client Profiles</div>

      <div className="card" style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12}}>
        <input className="input" value={ask} onChange={e=>setAsk(e.target.value)}/>
        <button className="btn" onClick={()=>askAI(ask)}>Ask AI</button>
      </div>

      <div className="card" style={{marginTop:16}}>
        <table className="table">
          <thead><tr><th>Type</th><th>Name</th><th align="right">Outstanding</th><th>Aging (0/30/60/90)</th><th></th></tr></thead>
          <tbody>
            {list.map(p=>(
              <tr key={p.id}>
                <td>{p.kind}</td><td>{p.name}</td>
                <td align="right">{p.balance.toLocaleString()}</td>
                <td>{p.aging.current}/{p.aging.d30}/{p.aging.d60}/{p.aging.d90}</td>
                <td><button className="btn secondary" onClick={()=>askAI('Profitability insight', p.name)}>Ask AI</button></td>
              </tr>
            ))}
            {list.length===0 && <tr><td colSpan={5} style={{color:'#64748b'}}>No profiles yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

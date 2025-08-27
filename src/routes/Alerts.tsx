import React, { useEffect, useState } from 'react'
type Alert = { id:string; email:string; rule:string; createdAt:string }

export default function Alerts(){
  const [list, setList] = useState<Alert[]>([])
  const [email, setEmail] = useState('')
  const [rule, setRule] = useState('mrr_drop_gt_10')
  const load = () => fetch('/api/alerts').then(r=>r.json()).then(d=>setList(d.alerts||[]))
  useEffect(() => { load() }, [])

  const add = async (e:React.FormEvent)=>{ e.preventDefault()
    await fetch('/api/alerts', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ email, rule }) })
    setEmail(''); load()
  }
  const del = async (id:string)=>{ await fetch('/api/alerts?id='+id, { method:'DELETE' }); load() }

  const testEmail = async ()=>{ await fetch('/api/notify', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ subject:'Demo Alert', text:'Hello from Insight Hunter.', to: email }) }) }

  return (
    <div className="container">
      <div className="h1">Alerts</div>
      <form onSubmit={add} className="card" style={{display:'grid', gap:12, gridTemplateColumns:'2fr 1fr auto'}}>
        <input className="input" placeholder="Email to notify" value={email} onChange={e=>setEmail(e.target.value)} />
        <select className="select" value={rule} onChange={e=>setRule(e.target.value)}>
          <option value="mrr_drop_gt_10">MRR drops 10%</option>
          <option value="expense_spike_gt_20">Expense spike 20%</option>
          <option value="runway_lt_6m">Runway 6 months</option>
        </select>
        <button className="btn" type="submit">Add</button>
      </form>

      <div className="card" style={{marginTop:16}}>
        <table className="table">
          <thead><tr><th>Email</th><th>Rule</th><th>Created</th><th></th></tr></thead>
          <tbody>
            {list.map(a=>(
              <tr key={a.id}>
                <td>{a.email}</td><td>{a.rule}</td><td>{new Date(a.createdAt).toLocaleString()}</td>
                <td><button className="btn secondary" onClick={()=>del(a.id)}>Remove</button></td>
              </tr>
            ))}
            {list.length===0 && <tr><td colSpan={4} style={{color:'#64748b'}}>No alerts yet.</td></tr>}
          </tbody>
        </table>
        <div style={{marginTop:10}}><button className="btn" onClick={testEmail}>Send Test Email</button></div>
      </div>
    </div>
  )
}

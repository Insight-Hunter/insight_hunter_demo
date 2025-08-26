import React, { useEffect, useMemo, useState } from 'react'

type Row = { month:string; cashIn:number; cashOut:number; netCash:number; eomBalance:number }

export default function Planning(){
  const [base, setBase] = useState<Row[]>([])
  const [revMult, setRevMult] = useState(1.00)
  const [expMult, setExpMult] = useState(1.00)
  const [hireCost, setHireCost] = useState(0)

  useEffect(()=>{ fetch('/api/demo/forecast').then(r=>r.json()).then(setBase) },[])

  const scenario = useMemo(()=>{
    let bal = base[0]?.eomBalance ?? 40000
    return base.map(r=>{
      const cashIn = Math.round(r.cashIn * revMult)
      const cashOut = Math.round(r.cashOut * expMult + hireCost)
      const netCash = cashIn - cashOut
      bal += netCash
      return { ...r, cashIn, cashOut, netCash, eomBalance: bal }
    })
  },[base, revMult, expMult, hireCost])

  const savePlan = async (label:string)=>{
    await fetch('/api/plan', { method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ label, revMult, expMult, hireCost, rows: scenario }) })
    alert('Scenario saved')
  }

  return (
    <div className="container">
      <div className="h1">Forecasting & Planning</div>

      <div className="card" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
        <div><label>Revenue multiplier</label><input className="input" type="range" min="0.7" max="1.5" step="0.05" value={revMult} onChange={e=>setRevMult(parseFloat(e.target.value))}/><div>{(revMult*100-100).toFixed(0)}% vs base</div></div>
        <div><label>Expense multiplier</label><input className="input" type="range" min="0.7" max="1.5" step="0.05" value={expMult} onChange={e=>setExpMult(parseFloat(e.target.value))}/><div>{(expMult*100-100).toFixed(0)}% vs base</div></div>
        <div><label>Monthly new hires cost ($)</label><input className="input" type="number" value={hireCost} onChange={e=>setHireCost(Number(e.target.value||0))}/></div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <table className="table">
          <thead><tr><th>Month</th><th align="right">Cash In</th><th align="right">Cash Out</th><th align="right">Net</th><th align="right">EoM Balance</th></tr></thead>
          <tbody>{scenario.map((r,i)=>(
            <tr key={i}><td>{r.month}</td><td align="right">{r.cashIn.toLocaleString()}</td><td align="right">{r.cashOut.toLocaleString()}</td><td align="right">{r.netCash.toLocaleString()}</td><td align="right">{r.eomBalance.toLocaleString()}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <div style={{display:'flex', gap:12, marginTop:16, flexWrap:'wrap'}}>
        <button className="btn" onClick={()=>savePlan('Conservative Q3')}>Save as “Conservative Q3”</button>
        <button className="btn secondary" onClick={()=>savePlan('Aggressive Growth')}>Save “Aggressive Growth”</button>
      </div>
    </div>
  )
}

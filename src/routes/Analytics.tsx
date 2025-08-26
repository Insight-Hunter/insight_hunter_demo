import React, { useEffect, useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

type Point = { month:string; revenue:number; grossProfit:number; netIncome:number; product?:string; region?:string; channel?:string }

const products = ['All','Core','Pro','Enterprise']
const regions  = ['All','NA','EU','APAC']
const channels = ['All','Direct','Partner','Self-serve']

export default function Analytics(){
  const [raw, setRaw] = useState<Point[]>([])
  const [product, setProduct] = useState('All')
  const [region,  setRegion]  = useState('All')
  const [channel, setChannel] = useState('All')
  const [rollN,   setRollN]   = useState(3)

  useEffect(()=>{ fetch('/data/demo-financials.json').then(r=>r.json()).then((d:Point[])=>{
    // add fake dims for demo
    const dims = ['Core','Pro','Enterprise']; const regs = ['NA','EU','APAC']; const chans=['Direct','Partner','Self-serve']
    const ext = d.map((p,i)=>({ ...p, product: dims[i%dims.length], region: regs[i%regs.length], channel: chans[(i+1)%chans.length] }))
    setRaw(ext)
  }) },[])

  const data = useMemo(()=>{
    return raw.filter(p =>
      (product==='All'||p.product===product) &&
      (region==='All'||p.region===region) &&
      (channel==='All'||p.channel===channel)
    )
  }, [raw, product, region, channel])

  const rolling = useMemo(()=>{
    const arr = data.map((d,i)=>{
      const start = Math.max(0, i-rollN+1)
      const window = data.slice(start, i+1)
      const revAvg = window.reduce((s,x)=>s+x.revenue,0)/window.length
      return {...d, revAvg}
    })
    return arr
  },[data, rollN])

  const anomalies = useMemo(()=>{
    return rolling.map((p,i,arr)=>{
      const prev = i>0 ? arr[i-1] : p
      const change = (p.revenue - prev.revenue) / Math.max(prev.revenue,1)
      return { month:p.month, change, flag: Math.abs(change) >= 0.2 } // ±20% spike/dip
    }).filter(x=>x.flag)
  },[rolling])

  const raiseAlert = async (m:string, change:number)=>{
    const sign = change>0?'+':''
    await fetch('/api/alerts', { method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ rule:`anomaly:${m}:${(sign+(change*100).toFixed(1))}%` }) })
    alert(`Flagged anomaly for ${m}`)
  }

  return (
    <div className="container">
      <div className="h1">Analytics & Trends</div>

      <div className="card" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr) auto', gap:12}}>
        <select className="select" value={product} onChange={e=>setProduct(e.target.value)}>{products.map(x=><option key={x}>{x}</option>)}</select>
        <select className="select" value={region}  onChange={e=>setRegion(e.target.value)}>{regions.map(x=><option key={x}>{x}</option>)}</select>
        <select className="select" value={channel} onChange={e=>setChannel(e.target.value)}>{channels.map(x=><option key={x}>{x}</option>)}</select>
        <div><label>Rolling Avg</label><input className="input" type="number" min={1} max={6} value={rollN} onChange={e=>setRollN(Number(e.target.value||1))}/></div>
        <button className="btn" onClick={()=>location.reload()}>Reset</button>
      </div>

      <div className="card" style={{height:320, marginTop:16}}>
        <ResponsiveContainer>
          <LineChart data={rolling} margin={{ top:8, right:12, left:0, bottom:8 }}>
            <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Legend/>
            <Line type="monotone" dataKey="revenue" name="Revenue" dot={false}/>
            <Line type="monotone" dataKey="revAvg"  name={`Rev ${rollN}-mo Avg`} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{marginTop:16}}>
        <div style={{fontWeight:800, marginBottom:8}}>Anomalies (±20%)</div>
        {anomalies.length===0 ? <div className="muted">None detected.</div> :
          <ul>{anomalies.map(a=>
            <li key={a.month} style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
              <span>{a.month}: {(a.change*100).toFixed(1)}%</span>
              <button className="btn secondary" onClick={()=>raiseAlert(a.month, a.change)}>Flag to Alerts</button>
            </li>
          )}</ul>}
      </div>
    </div>
  )
}

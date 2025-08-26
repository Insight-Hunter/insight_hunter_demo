import React, { useState } from 'react'

type Msg = { role: 'user'|'assistant', content: string }

export default function Assistant(){
  const [msgs, setMsgs] = useState<Msg[]>([{ role:'assistant', content:'Hi — I’m your AI CFO Assistant. Ask about revenue trend, margins, runway, or vendors.' }])
  const [input, setInput] = useState('')

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    const q = input.trim(); if(!q) return
    setMsgs(m => [...m, {role:'user', content: q}])
    setInput('')
    const res = await fetch('/api/chat', { method:'POST', body: JSON.stringify({ q }), headers: {'content-type':'application/json'} })
    const { a } = await res.json()
    setMsgs(m => [...m, {role:'assistant', content: a }])
  }

  return (
    <div className="container" style={{maxWidth:900}}>
      <div className="h1">AI CFO Assistant</div>
      <div className="card" style={{height:420, overflow:'auto', display:'grid', gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{
            justifySelf: m.role==='user' ? 'end' : 'start',
            maxWidth:'70%', padding:'10px 12px', borderRadius:12,
            background: m.role==='user' ? '#fef3c7' : '#eef2ff'
          }}>{m.content}</div>
        ))}
      </div>
      <form onSubmit={send} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:10, marginTop:10}}>
        <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask anything about your finances…" />
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  )
}

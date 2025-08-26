import React, { useState } from 'react'

export default function AuthForm({ onSubmit }: { onSubmit: (email: string, password: string)=>void }) {
  const [email, setEmail] = useState('demo@insighthunter.app')
  const [password, setPassword] = useState('demo')
  const [show, setShow] = useState(false)

  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); onSubmit(email, password) }}
      style={{ maxWidth: 360, display:'grid', gap:12 }}
    >
      <label>
        <div style={{ fontSize:12, opacity:0.8 }}>Email</div>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@company.com"
               style={{ width:'100%', padding:'10px 12px', border:'1px solid #ccc', borderRadius:8 }}/>
      </label>
      <label>
        <div style={{ fontSize:12, opacity:0.8 }}>Password</div>
        <div style={{ display:'flex', gap:8 }}>
          <input value={password} onChange={e=>setPassword(e.target.value)} type={show?'text':'password'} placeholder="••••••••"
                 style={{ flex:1, padding:'10px 12px', border:'1px solid #ccc', borderRadius:8 }}/>
          <button type="button" onClick={()=>setShow(s=>!s)} style={{ padding:'10px 12px', border:'1px solid #ccc', borderRadius:8, background:'#f7f7f7' }}>
            {show?'Hide':'Show'}
          </button>
        </div>
      </label>
      <div style={{ display:'flex', gap:8 }}>
        <button type="submit" style={{ padding:'10px 14px', border:'1px solid #222', borderRadius:8, background:'#111', color:'#fff' }}>Sign in</button>
        <button type="button" style={{ padding:'10px 14px', border:'1px solid #ccc', borderRadius:8, background:'#fff' }}>Create account</button>
        <button type="button" style={{ padding:'10px 14px', border:'1px solid #ccc', borderRadius:8, background:'#fff' }}>Forgot password</button>
      </div>
    </form>
  )
}

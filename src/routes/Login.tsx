import React, { useState } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [msg, setMsg] = useState('Your AI CFO in your pocket!')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('Authenticating (demo)…')
    // In demo we use Basic Auth browser prompt; this is placeholder UX:
    setTimeout(()=>setMsg('Use browser prompt credentials: demo / demo'), 500)
  }

  return (
    <div className="container" style={{maxWidth:480}}>
      <div className="h1" style={{textAlign:'center'}}>Sign In</div>
      <p className="lead" style={{textAlign:'center'}}>{msg}</p>
      <form onSubmit={submit} className="card" style={{display:'grid', gap:12}}>
        <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        <button className="btn" type="submit">Sign In</button>
        <div style={{textAlign:'center'}}>Don’t have an account? <a href="#" style={{color:'var(--brand)'}}>Sign Up</a></div>
      </form>
    </div>
  )
}

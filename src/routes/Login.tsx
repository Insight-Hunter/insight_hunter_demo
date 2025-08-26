import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'

export default function Login() {
  const [message, setMessage] = useState<string>('Use demo credentials → demo@insighthunter.app / demo')

  const handleSubmit = async (email: string, password: string) => {
    // Demo-only behavior: accept demo/demo, otherwise show message
    if (email === 'demo@insighthunter.app' && password === 'demo') {
      setMessage('Authenticated (demo). In production this would redirect to / with a session.')
    } else {
      setMessage('Invalid credentials in demo. Use demo@insighthunter.app / demo.')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <AuthForm onSubmit={handleSubmit}/>
      <p style={{ marginTop:12, opacity:0.8 }}>{message}</p>
    </div>
  )
}

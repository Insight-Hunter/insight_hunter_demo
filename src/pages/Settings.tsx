import React from 'react'
import Button from '../components/Button'

export default function Settings() {
  return (
    <div className="v-stack">
      <div className="h2 heading">Settings</div>
      <label className="label" htmlFor="name">Workspace name</label>
      <input className="input" id="name" placeholder="My studio" />

      <label className="label" htmlFor="theme">Theme</label>
      <select className="select" id="theme" defaultValue="dark" onChange={(e)=>{
        document.documentElement.setAttribute('data-theme', e.target.value)
      }}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>

      <div className="h-stack" style={{marginTop:8}}>
        <Button variant="primary">Save</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  )
}

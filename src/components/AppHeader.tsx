import React from 'react'

type AppHeaderProps = { title?: string, right?: React.ReactNode }
export default function AppHeader({ title='Insight Hunter', right }: AppHeaderProps) {
  return (
    <div className="appbar">
      <div className="appbar-inner">
        <div className="h-stack">
          <div style={{width:32, height:32, borderRadius:12, background:"linear-gradient(135deg, var(--brand-500), var(--brand-700))"}} />
          <strong>{title}</strong>
        </div>
        <div className="h-stack">{right}</div>
      </div>
    </div>
  )
}

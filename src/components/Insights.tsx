import React, { useEffect, useState } from 'react'
export default function Insights({ fallback }: { fallback?: string[] }) {
  const [list, setList] = useState<string[]>(fallback ?? [])
  useEffect(() => {
    fetch('/api/demo/insights').then(r=>r.json()).then(d => setList(d.insights || [])).catch(()=>{})
  }, [])
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <div style={{ fontWeight:700, marginBottom:8 }}>Insights</div>
      <ul style={{ margin:0, paddingLeft:18 }}>
        {list.map((t,i)=><li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}

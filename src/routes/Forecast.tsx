import React, { useEffect, useState } from 'react'

type Row = {
  month: string
  cashIn: number
  cashOut: number
  netCash: number
  eomBalance: number
}

export default function Forecast() {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    fetch('/api/demo/forecast')
      .then(r => r.json())
      .then(setRows)
      .catch(() => {
        setRows([]) // fail silently in demo
      })
  }, [])

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Cash Flow Forecast

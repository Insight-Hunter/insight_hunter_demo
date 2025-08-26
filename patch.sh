# 1) Ensure src tree exists
mkdir -p src/routes public/data functions/api

# 2) Create minimal React entry + routes
cat > src/main.tsx <<'TSX'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Dashboard from './routes/Dashboard'
import Forecast from './routes/Forecast'
import Login from './routes/Login'
import NotFound from './routes/NotFound'

const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <NotFound />, children: [
    { index: true, element: <Dashboard/> },
    { path: 'forecast', element: <Forecast/> },
    { path: 'login', element: <Login/> }
  ]}
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
TSX

cat > src/App.tsx <<'TSX'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
export default function App() {
  const { pathname } = useLocation()
  return (
    <div style={{ fontFamily:'Inter, system-ui, Arial', margin:24 }}>
      <header style={{ display:'flex', gap:12, alignItems:'center' }}>
        <img src="/logo.png" width="28" height="28" alt="IH"/>
        <b>Insight Hunter — Demo</b>
        <nav style={{ marginLeft:'auto', display:'flex', gap:12 }}>
          <Link to="/" style={{ textDecoration: pathname==='/'?'underline':'none' }}>Dashboard</Link>
          <Link to="/forecast" style={{ textDecoration: pathname==='/forecast'?'underline':'none' }}>Forecast</Link>
          <a href="/api/health" target="_blank" rel="noreferrer">API</a>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Outlet/>
    </div>
  )
}
TSX

cat > src/routes/Dashboard.tsx <<'TSX'
import React, { useEffect, useState } from 'react'
type Metric = { label: string; value: string }
type Row = { month: string; revenue: number; grossProfit: number; netIncome: number }
export default function Dashboard(){
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{ fetch('/api/demo/summary').then(r=>r.json()).then(setMetrics) },[])
  useEffect(()=>{ fetch('/data/demo-financials.json').then(r=>r.json()).then(setRows) },[])
  return (
    <div>
      <h2>Executive Snapshot</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {metrics.map((m,i)=>(
          <div key={i} style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
            <div style={{ opacity:0.7 }}>{m.label}</div>
            <div style={{ fontSize:22, fontWeight:700 }}>{m.value}</div>
          </div>
        ))}
      </div>
      <h3 style={{ marginTop:24 }}>Revenue / GP / Net (last 6mo)</h3>
      <table width="100%" cellPadding="8" style={{ border:'1px solid #ddd', borderRadius:8 }}>
        <thead><tr><th align="left">Month</th><th align="right">Revenue</th><th align="right">GP</th><th align="right">Net</th></tr></thead>
        <tbody>{rows.map((r,i)=>(
          <tr key={i}><td>{r.month}</td><td align="right">{r.revenue.toLocaleString()}</td><td align="right">{r.grossProfit.toLocaleString()}</td><td align="right">{r.netIncome.toLocaleString()}</td></tr>
        ))}</tbody>
      </table>
    </div>
  )
}
TSX

cat > src/routes/Forecast.tsx <<'TSX'
import React, { useEffect, useState } from 'react'
type Row = { month: string; cashIn: number; cashOut: number; netCash: number; eomBalance: number }
export default function Forecast(){
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{ fetch('/api/demo/forecast').then(r=>r.json()).then(setRows) },[])
  return (
    <div>
      <h2>Cash Flow Predictor (Demo)</h2>
      <table width="100%" cellPadding="8" style={{ border:'1px solid #ddd', borderRadius:8 }}>
        <thead><tr><th align="left">Month</th><th align="right">Cash In</th><th align="right">Cash Out</th><th align="right">Net</th><th align="right">EoM Balance</th></tr></thead>
        <tbody>{rows.map((r,i)=>(
          <tr key={i}><td>{r.month}</td><td align="right">{r.cashIn.toLocaleString()}</td><td align="right">{r.cashOut.toLocaleString()}</td><td align="right">{r.netCash.toLocaleString()}</td><td align="right">{r.eomBalance.toLocaleString()}</td></tr>
        ))}</tbody>
      </table>
    </div>
  )
}
TSX

cat > src/routes/Login.tsx <<'TSX'
import React from 'react'
export default function Login(){
  return (
    <div>
      <h2>Demo Login</h2>
      <p>email: <b>demo@insighthunter.app</b> • password: <b>demo</b> (non-functional in demo)</p>
    </div>
  )
}
TSX

cat > src/routes/NotFound.tsx <<'TSX'
import React from 'react'
export default function NotFound(){
  return <div><h2>Not Found</h2><p>The page you requested doesn’t exist.</p></div>
}
TSX

# 3) Ensure index.html targets that entry
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Insight Hunter — Demo</title>
    <link rel="icon" href="/favicon.ico">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

# 4) Demo data + tiny API for Pages Functions
cat > public/data/demo-financials.json <<'JSON'
[
  { "month": "Mar", "revenue": 18500, "grossProfit": 11100, "netIncome": 5200 },
  { "month": "Apr", "revenue": 20100, "grossProfit": 12060, "netIncome": 6100 },
  { "month": "May", "revenue": 22300, "grossProfit": 13380, "netIncome": 6900 },
  { "month": "Jun", "revenue": 24900, "grossProfit": 14940, "netIncome": 7800 },
  { "month": "Jul", "revenue": 26500, "grossProfit": 15900, "netIncome": 8200 },
  { "month": "Aug", "revenue": 27800, "grossProfit": 16680, "netIncome": 8600 }
]
JSON

cat > functions/api/index.ts <<'TS'
import { Hono } from 'hono'
export const onRequestGet: PagesFunction = async (ctx) => {
  const app = new Hono()
  app.get('/api/health', c => c.json({ ok: true, service: 'insight-hunter-demo' }))
  app.get('/api/demo/summary', c => c.json([
    { label: 'MRR', value: '$6,400' },
    { label: 'Active Workspaces', value: '41' },
    { label: 'Reports / wk', value: '183' }
  ]))
  app.get('/api/demo/forecast', c => c.json([
    { month: 'Sep', cashIn: 28000, cashOut: 21000, netCash: 7000, eomBalance: 42000 },
    { month: 'Oct', cashIn: 29500, cashOut: 21900, netCash: 7600, eomBalance: 49600 },
    { month: 'Nov', cashIn: 30500, cashOut: 22750, netCash: 7750, eomBalance: 57350 }
  ]))
  return app.fetch(ctx.request)
}
TS

# 5) Minimal tsconfig (TS + React JSX)
cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "baseUrl": ".",
    "resolveJsonModule": true,
    "types": ["vite/client"]
  },
  "include": ["src"]
}
JSON

# 6) Vite config must include the React plugin
cat > vite.config.ts <<'TS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' }
})
TS

# 7) Build
corepack enable
npm i
npm run build

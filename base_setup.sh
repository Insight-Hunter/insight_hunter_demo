# ====== FILES: CONFIG ======
# wrangler.toml (Pages-compatible)
cat > wrangler.toml <<'TOML'
name = "insight-hunter-demo"
compatibility_date = "2024-11-12"
pages_build_output_dir = "dist"

[vars]
APP_NAME = "Insight Hunter Demo"
DEMO_USER = "demo"
DEMO_Pass = "demo"
TOML

# package.json (valid JSON; Vite + React + Hono + Recharts + PapaParse)
cat > package.json <<'JSON'
{
  "name": "insight-hunter-demo",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173",
    "deploy": "wrangler pages deploy dist --project-name=insight-hunter-demo",
    "pages:dev": "wrangler pages dev --compatibility-date=2024-11-12",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "hono": "4.5.7",
    "papaparse": "5.4.1",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "6.26.2",
    "recharts": "2.12.7"
  },
  "devDependencies": {
    "@types/react": "18.3.5",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.1",
    "typescript": "5.5.4",
    "vite": "5.4.6",
    "wrangler": "4.32.0"
  },
  "engines": {
    "node": ">=18.17.0"
  }
}
JSON

# tsconfig.json
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
  "include": ["src", "functions"]
}
JSON

# vite.config.ts
cat > vite.config.ts <<'TS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], build: { outDir: 'dist' } })
TS

# ====== FILES: PUBLIC ASSETS & ROUTING ======
mkdir -p public/data
# SPA routes (prevents deep-link 404)
cat > public/_routes.json <<'JSON'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/api/*", "/assets/*", "/favicon.ico", "/data/*"]
}
JSON

# robots (optional: block indexing)
cat > public/robots.txt <<'TXT'
User-agent: *
Disallow: /
TXT

# favicon placeholder (optional)
printf '\x89PNG\r\n\x1a\n' > public/favicon.ico

# Demo data (12 months)
cat > public/data/demo-financials.json <<'JSON'
[
  { "month": "Sep", "revenue": 19000, "grossProfit": 11400, "netIncome": 5200 },
  { "month": "Oct", "revenue": 20500, "grossProfit": 12300, "netIncome": 5800 },
  { "month": "Nov", "revenue": 21800, "grossProfit": 13080, "netIncome": 6400 },
  { "month": "Dec", "revenue": 23600, "grossProfit": 14160, "netIncome": 6900 },
  { "month": "Jan", "revenue": 24800, "grossProfit": 14880, "netIncome": 7200 },
  { "month": "Feb", "revenue": 25500, "grossProfit": 15300, "netIncome": 7600 },
  { "month": "Mar", "revenue": 26800, "grossProfit": 16080, "netIncome": 8200 },
  { "month": "Apr", "revenue": 28400, "grossProfit": 17040, "netIncome": 8800 },
  { "month": "May", "revenue": 30100, "grossProfit": 18060, "netIncome": 9300 },
  { "month": "Jun", "revenue": 31700, "grossProfit": 19020, "netIncome": 9800 },
  { "month": "Jul", "revenue": 33200, "grossProfit": 19920, "netIncome": 10400 },
  { "month": "Aug", "revenue": 34800, "grossProfit": 20880, "netIncome": 11100 }
]
JSON

# index.html
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Insight Hunter — Demo</title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

# ====== FILES: API (Pages Functions) ======
mkdir -p functions/api
# site-wide Basic Auth middleware (demo/demo); allow health/assets/data
cat > functions/_middleware.ts <<'TS'
export const onRequest: PagesFunction = async ({ request, env, next }) => {
  const url = new URL(request.url)
  if (
    url.pathname.startsWith('/api/health') ||
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/data') ||
    url.pathname === '/favicon.ico'
  ) return next()

  const user = (env.DEMO_USER as string) || 'demo'
  const pass = (env.DEMO_PASS as string) || 'demo'
  const auth = request.headers.get('authorization') || ''
  if (!auth.startsWith('Basic ')) {
    return new Response('Auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Insight Hunter Demo"' } })
  }
  const [u, p] = atob(auth.slice(6)).split(':')
  if (u === user && p === pass) return next()
  return new Response('Forbidden', { status: 403 })
}
TS

# Hono API: /api/health, /api/demo/summary, /api/demo/forecast, /api/demo/insights
cat > functions/api/index.ts <<'TS'
import { Hono } from 'hono'
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }

export const onRequest: PagesFunction = async (ctx) => {
  const app = new Hono()

  app.get('/api/health', (c) => c.json({ ok: true, service: 'insight-hunter-demo' }))

  app.get('/api/demo/summary', (c) =>
    c.json([
      { label: 'MRR', value: '$6,400' },
      { label: 'Active Workspaces', value: '41' },
      { label: 'Reports / wk', value: '183' }
    ])
  )

  app.get('/api/demo/forecast', (c) =>
    c.json([
      { month: 'Sep', cashIn: 28000, cashOut: 21000, netCash: 7000, eomBalance: 42000 },
      { month: 'Oct', cashIn: 29500, cashOut: 21900, netCash: 7600, eomBalance: 49600 },
      { month: 'Nov', cashIn: 30500, cashOut: 22750, netCash: 7750, eomBalance: 57350 }
    ])
  )

  app.get('/api/demo/insights', async (c) => {
    const origin = new URL(c.req.url).origin
    const res = await fetch(`${origin}/data/demo-financials.json`)
    const data = (await res.json()) as Point[]
    if (!Array.isArray(data) || data.length < 2) return c.json({ insights: [] })

    const last = data[data.length - 1], prev = data[data.length - 2]
    const revMoM = ((last.revenue - prev.revenue) / Math.max(prev.revenue, 1)) * 100
    const gpMargin = (last.grossProfit / Math.max(last.revenue, 1)) * 100
    const niMargin = (last.netIncome / Math.max(last.revenue, 1)) * 100
    const last4 = data.slice(-4)
    const trendUp = last4.every((p, i) => (i === 0 ? true : p.revenue >= last4[i - 1].revenue))
    return c.json({
      insights: [
        `Revenue MoM: ${revMoM.toFixed(1)}%`,
        `GP margin last month: ${gpMargin.toFixed(1)}%`,
        `Net margin last month: ${niMargin.toFixed(1)}%`,
        trendUp ? 'Revenue is trending up for 4 consecutive months.' : 'Revenue trend not consistently up in last 4 months.'
      ]
    })
  })

  return app.fetch(ctx.request)
}
TS

# ====== FILES: REACT APP ======
mkdir -p src/routes src/components

# main.tsx
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

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
TSX

# App.tsx
cat > src/App.tsx <<'TSX'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
export default function App() {
  const { pathname } = useLocation()
  const Nav = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} style={{ textDecoration: pathname===to?'underline':'none', padding:'6px 8px' }}>{label}</Link>
  )
  return (
    <div style={{ fontFamily:'Inter, system-ui, Arial', minHeight:'100vh', display:'grid', gridTemplateRows:'auto 1fr auto' }}>
      <header style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:'1px solid #eee' }}>
        <strong>Insight Hunter — Demo</strong>
        <nav style={{ marginLeft:'auto', display:'flex', gap:10 }}>
          <Nav to="/" label="Dashboard" />
          <Nav to="/forecast" label="Forecast" />
          <Nav to="/login" label="Login" />
          <a href="/api/health" target="_blank" rel="noreferrer" style={{ padding:'6px 8px' }}>API</a>
        </nav>
      </header>
      <main style={{ padding:'16px 18px' }}><Outlet/></main>
      <footer style={{ padding:'12px 18px', borderTop:'1px solid #eee', fontSize:12, color:'#666' }}>Cloudflare Pages + Functions • v0.1</footer>
    </div>
  )
}
TSX

# NotFound.tsx
cat > src/routes/NotFound.tsx <<'TSX'
import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div style={{ padding:'2rem', textAlign:'center' }}>
      <h2>404 — Page Not Found</h2>
      <p>The page you requested doesn’t exist.</p>
      <p><Link to="/" style={{ textDecoration:'underline' }}>Go back to Dashboard</Link></p>
    </div>
  )
}
TSX

# Forecast.tsx
cat > src/routes/Forecast.tsx <<'TSX'
import React, { useEffect, useState } from 'react'
type Row = { month: string; cashIn: number; cashOut: number; netCash: number; eomBalance: number }
export default function Forecast(){
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{ fetch('/api/demo/forecast').then(r=>r.json()).then(setRows).catch(()=>setRows([])) },[])
  return (
    <div style={{ padding:'1.5rem' }}>
      <h2>Cash Flow Forecast (Demo)</h2>
      {rows.length===0 ? <p style={{ opacity:0.7 }}>No forecast data available.</p> :
      <table width="100%" cellPadding={8} style={{ border:'1px solid #ddd', borderRadius:8, marginTop:12 }}>
        <thead><tr><th align="left">Month</th><th align="right">Cash In</th><th align="right">Cash Out</th><th align="right">Net</th><th align="right">EoM Balance</th></tr></thead>
        <tbody>{rows.map((r,i)=>(
          <tr key={i}><td>{r.month}</td><td align="right">{r.cashIn.toLocaleString()}</td><td align="right">{r.cashOut.toLocaleString()}</td><td align="right">{r.netCash.toLocaleString()}</td><td align="right">{r.eomBalance.toLocaleString()}</td></tr>
        ))}</tbody>
      </table>}
      <p style={{ marginTop:12, opacity:0.7 }}>Demo values are static from the API.</p>
    </div>
  )
}
TSX

# Login.tsx (demo form; no backend—site-wide Basic Auth already protects)
cat > src/routes/Login.tsx <<'TSX'
import React, { useState } from 'react'
export default function Login(){
  const [msg, setMsg] = useState('Use browser prompt credentials: demo / demo')
  return (
    <div style={{ maxWidth:420 }}>
      <h2>Login</h2>
      <p style={{ opacity:0.8 }}>{msg}</p>
      <p style={{ opacity:0.7 }}>This demo uses Basic Auth at the edge. To change creds, edit wrangler.toml [vars] DEMO_USER/DEMO_PASS.</p>
    </div>
  )
}
TSX

# Chart + Insights + CSVUpload
cat > src/components/ChartCard.tsx <<'TSX'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }
export default function ChartCard({ data }: { data: Point[] }) {
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <div style={{ fontWeight:700, marginBottom:8 }}>Revenue / GP / Net</div>
      <div style={{ width:'100%', height:260 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top:8, right:12, left:0, bottom:8 }}>
            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />
            <Line type="monotone" dataKey="revenue" dot={false} />
            <Line type="monotone" dataKey="grossProfit" dot={false} />
            <Line type="monotone" dataKey="netIncome" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
TSX

cat > src/components/Insights.tsx <<'TSX'
import React, { useEffect, useState } from 'react'
export default function Insights(){
  const [list, setList] = useState<string[]>([])
  useEffect(()=>{ fetch('/api/demo/insights').then(r=>r.json()).then(d => setList(d.insights||[])).catch(()=>{}) },[])
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <div style={{ fontWeight:700, marginBottom:8 }}>Insights</div>
      <ul style={{ margin:0, paddingLeft:18 }}>{list.map((t,i)=><li key={i}>{t}</li>)}</ul>
    </div>
  )
}
TSX

cat > src/components/CSVUpload.tsx <<'TSX'
import React from 'react'
import Papa from 'papaparse'
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }
export default function CSVUpload({ onData }: { onData: (rows: Point[]) => void }) {
  const handle = (file: File) => {
    Papa.parse(file, { header: true, skipEmptyLines: true, complete: (res) => {
      const rows = (res.data as any[]).map(r => ({
        month: String(r.month ?? r.Month ?? r.date ?? r.Date ?? ''),
        revenue: Number(r.revenue ?? r.Revenue ?? r.rev ?? 0),
        grossProfit: Number(r.grossProfit ?? r.GP ?? r.gross_profit ?? 0),
        netIncome: Number(r.netIncome ?? r.Net ?? r.net ?? 0)
      })).filter(r => r.month)
      onData(rows)
    }})
  }
  return (
    <div style={{ border:'1px dashed #bbb', borderRadius:8, padding:12, display:'flex', alignItems:'center', gap:12 }}>
      <div style={{ fontWeight:600 }}>Upload CSV</div>
      <input type="file" accept=".csv,text/csv" onChange={(e)=>{ const f=e.target.files?.[0]; if (f) handle(f) }} />
      <div style={{ opacity:0.7 }}>Columns: month, revenue, grossProfit, netIncome</div>
    </div>
  )
}
TSX

# Dashboard.tsx
cat > src/routes/Dashboard.tsx <<'TSX'
import React, { useEffect, useState } from 'react'
import ChartCard from '../components/ChartCard'
import Insights from '../components/Insights'
import CSVUpload from '../components/CSVUpload'

type Metric = { label: string; value: string }
type Point = { month: string; revenue: number; grossProfit: number; netIncome: number }

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [rows, setRows] = useState<Point[]>([])

  useEffect(()=>{ fetch('/api/demo/summary').then(r=>r.json()).then(setMetrics) },[])
  useEffect(()=>{ fetch('/data/demo-financials.json').then(r=>r.json()).then(setRows) },[])

  return (
    <div>
      <h2>Executive Snapshot</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {metrics.map((m,i)=>(
          <div key={i} style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
            <div style={{ opacity:0.7 }}>{m.label}</div>
            <div style={{ fontSize:24, fontWeight:700 }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginTop:16 }}>
        <ChartCard data={rows} />
        <Insights />
      </div>

      <div style={{ marginTop:16 }}>
        <CSVUpload onData={setRows} />
      </div>

      <h3 style={{ marginTop:16 }}>Data Table</h3>
      <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
        <table width="100%" cellPadding={8}>
          <thead><tr><th align="left">Month</th><th align="right">Revenue</th><th align="right">Gross Profit</th><th align="right">Net Income</th></tr></thead>
          <tbody>{rows.map((p,i)=>(
            <tr key={i}><td>{p.month}</td><td align="right">{p.revenue.toLocaleString()}</td><td align="right">{p.grossProfit.toLocaleString()}</td><td align="right">{p.netIncome.toLocaleString()}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
TSX

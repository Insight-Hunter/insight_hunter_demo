



#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# Insight Hunter – Mobile UI Pack (React + CSS) installer
# Run from the ROOT of your Vite + React Router (TypeScript) app.
# ------------------------------------------------------------

backup() {npm
  local f="$1"
  if [ -f "$f" ]; then
    local ts
    ts="$(date +%Y%m%d-%H%M%S)"
    cp "$f" "$f.bak.$ts"
    echo "• Backed up $f -> $f.bak.$ts"
  fi
}

write() {
  local path="$1"
  shift
  mkdir -p "$(dirname "$path")"
  backup "$path"
  cat > "$path" <<'EOF'
#CONTENT#
EOF
  # Replace placeholder in-place
  sed -i '' -e "1,1 s/#CONTENT#//" "$path" 2>/dev/null || sed -i "1,1 s/#CONTENT#//" "$path"
  echo "• Wrote $path"
}

echo "Installing Insight Hunter Mobile UI Pack…"

# 1) index.html (ensure viewport + theme color)
if [ -f "index.html" ]; then
  backup "index.html"
fi
cat > index.html <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#6b4eff" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Insight Hunter</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
echo "• Ensured mobile viewport in index.html"

# 2) Styles
mkdir -p src/styles

cat > src/styles/tokens.css <<'EOF'
:root {
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --shadow-1: 0 1px 2px rgba(0,0,0,.06), 0 4px 10px rgba(0,0,0,.06);
  --shadow-2: 0 6px 16px rgba(0,0,0,.12);

  /* Brand */
  --brand-50:#f2efff; --brand-100:#e4dcff; --brand-200:#c7baff; --brand-300:#a694ff;
  --brand-400:#8b76ff; --brand-500:#6b4eff; --brand-600:#5b3cf2; --brand-700:#4b2dd1;
  --brand-800:#3e25a9; --brand-900:#311f86;

  /* Semantic */
  --success:#18b46b; --warning:#f59e0b; --danger:#ef4444; --info:#3b82f6;

  /* Dark default */
  --bg:#0f0f12;
  --elev:#15151a;
  --card:#1b1b22;
  --text:#f5f7ff;
  --muted:#c8cbda;
  --muted-2:#9aa2b2;
  --border:#252532;
}

@media (prefers-color-scheme: light) {
  :root {
    --bg:#f7f7fb; --elev:#ffffff; --card:#ffffff; --text:#11121a;
    --muted:#3b3f52; --muted-2:#636b7a; --border:#e7e8ef;
  }
}

[data-theme="light"] {
  --bg:#f7f7fb; --elev:#ffffff; --card:#ffffff; --text:#11121a;
  --muted:#3b3f52; --muted-2:#636b7a; --border:#e7e8ef;
}
EOF
echo "• Wrote src/styles/tokens.css"

cat > src/styles/base.css <<'EOF'
* { box-sizing: border-box; }
html, body, #root { height: 100%; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color: var(--text);
  background: var(--bg);
}

img, svg, video, canvas { display: block; max-width: 100%; }
button { font: inherit; }

.container { width: 100%; max-width: 520px; margin: 0 auto; padding: 16px; }

.h-stack { display: flex; align-items: center; gap: 12px; }
.v-stack { display: flex; flex-direction: column; gap: 12px; }
.spread { display:flex; align-items:center; justify-content:space-between; gap:12px; }

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
  padding: 16px;
}

.heading { font-weight: 700; letter-spacing: -0.02em; }
.h1 { font-size: 28px; line-height: 1.1; }
.h2 { font-size: 22px; line-height: 1.15; }
.h3 { font-size: 18px; line-height: 1.2; }
.text-muted { color: var(--muted); }
.text-dim { color: var(--muted-2); }

/* Page enter animations */
@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
.page { animation: fadeSlideUp .28s ease both; }

/* Shimmer for skeletons */
@keyframes shimmer { 0% { background-position: -468px 0 } 100% { background-position: 468px 0 } }
.skeleton {
  border-radius: 12px; height: 12px; width: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.04) 100%);
  background-size: 936px 100%; animation: shimmer 1.2s infinite linear;
}
EOF
echo "• Wrote src/styles/base.css"

cat > src/styles/components.css <<'EOF'
.btn {
  --btn-bg: var(--elev);
  --btn-fg: var(--text);
  --btn-br: var(--radius-md);
  --btn-bd: var(--border);
  --btn-shadow: var(--shadow-1);
  appearance: none; border: 1px solid var(--btn-bd); border-radius: var(--btn-br);
  background: var(--btn-bg); color: var(--btn-fg);
  padding: 12px 16px; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  text-decoration: none; cursor: pointer; box-shadow: var(--btn-shadow);
  transition: transform .06s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
  position: relative; overflow: hidden;
}
.btn:active { transform: translateY(1px) scale(.99); }
.btn:disabled { opacity:.6; cursor:not-allowed; }

.btn-primary { --btn-bg: linear-gradient(135deg, var(--brand-500), var(--brand-700)); --btn-bd: transparent; }
.btn-outline { --btn-bg: transparent; --btn-bd: var(--brand-500); --btn-fg: var(--brand-100); }
.btn-ghost { --btn-bg: transparent; --btn-bd: transparent; --btn-fg: var(--muted); box-shadow: none; }
.btn-danger { --btn-bg: var(--danger); --btn-bd: transparent; }
.btn-success { --btn-bg: var(--success); --btn-bd: transparent; }
.btn-lg { padding: 14px 18px; border-radius: var(--radius-lg); font-weight: 600; }
.btn-sm { padding: 8px 12px; border-radius: var(--radius-sm); font-size: 14px; }

.ripple {
  position: absolute; border-radius: 999px; pointer-events: none; transform: translate(-50%, -50%);
  width: 12px; height: 12px; opacity: .4; background: white; mix-blend-mode: soft-light;
  animation: ripple .6s ease-out forwards;
}
@keyframes ripple { from { transform: translate(-50%, -50%) scale(1); opacity:.4 } to { transform: translate(-50%, -50%) scale(35); opacity:0 } }

.input, .select {
  width: 100%; padding: 12px 14px; border-radius: 14px; border:1px solid var(--border); background: var(--elev); color: var(--text);
}
.label { font-size: 13px; color: var(--muted-2); margin-bottom: 6px; display:block; }

.chip { display:inline-flex; align-items:center; gap:8px; padding:8px 10px; border-radius:999px; background:rgba(255,255,255,.06); border:1px solid var(--border); }

.appbar {
  position: sticky; top: 0; z-index: 10; backdrop-filter: blur(10px);
  background: color-mix(in oklab, var(--bg) 85%, transparent);
  border-bottom: 1px solid var(--border);
}
.appbar-inner { height: 60px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; max-width: 520px; margin: 0 auto; }

.tabbar {
  position: sticky; bottom: 0; z-index: 10; backdrop-filter: blur(10px);
  background: color-mix(in oklab, var(--bg) 85%, transparent);
  border-top: 1px solid var(--border);
}
.tabbar-inner { height: 64px; display:flex; align-items:center; justify-content:space-around; max-width:520px; margin:0 auto; }
.tab-item { display:flex; flex-direction:column; align-items:center; gap:6px; font-size: 11px; color: var(--muted-2); text-decoration:none; }
.tab-item.active { color: var(--brand-200); }

.fab {
  position: fixed; right: 16px; bottom: 90px; z-index: 12; border-radius: 999px;
  width: 56px; height: 56px; display:grid; place-items:center; color:white; border:none;
  background: linear-gradient(135deg, var(--brand-500), var(--brand-700)); box-shadow: var(--shadow-2);
}

.grid-cards { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
@media (min-width: 480px) { .grid-cards { grid-template-columns: 1fr 1fr; } }
EOF
echo "• Wrote src/styles/components.css"

# 3) Components
mkdir -p src/components

cat > src/components/Button.tsx <<'EOF'
import React, { ButtonHTMLAttributes, useRef } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({ variant='primary', size='md', loading=false, children, className='', onClick, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.left = `${e.clientX - rect.left}px`
      ripple.style.top = `${e.clientY - rect.top}px`
      el.appendChild(ripple)
      setTimeout(() => ripple.remove(), 620)
    }
    onClick?.(e)
  }

  const v = variant ? `btn-${variant}` : ''
  const s = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : ''
  return (
    <button ref={ref} onClick={handleClick} className={['btn', v, s, className].join(' ')} {...rest}>
      {loading && <span className="skeleton" style={{width:16, height:16, borderRadius:999}} />}
      {!loading && children}
    </button>
  )
}
EOF
echo "• Wrote src/components/Button.tsx"

cat > src/components/Icons.tsx <<'EOF'
import React from 'react'
export const ChartIcon = (p:any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 19V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 19V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 19V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22 19V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
export const HomeIcon = (p:any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)
export const CogIcon = (p:any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M19.4 15.5a7.97 7.97 0 0 0 .2-1.5 7.97 7.97 0 0 0-.2-1.5l2.1-1.6-2-3.5-2.5.8a8.21 8.21 0 0 0-2.6-1.5l-.4-2.6h-4l-.4 2.6a8.21 8.21 0 0 0-2.6 1.5l-2.5-.8-2 3.5 2.1 1.6a7.97 7.97 0 0 0-.2 1.5c0 .5.1 1 .2 1.5l-2.1 1.6 2 3.5 2.5-.8c.8.6 1.7 1.1 2.6 1.5l.4 2.6h4l.4-2.6c.9-.4 1.8-.9 2.6-1.5l2.5.8 2-3.5-2.1-1.6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)
EOF
echo "• Wrote src/components/Icons.tsx"

cat > src/components/AppHeader.tsx <<'EOF'
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
EOF
echo "• Wrote src/components/AppHeader.tsx"

cat > src/components/TabBar.tsx <<'EOF'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, ChartIcon, CogIcon } from './Icons'

const TabItem = ({ to, icon, label }: { to:string, icon:React.ReactNode, label:string }) => (
  <NavLink to={to} className={({isActive}) => 'tab-item' + (isActive ? ' active' : '')}>
    {icon}
    <span>{label}</span>
  </NavLink>
)

export default function TabBar() {
  return (
    <div className="tabbar">
      <div className="tabbar-inner">
        <TabItem to="/" icon={<HomeIcon/>} label="Home" />
        <TabItem to="/forecast" icon={<ChartIcon/>} label="Forecast" />
        <TabItem to="/settings" icon={<CogIcon/>} label="Settings" />
      </div>
    </div>
  )
}
EOF
echo "• Wrote src/components/TabBar.tsx"

cat > src/components/Layout.tsx <<'EOF'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppHeader from './AppHeader'
import TabBar from './TabBar'
import Button from './Button'

export default function Layout() {
  const nav = useNavigate()
  return (
    <div style={{minHeight:'100dvh', display:'grid', gridTemplateRows:'auto 1fr auto'}}>
      <AppHeader title="Insight Hunter" right={<Button variant="outline" size="sm" onClick={() => nav('/settings')}>Profile</Button>} />
      <main className="page">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <TabBar />
      <button className="fab" aria-label="New">
        +
      </button>
    </div>
  )
}
EOF
echo "• Wrote src/components/Layout.tsx"

# 4) Pages
mkdir -p src/pages

cat > src/pages/Dashboard.tsx <<'EOF'
import React from 'react'
import Button from '../components/Button'

export default function Dashboard() {
  return (
    <div className="v-stack">
      <div className="spread">
        <div>
          <div className="h2 heading">Welcome back 👋</div>
          <div className="text-dim">Here’s your financial snapshot</div>
        </div>
        <Button variant="primary" size="sm">Create Report</Button>
      </div>

      <div className="grid-cards">
        <div className="card v-stack">
          <div className="text-dim">MRR</div>
          <div className="h1 heading">$6,400</div>
          <div className="text-dim">+4.2% this month</div>
        </div>
        <div className="card v-stack">
          <div className="text-dim">Active Workspaces</div>
          <div className="h1 heading">41</div>
          <div className="text-dim">+3 new</div>
        </div>
      </div>

      <div className="card">
        <div className="h3 heading" style={{marginBottom:8}}>Recent Activity</div>
        <div className="v-stack">
          <div className="spread"><span className="chip">Report</span><span className="text-dim">2m ago</span></div>
          <div className="skeleton" style={{height:10}} />
          <div className="skeleton" style={{height:10, width:'80%'}} />
        </div>
      </div>
    </div>
  )
}
EOF
echo "• Wrote src/pages/Dashboard.tsx"

cat > src/pages/Forecast.tsx <<'EOF'
import React from 'react'
import Button from '../components/Button'

export default function Forecast() {
  return (
    <div className="v-stack">
      <div className="spread">
        <div>
          <div className="h2 heading">Cashflow Forecast</div>
          <div className="text-dim">Rolling 90 days</div>
        </div>
        <Button variant="outline" size="sm">Export</Button>
      </div>

      <div className="card v-stack">
        <div className="text-dim">Next 4 months</div>
        <div className="h-stack" style={{justifyContent:'space-between'}}>
          <div className="v-stack" style={{alignItems:'center'}}>
            <div className="h3 heading">Sep</div>
            <div className="text-dim">EOM: $42k</div>
          </div>
          <div className="v-stack" style={{alignItems:'center'}}>
            <div className="h3 heading">Oct</div>
            <div className="text-dim">EOM: $44k</div>
          </div>
          <div className="v-stack" style={{alignItems:'center'}}>
            <div className="h3 heading">Nov</div>
            <div className="text-dim">EOM: $46k</div>
          </div>
          <div className="v-stack" style={{alignItems:'center'}}>
            <div className="h3 heading">Dec</div>
            <div className="text-dim">EOM: $48k</div>
          </div>
        </div>
      </div>

      <div className="card v-stack">
        <div className="h3 heading">Insights</div>
        <ul style={{margin:0, paddingLeft:18, lineHeight:1.5}}>
          <li>Net cash trending +$1.5k/mo</li>
          <li>Oct vendor payouts cluster on 15th → consider smoothing</li>
          <li>Receivables cycle improved to 23 days</li>
        </ul>
      </div>
    </div>
  )
}
EOF
echo "• Wrote src/pages/Forecast.tsx"

cat > src/pages/Settings.tsx <<'EOF'
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
EOF
echo "• Wrote src/pages/Settings.tsx"

# 5) App + Entry
backup "src/App.tsx"
cat > src/App.tsx <<'EOF'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Forecast from './pages/Forecast'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/forecast" element={<Forecast/>} />
        <Route path="/settings" element={<Settings/>} />
      </Route>
    </Routes>
  )
}
EOF
echo "• Wrote src/App.tsx"

# main.tsx – import styles + router
backup "src/main.tsx"
cat > src/main.tsx <<'EOF'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)}

EOF
echo "• Wrote src/main.tsx"
# 6) Gentle reminder to install deps
if ! grep -q '"react-router-dom"' package.json 2>/dev/null; then
  echo "NOTE: It looks like react-router-dom might not be installed."
  echo "      Install it with: npm i react-router-dom"
fi


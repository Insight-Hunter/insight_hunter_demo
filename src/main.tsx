import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Dashboard from './routes/Dashboard,tsx'
import Forecast from './routes/Forecast.tsx'
import Login from './routes/Login.tsx'
import NotFound from './routes/NotFound.tsx'
import Assistant from './routes/Assistant.tsx'
import Alerts from './routes/Alerts.tsx'
import Analytics from './routes/Analytics'
import Planning from './routes/Planning'
import Profiles from './routes/Profiles'
import Settings from './routes/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'forecast', element: <Forecast /> },
      { path: 'login', element: <Login /> },
      { path: 'assistant', element: <Assistant /> },
      { path: 'alerts', element: <Alerts /> },
      { path: 'analytics', element: <Analytics/> },
      { path: 'planning',  element: <Planning/>  },
      { path: 'profiles',  element: <Profiles/>  },
      { path: 'settings',  element: <Settings/>  }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import Dashboard from './routes/Dashboard'
import Forecast from './routes/Forecast'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
import Assistant from './routes/Assistant'
import Alerts from './routes/Alerts'
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
const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
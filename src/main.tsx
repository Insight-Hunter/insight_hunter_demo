import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import Dashboard from './routes/Dashboard'
import Forecast from './routes/Forecast'
import Login from './routes/Login'
import NotFound from './routes/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'forecast', element: <Forecast /> },
      { path: 'login', element: <Login /> }
    ]
  }
])

const container = document.getElementById('root') as HTMLElement
createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

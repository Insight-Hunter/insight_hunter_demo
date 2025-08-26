import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Dashboard from './routes/Dashboard'
import Forecast from './routes/Forecast'
import Login from './routes/Login'
import NotFound from './routes/NotFound'

const router = createBrowserRouter([
<<<<<<< HEAD
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'forecast', element: <Forecast /> },
      { path: 'login', element: <Login /> }
    ],
    errorElement: <NotFound />
  }
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)

=======
  { path: '/', element: <App />, errorElement: <NotFound />, children: [
    { index: true, element: <Dashboard/> },
    { path: 'forecast', element: <Forecast/> },
    { path: 'login', element: <Login/> }
  ]}
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
>>>>>>> bb868bd (update to demo files)

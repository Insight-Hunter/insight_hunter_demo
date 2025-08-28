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

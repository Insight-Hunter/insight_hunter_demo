import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 — Page Not Found</h2>
      <p>The page you requested doesn’t exist.</p>
      <p>
        <Link to="/" style={{ color: '#3366ee', textDecoration: 'underline' }}>
          Go back to Dashboard
        </Link>
      </p>
    </div>
  )
}

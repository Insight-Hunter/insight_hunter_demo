import React from 'react'

export default function Pitch() {
  const pdfHref = '/pitch-deck.pdf' // served from /public
  return (
    <div className="container" style={{ maxWidth: 1100 }}>
      <div className="h1">Insight Hunter — Pitch Deck</div>
      <p className="lead">View the deck below or download the PDF.</p>

      <div className="card" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a className="btn" href={pdfHref} target="_blank" rel="noreferrer">Open in new tab</a>
        <a className="btn secondary" href={pdfHref} download>Download PDF</a>
      </div>
      <div className="card" style={{ marginTop: 16, height: '75vh', padding: 0 }}>
        {<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSXYJk_rD8mF7IbEkJq4Op4Vvt5rMoFbpTAex8YH1PpSXnHHBGb92zI0-VOHZJmhm5kMXCj1_k2OWPp/pubembed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
/}
        <iframe
          title="Pitch Deck"
          src={pdfHref}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      <p className="lead" style={{ fontSize: 14, opacity: 0.7, marginTop: 12 }}>
        If the embed doesn’t load, use “Open in new tab” above.
      </p>
    </div>
  )
}

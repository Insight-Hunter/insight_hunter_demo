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

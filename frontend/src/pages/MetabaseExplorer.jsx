import React, { useState } from 'react'
import { BarChartWidget, LineChartWidget } from '../components/ChartWidget'

const savedQuestions = [
  { id: 1, name: 'Monthly Revenue by Product', type: 'bar', category: 'Sales' },
  { id: 2, name: 'User Retention Cohort', type: 'line', category: 'Growth' },
  { id: 3, name: 'Marketing Funnel', type: 'bar', category: 'Marketing' },
  { id: 4, name: 'Support Ticket Trends', type: 'line', category: 'Support' },
]

const barData = [
  { name: 'Product A', value: 42000 },
  { name: 'Product B', value: 28000 },
  { name: 'Product C', value: 61000 },
  { name: 'Product D', value: 19000 },
  { name: 'Product E', value: 35000 },
]

const lineData = [
  { name: 'Week 1', users: 1200 },
  { name: 'Week 2', users: 1050 },
  { name: 'Week 3', users: 980 },
  { name: 'Week 4', users: 870 },
  { name: 'Week 5', users: 760 },
  { name: 'Week 6', users: 690 },
]

export default function MetabaseExplorer() {
  const [active, setActive] = useState(savedQuestions[0])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '240px' }}>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9', marginBottom: '12px' }}>🔍 Saved Questions</h2>
          {savedQuestions.map(q => (
            <div key={q.id} onClick={() => setActive(q)} style={{
              padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px',
              background: active.id === q.id ? 'rgba(245,158,11,0.1)' : 'transparent',
              border: `1px solid ${active.id === q.id ? '#f59e0b' : 'transparent'}`,
            }}>
              <p style={{ fontSize: '13px', fontWeight: '500', color: active.id === q.id ? '#f59e0b' : '#cbd5e1' }}>{q.name}</p>
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{q.category}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '10px' }}>Connection Status</h3>
          <div style={{ fontSize: '13px', color: '#34d399' }}>● Metabase Cloud</div>
          <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>metabase.orocorp.in</div>
          <button style={{
            marginTop: '12px', width: '100%', padding: '8px', background: 'none',
            border: '1px solid #334155', borderRadius: '6px', color: '#94a3b8',
            cursor: 'pointer', fontSize: '12px',
          }}>Configure →</button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{active.name}</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Category: {active.category}</p>
        </div>
        {active.type === 'bar' ? (
          <BarChartWidget title={active.name} data={barData} bars={[{ key: 'value', color: '#8b5cf6' }]} />
        ) : (
          <LineChartWidget title={active.name} data={lineData} lines={[{ key: 'users', color: '#3b82f6' }]} />
        )}
      </div>
    </div>
  )
}

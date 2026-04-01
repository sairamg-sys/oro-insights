import React from 'react'

export default function KPICard({ title, value, change, icon, color = '#f59e0b' }) {
  const isPositive = change >= 0
  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>{title}</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#f1f5f9' }}>{value}</p>
        </div>
        <div style={{
          width: '48px', height: '48px', borderRadius: '10px',
          background: color + '20', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '22px',
        }}>{icon}</div>
      </div>
      <div style={{ fontSize: '13px', color: isPositive ? '#34d399' : '#f87171' }}>
        {isPositive ? '▲' : '▼'} {Math.abs(change)}% vs last month
      </div>
    </div>
  )
}

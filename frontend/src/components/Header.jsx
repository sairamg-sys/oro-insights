import React from 'react'
import { useLocation } from 'react-router-dom'

const titles = {
  '/dashboard': 'Dashboard',
  '/ai-insights': 'AI Insights',
  '/crosslink-studio': 'CrossLink Studio',
  '/gcp-tables': 'GCP Tables',
  '/google-sheets': 'Google Sheets',
  '/metabase': 'Metabase Explorer',
  '/settings': 'Settings',
}

export default function Header({ onToggleSidebar }) {
  const location = useLocation()
  const title = titles[location.pathname] || 'Oro Insights'

  return (
    <header style={{
      background: '#1e293b',
      borderBottom: '1px solid #334155',
      padding: '0 24px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '20px', padding: '4px' }}
        >
          ☰
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#f1f5f9' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: '#64748b' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: '#f59e0b', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#0f172a', fontWeight: '700', fontSize: '14px'
        }}>S</div>
      </div>
    </header>
  )
}

import React from 'react'
import { NavLink } from 'react-router-dom'

const nav = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/ai-insights', label: 'AI Insights', icon: '🤖' },
  { path: '/crosslink-studio', label: 'CrossLink Studio', icon: '🔗' },
  { path: '/gcp-tables', label: 'GCP Tables', icon: '🗄️' },
  { path: '/google-sheets', label: 'Google Sheets', icon: '📋' },
  { path: '/metabase', label: 'Metabase Explorer', icon: '🔍' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
]

const styles = {
  sidebar: {
    width: '240px',
    background: '#1e293b',
    borderRight: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'width 0.2s',
  },
  logo: {
    padding: '20px 16px',
    borderBottom: '1px solid #334155',
    fontSize: '20px',
    fontWeight: '700',
    color: '#f59e0b',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  nav: { padding: '12px 0', flex: 1 },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.15s',
    borderLeft: '3px solid transparent',
  },
  activeLink: {
    color: '#f59e0b',
    background: 'rgba(245,158,11,0.1)',
    borderLeft: '3px solid #f59e0b',
  },
}

export default function Sidebar({ open }) {
  if (!open) return null
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <span>💎</span>
        <span>Oro Insights</span>
      </div>
      <nav style={styles.nav}>
        {nav.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}
          >
            <span style={{ fontSize: '18px' }}>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '16px', borderTop: '1px solid #334155', fontSize: '12px', color: '#475569' }}>
        Oro Insights v1.0.0
      </div>
    </div>
  )
}

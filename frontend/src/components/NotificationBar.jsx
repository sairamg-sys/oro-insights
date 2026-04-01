import React from 'react'

export default function NotificationBar({ message, onClose }) {
  return (
    <div style={{
      background: '#065f46',
      color: '#d1fae5',
      padding: '10px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
    }}>
      <span>✅ {message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#d1fae5', cursor: 'pointer', fontSize: '16px' }}>×</button>
    </div>
  )
}

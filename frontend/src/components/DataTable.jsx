import React, { useState } from 'react'

export default function DataTable({ columns = [], rows = [], title }) {
  const [search, setSearch] = useState('')
  const filtered = rows.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title && <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9' }}>{title}</h3>}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          style={{
            background: '#0f172a', border: '1px solid #334155', borderRadius: '6px',
            color: '#f1f5f9', padding: '6px 12px', fontSize: '13px', outline: 'none', width: '200px'
          }}
        />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#0f172a' }}>
              {columns.map(col => (
                <th key={col.key} style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f172a'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '12px 16px', color: '#cbd5e1' }}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length} style={{ padding: '32px', textAlign: 'center', color: '#475569' }}>No results found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

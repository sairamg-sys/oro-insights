import React, { useState } from 'react'
import DataTable from '../components/DataTable'

const dataSources = [
  { id: 'bigquery', name: 'BigQuery', icon: '🗄️', connected: true },
  { id: 'sheets', name: 'Google Sheets', icon: '📋', connected: true },
  { id: 'metabase', name: 'Metabase', icon: '🔍', connected: false },
  { id: 'postgres', name: 'PostgreSQL', icon: '🐘', connected: false },
]

const sampleJoined = [
  { id: 1, customer: 'Acme Corp', revenue: '$12,400', region: 'North', sheet_data: 'Active', bq_rows: '1,240' },
  { id: 2, customer: 'TechFlow', revenue: '$8,900', region: 'South', sheet_data: 'Active', bq_rows: '890' },
  { id: 3, customer: 'DataBridge', revenue: '$21,000', region: 'West', sheet_data: 'Churned', bq_rows: '2,100' },
  { id: 4, customer: 'Quantum Inc', revenue: '$5,500', region: 'East', sheet_data: 'Active', bq_rows: '550' },
]

const cols = [
  { key: 'id', label: '#' },
  { key: 'customer', label: 'Customer' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'region', label: 'Region' },
  { key: 'sheet_data', label: 'Sheet Status' },
  { key: 'bq_rows', label: 'BQ Rows' },
]

export default function CrossLinkStudio() {
  const [selected, setSelected] = useState([])

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '16px' }}>🔗 Data Sources</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {dataSources.map(src => (
            <div key={src.id}
              onClick={() => toggle(src.id)}
              style={{
                padding: '16px', borderRadius: '10px', cursor: 'pointer',
                border: `2px solid ${selected.includes(src.id) ? '#f59e0b' : '#334155'}`,
                background: selected.includes(src.id) ? 'rgba(245,158,11,0.05)' : '#0f172a',
                transition: 'all 0.15s',
              }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{src.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>{src.name}</div>
              <div style={{ fontSize: '12px', marginTop: '4px', color: src.connected ? '#34d399' : '#64748b' }}>
                {src.connected ? '● Connected' : '○ Not connected'}
              </div>
            </div>
          ))}
        </div>
        {selected.length >= 2 && (
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{
              background: '#f59e0b', color: '#0f172a', border: 'none',
              borderRadius: '8px', padding: '10px 24px', fontWeight: '600', cursor: 'pointer',
            }}>
              Join Selected ({selected.length}) →
            </button>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Sample join result shown below</span>
          </div>
        )}
      </div>

      {selected.length >= 2 && (
        <DataTable title="Joined Data Preview" columns={cols} rows={sampleJoined} />
      )}

      {selected.length < 2 && (
        <div style={{ background: '#1e293b', border: '1px dashed #334155', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔗</div>
          <p style={{ color: '#475569', fontSize: '15px' }}>Select 2 or more data sources above to create a cross-linked view</p>
        </div>
      )}
    </div>
  )
}

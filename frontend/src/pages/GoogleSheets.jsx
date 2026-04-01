import React, { useState } from 'react'
import DataTable from '../components/DataTable'

const sheets = [
  { id: '1', name: 'Q4 2023 Sales Report', lastSync: '5 min ago', rows: 842 },
  { id: '2', name: 'Customer Master List', lastSync: '1 hour ago', rows: 1240 },
  { id: '3', name: 'Marketing Budget 2024', lastSync: '3 hours ago', rows: 156 },
  { id: '4', name: 'Inventory Tracker', lastSync: '1 day ago', rows: 3820 },
]

const previewCols = [
  { key: 'month', label: 'Month' },
  { key: 'region', label: 'Region' },
  { key: 'sales_rep', label: 'Sales Rep' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'target', label: 'Target' },
  { key: 'attainment', label: 'Attainment' },
]

const previewRows = [
  { month: 'Oct 2023', region: 'North', sales_rep: 'Alice Chen', revenue: '$42,800', target: '$40,000', attainment: '107%' },
  { month: 'Oct 2023', region: 'South', sales_rep: 'Bob Kumar', revenue: '$38,200', target: '$45,000', attainment: '85%' },
  { month: 'Nov 2023', region: 'North', sales_rep: 'Alice Chen', revenue: '$51,000', target: '$48,000', attainment: '106%' },
  { month: 'Nov 2023', region: 'West', sales_rep: 'Carol Smith', revenue: '$29,400', target: '$35,000', attainment: '84%' },
  { month: 'Dec 2023', region: 'South', sales_rep: 'Bob Kumar', revenue: '$61,200', target: '$55,000', attainment: '111%' },
]

export default function GoogleSheets() {
  const [selected, setSelected] = useState(sheets[0])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9', marginBottom: '12px' }}>📋 Connected Sheets</h2>
          {sheets.map(sheet => (
            <div key={sheet.id} onClick={() => setSelected(sheet)} style={{
              padding: '12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px',
              background: selected.id === sheet.id ? 'rgba(245,158,11,0.1)' : 'transparent',
              border: `1px solid ${selected.id === sheet.id ? '#f59e0b' : 'transparent'}`,
              transition: 'all 0.15s',
            }}>
              <p style={{ fontSize: '13px', fontWeight: '500', color: '#f1f5f9', marginBottom: '4px' }}>{sheet.name}</p>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Synced {sheet.lastSync} · {sheet.rows} rows</p>
            </div>
          ))}
          <button style={{
            width: '100%', marginTop: '8px', padding: '10px', background: 'none',
            border: '1px dashed #334155', borderRadius: '8px', color: '#64748b',
            cursor: 'pointer', fontSize: '13px',
          }}>
            + Connect Sheet
          </button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{selected.name}</h2>
          <button style={{
            background: '#f59e0b', color: '#0f172a', border: 'none',
            borderRadius: '8px', padding: '8px 16px', fontWeight: '600', cursor: 'pointer', fontSize: '13px',
          }}>↻ Sync Now</button>
        </div>
        <DataTable columns={previewCols} rows={previewRows} />
      </div>
    </div>
  )
}

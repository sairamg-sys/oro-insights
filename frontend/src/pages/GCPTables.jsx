import React, { useState } from 'react'
import DataTable from '../components/DataTable'

const datasets = ['analytics_prod', 'sales_data', 'user_events', 'marketing_metrics']

const sampleRows = [
  { table_id: 'orders', rows: '1,240,832', size: '2.4 GB', modified: '2024-01-15', schema: '12 cols' },
  { table_id: 'customers', rows: '84,291', size: '180 MB', modified: '2024-01-14', schema: '28 cols' },
  { table_id: 'products', rows: '4,128', size: '12 MB', modified: '2024-01-10', schema: '15 cols' },
  { table_id: 'sessions', rows: '8,920,001', size: '14.2 GB', modified: '2024-01-15', schema: '8 cols' },
  { table_id: 'conversions', rows: '310,400', size: '640 MB', modified: '2024-01-13', schema: '20 cols' },
]

const cols = [
  { key: 'table_id', label: 'Table ID' },
  { key: 'rows', label: 'Rows' },
  { key: 'size', label: 'Size' },
  { key: 'modified', label: 'Last Modified' },
  { key: 'schema', label: 'Schema' },
]

export default function GCPTables() {
  const [activeDs, setActiveDs] = useState('analytics_prod')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '16px' }}>🗄️ BigQuery Datasets</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {datasets.map(ds => (
            <button key={ds} onClick={() => setActiveDs(ds)} style={{
              padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500',
              border: activeDs === ds ? '1px solid #f59e0b' : '1px solid #334155',
              background: activeDs === ds ? 'rgba(245,158,11,0.1)' : '#0f172a',
              color: activeDs === ds ? '#f59e0b' : '#94a3b8',
            }}>{ds}</button>
          ))}
        </div>
      </div>

      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { label: 'Tables', value: '5' },
            { label: 'Total Size', value: '17.4 GB' },
            { label: 'Total Rows', value: '10.56M' },
            { label: 'Project', value: 'oro-insights-prod' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: '12px', color: '#64748b' }}>{label}</p>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#f1f5f9' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <DataTable title={`Tables in ${activeDs}`} columns={cols} rows={sampleRows} />
    </div>
  )
}

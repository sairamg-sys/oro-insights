import React, { useState } from 'react'

function Section({ title, children }) {
  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9', marginBottom: '16px' }}>{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, type = 'text', placeholder, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: '#0f172a', border: '1px solid #334155',
          borderRadius: '8px', color: '#f1f5f9', padding: '10px 14px',
          fontSize: '14px', outline: 'none', maxWidth: '480px',
        }}
      />
    </div>
  )
}

export default function Settings({ setNotification }) {
  const handleSave = () => {
    setNotification && setNotification('Settings saved successfully')
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      <Section title="🤖 AI Configuration">
        <Field label="Anthropic API Key" type="password" placeholder="sk-ant-api..." />
        <Field label="AI Model" defaultValue="claude-3-5-sonnet-20241022" />
        <Field label="Max Tokens" defaultValue="4096" />
      </Section>

      <Section title="🗄️ Google Cloud Platform">
        <Field label="GCP Project ID" placeholder="my-project-123" />
        <Field label="BigQuery Dataset" placeholder="analytics_prod" />
        <Field label="Service Account JSON Path" placeholder="/path/to/credentials.json" />
      </Section>

      <Section title="📋 Google Sheets">
        <Field label="OAuth Client ID" placeholder="XXXX.apps.googleusercontent.com" />
        <Field label="OAuth Client Secret" type="password" placeholder="GOCSPX-..." />
        <Field label="Redirect URI" defaultValue="http://localhost:3001/api/sheets/callback" />
      </Section>

      <Section title="🔍 Metabase">
        <Field label="Metabase URL" placeholder="https://metabase.yourcompany.com" />
        <Field label="Username" placeholder="admin@yourcompany.com" />
        <Field label="Password" type="password" placeholder="••••••••" />
      </Section>

      <Section title="⚙️ General">
        <Field label="App Name" defaultValue="Oro Insights" />
        <Field label="Port" defaultValue="3001" />
      </Section>

      <button
        onClick={handleSave}
        style={{
          background: '#f59e0b', color: '#0f172a', border: 'none',
          borderRadius: '8px', padding: '12px 32px', fontWeight: '700',
          cursor: 'pointer', fontSize: '15px', marginTop: '8px',
        }}
      >
        Save Settings
      </button>
    </div>
  )
}

import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function LineChartWidget({ data, title, lines = [] }) {
  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9', marginBottom: '16px' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
          <Legend />
          {lines.map(({ key, color }) => (
            <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BarChartWidget({ data, title, bars = [] }) {
  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9', marginBottom: '16px' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
          <Legend />
          {bars.map(({ key, color }) => (
            <Bar key={key} dataKey={key} fill={color} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

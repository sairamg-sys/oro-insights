import React from 'react'
import KPICard from '../components/KPICard'
import { LineChartWidget, BarChartWidget } from '../components/ChartWidget'
import DataTable from '../components/DataTable'

const revenueData = [
  { name: 'Jan', revenue: 42000, profit: 18000 },
  { name: 'Feb', revenue: 47000, profit: 21000 },
  { name: 'Mar', revenue: 39000, profit: 16000 },
  { name: 'Apr', revenue: 52000, profit: 24000 },
  { name: 'May', revenue: 58000, profit: 28000 },
  { name: 'Jun', revenue: 63000, profit: 31000 },
  { name: 'Jul', revenue: 71000, profit: 37000 },
]

const usersData = [
  { name: 'Mon', users: 1200 },
  { name: 'Tue', users: 1450 },
  { name: 'Wed', users: 1100 },
  { name: 'Thu', users: 1680 },
  { name: 'Fri', users: 1920 },
  { name: 'Sat', users: 980 },
  { name: 'Sun', users: 760 },
]

const recentActivity = [
  { id: 1, event: 'New user signup', source: 'Web', time: '2 min ago', status: 'Success' },
  { id: 2, event: 'Report generated', source: 'API', time: '8 min ago', status: 'Success' },
  { id: 3, event: 'Data sync failed', source: 'GCP', time: '15 min ago', status: 'Error' },
  { id: 4, event: 'Dashboard viewed', source: 'Web', time: '22 min ago', status: 'Success' },
  { id: 5, event: 'AI query processed', source: 'API', time: '31 min ago', status: 'Success' },
]

const actCols = [
  { key: 'event', label: 'Event' },
  { key: 'source', label: 'Source' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status' },
]

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KPICard title="Total Revenue" value="$71,240" change={12.5} icon="💰" color="#f59e0b" />
        <KPICard title="Active Users" value="4,821" change={8.3} icon="👥" color="#3b82f6" />
        <KPICard title="Data Queries" value="12,340" change={-2.1} icon="🔍" color="#8b5cf6" />
        <KPICard title="AI Insights" value="284" change={34.7} icon="🤖" color="#10b981" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <LineChartWidget
          title="Revenue & Profit Trend"
          data={revenueData}
          lines={[{ key: 'revenue', color: '#f59e0b' }, { key: 'profit', color: '#10b981' }]}
        />
        <BarChartWidget
          title="Daily Active Users"
          data={usersData}
          bars={[{ key: 'users', color: '#3b82f6' }]}
        />
      </div>

      <DataTable title="Recent Activity" columns={actCols} rows={recentActivity} />
    </div>
  )
}

import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import NotificationBar from './components/NotificationBar'
import Dashboard from './pages/Dashboard'
import AIInsights from './pages/AIInsights'
import CrossLinkStudio from './pages/CrossLinkStudio'
import GCPTables from './pages/GCPTables'
import GoogleSheets from './pages/GoogleSheets'
import MetabaseExplorer from './pages/MetabaseExplorer'
import Settings from './pages/Settings'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notification, setNotification] = useState(null)

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>
        <Sidebar open={sidebarOpen} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          {notification && <NotificationBar message={notification} onClose={() => setNotification(null)} />}
          <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard setNotification={setNotification} />} />
              <Route path="/ai-insights" element={<AIInsights setNotification={setNotification} />} />
              <Route path="/crosslink-studio" element={<CrossLinkStudio />} />
              <Route path="/gcp-tables" element={<GCPTables />} />
              <Route path="/google-sheets" element={<GoogleSheets />} />
              <Route path="/metabase" element={<MetabaseExplorer />} />
              <Route path="/settings" element={<Settings setNotification={setNotification} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

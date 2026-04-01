import React, { useState } from 'react'

const suggestions = [
  'What were the top 5 revenue-generating products last quarter?',
  'Show me customer churn rate by region',
  'Summarize this week\'s sales performance',
  'Which marketing channel has the highest ROI?',
]

export default function AIInsights({ setNotification }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [history, setHistory] = useState([])

  const handleSubmit = async (q) => {
    const text = q || query
    if (!text.trim()) return
    setLoading(true)
    setQuery(text)
    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      })
      const data = await res.json()
      const answer = data.answer || data.message || 'AI response received.'
      setResponse(answer)
      setHistory(prev => [{ q: text, a: answer, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)])
      setNotification && setNotification('AI insight generated successfully')
    } catch {
      setResponse('Unable to connect to AI service. Please configure your Anthropic API key in Settings.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '16px' }}>🤖 Ask AI</h2>
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleSubmit() }}
            placeholder="Ask a business intelligence question..."
            rows={4}
            style={{
              width: '100%', background: '#0f172a', border: '1px solid #334155',
              borderRadius: '8px', color: '#f1f5f9', padding: '12px', fontSize: '14px',
              resize: 'vertical', outline: 'none', fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '12px', color: '#475569' }}>Ctrl+Enter to submit</span>
            <button
              onClick={() => handleSubmit()}
              disabled={loading || !query.trim()}
              style={{
                background: '#f59e0b', color: '#0f172a', border: 'none',
                borderRadius: '8px', padding: '10px 24px', fontWeight: '600',
                cursor: loading ? 'wait' : 'pointer', fontSize: '14px',
                opacity: loading || !query.trim() ? 0.6 : 1,
              }}
            >
              {loading ? 'Thinking...' : 'Ask AI →'}
            </button>
          </div>
        </div>

        {response && (
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>AI Response</h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px', whiteSpace: 'pre-wrap' }}>{response}</p>
          </div>
        )}

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>💡 Suggested Queries</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => handleSubmit(s)} style={{
                textAlign: 'left', background: '#0f172a', border: '1px solid #334155',
                borderRadius: '8px', padding: '10px 14px', color: '#94a3b8',
                cursor: 'pointer', fontSize: '13px', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.target.style.borderColor = '#f59e0b'; e.target.style.color = '#f59e0b' }}
                onMouseLeave={e => { e.target.style.borderColor = '#334155'; e.target.style.color = '#94a3b8' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: '280px', background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', overflow: 'auto' }}>
        <h3 style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Query History</h3>
        {history.length === 0 ? (
          <p style={{ color: '#475569', fontSize: '13px' }}>No queries yet</p>
        ) : history.map((h, i) => (
          <div key={i} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #334155' }}>
            <p style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>{h.time}</p>
            <p style={{ fontSize: '13px', color: '#f59e0b', marginBottom: '6px' }}>{h.q.substring(0, 60)}{h.q.length > 60 ? '...' : ''}</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>{h.a.substring(0, 80)}{h.a.length > 80 ? '...' : ''}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

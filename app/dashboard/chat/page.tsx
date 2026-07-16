'use client'

import { useState, useEffect } from 'react'
import ChatInterface from '@/components/chat/ChatInterface'
import { api, Session } from '@/lib/api'

export default function ChatPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [sessionId, setSessionId] = useState('')

  const firmId = typeof window !== 'undefined' ? localStorage.getItem('firm_id') ?? '' : ''

  useEffect(() => {
    if (!firmId) return
    api.getSessions(firmId).then(setSessions)
  }, [firmId])

  const activeSession = sessions.find(s => s.id === sessionId)

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900">Ask AI</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Grounded answers from IT Act 2025 · Form 3CD · ICAI Standards · GST
          </p>
        </div>
        {sessions.length > 0 && (
          <select
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sessionId}
            onChange={e => setSessionId(e.target.value)}
          >
            <option value="">No session context</option>
            {sessions.map(s => (
              <option key={s.id} value={s.id}>
                {s.client_name} · {s.audit_type === 'tax_audit' ? 'Tax Audit' : 'Statutory Audit'}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatInterface
          sessionId={activeSession?.id}
          auditType={activeSession?.audit_type}
          firmId={firmId || undefined}
        />
      </div>
    </div>
  )
}

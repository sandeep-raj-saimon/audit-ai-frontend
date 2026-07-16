'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { api, QueryResponse } from '@/lib/api'
import { Send, Zap } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: QueryResponse['sources']
  cacheHit?: boolean
}

interface ChatInterfaceProps {
  sessionId?: string
  auditType?: string
  firmId?: string
}

const SUGGESTIONS = [
  'What is the tax audit limit under Section 44AB?',
  'What are the TDS compliance checks for Form 3CD Clause 34?',
  'Explain SA 240 — auditor responsibilities for fraud.',
  'What disclosures are required under CARO 2020?',
]

export default function ChatInterface({ sessionId, auditType, firmId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  // Falls back to a lazily-created session below so multi-turn history works
  // even before a firm/session has been picked (firm_id is optional).
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>(sessionId)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveSessionId(sessionId)
  }, [sessionId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (question?: string) => {
    const q = (question ?? input).trim()
    if (!q || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: q }])
    setLoading(true)
    try {
      let sid = activeSessionId
      if (!sid) {
        const session = await api.createSession({ firm_id: firmId })
        sid = session.id
        setActiveSessionId(sid)
      }
      const res = await api.query({
        question: q,
        session_id: sid,
        audit_type: auditType,
        firm_id: firmId,
      })
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: res.answer, sources: res.sources, cacheHit: res.cache_hit },
      ])
    } catch (err: unknown) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${err instanceof Error ? err.message : 'Something went wrong'}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="pt-6">
            <p className="text-center text-gray-400 text-sm mb-5">
              Ask about Indian audit regulations — answers always cite the source.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-xs bg-white border border-gray-100 rounded-xl p-3 text-gray-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-3xl rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-1">Sources</p>
                  <div className="space-y-0.5">
                    {msg.sources.map((s, j) => (
                      <p key={j} className="text-xs text-gray-400">
                        <span className="font-medium text-gray-500">{s.doc}</span>
                        {s.ref ? ` — ${s.ref}` : ''}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {msg.cacheHit && (
                <p className="mt-2 flex items-center gap-1 text-xs text-green-500">
                  <Zap size={11} /> Cached response
                </p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex space-x-1.5">
                {[0, 150, 300].map(d => (
                  <div
                    key={d}
                    className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-100 bg-white p-4 flex gap-2">
        <input
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask about Section 44AB, Clause 19 TDS, SA 240 fraud procedures..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          disabled={loading}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white p-2.5 rounded-xl disabled:opacity-40 hover:bg-blue-700 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

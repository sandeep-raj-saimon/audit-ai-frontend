'use client'

import { useState, useEffect } from 'react'
import { api, Session } from '@/lib/api'
import { Plus, FolderOpen } from 'lucide-react'

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    client_name: '',
    audit_type: 'tax_audit',
    tax_year: '2025-26',
  })

  const firmId = typeof window !== 'undefined' ? localStorage.getItem('firm_id') ?? '' : ''

  useEffect(() => {
    if (!firmId) { setLoading(false); return }
    api.getSessions(firmId).then(setSessions).finally(() => setLoading(false))
  }, [firmId])

  const createSession = async (e: React.FormEvent) => {
    e.preventDefault()
    const session = await api.createSession({ ...form, firm_id: firmId })
    setSessions(prev => [session, ...prev])
    setShowForm(false)
    setForm({ client_name: '', audit_type: 'tax_audit', tax_year: '2025-26' })
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Audit Sessions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Plus size={15} /> New Session
        </button>
      </div>

      {showForm && (
        <form onSubmit={createSession} className="bg-white border border-gray-100 rounded-xl p-5 mb-5 space-y-3">
          <h2 className="font-medium text-gray-900 text-sm">New Audit Session</h2>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Client name"
            value={form.client_name}
            onChange={e => setForm(p => ({ ...p, client_name: e.target.value }))}
            required
          />
          <div className="flex gap-3">
            <select
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.audit_type}
              onChange={e => setForm(p => ({ ...p, audit_type: e.target.value }))}
            >
              <option value="tax_audit">Tax Audit</option>
              <option value="statutory_audit">Statutory Audit</option>
            </select>
            <input
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tax year e.g. 2025-26"
              value={form.tax_year}
              onChange={e => setForm(p => ({ ...p, tax_year: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Create
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : sessions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FolderOpen size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No audit sessions yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map(s => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">{s.client_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {s.audit_type === 'tax_audit' ? 'Tax Audit' : 'Statutory Audit'} · {s.tax_year}
                </p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full capitalize">
                {s.current_step}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

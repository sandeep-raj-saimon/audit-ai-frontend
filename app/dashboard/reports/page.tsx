'use client'

import { useState, useEffect } from 'react'
import { api, Report } from '@/lib/api'
import ReportViewer from '@/components/reports/ReportViewer'
import { FileText, Plus } from 'lucide-react'

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ session_id: '', report_type: 'form_3cd_checklist' })

  const firmId = typeof window !== 'undefined' ? localStorage.getItem('firm_id') ?? '' : ''

  useEffect(() => {
    if (!firmId) { setLoading(false); return }
    api.listReports(firmId).then(setReports).finally(() => setLoading(false))
  }, [firmId])

  const generate = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await api.generateReport({ ...form, firm_id: firmId })
    setReports(prev => [{ id: res.report_id, status: 'pending', ...form, firm_id: firmId, created_at: new Date().toISOString() } as Report, ...prev])
    setSelected(res.report_id)
    setShowForm(false)
  }

  return (
    <div className="flex h-full">
      {/* List */}
      <div className="w-64 border-r border-gray-100 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h1 className="font-semibold text-gray-900 text-sm">Reports</h1>
          <button onClick={() => setShowForm(!showForm)} className="text-blue-600 hover:text-blue-700">
            <Plus size={16} />
          </button>
        </div>

        {showForm && (
          <form onSubmit={generate} className="p-4 space-y-2 border-b border-gray-100">
            <input
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Session ID"
              value={form.session_id}
              onChange={e => setForm(p => ({ ...p, session_id: e.target.value }))}
              required
            />
            <select
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={form.report_type}
              onChange={e => setForm(p => ({ ...p, report_type: e.target.value }))}
            >
              <option value="form_3cd_checklist">Form 3CD Checklist</option>
              <option value="working_paper">Working Paper</option>
              <option value="form_3ca">Form 3CA Draft</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-xs hover:bg-blue-700">
              Generate
            </button>
          </form>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <p className="text-xs text-gray-400 p-2">Loading...</p>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FileText size={24} className="mx-auto mb-1 opacity-30" />
              <p className="text-xs">No reports yet</p>
            </div>
          ) : (
            reports.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`w-full text-left p-2 rounded-lg transition-colors text-xs ${selected === r.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <p className="font-medium text-gray-800 capitalize">{r.report_type.replace(/_/g, ' ')}</p>
                <p className={`mt-0.5 ${r.status === 'completed' ? 'text-green-500' : r.status === 'failed' ? 'text-red-500' : 'text-amber-500'}`}>
                  {r.status}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-auto p-6">
        {selected ? (
          <ReportViewer reportId={selected} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p className="text-sm">Select a report to view it</p>
          </div>
        )}
      </div>
    </div>
  )
}

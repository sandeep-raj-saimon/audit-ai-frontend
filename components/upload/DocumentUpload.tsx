'use client'

import { useState, useCallback } from 'react'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface DocumentUploadProps {
  onUploadComplete?: (taskId: string) => void
}

type Status = { type: 'idle' } | { type: 'uploading' } | { type: 'success'; taskId: string } | { type: 'error'; message: string }

export default function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const upload = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setStatus({ type: 'error', message: 'Only PDF files are supported.' })
      return
    }
    if (file.size > 50 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'File too large (max 50 MB).' })
      return
    }
    setStatus({ type: 'uploading' })
    try {
      const token = localStorage.getItem('access_token')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('doc_type', 'CUSTOM')

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/ingest/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setStatus({ type: 'success', taskId: data.task_id })
      onUploadComplete?.(data.task_id)
    } catch (err: unknown) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : 'Upload failed.' })
    }
  }, [onUploadComplete])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }, [upload])

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      {status.type === 'uploading' ? (
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
          <p className="text-sm">Uploading and queuing for ingestion...</p>
        </div>
      ) : status.type === 'success' ? (
        <div className="flex flex-col items-center gap-2 text-green-600">
          <CheckCircle size={24} />
          <p className="text-sm font-medium">Queued for processing</p>
          <p className="text-xs text-gray-400">Task ID: {status.taskId}</p>
        </div>
      ) : status.type === 'error' ? (
        <div className="flex flex-col items-center gap-2 text-red-500">
          <AlertCircle size={24} />
          <p className="text-sm">{status.message}</p>
          <button onClick={() => setStatus({ type: 'idle' })} className="text-xs text-blue-600 hover:underline">Try again</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Upload size={24} className="text-gray-400" />
          <p className="text-sm text-gray-500">Drag & drop a PDF, or</p>
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Browse files
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) upload(f) }}
            />
          </label>
          <p className="text-xs text-gray-400">Max 50 MB · PDF only</p>
        </div>
      )}
    </div>
  )
}

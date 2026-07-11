'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { api, Report } from '@/lib/api'
import { Download } from 'lucide-react'

interface ReportViewerProps {
  reportId: string
}

export default function ReportViewer({ reportId }: ReportViewerProps) {
  const [report, setReport] = useState<Report | null>(null)

  useEffect(() => {
    setReport(null)
    let stopped = false

    const poll = async () => {
      while (!stopped) {
        try {
          const data = await api.getReport(reportId)
          if (!stopped) setReport(data)
          if (data.status === 'completed' || data.status === 'failed') return
        } catch { /* keep polling */ }
        await new Promise(r => setTimeout(r, 3000))
      }
    }

    poll()
    return () => { stopped = true }
  }, [reportId])

  if (!report) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (report.status === 'pending' || report.status === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
        <p className="text-sm">{report.status === 'pending' ? 'Queued for generation...' : 'Generating report with Claude...'}</p>
      </div>
    )
  }

  if (report.status === 'failed') {
    return (
      <div className="text-red-500 text-sm py-8 text-center">
        Report generation failed. Please try again.
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 capitalize">
          {report.report_type.replace(/_/g, ' ')}
        </h2>
        {report.download_url && (
          <a
            href={report.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700"
          >
            <Download size={14} /> Download
          </a>
        )}
      </div>
      <div className="prose prose-sm max-w-none text-gray-700">
        <ReactMarkdown>{report.content?.text ?? 'No content generated.'}</ReactMarkdown>
      </div>
    </div>
  )
}

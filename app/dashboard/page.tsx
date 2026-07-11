import Link from 'next/link'
import { MessageSquare, FolderOpen, FileText, Zap } from 'lucide-react'

const CARDS = [
  {
    href: '/dashboard/chat',
    Icon: MessageSquare,
    title: 'Ask AI',
    description: 'Query IT Act 2025, Form 3CD clauses, ICAI standards with cited answers.',
    color: 'blue',
  },
  {
    href: '/dashboard/sessions',
    Icon: FolderOpen,
    title: 'Audit Sessions',
    description: 'Manage active audits, track progress, store client context.',
    color: 'purple',
  },
  {
    href: '/dashboard/reports',
    Icon: FileText,
    title: 'Reports',
    description: 'Generate Form 3CD checklists, working papers, and draft 3CA.',
    color: 'green',
  },
]

const COLORS = {
  blue:   'bg-blue-50 text-blue-600 border-blue-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  green:  'bg-green-50 text-green-600 border-green-100',
}

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-500 mt-1">Your AI-powered audit assistant is ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {CARDS.map(({ href, Icon, title, description, color }) => (
          <Link
            key={href}
            href={href}
            className={`block p-5 rounded-xl border bg-white hover:shadow-sm transition-shadow ${COLORS[color as keyof typeof COLORS]}`}
          >
            <Icon size={20} className="mb-3" />
            <h2 className="font-semibold text-gray-900 mb-1">{title}</h2>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-3">
        <Zap size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Semantic cache active</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Repeated questions return instantly without an LLM call. Similarity threshold: 0.92.
          </p>
        </div>
      </div>
    </div>
  )
}

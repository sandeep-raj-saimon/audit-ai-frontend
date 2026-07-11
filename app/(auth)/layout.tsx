import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <ShieldCheck size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm text-gray-900">
              Audit <span className="text-blue-600">AI</span>
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        {children}
      </main>
    </div>
  )
}

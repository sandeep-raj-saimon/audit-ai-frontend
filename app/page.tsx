import Link from 'next/link'
import {
  MessageSquare,
  FileText,
  FolderOpen,
  Zap,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

const FEATURES = [
  {
    Icon: MessageSquare,
    title: 'Ask AI — Instant Regulatory Answers',
    description:
      'Query IT Act 2025, Form 3CD clauses, ICAI Standards, and GST provisions in plain English. Get cited, grounded answers — not hallucinations.',
    color: 'blue',
  },
  {
    Icon: FolderOpen,
    title: 'Audit Session Management',
    description:
      'Create and track audit engagements per client. Maintain context across tax years, store working notes, and monitor progress at every step.',
    color: 'purple',
  },
  {
    Icon: FileText,
    title: 'Auto-Generate Reports',
    description:
      'Generate Form 3CD checklists, working papers, and draft Form 3CA in seconds. Export and download audit-ready documents.',
    color: 'emerald',
  },
  {
    Icon: Zap,
    title: 'Semantic Cache',
    description:
      'Repeated questions return instantly without an LLM call. Sub-second responses for common audit queries with a 0.92 similarity threshold.',
    color: 'amber',
  },
  {
    Icon: ShieldCheck,
    title: 'India-Specific Compliance',
    description:
      'Built exclusively for Indian CA firms. Every answer is grounded in ICAI Standards, Income Tax Act, and GST law — not generic AI.',
    color: 'red',
  },
  {
    Icon: BookOpen,
    title: 'Custom Document Upload',
    description:
      'Upload your own PDF documents — engagement letters, client financials — and query them alongside the regulatory corpus.',
    color: 'teal',
  },
]

const ICON_COLORS: Record<string, string> = {
  blue:    'bg-blue-50 text-blue-600 ring-blue-100',
  purple:  'bg-purple-50 text-purple-600 ring-purple-100',
  emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  amber:   'bg-amber-50 text-amber-600 ring-amber-100',
  red:     'bg-red-50 text-red-600 ring-red-100',
  teal:    'bg-teal-50 text-teal-600 ring-teal-100',
}

const TOP_BORDER: Record<string, string> = {
  blue:    'border-t-blue-500',
  purple:  'border-t-purple-500',
  emerald: 'border-t-emerald-500',
  amber:   'border-t-amber-500',
  red:     'border-t-red-500',
  teal:    'border-t-teal-500',
}

const STEPS = [
  { step: '01', title: 'Sign up your CA firm', desc: 'Register with your firm name and ICAI registration number.' },
  { step: '02', title: 'Open an audit session', desc: 'Create a session for each client engagement with audit type and tax year.' },
  { step: '03', title: 'Ask, review, and export', desc: 'Query the AI, review cited answers, and generate compliance reports.' },
]

const CORPUS = ['IT Act 2025', 'Form 3CD', 'Form 3CA', 'ICAI Standards', 'CARO 2020', 'GST Provisions', 'SA 240', 'Section 44AB']

const WHY_POINTS = [
  'Answers cited to exact sections and clauses',
  'Semantic cache for sub-second repeated queries',
  'Session-aware context across your engagement',
  'Form 3CD, 3CA, and working paper generation',
  'Upload your own client documents and query them',
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <ShieldCheck size={14} className="text-white" />
            </div>
            <span className="font-bold text-base tracking-tight">
              Audit <span className="text-blue-600">AI</span>
            </span>
          </div>

          {/* Nav links + actions */}
          <nav className="flex items-center gap-2">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-800 transition-colors px-3 py-1.5 hidden sm:block">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-800 transition-colors px-3 py-1.5 hidden sm:block">
              How it works
            </a>
            <Link
              href="/login"
              className="text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors px-3 py-1.5 hidden sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm ml-1"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[480px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border border-blue-200 shadow-sm">
            <ShieldCheck size={12} />
            Built for Indian Chartered Accountants
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.06] tracking-tight max-w-4xl mx-auto">
            India&apos;s CA-First<br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Audit Intelligence
            </span>{' '}
            Platform
          </h1>

          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Get grounded, cited answers from IT Act 2025, Form 3CD, ICAI Standards, and GST law.
            Automate audit sessions, generate compliance reports, and close engagements faster.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Get started free <ArrowRight size={15} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              Sign in to your account
            </Link>
          </div>

          {/* Product mockup — simulated query/answer */}
          <div className="mt-16 max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-blue-100/40 p-5 text-left">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 text-[11px] text-gray-400 font-medium select-none">Audit AI · Regulatory Q&A</span>
              </div>

              {/* User query */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0 mt-0.5" />
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-600 leading-relaxed">
                  Under Section 44AB, when is a tax audit mandatory for a partnership firm?
                </div>
              </div>

              {/* AI answer */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={11} className="text-white" />
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 leading-relaxed flex-1">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1.5">
                    Cited · IT Act §44AB(a)
                  </span>
                  A partnership firm must get accounts audited if total turnover exceeds{' '}
                  <strong className="text-gray-900">₹1 crore</strong> (or ₹10 crore if 95%+
                  transactions are digital)…
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corpus strip ── */}
      <section className="bg-gray-50 border-y border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[11px] text-gray-400 uppercase tracking-widest mb-4 font-semibold">
            Grounded in India&apos;s regulatory corpus
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CORPUS.map((label) => (
              <span
                key={label}
                className="text-xs font-semibold bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Everything a CA firm needs</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
            From regulatory Q&A to audit session management and automated report generation — one platform, end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, description, color }) => (
            <div
              key={title}
              className={`group bg-white border border-gray-100 border-t-2 ${TOP_BORDER[color]} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ring-4 ${ICON_COLORS[color]}`}>
                <Icon size={18} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Up and running in minutes</h2>
            <p className="mt-4 text-gray-500">No setup headaches. No training required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[1.75rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white text-sm font-extrabold flex items-center justify-center mx-auto mb-5 shadow-md shadow-blue-200 ring-4 ring-blue-100 relative z-10">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Audit AI ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 lg:p-14 text-white grid md:grid-cols-2 gap-12 items-center">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />

          <div className="relative">
            <p className="text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-3">Why Audit AI</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-5">
              Built for how Indian CAs actually work
            </h2>
            <p className="text-blue-100 leading-relaxed text-sm mb-7">
              Generic AI tools don&apos;t understand the nuance of Indian audit law. Audit AI is grounded
              exclusively on Indian regulatory documents — so every answer is relevant, cited, and defensible.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm"
            >
              Start for free <ArrowRight size={14} />
            </Link>
          </div>

          <ul className="space-y-3.5 relative">
            {WHY_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-blue-50">
                <div className="w-5 h-5 rounded-full bg-blue-500 border border-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle size={11} className="text-white" />
                </div>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-gray-50 border-t border-gray-100 py-24 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Get started</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Start your first audit session today
          </h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
            Join CA firms already using Audit AI to close engagements faster and with greater confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Create free account <ArrowRight size={15} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center border border-gray-200 bg-white text-gray-700 px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                <ShieldCheck size={11} className="text-white" />
              </div>
              <span className="font-bold text-sm text-gray-800">Audit AI</span>
            </div>
            <p className="text-xs text-gray-400">India&apos;s CA-First Audit Intelligence Platform</p>
            <div className="flex gap-6 text-xs text-gray-400">
              <Link href="/login" className="hover:text-gray-700 transition-colors">Sign in</Link>
              <Link href="/signup" className="hover:text-gray-700 transition-colors">Sign up</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-300">
            © 2026 Audit AI. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}

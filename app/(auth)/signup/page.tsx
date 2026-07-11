'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    firm_name: '',
    icai_reg_no: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.signup({
        email: form.email,
        password: form.password,
        firm_name: form.firm_name,
        icai_reg_no: form.icai_reg_no || undefined,
      })
      setSuccess(res.message)
      setTimeout(() => router.push('/login'), 2000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
        <p className="text-gray-500 text-sm mb-6">Start your 5-query free trial — no card required.</p>

        {error && (
          <p className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-lg mb-4 text-sm">{error}</p>
        )}
        {success && (
          <p className="bg-green-50 text-green-600 border border-green-100 p-3 rounded-lg mb-4 text-sm">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'CA Firm Name', key: 'firm_name', type: 'text', placeholder: 'M/s Sharma & Associates', required: true },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'ca@yourfirm.com', required: true },
            { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••', required: true },
            { label: 'ICAI Registration No. (optional)', key: 'icai_reg_no', type: 'text', placeholder: '000000', required: false },
          ].map(({ label, key, type, placeholder, required }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                value={form[key as keyof typeof form]}
                onChange={set(key as keyof typeof form)}
                placeholder={placeholder}
                required={required}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
        </p>
    </div>
  )
}

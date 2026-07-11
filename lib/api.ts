const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail ?? 'Request failed')
  }
  return res.json() as Promise<T>
}

export interface QueryRequest {
  question: string
  session_id?: string
  audit_type?: string
  filters?: { doc_type?: string[] }
  firm_id?: string
}

export interface Source {
  doc: string
  ref: string
  excerpt: string
}

export interface QueryResponse {
  answer: string
  sources: Source[]
  cache_hit: boolean
  model_used: string
}

export interface Session {
  id: string
  firm_id: string
  client_name: string
  audit_type: string
  tax_year: string
  current_step: string
  context: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  session_id: string
  firm_id: string
  report_type: string
  status: string
  content?: { text: string }
  download_url?: string
  created_at: string
  completed_at?: string
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ access_token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (data: { email: string; password: string; firm_name: string; icai_reg_no?: string }) =>
    request<{ message: string }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // RAG query
  query: (req: QueryRequest) =>
    request<QueryResponse>('/api/query', { method: 'POST', body: JSON.stringify(req) }),

  // Sessions
  getSessions: (firmId: string) =>
    request<Session[]>(`/api/sessions?firm_id=${firmId}`),

  createSession: (data: { firm_id: string; client_name: string; audit_type: string; tax_year: string }) =>
    request<Session>('/api/sessions', { method: 'POST', body: JSON.stringify(data) }),

  getSession: (id: string) =>
    request<Session>(`/api/sessions/${id}`),

  updateSession: (id: string, data: { current_step?: string; context?: Record<string, unknown> }) =>
    request<Session>(`/api/sessions/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Reports
  generateReport: (data: { session_id: string; firm_id: string; report_type: string }) =>
    request<{ report_id: string; status: string }>('/api/reports/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getReport: (id: string) =>
    request<Report>(`/api/reports/${id}`),

  listReports: (firmId: string) =>
    request<Report[]>(`/api/reports?firm_id=${firmId}`),
}

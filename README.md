# Audit AI Frontend

Next.js frontend for Audit AI with flows for:

- authentication
- audit chat and guided query workflows
- session management
- report generation and viewing

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase Auth helpers

## Structure

```text
frontend/
├── app/
├── components/
├── lib/
├── package.json
└── tailwind.config.ts
```

## Setup

Install dependencies:

```bash
npm install
```

Create `frontend/.env.local` with:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Run Locally

```bash
npm run dev
```

Default local URL:

- `http://localhost:3000`

The frontend expects the backend API at `http://localhost:8000` unless `NEXT_PUBLIC_API_URL` is overridden.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`


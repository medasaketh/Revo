# Revo

AI-powered fashion intelligence platform.

**Tagline:** Stop Guessing. Start Knowing.

## Quick start

```bash
cd revo
npm install
cp .env.example .env.local   # add your Supabase keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Authentication

Email + password auth is implemented with Supabase, middleware route protection, and a `profiles` table with RLS.

**Full setup guide:** [docs/AUTH.md](docs/AUTH.md)

### Auth pages

- `/register` — Create account
- `/login` — Sign in
- `/forgot-password` — Request password reset
- `/reset-password` — Set new password

### Protected routes

- `/dashboard`, `/profile`, `/settings`, `/onboarding`

## Database setup

Run the SQL migration in Supabase SQL Editor:

```
supabase/migrations/001_profiles.sql
```

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth + PostgreSQL + RLS)
- Zod + React Hook Form
- Framer Motion (onboarding UI)

## Project structure

```
revo/
├── app/
│   ├── (auth)/          # Login, register, password reset
│   ├── api/auth/        # Auth API routes
│   ├── auth/callback/   # Supabase OAuth/PKCE callback
│   └── dashboard/       # Protected dashboard
├── components/
│   ├── auth/            # Auth UI components
│   └── onboarding/      # Onboarding flow (UI only)
├── lib/
│   ├── supabase/        # Client, server, session helpers
│   └── auth/            # API response helpers
├── proxy.ts             # Session refresh + route protection (Next.js 16+)
├── schemas/             # Zod validation
├── types/               # TypeScript types
├── hooks/               # React hooks
└── supabase/migrations/ # SQL migrations
```

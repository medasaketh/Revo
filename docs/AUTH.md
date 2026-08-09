# Revo — Authentication Setup

Revo uses **Supabase Auth** with email + password, HttpOnly cookie sessions via `@supabase/ssr`, and Row Level Security on the `profiles` table.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Copy your **Project URL** and **anon key** from **Settings → API**.

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # Server-only, never commit
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Run the database migration

Open **Supabase → SQL Editor** and run:

```
supabase/migrations/001_profiles.sql
```

This creates:

- `profiles` table linked to `auth.users`
- RLS policies (users can only read/update their own profile)
- Trigger to auto-create a profile on signup
- `updated_at` trigger

## 4. Configure Supabase Auth

In **Authentication → URL Configuration**:

| Setting | Value |
|---------|-------|
| Site URL | `http://localhost:3000` |
| Redirect URLs | `http://localhost:3000/auth/callback` |

In **Authentication → Providers**, enable **Email** and configure:

- **Confirm email** — optional (if enabled, users must verify before login)
- **Secure password change** — recommended

For password reset emails, the redirect goes to:

```
/auth/callback?next=/reset-password
```

## 5. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Auth routes

| Route | Description |
|-------|-------------|
| `/register` | Create account |
| `/login` | Sign in |
| `/forgot-password` | Request reset email |
| `/reset-password` | Set new password (after email link) |
| `/dashboard` | Protected — requires auth |
| `/profile` | Protected |
| `/settings` | Protected |
| `/onboarding` | Protected |

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register user |
| `POST` | `/api/auth/login` | Sign in |
| `POST` | `/api/auth/logout` | Sign out |
| `POST` | `/api/auth/reset-password` | Request or update password |
| `GET` | `/api/auth/session` | Get current session + profile |

All requests are validated with **Zod**. Responses follow:

```json
{ "success": true, "message": "...", "data": {} }
```

```json
{ "success": false, "error": { "code": "...", "message": "..." } }
```

## Architecture

```
lib/supabase/
  client.ts      → Browser client (client components)
  server.ts      → Server client (API routes, Server Components)
  middleware.ts  → Session refresh helper (used by proxy)

proxy.ts         → Next.js 16+ route protection entry point

components/providers/AuthProvider.tsx  → Client session context
schemas/auth.ts                      → Zod validation schemas
```

## Security notes

- Sessions stored in **HttpOnly cookies** (handled by `@supabase/ssr`)
- **Service role key** is never used in client code
- Internal errors are never exposed to users
- Proxy validates sessions server-side on every matched request
- RLS ensures users only access their own profile data

## Troubleshooting registration

### "Account created" but no row in Supabase?

Users are stored in **two places**:

| Location | What it is |
|----------|------------|
| **Authentication → Users** | Auth account (`auth.users`) — always check here first |
| **Table Editor → profiles** | Extended profile — only exists after SQL migrations run |

### Run these migrations in Supabase SQL Editor

1. `supabase/migrations/001_profiles.sql` — creates `profiles` table + auto-create trigger
2. `supabase/migrations/002_onboarding_completed.sql` — onboarding tracking
3. `supabase/migrations/003_profiles_insert_policy.sql` — profile insert fallback

### Common causes

- **Wrong table** — looking at `profiles` but migrations weren't run; check **Authentication → Users**
- **Email already registered** — Supabase can return a fake "success"; the app now detects this and shows an error
- **Email confirmation enabled** — user is created but unconfirmed; appears under Authentication → Users with "Waiting for verification"
- **Rate limit** — too many signup attempts; wait a few minutes
- **Wrong project** — verify `.env.local` URL matches your Supabase dashboard project ref

### Verify your project

Your `.env.local` URL should match the project ref in the dashboard URL:
`https://<project-ref>.supabase.co`


- [ ] Set production `NEXT_PUBLIC_SITE_URL`
- [ ] Add production domain to Supabase redirect URLs
- [ ] Enable email confirmation if required
- [ ] Configure custom SMTP in Supabase (optional)
- [ ] Rotate keys if ever exposed

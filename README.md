# GrandWave

One friendly hub for everything mighty — built by Wild Lirt Studio.

## Getting started

```bash
npm install
```

Then, **before running the app**, set up the database:

1. Open your Supabase project → SQL Editor → New query
2. Paste in everything from `supabase/schema.sql` and run it
   (this creates the `links` and `votes` tables, sets up permissions, and seeds your 6 real WhatsApp channel links)
3. Confirm `.env.local` has your project's URL and anon key (already filled in)

Then:
```bash
npm run dev
```

Open http://localhost:3000 — it redirects to `/login`.

## Flow

**Login (magic link or email+password) → Home → click Social → click LinkHub Pro → View/Add tabs.**

## What's real now

- **Auth** — real Supabase accounts. Email + password, or a passwordless magic link, your choice each time you sign in.
- **Links** — stored permanently in Supabase's `links` table, not in memory. Survives restarts and redeploys.
- **Likes/dislikes** — stored in the `votes` table. One vote per person per link; clicking the same arrow again removes your vote. Requires being signed in.
- **Sign out** — bottom of the sidebar.

## Still placeholder / to decide later

- No moderation/approval step — posted links go live immediately.
- No password reset flow UI yet (Supabase supports it, just not wired into the login page).
- Email confirmation is required after signing up with a password (Supabase default) — check your inbox after creating an account.

## Adding the next feature

Each category already has its own route folder under `app/(hub)/`:
- `tech/`, `entertainment/`, `productivity/`, `local/` currently just render the shared `ComingSoon` component.
- To build one out, follow the same pattern as `social/linkhub/` — its own folder, its own Supabase table if it needs data, then flip `enabled: true` for that category in `components/Sidebar.tsx`.

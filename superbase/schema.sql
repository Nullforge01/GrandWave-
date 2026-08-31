-- Run this in your Supabase project: SQL Editor → New query → paste → Run

-- ===== Links =====
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Channel','TikTok','Business','Advertising','Entertainment','Social')),
  title text not null,
  url text not null,
  note text,
  poster_id uuid references auth.users(id) on delete set null,
  poster_name text,
  created_at timestamptz default now()
);

alter table public.links enable row level security;

create policy "Links are viewable by everyone"
  on public.links for select
  using (true);

create policy "Authenticated users can insert links"
  on public.links for insert
  to authenticated
  with check (auth.uid() = poster_id);

-- ===== Votes (likes / dislikes) =====
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  link_id uuid references public.links(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz default now(),
  unique (link_id, user_id)
);

alter table public.votes enable row level security;

create policy "Votes are viewable by everyone"
  on public.votes for select
  using (true);

create policy "Authenticated users can vote"
  on public.votes for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can change their own vote"
  on public.votes for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can remove their own vote"
  on public.votes for delete
  to authenticated
  using (auth.uid() = user_id);

-- ===== Seed your real links =====
insert into public.links (category, title, url, poster_name) values
  ('Channel', 'WhatsApp Channel', 'https://whatsapp.com/channel/0029VbBbkrj6WaKjj5jOd20g', 'GrandWave team'),
  ('Channel', 'WhatsApp Channel', 'https://whatsapp.com/channel/0029Vb7TBh3Ae5ViTphVEt0s', 'GrandWave team'),
  ('Channel', 'WhatsApp Channel', 'https://whatsapp.com/channel/0029VbDgFcI3LdQXuXcFqp30', 'GrandWave team'),
  ('Channel', 'WhatsApp Channel', 'https://whatsapp.com/channel/0029VbBxPYN2kNFj3I1H1e0f', 'GrandWave team'),
  ('Channel', 'WhatsApp Channel', 'https://whatsapp.com/channel/0029VavR9OxLtOjJTXrZNi32', 'GrandWave team'),
  ('Social', 'WhatsApp Channel', 'https://whatsapp.com/channel/0029VbCnlzhGpLHWJ4ZzMB41', 'GrandWave team');

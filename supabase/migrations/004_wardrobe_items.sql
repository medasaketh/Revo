-- Revo: per-user wardrobe items

create table if not exists public.wardrobe_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  brand text,
  category text not null,
  color text,
  color_hex text default '#888888',
  image_url text,
  fabric text,
  season text[] not null default '{}',
  occasions text[] not null default '{}',
  price numeric,
  purchase_date text,
  fit_notes text,
  times_worn integer not null default 0,
  last_worn_at timestamptz,
  is_favorite boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

comment on table public.wardrobe_items is 'User-owned clothing items for the digital wardrobe';

create index if not exists wardrobe_items_user_id_idx
  on public.wardrobe_items (user_id);

create index if not exists wardrobe_items_category_idx
  on public.wardrobe_items (user_id, category);

drop trigger if exists wardrobe_items_updated_at on public.wardrobe_items;
create trigger wardrobe_items_updated_at
  before update on public.wardrobe_items
  for each row
  execute function public.handle_updated_at();

alter table public.wardrobe_items enable row level security;

drop policy if exists "Users can view own wardrobe items" on public.wardrobe_items;
create policy "Users can view own wardrobe items"
  on public.wardrobe_items
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own wardrobe items" on public.wardrobe_items;
create policy "Users can insert own wardrobe items"
  on public.wardrobe_items
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own wardrobe items" on public.wardrobe_items;
create policy "Users can update own wardrobe items"
  on public.wardrobe_items
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own wardrobe items" on public.wardrobe_items;
create policy "Users can delete own wardrobe items"
  on public.wardrobe_items
  for delete
  using (auth.uid() = user_id);

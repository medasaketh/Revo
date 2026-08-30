-- Revo: fix wardrobe_items permissions (run after 004)
-- Do NOT disable RLS — that exposes all users' items via the public anon key.

grant usage on schema public to postgres, anon, authenticated, service_role;

grant select, insert, update, delete on table public.wardrobe_items to authenticated;
grant all on table public.wardrobe_items to service_role;

-- Recreate policies scoped to authenticated users only
alter table public.wardrobe_items enable row level security;

drop policy if exists "Users can view own wardrobe items" on public.wardrobe_items;
create policy "Users can view own wardrobe items"
  on public.wardrobe_items
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own wardrobe items" on public.wardrobe_items;
create policy "Users can insert own wardrobe items"
  on public.wardrobe_items
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own wardrobe items" on public.wardrobe_items;
create policy "Users can update own wardrobe items"
  on public.wardrobe_items
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own wardrobe items" on public.wardrobe_items;
create policy "Users can delete own wardrobe items"
  on public.wardrobe_items
  for delete
  to authenticated
  using (auth.uid() = user_id);

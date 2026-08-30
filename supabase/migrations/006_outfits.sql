-- Revo: logged outfits + wear tracking (run after 005)

create table if not exists public.outfits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text,
  occasion text,
  worn_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.outfit_items (
  outfit_id uuid references public.outfits on delete cascade not null,
  wardrobe_item_id uuid references public.wardrobe_items on delete cascade not null,
  primary key (outfit_id, wardrobe_item_id)
);

comment on table public.outfits is 'User-logged outfit combinations';
comment on table public.outfit_items is 'Wardrobe items included in each outfit';

create index if not exists outfits_user_id_idx on public.outfits (user_id);
create index if not exists outfits_worn_at_idx on public.outfits (user_id, worn_at desc);
create index if not exists outfit_items_wardrobe_item_id_idx
  on public.outfit_items (wardrobe_item_id);

alter table public.outfits enable row level security;
alter table public.outfit_items enable row level security;

grant select, insert, update, delete on table public.outfits to authenticated;
grant select, insert, delete on table public.outfit_items to authenticated;
grant all on table public.outfits to service_role;
grant all on table public.outfit_items to service_role;

drop policy if exists "Users can view own outfits" on public.outfits;
create policy "Users can view own outfits"
  on public.outfits for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own outfits" on public.outfits;
create policy "Users can insert own outfits"
  on public.outfits for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own outfits" on public.outfits;
create policy "Users can delete own outfits"
  on public.outfits for delete to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can view own outfit items" on public.outfit_items;
create policy "Users can view own outfit items"
  on public.outfit_items for select to authenticated
  using (
    exists (
      select 1 from public.outfits o
      where o.id = outfit_items.outfit_id and o.user_id = auth.uid()
    )
  );

drop policy if exists "Users can insert own outfit items" on public.outfit_items;
create policy "Users can insert own outfit items"
  on public.outfit_items for insert to authenticated
  with check (
    exists (
      select 1 from public.outfits o
      where o.id = outfit_items.outfit_id and o.user_id = auth.uid()
    )
    and exists (
      select 1 from public.wardrobe_items w
      where w.id = outfit_items.wardrobe_item_id and w.user_id = auth.uid()
    )
  );

drop policy if exists "Users can delete own outfit items" on public.outfit_items;
create policy "Users can delete own outfit items"
  on public.outfit_items for delete to authenticated
  using (
    exists (
      select 1 from public.outfits o
      where o.id = outfit_items.outfit_id and o.user_id = auth.uid()
    )
  );

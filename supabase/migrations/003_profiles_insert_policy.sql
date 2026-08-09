-- Allow users to insert their own profile (backup if trigger fails or for API upsert)

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

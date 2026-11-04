-- Project designs: house designs offered within a specific project (e.g. Del City).
-- Run once in Supabase > SQL Editor for the Promitto project.
-- Safe to re-run: it only creates what is missing.

create table if not exists public.project_designs (
  id           uuid primary key default gen_random_uuid(),
  -- The project (row in public.properties) this design belongs to, e.g. Del City
  -- (text, to match public.properties.id)
  property_id  text not null references public.properties(id) on delete cascade,
  name         text not null,
  bedrooms     integer not null check (bedrooms > 0),
  roof_type    text not null,
  house_type   text not null,
  area         text,
  description  text,
  features     text[] not null default '{}',
  -- Public photo URLs; the first one is the cover photo
  images       text[] not null default '{}',
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists project_designs_property_id_idx
  on public.project_designs (property_id, sort_order, created_at);

-- Keep updated_at current
create or replace function public.project_designs_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists project_designs_touch on public.project_designs;
create trigger project_designs_touch
  before update on public.project_designs
  for each row execute function public.project_designs_touch();

-- Row level security: anyone can read; only admins (public.users.role = 'admin') can change.
alter table public.project_designs enable row level security;

drop policy if exists "Project designs are public" on public.project_designs;
create policy "Project designs are public"
  on public.project_designs for select
  using (true);

drop policy if exists "Admins manage project designs" on public.project_designs;
create policy "Admins manage project designs"
  on public.project_designs for all
  to authenticated
  using (exists (select 1 from public.users u where u.id::text = auth.uid()::text and u.role = 'admin'))
  with check (exists (select 1 from public.users u where u.id::text = auth.uid()::text and u.role = 'admin'));

-- Photos are uploaded to the existing public "properties" storage bucket under designs/<project id>/,
-- using the same upload permissions the admin property form already uses.

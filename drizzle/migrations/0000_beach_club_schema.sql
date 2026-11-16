
create type public.app_role as enum ('admin','user');
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade not null, role app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated; grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role) returns boolean language sql stable security definer set search_path = public as $$ select exists(select 1 from public.user_roles where user_id=_user_id and role=_role) $$;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.handle_first_admin() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role='admin') then
    insert into public.user_roles(user_id, role) values (new.id,'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users for each row execute function public.handle_first_admin();

create table public.courts (id uuid primary key default gen_random_uuid(), name text not null, description text, image_url text, active boolean not null default true, sort int not null default 0, created_at timestamptz not null default now());
create table public.modalities (id uuid primary key default gen_random_uuid(), name text not null, description text, active boolean not null default true, sort int not null default 0, created_at timestamptz not null default now());
create table public.time_slots (id uuid primary key default gen_random_uuid(), weekday int not null check (weekday between 0 and 6), start_time time not null, active boolean not null default true, unique(weekday,start_time));
create table public.prices (id uuid primary key default gen_random_uuid(), label text not null, value text not null, description text, sort int not null default 0, created_at timestamptz not null default now());
create table public.menu_categories (id uuid primary key default gen_random_uuid(), name text not null, sort int not null default 0, created_at timestamptz not null default now());
create table public.menu_items (id uuid primary key default gen_random_uuid(), category_id uuid references public.menu_categories(id) on delete set null, name text not null, description text, price text, image_url text, featured boolean not null default false, active boolean not null default true, sort int not null default 0, created_at timestamptz not null default now());
create table public.media (id uuid primary key default gen_random_uuid(), url text not null, kind text not null default 'image' check (kind in ('image','video')), category text not null default 'quadras', caption text, sort int not null default 0, created_at timestamptz not null default now());
create table public.events (id uuid primary key default gen_random_uuid(), title text not null, event_date date, description text, image_url text, active boolean not null default true, created_at timestamptz not null default now());
create table public.reservations (id uuid primary key default gen_random_uuid(), name text not null check (char_length(name) between 2 and 100), phone text not null check (char_length(phone) between 8 and 20), email text check (email is null or char_length(email) <= 255), reservation_date date not null, start_time time not null, court_id uuid references public.courts(id) on delete set null, modality text check (modality is null or char_length(modality) <= 80), people int check (people is null or people between 1 and 100), notes text check (notes is null or char_length(notes) <= 1000), status text not null default 'pendente' check (status in ('pendente','confirmada','cancelada')), created_at timestamptz not null default now());
create table public.messages (id uuid primary key default gen_random_uuid(), name text not null check (char_length(name) between 2 and 100), phone text check (phone is null or char_length(phone) <= 20), email text check (email is null or char_length(email) <= 255), subject text not null default 'Informações' check (char_length(subject) <= 80), message text not null check (char_length(message) between 2 and 2000), read boolean not null default false, created_at timestamptz not null default now());

do $$ declare t text; begin
  foreach t in array array['courts','modalities','time_slots','prices','menu_categories','menu_items','media','events'] loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (public.has_role(auth.uid(),''admin'')) with check (public.has_role(auth.uid(),''admin''))', t);
  end loop;
  foreach t in array array['reservations','messages'] loop
    execute format('grant insert on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "anyone insert" on public.%I for insert to anon, authenticated with check (true)', t);
    execute format('create policy "admin read" on public.%I for select to authenticated using (public.has_role(auth.uid(),''admin''))', t);
    execute format('create policy "admin update" on public.%I for update to authenticated using (public.has_role(auth.uid(),''admin''))', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.has_role(auth.uid(),''admin''))', t);
  end loop;
end $$;

create or replace function public.booked_slots(_date date) returns table(start_time time, court_id uuid) language sql stable security definer set search_path = public as $$
  select start_time, court_id from public.reservations where reservation_date = _date and status <> 'cancelada'
$$;
grant execute on function public.booked_slots(date) to anon, authenticated;

create policy "media admin select" on storage.objects for select to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "media admin insert" on storage.objects for insert to authenticated with check (bucket_id='media' and public.has_role(auth.uid(),'admin'));
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id='media' and public.has_role(auth.uid(),'admin'));

insert into public.courts(name, description, sort) values ('Quadra 1','Quadra de areia clara.',1),('Quadra 2','Quadra de areia clara.',2),('Quadra 3','Quadra de areia clara.',3);
insert into public.modalities(name, description, sort) values ('Vôlei de praia','Duplas ou quartetos na areia.',1),('Futevôlei','A união do futebol com o vôlei.',2),('Beach tennis','Raquete, areia e muita energia.',3);
insert into public.time_slots(weekday, start_time) select d, (h || ':00')::time from generate_series(0,6) d, generate_series(7,22) h;

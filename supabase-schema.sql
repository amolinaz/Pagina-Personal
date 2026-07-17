-- Ejecutar esto una vez en Supabase: Dashboard > SQL Editor > New query > Run

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  org text,
  phone text,
  interest text,
  message text not null,
  source text not null default 'contacto'
);

-- Seguridad: nadie puede leer/escribir esta tabla con la clave pública (anon).
-- Solo el backend (con la service_role key, que nunca se expone al navegador) puede acceder.
alter table leads enable row level security;

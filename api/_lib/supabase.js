// Cliente mínimo para la REST API de Supabase (PostgREST), sin dependencias externas.
// Usa siempre la service_role key — solo se llama desde funciones serverless (server-side).

function config() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Faltan variables de entorno SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  }
  return { url: url.replace(/\/$/, ''), serviceKey };
}

async function insertLead(lead) {
  const { url, serviceKey } = config();
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase insert error (${res.status}): ${text}`);
  }
}

async function listLeads() {
  const { url, serviceKey } = config();
  const res = await fetch(`${url}/rest/v1/leads?select=*&order=created_at.desc`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase select error (${res.status}): ${text}`);
  }
  return res.json();
}

export { insertLead, listLeads };

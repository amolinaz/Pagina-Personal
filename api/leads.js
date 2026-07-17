import { listLeads } from './_lib/supabase.js';
import { parseCookies, verifySessionToken } from './_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const cookies = parseCookies(req);
  if (!verifySessionToken(cookies.admin_session)) {
    return res.status(401).json({ error: 'No autorizado.' });
  }

  try {
    const leads = await listLeads();
    return res.status(200).json({ leads });
  } catch (err) {
    console.error('Error listando leads:', err);
    return res.status(500).json({ error: 'No se pudieron cargar los leads.' });
  }
}

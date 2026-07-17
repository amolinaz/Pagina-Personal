import { insertLead } from './_lib/supabase.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const { name, email, org, phone, interest, message, website } = req.body || {};

  // Honeypot: los bots suelen rellenar cualquier campo oculto.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Por favor completa nombre, correo y mensaje.' });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido.' });
  }

  try {
    await insertLead({
      name,
      email,
      org: org || null,
      phone: phone || null,
      interest: interest || null,
      message,
      source: 'contacto',
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error guardando lead:', err);
    return res.status(500).json({ error: 'No se pudo guardar tu mensaje. Intenta de nuevo en unos minutos.' });
  }
}

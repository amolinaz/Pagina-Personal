import { createSessionToken, safeCompare } from './_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'El panel de administración no está configurado.' });
  }

  if (!password || !safeCompare(password, adminPassword)) {
    return res.status(401).json({ error: 'Contraseña incorrecta.' });
  }

  const token = createSessionToken();
  const isProd = process.env.VERCEL_ENV === 'production';
  res.setHeader('Set-Cookie', [
    `admin_session=${token}; HttpOnly; Path=/; Max-Age=28800; SameSite=Strict${isProd ? '; Secure' : ''}`,
  ]);
  return res.status(200).json({ ok: true });
}

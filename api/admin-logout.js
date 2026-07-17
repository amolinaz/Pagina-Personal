export default async function handler(req, res) {
  res.setHeader('Set-Cookie', 'admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
  return res.status(200).json({ ok: true });
}

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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error('Faltan variables de entorno RESEND_API_KEY / CONTACT_TO_EMAIL');
    return res.status(500).json({ error: 'El formulario todavía no está configurado. Escríbeme directamente por correo.' });
  }

  const bodyLines = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    org ? `Organización: ${org}` : null,
    phone ? `Teléfono: ${phone}` : null,
    interest ? `Motivo de contacto: ${interest}` : null,
    '',
    'Mensaje:',
    message,
  ].filter(Boolean);

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Formulario web <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: `Nuevo contacto desde la web: ${name}`,
        text: bodyLines.join('\n'),
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error('Resend error:', resendRes.status, errBody);
      return res.status(502).json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error inesperado en /api/contact:', err);
    return res.status(500).json({ error: 'Ocurrió un error inesperado. Intenta de nuevo.' });
  }
}

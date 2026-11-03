// Vercel serverless function: POST /api/contact  ->  emails the message to you via Resend.
// Env vars (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY  (required)   TO_EMAIL (default vivariumextimus@gmail.com)   FROM_EMAIL (default Resend's test sender)
const KINDS = { project: 'PROJECT', edit: 'EDITING', film: 'FILMY' };
const hits = new Map(); // best-effort rate limit per IP

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: bots fill this

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
  const now = Date.now(), list = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (list.length >= 5) return res.status(429).json({ ok: false, error: 'Too many messages, try again later.' });
  list.push(now); hits.set(ip, list);

  const tag = KINDS[b.kind];
  const name = String(b.name || '').trim().slice(0, 60);
  const contact = String(b.contact || '').trim().slice(0, 80);
  const msg = String(b.msg || '').trim().slice(0, 1000);
  if (!tag || !name || !contact || msg.length < 5) return res.status(400).json({ ok: false, error: 'Missing fields.' });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ ok: false, error: 'Not configured.' });
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [process.env.TO_EMAIL || 'vivariumextimus@gmail.com'],
        subject: '[' + tag + '] ' + name + ' wants to work with you',
        text: 'Interested in: ' + tag + '\nName: ' + name + '\nReply to: ' + contact + '\n\nMessage:\n' + msg,
        ...(isEmail ? { reply_to: contact } : {})
      })
    });
    if (!r.ok) return res.status(502).json({ ok: false });
    return res.status(200).json({ ok: true });
  } catch (e) { return res.status(502).json({ ok: false }); }
};

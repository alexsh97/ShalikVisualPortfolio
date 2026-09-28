export type MailConfig = { RESEND_API_KEY?: string; CONTACT_FROM_EMAIL?: string };
export function mailConfigured(config: MailConfig) {
  return Boolean(config.RESEND_API_KEY?.trim() && config.CONTACT_FROM_EMAIL?.trim());
}
const json = (body: object, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export async function handleContact(request: Request, config: MailConfig, send: typeof fetch = fetch): Promise<Response> {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return json({ error: 'forbidden' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'invalid' }, 415);
  const reader = request.body?.getReader();
  if (!reader) return json({ error: 'invalid' }, 400);
  const chunks: Uint8Array[] = []; let bytes = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    bytes += value.byteLength;
    if (bytes > 24000) { await reader.cancel(); return json({ error: 'too_large' }, 413); }
    chunks.push(value);
  }
  let payload: Record<string, unknown>;
  try {
    const combined = new Uint8Array(bytes); let offset = 0;
    for (const chunk of chunks) { combined.set(chunk, offset); offset += chunk.length; }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(combined));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return json({ error: 'invalid' }, 400);
    payload = parsed as Record<string, unknown>;
  } catch { return json({ error: 'invalid' }, 400); }
  if (payload.website) return json({ error: 'invalid' }, 400);
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const id = typeof payload.id === 'string' ? payload.id : '';
  if (!name || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 5000 || !/^[a-f\d-]{36}$/i.test(id)) return json({ error: 'invalid' }, 400);
  if (!mailConfigured(config)) return json({ error: 'unavailable' }, 503);
  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact-${id}` },
      body: JSON.stringify({ from: config.CONTACT_FROM_EMAIL, to: ['shalik.visual@gmail.com'], reply_to: email, subject: `Shalik Visual — ${payload.locale === 'pl' ? 'Nowe zapytanie' : 'New project enquiry'}`, text: `Name / Imię: ${name}\nEmail: ${email}\n\n${message}` }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return json({ error: 'delivery_failed' }, 502);
    const result = await response.json() as { id?: unknown };
    if (typeof result.id !== 'string' || !result.id) return json({ error: 'delivery_failed' }, 502);
    return json({ accepted: true }, 200);
  } catch { return json({ error: 'delivery_failed' }, 502); }
}

import { handleContact, mailConfigured, type MailConfig } from '@/lib/contact';
export function GET() {
  return Response.json({ available: mailConfigured(process.env as MailConfig) }, { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(request: Request) {
  return handleContact(request, process.env as MailConfig);
}

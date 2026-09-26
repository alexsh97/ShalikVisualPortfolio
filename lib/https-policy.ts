// Current origin confirmed by the Sites edge redirect on 2026-09-26. Change only after a replacement
// hostname is attached, certificate-active and independently verified.
export const SITE_ORIGIN = 'https://shalik-visual.shalik-visual.chatgpt.site';
const serviceSlugs = ['music-videos','commercials','short-films','documentaries','podcasts-videocasts','photography','editing-post-production','event-films'];
const publicPaths = new Set(['/', '/team', '/studio', '/partners', ...serviceSlugs.map(s=>'/offer/'+s)]);
export function httpsRedirect(rawUrl: string, allowLocalHttp = false): string | null {
  const url = new URL(rawUrl);
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.protocol === 'https:' || (allowLocalHttp && local)) return null;
  // Never use Host/X-Forwarded-Host to construct redirect destinations.
  const target = new URL(SITE_ORIGIN);
  target.pathname = url.pathname;
  target.search = url.search;
  return target.href;
}
export function canonicalAlternates(path: string) {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const polish = clean === '/pl' || clean.startsWith('/pl/');
  const english = polish ? clean.slice(3) || '/' : clean;
  if (!publicPaths.has(english)) return undefined;
  const pl = english === '/' ? '/pl' : '/pl'+english;
  const absolute = (p: string) => SITE_ORIGIN + (p === '/' ? '/' : p);
  return {canonical:absolute(polish?pl:english),languages:{en:absolute(english),pl:absolute(pl),'x-default':absolute(english)}};
}

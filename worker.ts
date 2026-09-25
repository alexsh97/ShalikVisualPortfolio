/// <reference types="vite/client" />
import handler from 'vinext/server/fetch-handler';
import { httpsRedirect } from './lib/https-policy';
type Bindings = { ASSETS?: Fetcher };
export default {
  async fetch(request: Request, env: Bindings, ctx: ExecutionContext): Promise<Response> {
    const target = httpsRedirect(request.url, import.meta.env.DEV);
    if (target) return new Response(null, {status:308,headers:{Location:target}});
    // Worker-first routing ensures even static files receive HTTPS enforcement.
    let response: Response | undefined;
    if (env.ASSETS && (request.method === 'GET' || request.method === 'HEAD')) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) response = asset;
    }
    response ??= await handler.fetch(request, env, ctx);
    if (!response) return new Response("Unavailable", {status:503});
    const secured = new Response(response.body, response);
    if (new URL(request.url).protocol === 'https:') {
      // Defense in depth for future embedded resources, without HSTS.
      const existing = secured.headers.get('Content-Security-Policy');
      secured.headers.set('Content-Security-Policy', existing ? existing+'; upgrade-insecure-requests' : 'upgrade-insecure-requests');
    }
    return secured;
  },
};

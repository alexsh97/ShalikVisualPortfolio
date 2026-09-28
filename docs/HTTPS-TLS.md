> Historical audit of the previous Sites deployment. For the current Next.js/Netlify setup, see [NETLIFY-SETUP.md](../NETLIFY-SETUP.md). Production Netlify HTTPS must be verified after deployment.

# HTTPS and TLS audit — Shalik Visual

Audit date: 2026-09-26 (Europe/Warsaw).

## Hosting and observed state

This application is hosted through **Sites**, using a **Cloudflare Worker with static assets**. It is not a self-managed Nginx/Apache server. The Sites project is `appgprj_6aa2d417e2948191a517e96444975210`. No custom domains are attached according to the Sites API. Its access policy is owner-private; do not change that to test HTTPS.

The hosting API currently reports no live publication URL. Independent probes with normal certificate verification show:

- The originally assigned `https://shalik-visual.epic-heron-2003.chatgpt.site/` responds with 307 to `https://shalik-visual.shalik-visual.chatgpt.site/`.
- HTTPS at the newer hostname has a trusted certificate and responds with the Sites authentication gate (401), not a verified application response.
- HTTP at the newer hostname returns 302 to HTTPS. `/pl/offer/photography?audit=1` retains its path and query.
- No Strict-Transport-Security header was observed in these responses. No HSTS was enabled by this change.

These checks do **not** prove that the latest application version is deployed, that every protected page works, or that all edge TLS settings meet a particular standard. The edge's existing 302 is platform-controlled; the application adds a method-preserving 308 for HTTP that reaches its Worker.

## Application enforcement

- `worker.ts` runs before static assets (`assets.run_worker_first: true` in `vite.config.ts`). HTTP requests are redirected with 308 before serving pages, fonts, video, JavaScript or API handlers. The redirect retains path/query and targets the explicit HTTPS origin in `lib/https-policy.ts`.
- A local HTTP exemption applies only in a development build for exact loopback hostnames. Production has no localhost exception.
- The Worker uses the actual Request URL, not client-supplied `X-Forwarded-Proto`, `Forwarded`, or `X-Forwarded-Host`. Sites must preserve the original scheme when forwarding to the Worker. Verify this after publishing to detect redirect loops.
- HTTPS responses add CSP `upgrade-insecure-requests` as defense in depth. It is not a certificate configuration or a replacement for source review.
- The root metadata generates route-specific HTTPS canonicals and English/Polish alternates for the 22 known public pages. Tracking parameters are excluded. Middleware overwrites the path header used for this computation. Unknown routes and APIs get no canonical.
- Canonicals never trust Host or forwarded host headers. Update the one configured origin only after a new domain is active and verified.
- Images, scripts, fonts, videos and internal links use relative paths. The Resend server call uses HTTPS. The SVG `http://www.w3.org/2000/svg` namespace and a URL in the font licence are identifiers/documentation, not mixed-content network loads; leave them intact.
- A redirect cannot undo a visitor submitting private information over HTTP. Serve and use the form over HTTPS; TLS at the edge must precede submission.

## Certificates on the actual platform

### Sites-provided hostname

TLS terminates on the platform-managed Cloudflare edge. Certificate provisioning, private keys and renewal are managed by the platform. Do **not** add Certbot, PEM files, renewal cron jobs or an origin certificate to this repository. The Worker has no TLS listener to configure. The available Sites tools do not expose certificate issuance/renewal controls for `chatgpt.site` hostnames or zone-level TLS settings; use Sites support for failures or minimum-protocol/cipher configuration.

### Adding a custom domain later

No domain has been added by this audit. Do not assume `shalik.pl` is connected just because it is used for email.

1. Attach the desired hostname to this existing Site through Sites custom-domain management.
2. Create exactly the DNS routing and validation records returned by Sites: the supplied CNAME for a subdomain, or the supplied apex targets where applicable. Do not guess these values or substitute a Worker URL.
3. Keep the returned certificate/domain validation records in place. Wait until both the domain status and `ssl_status` are active; inspect `last_error` if either fails. Check restrictive CAA records if issuance is blocked.
4. Cloudflare for SaaS supports automatic renewal for validated custom hostnames. Follow the validation method Sites actually supplies. If DNS validation requires renewed tokens, arrange provider-supported delegated DCV or follow the platform's renewal instructions; do not assume a one-time TXT record guarantees renewal forever.
5. Verify certificate trust, hostname/SAN, validity and chain without `curl -k`, and test both HTTP and HTTPS. Only then update `SITE_ORIGIN`, rebuild and publish. Verify old-host redirects before retiring any old hostname.
6. If you independently manage the domain's Cloudflare zone, “Always Use HTTPS” can enforce edge redirects once HTTPS is working. A Sites-managed zone requires its operator to make that setting. Do not use Flexible SSL or install an origin certificate for this Worker-only deployment.

Certificate renewal is automatic platform work, but operational monitoring is still needed: check domain/certificate state after DNS changes and alert on expiry or validation failure. No recurring monitor or external DNS change was created by this audit.

Primary documentation:
- [Cloudflare custom-domain certificate lifecycle](https://developers.cloudflare.com/use-cases/saas/custom-domains/)
- [Custom hostname renewal and validation requirements](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/)
- [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/)
- [Worker-first static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)

## Verification before considering HSTS

**HSTS remains disabled in application code. Do not enable it, `includeSubDomains`, or preload until all checks below pass.** No production setting can be certified solely by a local test.

- Successful private deployment, followed by authenticated verification of every English and Polish page.
- HTTP redirects for `/`, `/pl`, service routes, `/api/contact`, video, fonts and generated assets; path/query preserved, no loops or HTTP downgrade. Do not send real enquiries over HTTP for testing.
- Trusted HTTPS chain and matching SAN, correct validity dates, TLS 1.2/1.3 behavior and rejection of legacy TLS, as supported/configured by the platform.
- Exactly one correct HTTPS canonical per public page and HTTPS hreflang links; no localhost, HTTP, unknown host or tracking query canonicals.
- Video, font, image and script requests work over HTTPS; browser network/console shows no mixed content. Check actual form submission only after mail delivery is configured.
- Every intended hostname has working certificates and automated renewal. A parent domain's existing HSTS policy can affect subdomains independently of this app.

Local checks: `node tests/https-policy.test.mjs`, `node tests/contact.test.mjs`, TypeScript checking and a production build. Inspect `dist/server/wrangler.json` for `assets.run_worker_first: true` after each build.

Example live probes (no verification bypass):

```sh
curl -I 'http://shalik-visual.shalik-visual.chatgpt.site/pl/offer/photography?audit=1'
curl -I 'https://shalik-visual.shalik-visual.chatgpt.site/pl/offer/photography'
openssl s_client -connect shalik-visual.shalik-visual.chatgpt.site:443 -servername shalik-visual.shalik-visual.chatgpt.site -verify_return_error </dev/null
```

Authentication-gate responses establish only edge transport behavior. They do not complete application verification.

## Final live verification results

The private deployment subsequently **succeeded** at `https://shalik-visual.shalik-visual.chatgpt.site` during this audit. The initial “no live URL” observation above describes the state before this deployment.

- Owner-authenticated GET checks passed for all **22** English/Polish public pages: HTTP 200, exactly one correct HTTPS canonical, CSP `upgrade-insecure-requests`, no HSTS header, and no HTTP `src`/`href` references in the rendered HTML.
- Authenticated HTTPS requests passed for the logo, Figtree font, full showreel and contact API. No test enquiry was sent.
- Edge HTTP redirects passed for the root with a query, a Polish service page with a query, the API, logo, font and video. Each returned **302** to the matching HTTPS URL without losing the path/query. Platform edge redirects take precedence over the Worker's fallback 308.
- Static responses did not include the Worker's CSP header despite worker-first configuration in the packaged build. The hosting layer serves those resources separately. Their HTTP redirects and HTTPS delivery were verified directly; the document's CSP governs embedded resource upgrades. Do not rely on Worker headers alone for platform-served static assets.
- Certificate-validated handshakes succeeded with TLS 1.2 (`ECDHE-ECDSA-AES128-GCM-SHA256`) and TLS 1.3 (`TLS_AES_256_GCM_SHA384`). Certificate SAN: `*.shalik-visual.chatgpt.site`; expiry: **2026-12-09 16:25:17 UTC**. TLS 1.0 and 1.1 attempts were rejected with protocol-version alerts.
- Tests for redirect destinations, query preservation, loopback exemption, unknown canonical paths, all bilingual canonical combinations, contact behavior and TypeScript checking passed. The production build completed.

Remaining scope limits: no custom hostname is attached; renewal cannot be demonstrated until the provider performs it; no exhaustive browser waterfall/third-party runtime-resource audit or origin-wide cipher suite scan was performed. HSTS remains disabled as requested. Keep it disabled until the operational checks above are completed and reviewed.

# Deploy Shalik Visual to Netlify

This repository now runs standard Next.js, not the previous Cloudflare/Vinext runtime. The existing Sites deployment is unchanged; do not publish this migrated branch with the old Sites workflow.

## Connect the repository

1. In Netlify, import an existing project from GitHub and select `alexsh97/ShalikVisualPortfolio`.
2. Select branch `main`. The committed `netlify.toml` sets `pnpm run build` and publish directory `.next`. Netlify automatically installs its Next.js adapter; do not deploy `public` or `dist` as a static site.
3. Use Node 22 and the package-manager version pinned in package.json.
4. Deploy. Future pushes to main trigger builds once continuous deployment is connected.

## Environment variables

Set these in Netlify project configuration, never in Git:

- `SITE_URL`: optional HTTPS production origin, e.g. your verified custom domain. Without it the build uses Netlify's `URL`. Rebuild after changing the primary domain. Local builds use `https://localhost:3000` only as a metadata fallback.
- `RESEND_API_KEY`: server-side Resend key, available to Functions.
- `CONTACT_FROM_EMAIL`: sender address on a domain verified in Resend, available to Functions.

The current contact handler sends to `kontakt@shalik.pl`. No email credentials have been transferred from the previous host or validated against Resend during this migration. Without configuration the form reports unavailability and offers its email fallback. Test real delivery after configuration.

## HTTPS and certificates

Netlify manages TLS at its edge. Add the custom hostname in Domain management, point DNS at Netlify and use Netlify-managed Let's Encrypt certificates for automatic provisioning and renewal. Keep DNS pointed correctly; manually uploaded certificates require manual renewal. Enable/confirm HTTPS enforcement in the project's domain HTTPS settings.

Before sharing the production URL, verify HTTP redirects to HTTPS on `/`, `/pl`, `/api/contact` and `/media/showreel.mp4`, valid certificates, videos, images, form submission and HTTPS canonicals using the final hostname. Do not enable HSTS until these checks pass. No HSTS header is added by this app. The Next.js configuration adds `upgrade-insecure-requests` as defense against mixed content.

## Local verification

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm run build
pnpm start
```

Migration validation: production build and TypeScript passed; all 24 bilingual pages returned HTTP 200 with correct canonical paths and document language; contact configuration endpoint and mocked email tests passed. No Netlify deployment has been made or verified yet.

The second co-founder profile remains a draft awaiting his name.

Official references:
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/

# Contact form delivery

The English and Polish contact sections share one form. Submissions are sent server-side to kontakt@shalik.pl using Resend. The visitor's address is Reply-To; the destination cannot be changed by the browser.

Set these server-only runtime variables after configuring a sending domain in Resend:

- RESEND_API_KEY: a Resend sending API key (secret)
- CONTACT_FROM_EMAIL: a sender on your verified domain, for example Shalik Visual <website@shalik.pl>

For local preview, place the values in an ignored `.dev.vars` file and restart the preview. Set the same variables in the Sites runtime before publishing. Never put the API key in public/client code or commit it.

Until configured, the form explicitly offers an email draft and does not claim a message has been sent. Failed online submissions preserve the input and offer the same fallback. Successful submission means the provider accepted the email; inbox delivery has not been verified.

Validation is repeated on the server. The endpoint rejects foreign origins, oversized bodies, malformed values and filled honeypot fields. A submission identifier prevents duplicate provider sends on retry. Add edge rate limiting / managed bot protection before exposing a high-traffic public endpoint.

Provider documentation: https://resend.com/docs/api-reference/emails/send-email

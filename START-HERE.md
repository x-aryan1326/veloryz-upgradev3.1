# VELORYZ Studio — final source release

This is the complete current source, including the public website, protected
/admin workspace, animated broadcasts, pinned messages, in-page ads, popups,
AI integration, transparent studio-guide fallback, booking, payments, media,
original imagery and video, and database migrations.

Before uploading to GitHub or Netlify, read `HOSTING-AND-GITHUB.md`.
The complete build scripts are included; the backend currently targets Sites/Cloudflare.

For missing-file build errors, follow `COMPLETE-UPLOAD.md` and run
`node verify-project.mjs` in the extracted project folder.

## Run locally

Install Node.js 22.13+ and pnpm 11.25.0. Extract this ZIP and open its project
folder in your editor. In that folder:

```sh
pnpm install --frozen-lockfile
pnpm exec wrangler d1 migrations apply DB --local --config local-database.jsonc --persist-to .wrangler/state
pnpm dev
```

Visit http://localhost:5173. This is a server-backed application, not a single
HTML file. The local database and uploaded media are separate from production.
Create an ignored `.dev.vars` file for local server variables, using the names
in `.env.example`. Development sign-in uses the synthetic identity
`seedy@sites.test`; set ADMIN_EMAIL to that value only in local development.
Visit /admin to sign in. There is no public Admin CMS link.

For the optional second password gate, configure ADMIN_PASSWORD_HASH as
`iterations:salt-hex:hash-hex` with PBKDF2-SHA256, 100000 iterations, a random
salt and a 32-byte result, and a random ADMIN_SESSION_SECRET. See
`lib/studio-platform.mjs`. Real passwords and keys are never in this archive.

## Broadcasts and ads

Open Admin → Broadcasts & ads. Create an announcement, advertisement or offer.
Choose Popup + optional ribbon, Inside pages, or Pinned above site navigation.
Add your logo and optional logo destination, image/video, two CTA links, theme,
motion direction, dates, priority and popup frequency. Save draft, open Preview
draft, then Publish site. New campaigns are paused until explicitly enabled.

Pinned messages appear across public pages, with the highest-priority active
one at the top. Full text opens in Details. Dismissal lasts the browser session
when allowed. Popup frequency can be every refresh, once per session or once
per day. Popup delay is 1–5 seconds. All animation respects Motion settings.
These are studio-managed placements, not a paid ad-network integration.

## Gemini advisers: connect your own key

Open /admin, sign in as the owner and select Platform pages. Choose Gemini,
enter your Google Gemini API key in the protected password field, then click
Save connection & test reply. Connection settings apply immediately, separately
from CMS drafts. The field clears; the key is encrypted server-side and never
returned to the browser or included in CMS exports or this ZIP. Keep the server
ADMIN_SESSION_SECRET stable. If it changes, enter the Gemini key again.

The default model is gemini-3.5-flash-lite; the model field can be changed to a
model available in your Google project. Alternatively, use GEMINI_API_KEY and
GEMINI_MODEL server runtime variables. AI_PROVIDER defaults to gemini. OpenAI
is an explicit optional provider using an existing OPENAI_API_KEY; the app never
automatically switches to it. No provider key is supplied in this archive.

The live Gemini connection still needs the owner's actual key. A successful
Save connection & test reply verifies credentials, quota, model access and a
real reply. If unavailable, chat gives clearly labelled Studio guide responses
from published content and offers WhatsApp support. This fallback is not live AI.

Nikhil focuses on scope and budget; Shivam on development and APIs; Ayush on
design; Jagriti on brand and messaging; Mahaprata on product planning. Each uses
its own name, greeting and short conversational style, with recent chat history
and published studio details. These are configured AI personas, not fine-tuned
Google models or live human staff. They truthfully identify themselves when
asked. Transcripts are not stored in the studio database.

## Source map

- public/app.js: website, routing, mailbox, campaigns and pinned messages.
- public/campaigns.js + campaigns.css: shared campaign visuals and motion.
- public/admin.js + admin-platform.js: protected owner interface.
- public/platform.js: design catalogue, planner, booking and chat UI.
- lib/cms-api.mjs: validation, drafts, publication, history, uploads and APIs.
- lib/studio-platform.mjs: live AI, diagnostics, password and payment APIs.
- lib/adviser-personas.mjs: individual adviser voices and studio prompt context.
- lib/ai-settings.mjs: protected provider settings and encrypted key storage.
- public/admin-ai.js: owner-only Gemini connection form.
- lib/adviser-guide.mjs: transparent fallback using published studio content.
- public/motion.js + motion-system.css: shared animation preferences.
- db/ + drizzle/: database schema and migrations.
- public/assets/: images, fonts, original film and third-party attribution.
- README.md: full feature documentation and deployment requirements.

## Verification

CMS, enquiry, platform, Gemini, broadcast, motion and production security tests
pass, along with TypeScript validation and the production build. The protected
provider form and selected Shivam chat greeting were reviewed in the browser.
Provider request/response, history, key encryption, error handling and fallback
are covered by tests with a mocked provider boundary. A real Gemini reply must
still be checked with the owner’s actual key.

```sh
node tools/test-cms.mjs
node tools/test-enquiries.mjs
node tools/test-platform.mjs
node tools/test-gemini.mjs
node tools/test-broadcasts.mjs
node tools/test-motion.mjs
node tools/test-production.mjs
pnpm exec tsc --noEmit
pnpm build
```

## Deployment and exclusions

The source targets Sites hosting with D1 DB, R2 BUCKET and trusted Sites owner
identity headers. For a different host, configure equivalent resources and
trusted authentication; never trust client-supplied identity headers.
.openai/hosting.json preserves the existing Site identity but is not a hosting
credential. Keep all asset/font licence files.

This is a source export, not a production data backup. Live CMS edits, uploads,
enquiries, payment records, API secrets, passwords, dependencies, generated
builds and local runtime state are excluded. Source hashes are recorded in
SOURCE-MANIFEST.json.

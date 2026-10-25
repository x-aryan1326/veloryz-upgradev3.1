# VELORYZ Studio

An editorial studio website with a persistent owner CMS, original studio film, and WhatsApp +91 9955326740.

## Pages and interactions

Home, Work, Services, Studio, VELORI, Contact, team directory `/teamjob/`, and individual `/teamjob/<profile>/` pages. Three clearly labelled, fictional studio concepts live under `/concepts/aurel/`, `/concepts/orbit/`, and `/concepts/forme/`. Their material selector, focus timer, finish controls and demo basket work locally; no purchases or payments are taken.

A tiny footer mailbox opens an editable founder letter with coffee and 404 animation. Team profiles include editable specialisations, photos, project associations and experience highlights. Sample experience is clearly labelled illustrative and does not assert false employers or credentials.

## Studio Control

Visit `/admin`. Dispatch-owned ChatGPT sign-in authenticates the owner. The secret runtime `ADMIN_EMAIL` bootstraps the owner once, then authorization uses the stable Site-specific user ID. Every protected API request checks authorization on the server. A server-side password gate follows owner sign-in. PBKDF2 SHA-256 validates the configured password hash, with a signed HttpOnly/Secure/SameSite cookie valid for up to eight hours. The signature is bound to the authenticated owner ID and password hash. Five unlock attempts per 15-minute window are allowed per owner. Sign-out clears the unlock cookie. There are no frontend admin passwords or provider credentials.

The dashboard edits projects, media, publication visibility, featured work and ordering, project films, descriptions, website copy, founder content, services, team profiles, the founder letter, business contacts, colour, five logo slots, the studio film and campaigns.

Save draft, open Preview draft, then Publish site. D1 stores separate draft/live documents. Version checks reject stale edits. Publication and revision history are atomic. Previous publications, including the initial content, can be restored to draft. Export/import and discard-draft controls are included.

Published content is embedded in each page response. Existing visitors check for changes every 20 seconds and on focus, without interrupting an edited form or open dialog.

## Offers and announcements

Enabled campaigns respect their schedules. The highest-priority campaign opens approximately 4.7 seconds into each fresh visit and returns on full refresh. A persistent animated bottom ribbon rotates multiple campaigns and can be minimised. Offers take precedence over the consultation invitation. No promotional campaign is invented or enabled by default.

## Media and contacts

Images and videos use R2, with metadata in D1. Supported images: PNG, JPG, WebP, GIF and AVIF up to 8 MB. Supported films: MP4 and WebM up to 25 MB. MIME types and file signatures are checked. Archiving hides library entries while retaining published/historical links. Media delivery supports video ranges.

Consultation forms save validated requests in D1. Admin → Enquiry inbox supports private notes, follow-up status, and confirmed time reservations. A partial unique database index prevents confirming two requests for the same slot. Email and WhatsApp replies open as drafts for the owner to send; automatic provider delivery is not configured. Public submissions require consent, reject cross-origin requests and spam traps, enforce size/date/service validation, apply email/network rate limits, and deduplicate retries by request ID and payload fingerprint. Inbox changes use optimistic concurrency and remain separate from CMS draft publication.

## Source and verification

The original static Site was migrated to the supported Vinext starter, preserving identity and audience. Public UI: `public/`. API: `lib/cms-api.mjs`. Page responses: `lib/page-handler.ts`. Initial content: `lib/defaults.json`. Database schema: `db/schema.ts`; migrations: `drizzle/`. `dist/` is generated.

Bindings are D1 `DB` and R2 `BUCKET`; Sites applies hosted migrations before deployment. Runtime secrets and local state stay out of Git. Dev-only visual previews under `/_studio_preview/` cannot perform admin writes and are excluded from production routes.

Checks: `node tools/test-cms.mjs`, JavaScript syntax checks, `node node_modules/typescript/bin/tsc --noEmit`, browser QA and the Sites build helper. Integration checks cover owner authorization, private drafts, shared publication, concurrency, campaign schedules, injection/origin protections, uploads, asset archive and version restore.

The original silent 16-second 1280x720 film can be regenerated with `python3 tools/create-film.py`. Font licensing: `public/assets/FONT-LICENSE.txt`.

### Studio render artwork

Nine original CGI-style images live in `public/assets/renders/`, each with a full and mobile WebP. `tools/visual-briefs.json` records the exact generation prompts, output paths, and visual direction. The complete image set is approximately 1.2 MB.

`public/visual-upgrade.css` adds gentle image drift, floating accents, pointer depth, and dimensional identity cards. An IntersectionObserver pauses image drift outside the viewport. Motion pause and reduced-motion preferences disable the effects. Images have descriptive alternatives and explicit dimensions; the hero uses high fetch priority while project images load lazily.

Project cover uploads and videos remain authoritative over the built-in artwork. The hero logo override also remains available in Admin. The AUREL material directions, ORBIT focus controls, and FORME finish selector and demo basket continue to work with the new imagery.

### Production checks

The public response includes per-route metadata, canonical URLs, social image previews, a sitemap, and a robots file. Unknown profiles return HTTP 404. Production HTML uses a nonce-based script policy, resource restrictions, and privacy headers; admin pages are marked noindex. `/api/health` checks database access and storage configuration without exposing configuration values.

Run `node tools/test-cms.mjs`, `node tools/test-enquiries.mjs`, `node tools/test-production.mjs`, and `node tools/test-platform.mjs` before deployment. Migration `0001_daffy_caretaker.sql` adds enquiry storage and booking/rate-limit indexes. Keep the existing hosting audience unless the owner explicitly chooses public access. Automatic email/WhatsApp notifications require separately configured providers; owner reply drafts work without those providers.

### Expanded studio platform

`/design/` (also `/designs/`) provides four imported reference directions with category filters, search, detailed previews, original demo/source links, starting estimates and scope. `/pricing/` uses the same CMS catalogue. `/create/` generates a project brief and illustrative estimate from purpose, page count, features and timeline preference; the brief can be downloaded locally and carried into `/book/`. The planner stays in memory for the current visit and contains no contact information. Booking uses the existing durable enquiry inbox.

`/veloryz/` connects the platform pages. `/developers/` explains integration work and can call the read-only health/platform endpoints. Footer links expose all platform pages and Studio CMS. New admin sections edit catalogue entries, starting prices, preview media, creator credits and key page copy. Older saved CMS records receive new default fields without overwriting existing content.

Design reference previews come from codewithsadee's Gamics, Anon, Portfolio and Wren repositories. Their source READMEs are retained under `public/assets/designs/`; Wren's MIT license is included. Credits and usage notes appear in every detail view. Prices are VELORYZ adaptation service estimates, not a claim to authorship or a sale of third-party artwork. Replace example identities, imagery and marks with appropriate client assets for delivery.

### AI advisers

Nikhil, Shivam, Ayush, Jagriti and Mahaprata are clearly labelled AI personas with illustrated avatars, not claims that human staff are present. A random persona appears in the animated launcher. Visitors can select another persona, ask short questions and use a WhatsApp draft for handoff. Complex/repeated/unresolved questions recommend handoff. Recent messages are included in that draft only after the visitor chooses to open it; nothing is automatically sent.

`POST /api/adviser` uses OpenAI Responses with `store:false`, limited message history, short output, a server-owned prompt/model and fixed provider URL. Network rate limiting, Origin checks, input validation and timeouts bound abuse. It does not store chat transcripts in D1. The OpenAI provider may process submitted messages under its own policies. `OPENAI_API_KEY` must be provisioned through the OpenAI Developers plugin before live replies work; until then the UI reports this honestly and offers direct studio contact. `OPENAI_MODEL` optionally changes the default `gpt-4.1-mini`. Provider errors remain generic and never disclose credentials.

### Payment requests

Admin → Payment requests creates individual requests linked to real enquiry references. The owner supplies an INR amount, milestone and checkout link from their own Stripe, Razorpay or PayPal dashboard. Supported provider hosts are validated server-side, arbitrary redirects are rejected, creation retries are idempotent and status edits use optimistic versions. The link's provider amount/merchant/currency must match the agreed request; the Site cannot verify those externally.

`/payments/?request=<opaque-token>` shows only the enquiry reference, milestone, amount, status and hosted checkout link. Share these bearer links only with the intended customer. There are no invented merchant accounts, UPI IDs or payment-success events. Provider checkout determines available methods. Payment status changes only after the owner explicitly confirms receipt with their provider; no webhook reconciliation is configured. Requests can be cancelled. No card or banking credentials are collected by the Site.

Migration `0002_new_cardiac.sql` adds payment requests and rate-limit counters. Secrets: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, optional `OPENAI_API_KEY` and `OPENAI_MODEL`. The health endpoint checks all three operational tables and storage bindings. Local visual/responsive previews cannot authorize production admin actions and return 404 outside development.

### Motion and visual finish

The shared `public/motion.js` runtime owns Automatic, Full, Reduced and Pause modes across the website and admin. Automatic respects `prefers-reduced-motion`; an explicit Full selection overrides the device preference through a single CSS policy in `motion-system.css`. Preferences persist locally, while blocked storage remains a supported in-memory fallback. Visibility/BFCache events restore motion. Native dialog controls support keyboard use.

Graphics run by default; IntersectionObserver only pauses offscreen artwork as an optimisation. Missing observer support cannot hide content or leave artwork permanently paused. Reveal content is visible by default and animates on entry when supported. Video playback remains optional and has manual controls when browser autoplay is unavailable. No animation library is required.

`studio-finish.css` applies the shared editorial finish across the public pages and owner workspace. The hero combines original studio renders with continuous orbital linework, floating interface studies and motion waveforms. Compact work images, design references, page glyphs, team details, process marks, CTA graphics and footer accents share the same preference controls.

First-party CSS/JS resource URLs receive the `studio-motion-04` release query to prevent stale browser caches mixing UI releases. Security headers and nonce coverage remain intact. Development-only `/_studio_preview/production` renders under the real production CSP for browser QA, and is unavailable in production. Run `node tools/test-motion.mjs` alongside the existing CMS, enquiry, platform and production checks.


### Broadcasts, advertisements and pinned messages

Admin → Broadcasts & ads supports offers, announcements and advertisements.
Choose Popup + ribbon, Inside pages, or Pinned above navigation. The highest
priority active pinned message stays above the navigation on every public route;
its detail dialog displays the full message. In-page advertisements have their
own designed card and remain clearly labelled. Logos can have a separate link.
Primary and secondary destinations, image/video artwork, three colour themes,
three animated artwork directions, priority and optional start/end dates are
editable. Uploads use the existing protected media library. Video has controls.

Popups support every refresh, once per session, or once per day, with a 1–5
second delay. Popups always remain keyboard-dismissible. Pins and in-page cards
can optionally be dismissed; that choice lasts the browser session and resets
when the campaign content changes. Frequency/dismissal storage failures fall
back safely. All motion obeys the shared Automatic / Full / Reduced / Pause
controls. Scheduled changes reconcile without refreshing. Campaigns use the
existing draft, preview, publish, concurrency and revision-history workflow.
No paid ad network or tracking pixels are added. Public admin/CMS links were
removed; the protected owner workspace remains at `/admin`.

### Adviser reliability and connection diagnostics

The live OpenAI connection is tried when configured. Missing credentials,
billing/credit exhaustion, provider errors and timeouts use the transparent
`lib/adviser-guide.mjs` backup. Every backup reply is labelled **Studio guide**,
not a live AI response. It answers using published catalogue prices, scope,
services, contact details and booking information; it does not invent offers,
bookings or payment confirmations. Live replies are labelled **AI**. Short
provider-failure backoff avoids repeatedly calling a known unavailable service.
No conversation transcripts are persisted.

Admin → Platform pages → Test live AI reply performs a protected, rate-limited
provider check and classifies billing, authentication, access, rate-limit and
network failures without disclosing secrets. Key presence alone no longer
claims the live model is connected. API billing/credits are separate from a
ChatGPT subscription. Once the provider account can serve requests, live AI
resumes automatically after backoff or the owner can run the connection test.
The guide is useful studio information, not a replacement for open-ended AI.

Additional check: `node tools/test-broadcasts.mjs`. UI asset release:
`studio-broadcasts-05`. Downloaded source must exclude real environment files,
API keys, owner credentials, runtime data and customer records.


### Gemini and adviser personalities

Gemini is now the default live reply provider, using `gemini-3.5-flash-lite`.
The owner can connect an existing key at `/admin#/platform` using **Save
connection & test reply**. An ignored runtime `GEMINI_API_KEY` or
`GOOGLE_API_KEY` is also supported; `GEMINI_MODEL` chooses the runtime model.
`AI_PROVIDER=openai` explicitly selects the existing OpenAI adapter. Guide-only
mode performs no model call. Selecting Gemini never silently spends against
an OpenAI key when Google is unavailable.

Migration `0003_special_inhumans.sql` adds private `studio_ai_settings`, separate
from CMS documents, exports and publication history. Owner-entered Gemini keys
are encrypted with AES-256-GCM, using a context-derived key from the existing
server `ADMIN_SESSION_SECRET` and a fresh 96-bit IV per save. A key is never
returned to the owner browser, logged, published or exported. The form is
protected by owner identity, password unlock, Origin checks, body limits, rate
limits and optimistic versions. Blank key input retains the saved key. Key
rotation requires re-entering the value; if the server encryption secret changes,
re-enter the Gemini key. Runtime secret storage remains available as an alternative.
Provider settings take effect immediately, independently of CMS draft publication.

The five disclosed virtual advisers have separate role-specific voice guides,
example conversations and greetings in `lib/adviser-personas.mjs`. Shivam
focuses on development and practical implementation; Ayush on visual direction;
Nikhil on scope and budgets; Jagriti on messaging and audience; Mahaprata on
product priorities and launch. Each reply receives the selected persona and
current published studio facts, prices and active offers. This is prompt and
context configuration, not a claim that Google's base model was fine-tuned.

Replies favour 1–3 natural sentences, remember recent conversation, avoid
repeated introductions and formulaic disclaimers, and use English or Latin-script
Hinglish. A small AI persona label remains visible; advisers must not impersonate
actual human employees or invent personal experiences. Provider errors still
produce separately labelled Studio guide replies with WhatsApp handoff.

Google requests use the server-side `generateContent` REST API, a header-based
API key, a fixed Google host, validated model identifiers, bounded history,
short output, a timeout, normal safety settings and exclusion of thought parts.
Only recent chat is sent; transcripts are not persisted in the studio database.
Google's own retention/data-use policies depend on the project's tier.

Checks: `node tools/test-gemini.mjs`, plus the existing suites and production
build. Tests cover encryption and tamper rejection, owner-only no-echo settings,
CSRF/concurrency, Google payload/history mapping, persona separation, provider
quota failures and recovery. Real model access is verified only after the owner
connects their own key and the live response test passes. UI asset release:
`studio-gemini-06`.

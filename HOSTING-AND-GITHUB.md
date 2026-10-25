# Hosting and GitHub upload — read before deployment

This folder is the complete VELORYZ Studio SOURCE project. It contains the
build scripts, public site, admin workspace, Gemini integration, assets,
configuration examples and four database migrations. It is not a static
Netlify drag-and-drop deployment bundle.

## Fix the missing scripts/run-framework.mjs error

Upload ALL contents inside VELORYZ-Studio to the GitHub repository root.
package.json and scripts/ must be at the same level. Preserve folder paths;
do not upload just files selected from public/. Include the .openai folder.
Never upload your .env, .dev.vars, API keys or production database files.

Before committing, check:

```sh
git add .
git ls-files scripts/run-framework.mjs scripts/execution-profile.mjs scripts/sites-env.mjs scripts/tool-environment.mjs
```

All four paths should be printed. Commit and push your project changes, then
confirm GitHub contains scripts/run-framework.mjs next to the root package.json.
The restored scripts resolve that specific MODULE_NOT_FOUND error.

## Hosting compatibility

The current app uses Vinext/Vite with Cloudflare Workers, D1 (DB), R2 (BUCKET)
and trusted Sites identity. VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY do not
replace those bindings. This source has not been converted to Netlify.

Restoring the scripts alone does NOT make the complete admin, Gemini, storage
and booking backend run on Netlify. Do not replace the build command with
next build or publish only dist/client: that would not supply the backend.
For a Netlify deployment, adapt server routing, persistent storage and owner
authentication first, and remove the manually installed Next.js Runtime.
Do not add a Netlify SPA catch-all rewrite in place of the server routes.

The existing Sites deployment uses its own build pipeline and bindings. A
standalone Cloudflare deployment also requires provisioned resources, runtime
secrets and replacement trusted authentication; this ZIP does not supply them.

See START-HERE.md for local setup, Gemini connection and the source map.
API keys, dependencies, generated builds and production data are excluded.

# Complete repository upload

The errors for scripts/run-framework.mjs, .openai/hosting.json and
worker/index.ts show missing files in the source checkout. All three exist
in this ZIP. Restore the whole project rather than creating placeholders.

## Windows / GitHub Desktop

1. Clone your EXISTING veloryz-studio-update-2 repository with GitHub Desktop.
2. Use Repository > Show in Explorer to open the clone.
3. Extract this ZIP elsewhere. Open the inner VELORYZ-Studio folder.
4. Enable hidden items in File Explorer. Copy ALL contents of that folder
   into the clone beside package.json. Merge directories; retain .git.
   Include .openai, worker, scripts, app, lib, public, db and drizzle.
   Keep local secrets private; this archive contains none.
5. Open a terminal in the clone. Run:

   node verify-project.mjs

   It must report no missing files. It checks the source files and assets.
6. Review the Changes tab in GitHub Desktop. Commit the restored source.
7. After committing, run:

   node verify-project.mjs --tracked

   It must report no missing or untracked files. Push origin.
8. On GitHub, confirm worker/index.ts, .openai/hosting.json and
   scripts/run-framework.mjs appear at those exact paths on main.

If using the browser uploader, upload folders in batches of fewer than 100
files. Uploading a ZIP alone does not extract it into source files. The
repository should not be nested under another VELORYZ-Studio folder.

## Current hosting limit

The source is complete but is NOT a Netlify backend port. It imports
cloudflare:workers and requires D1, R2 and trusted Sites owner authentication.
A successful build alone does not supply these. The existing .next publish
path and Next.js Runtime setting do not deploy this Worker backend. A
Netlify migration must replace the runtime, storage and authentication;
adding VITE_SUPABASE_* variables does not perform that migration.

Do not create a dummy Worker entry or remove the Cloudflare plugin to hide
the error. The app relies on its real backend entry and runtime bindings.

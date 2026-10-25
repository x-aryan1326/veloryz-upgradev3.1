import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const root = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(resolve(root, 'SOURCE-MANIFEST.json'), 'utf8'));
const paths = Object.keys(manifest.files);
let tracked;
if (process.argv.includes('--tracked')) {
  try { tracked = new Set(execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0')); }
  catch { console.error('Run this check inside your cloned project repository.'); process.exit(2); }
}
const missing = [], untracked = [], changed = [];
for (const name of paths) {
  const full = resolve(root, name), rel = relative(root, full);
  if (rel.startsWith('..') || isAbsolute(rel)) throw Error('Invalid source manifest path.');
  if (!existsSync(full)) { missing.push(name); continue; }
  if (tracked && !tracked.has(name)) untracked.push(name);
  const digest = createHash('sha256').update(readFileSync(full)).digest('hex');
  if (digest !== manifest.files[name]) changed.push(name);
}
if (missing.length) console.error('MISSING FILES:\n' + missing.join('\n'));
if (untracked.length) console.error('FILES NOT ADDED TO GIT:\n' + untracked.join('\n'));
if (changed.length) console.log(changed.length + ' files differ from this export; review intentional edits.');
if (missing.length || untracked.length) { console.error('Project upload is incomplete. Restore or add all listed files.'); process.exitCode = 1; }
else console.log('Complete source verified: ' + paths.length + ' files present' + (tracked ? ' and tracked by Git.' : '.'));
console.log('This checks source completeness only. The current backend targets Sites/Cloudflare, not Netlify.');

import { readFileSync } from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
const js=ts.transpileModule(readFileSync('lib/https-policy.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {SITE_ORIGIN,httpsRedirect,canonicalAlternates}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
for(const p of ['/','/pl/offer/photography?ref=test','/media/showreel.mp4','/fonts/figtree-variable.ttf','/api/contact','/_next/static/test.js']){
 assert.equal(httpsRedirect('http://untrusted.example'+p),SITE_ORIGIN+p);
 assert.equal(httpsRedirect(SITE_ORIGIN+p),null);
}
assert.equal(httpsRedirect('http://localhost:3000/pl',true),null);
assert.equal(httpsRedirect('http://localhost:3000/pl'),SITE_ORIGIN+'/pl');
assert.equal(httpsRedirect('http://localhost.evil.test',true),SITE_ORIGIN+'/');
assert.equal(httpsRedirect('http://evil.test//another.evil/path'),SITE_ORIGIN+'//another.evil/path');
for(const path of ['/','/team','/studio','/partners',...['commercials','short-films','documentaries','podcasts-videocasts','photography','editing-post-production','event-films'].map(s=>'/offer/'+s)]){
 for(const p of [path,path==='/'?'/pl':'/pl'+path]){
  const alt=canonicalAlternates(p+'?tracking=1');assert.equal(alt.canonical,SITE_ORIGIN+p);
  for(const url of Object.values(alt.languages))assert.ok(url.startsWith(SITE_ORIGIN+'/'));
 }
}
assert.equal(canonicalAlternates('//evil.test'),undefined);
assert.equal(canonicalAlternates('/api/contact'),undefined);
assert.equal(canonicalAlternates('/missing'),undefined);
assert.ok(!readFileSync('worker.ts','utf8').includes('Strict-Transport-Security'));
console.log('HTTPS policy tests passed: all route types, local-only exception, host injection, 22 bilingual canonicals, no HSTS.');

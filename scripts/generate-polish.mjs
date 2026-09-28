// Generate editable Polish routes from the English templates and reviewed translations.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const dictionary=Object.fromEntries(fs.readFileSync('translations/pl.tsv','utf8').trimEnd().split('\n').map(l=>{const [k,v]=l.split('\t');return [k.trim(),v.trim()]}));
const missing=new Set();
function translate(value,visible=false){
 const key=value.trim();
 if(dictionary[key])return value.replace(key,dictionary[key]);
 if(visible && /[a-zA-Z]{3}/.test(key) && !/^(SHALIK VISUAL|STUDIO|Showreel|kontakt@)/.test(key))missing.add(key);
 return value;
}
const files=['page.tsx','shared.tsx','team/page.tsx','studio/page.tsx','partners/page.tsx','partners/names.ts','offer/services.ts','offer/[service]/page.tsx'];
for(const file of files){
 const source=fs.readFileSync('app/'+file,'utf8');
 const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 const edits=[];
 function visit(node){
  if(ts.isJsxText(node)){let v=translate(node.text,true);if(v!==node.text)edits.push([node.pos,node.end,v]);}
  else if(ts.isStringLiteral(node)){
   let v=translate(node.text);
   if(v===node.text && /^\/(?:#|offer\/|team$|studio$|partners$)/.test(v))v='/pl'+v;
   if(ts.isJsxAttribute(node.parent) && node.parent.name.getText(ast)==='href' && v==='/')v='/pl';
   if(file==='shared.tsx'&&v==='./language-switch')v='../language-switch';
   if(file==='shared.tsx'&&v==='./contact-form')v='../contact-form';
   if(v!==node.text)edits.push([node.getStart(ast),node.end,JSON.stringify(v)]);
  }
  ts.forEachChild(node,visit);
 }
 visit(ast);
 let out=source;for(const [start,end,text] of edits.sort((a,b)=>b[0]-a[0]))out=out.slice(0,start)+text+out.slice(end);
 out=out.replace('Portrait to be added for team member ${index + 1}','Portret członka zespołu ${index + 1} — wkrótce');
 if(file==='offer/services.ts')out=out.slice(0,out.indexOf('export function enquiry'))+`export function enquiry(name:string){return \`mailto:contact@shalikvisual.com?subject=\${encodeURIComponent(name+' — zapytanie o projekt')}&body=\${encodeURIComponent('Dzień dobry Shalik Visual,\\n\\nCel projektu:\\nOdbiorcy i kanały komunikacji:\\nMateriały końcowe:\\nPreferowany termin:\\nLokalizacja:\\nOrientacyjny budżet:\\n\\nDziękuję!')}\`}\n`;
 out=out.replaceAll('Studio%20booking%20enquiry','Zapytanie%20o%20studio').replaceAll('Studio%20photos%20and%20floor%20plan','Zdjecia%20i%20plan%20studia').replaceAll('Studio%20quote%20request','Wycena%20studia').replaceAll('Partnership%20enquiry','Zapytanie%20o%20wspolprace').replaceAll('Let%E2%80%99s%20collaborate','Porozmawiajmy%20o%20wspolpracy');
 const target='app/pl/'+file;fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,out);
}
console.log('Untranslated visible text:',[...missing]);

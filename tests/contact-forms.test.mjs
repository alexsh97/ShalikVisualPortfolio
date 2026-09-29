import {readFileSync} from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
async function module(file){const js=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))}
const {contactPayload}=await module('lib/contact-payload.ts');
const {handleContact}=await module('lib/contact.ts');
for(const locale of ['en','pl'])for(const kind of ['home','studio','casting','join']){
 const form=new FormData();form.set('name','Local test');form.set('email','local@example.com');form.set('message','A local-only verification of the enquiry form.');
 const fields=kind==='join'?[{name:'city',label:'City'},{name:'category',label:'Talent categories'},{name:'portfolio',label:'Portfolio'}]:[];
 fields.forEach(f=>form.set('detail-'+f.name,'Example '+f.name));
 // An autofilled website field must not be mistaken for the renamed spam trap.
 form.set('website','https://example.com');
 const payload=contactPayload(form,{subject:kind==='home'?undefined:kind,fields,locale,id:crypto.randomUUID()});
 assert.equal(payload.website,'');assert.ok(payload.message.includes('local-only'));
 let sent=0;
 const response=await handleContact(new Request('https://example.test/api/contact',{method:'POST',headers:{Origin:'https://example.test','Content-Type':'application/json'},body:JSON.stringify(payload)}),{RESEND_API_KEY:'mock',CONTACT_FROM_EMAIL:'Shalik <contact@example.test>'},async(_,opts)=>{
 sent++;const mail=JSON.parse(opts.body);assert.deepEqual(mail.to,['shalik.visual@gmail.com']);assert.equal(mail.reply_to,'local@example.com');assert.ok(mail.text.includes(payload.message));fields.forEach(f=>assert.ok(mail.text.includes('Example '+f.name)));return Response.json({id:'mock-id'});
 });assert.equal(response.status,200);assert.equal(sent,1);
 form.set('contact-fax','spam');assert.equal(contactPayload(form,{fields,locale,id:crypto.randomUUID()}).website,'spam');
}
console.log('All 8 form/language variants reach mocked Resend with correct recipient, reply-to and details. No real email sent.');

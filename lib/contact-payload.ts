export type EnquiryField = {name:string;label:string};
// Read only the submitted form, including values populated by browser autofill.
export function contactPayload(form:FormData, options:{subject?:string;fields:EnquiryField[];locale:string;id:string}){
 const read=(key:string)=>String(form.get(key)||'').trim();
 const details=options.fields.map(f=>`${f.label}: ${read('detail-'+f.name)||'—'}`).join('\n');
 const message=[options.subject,details,read('message')].filter(Boolean).join('\n\n');
 return {name:read('name'),email:read('email'),message,website:read('contact-fax'),locale:options.locale,id:options.id};
}

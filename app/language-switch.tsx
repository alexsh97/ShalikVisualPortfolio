'use client';
import { usePathname } from 'next/navigation';
export default function LanguageSwitch(){
 const pathname=usePathname() || '/';
 const polish=pathname==='/pl'||pathname.startsWith('/pl/');
 const englishPath=polish?(pathname.slice(3)||'/'):pathname;
 const polishPath=englishPath==='/'?'/pl':'/pl'+englishPath;
 return <div className="language-switch" role="group" aria-label={polish?'Język strony':'Website language'}><a href={englishPath} hrefLang="en" lang="en" aria-current={!polish?'page':undefined} onClick={e=>{e.currentTarget.href=englishPath+window.location.search+window.location.hash}}>EN</a><span aria-hidden="true">/</span><a href={polishPath} hrefLang="pl" lang="pl" aria-current={polish?'page':undefined} onClick={e=>{e.currentTarget.href=polishPath+window.location.search+window.location.hash}}>PL</a></div>
}

import type { Metadata } from 'next';
import './globals.css';
import { headers } from 'next/headers';
import { SITE_ORIGIN, canonicalAlternates } from '@/lib/https-policy';
const baseMetadata: Metadata = {title:'Shalik Visual — Independent Film Production',description:'Independent production house for commercials, films, documentaries, podcasts, photography and post-production. Explore our work and studio.'};
export async function generateMetadata():Promise<Metadata>{
 const path=(await headers()).get('x-site-pathname') || '/';
 return {...baseMetadata,metadataBase:new URL(SITE_ORIGIN),alternates:canonicalAlternates(path)};
}
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){const lang=(await headers()).get('x-site-language')==='pl'?'pl':'en';return <html lang={lang}><body id="top">{children}</body></html>}

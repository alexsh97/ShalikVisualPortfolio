import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Shalik Visual — Independent Film Production',description:'Independent production house for commercials, films, documentaries, podcasts, photography and post-production. Explore our work and studio.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body id="top">{children}</body></html>}

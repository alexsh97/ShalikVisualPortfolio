'use client';
import Image from 'next/image';
import {useRef,useState,useEffect} from 'react';
const photos=[
 ['session-1.jpg','Portrait on a vintage sofa','Portret na sofie vintage'],
 ['session-2.jpg','Portrait with a telephone by the book wall','Portret z telefonem przy ścianie z książek'],
 ['session-4.jpg','Creative floral composition against red curtains','Kreatywna kompozycja kwiatowa na tle czerwonych zasłon'],
 ['session-5.jpg','Cinematic portrait with candlelight','Filmowy portret w świetle świec'],
 ['piano.png','Vintage piano and decorative details','Pianino vintage i dekoracyjne detale'],
 ['session-6.jpg','Neon lighting and vintage records','Neonowe światło i płyty winylowe'],
 ['session-3.jpg','Portrait of two people in the library setting','Portret dwóch osób w bibliotecznej scenografii'],
 ['session-7.jpg','Studio portrait against a red backdrop','Portret studyjny na czerwonym tle'],
 ['session-8.jpg','Podcast microphones and recording equipment','Mikrofony i sprzęt do nagrywania podcastów'],
];
export default function StudioGallery({locale}:{locale:'en'|'pl'}){
 const [active,setActive]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const trigger=useRef<HTMLButtonElement|null>(null);
 const pl=locale==='pl';
 useEffect(()=>{if(active===null)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[active]);
 function close(){dialog.current?.close();setActive(null);trigger.current?.focus()}
 function open(index:number,button:HTMLButtonElement){trigger.current=button;setActive(index);dialog.current?.showModal()}
 return <><p className="studio-collage-hint">{pl?'Kliknij zdjęcie, aby zobaczyć je w całości.':'Select a photo to see the full image.'}</p><div className="studio-collage">{photos.map(([file,en,polish],index)=><button className={'studio-collage-tile tile-'+index} type="button" key={file} onClick={e=>open(index,e.currentTarget)} aria-label={(pl?'Powiększ: ':'Enlarge: ')+(pl?polish:en)}><Image src={'/media/studio/'+file} alt={pl?polish:en} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"/><span className="collage-expand" aria-hidden="true">↗</span></button>)}</div>
 <dialog ref={dialog} className="studio-lightbox" aria-label={pl?'Galeria Shalik Studio':'Shalik Studio gallery'} onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===e.currentTarget)close()}} onKeyDown={e=>{if(active===null)return;if(e.key==='ArrowRight'){e.preventDefault();setActive((active+1)%photos.length)}if(e.key==='ArrowLeft'){e.preventDefault();setActive((active+photos.length-1)%photos.length)}}}>
 <button type="button" className="lightbox-close" autoFocus onClick={close}>{pl?'Zamknij':'Close'} ×</button>
 {active!==null&&<div className="lightbox-content"><div className="lightbox-image"><Image src={'/media/studio/'+photos[active][0]} alt={photos[active][pl?2:1]} fill sizes="90vw" style={{objectFit:'contain'}}/></div><div className="lightbox-caption"><button type="button" onClick={()=>setActive((active+photos.length-1)%photos.length)} aria-label={pl?'Poprzednie zdjęcie':'Previous photo'}>←</button><p aria-live="polite">{active+1} / {photos.length} · {photos[active][pl?2:1]}</p><button type="button" onClick={()=>setActive((active+1)%photos.length)} aria-label={pl?'Następne zdjęcie':'Next photo'}>→</button></div></div>}
 </dialog></>;
}

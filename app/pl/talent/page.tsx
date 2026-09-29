import {Header,Footer} from '../shared';
import TalentContent from '@/components/talent-content';
export const metadata={title:"Baza twarzy i talentów — Shalik Visual",description:"Poznaj bazę ponad 130 aktorów, wokalistów, tancerzy, lektorów i statystów. Prześlij brief castingowy lub zapytaj o dołączenie."};
export default function Talent(){return <><Header/><main><TalentContent locale="pl"/></main><Footer/></>}

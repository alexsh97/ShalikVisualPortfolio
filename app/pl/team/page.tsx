import type { Metadata } from 'next';
import { Header, Contact, Footer } from '../shared';

export const metadata: Metadata = {
  title: "Nasz zespół — Shalik Visual",
  description: "Poznaj dziewięć kreatywnych osób tworzących Shalik Visual — niezależny zespół produkcji filmowej i wizualnej.",
};

const profiles = [
  "Reżyseria",
  "Zdjęcia filmowe",
  "Montaż",
  "Produkcja",
  "Charakteryzacja",
  "Zarządzanie projektami",
  "Fotografia",
  null,
  null,
];

export default function Team() {
  return (
    <>
      <Header />
      <main>
        <section className="section team-intro">
          <div className="section-head">
            <span className="eyebrow">SHALIK VISUAL / NASZ ZESPÓŁ</span>
            <span className="eyebrow">09 OSÓB. JEDNA WSPÓLNA WIZJA.</span>
          </div>
          <h1>NIEZALEŻNE UMYSŁY.<br /><em>WSPÓLNA WIZJA.</em></h1>
          <p>Jesteśmy zespołem dziewięciu kreatywnych osób. Łączymy różne umiejętności i perspektywy w każdej produkcji — od pierwszego pomysłu po ostatnie cięcie.</p>
        </section>
        <section className="section team-section" aria-labelledby="team-heading">
          <div className="section-head team-grid-heading">
            <h2 id="team-heading">Ludzie stojący za obrazem.</h2>
            <span className="eyebrow">POZNAJ SHALIK VISUAL</span>
          </div>
          <p className="team-draft-note">Poznaj nasz zespół. Kolejne portrety i sylwetki pojawią się wkrótce.</p>
          <div className="team-grid">
            {profiles.map((role, index) => (
              <article className="team-card" key={index}>
                {index === 0 ? <>
                  <div className="team-portrait team-portrait-photo"><img src="/media/oleksandr-shaforostov.png" alt="Oleksandr Shaforostov" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">01</span></div>
                  <div className="team-profile-heading"><h3>Oleksandr Shaforostov</h3><span className="team-role">Współzałożyciel · Operator filmowy · Fotograf</span></div>
                  <p>Oleksandr ma osiem lat doświadczenia w realizacji filmów, fotografii i montażu. Każdemu projektowi nadaje własny, rozpoznawalny styl. Łączy wiedzę inżynierską z artystycznym spojrzeniem, znajdując równowagę między techniczną precyzją a twórczą ekspresją.</p>
                </> : index === 1 ? <>
                  <div className="team-portrait team-portrait-photo"><img src="/media/cofounder-producer.png" alt="Współzałożyciel i producent" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">02</span></div>
                  <div className="team-profile-heading"><h3>Imię i nazwisko wkrótce</h3><span className="team-role">Współzałożyciel · Producent</span></div>
                  <p>Od ośmiu lat łączy ludzi i pomysły, zdobywając doświadczenie w zarządzaniu projektami, sprzedaży, organizacji wydarzeń i warsztatów. Otwarty na nowe perspektywy, z łatwością znajduje wspólny język z osobami z różnych środowisk. Buduje trwałe relacje i łączy właściwych ludzi, aby wspólnie realizować projekty.</p>
                </> : <>
                <div className="team-portrait" role="img" aria-label={`Portret członka zespołu ${index + 1} — wkrótce`}>
                  <span className="team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow">PORTRET WKRÓTCE</span>
                </div>
                <div className="team-profile-heading">
                  <h3>Imię i nazwisko wkrótce</h3>
                  <span className="team-role">{role ?? "Rola do potwierdzenia"}</span>
                </div>
                <p>Krótki opis wkrótce.</p>
                </>}
              </article>
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

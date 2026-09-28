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
                  <p>Oleksandr od ośmiu lat realizuje filmy, fotografuje i montuje. Łączy wiedzę inżynierską z artystycznym spojrzeniem, nadając różnorodnym projektom własny styl. Dba o techniczną precyzję i świadomie buduje obraz, w którym światło, kompozycja i rytm służą opowiadanej historii.</p>
                </> : index === 1 ? <>
                  <div className="team-portrait team-portrait-photo"><img src="/media/cofounder-producer.png" alt="Współzałożyciel i producent" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">02</span></div>
                  <div className="team-profile-heading"><h3>Imię i nazwisko wkrótce</h3><span className="team-role">Współzałożyciel · Producent</span></div>
                  <p>Od ośmiu lat zajmuje się zarządzaniem projektami, sprzedażą, organizacją wydarzeń i warsztatów. Otwarty na ludzi i nowe pomysły, łatwo znajduje wspólny język z osobami z różnych środowisk. Buduje trwałe relacje i łączy właściwych ludzi, aby zamieniać twórcze plany w realizacje.</p>
                </> : <>
                {index === 2 ? <div className="team-portrait team-portrait-photo"><img src="/media/aleksander-drozd.png" alt="Aleksander Drozd" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">03</span></div> : (
                <div className="team-portrait" role="img" aria-label={`Portret członka zespołu ${index + 1} — wkrótce`}>
                  <span className="team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow">PORTRET WKRÓTCE</span>
                </div>
                )}
                <div className="team-profile-heading">
                  <h3>{index === 2 ? 'Aleksander Drozd' : "Imię i nazwisko wkrótce"}</h3>
                  <span className="team-role">{index === 2 ? "Montażysta · Operator kamery · Fotograf · Współzałożyciel" : role ?? "Rola do potwierdzenia"}</span>
                </div>
                <p>{index === 2 ? "Aleksander to młody, ambitny operator i montażysta, który ukończył szkołę filmową na kierunku sztuki operatorsko-montażowej. Wnosi do zespołu świeże spojrzenie i kreatywne rozwiązania, nadając projektom energię, nowoczesny charakter oraz autorski, wyrazisty styl wizualny." : "Krótki opis wkrótce."}</p>
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

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
          <p className="team-draft-note">Przygotowujemy profile zespołu. Wkrótce dodamy imiona, portrety i krótkie opisy.</p>
          <div className="team-grid">
            {profiles.map((role, index) => (
              <article className="team-card" key={index}>
                <div className="team-portrait" role="img" aria-label={`Portret członka zespołu ${index + 1} — wkrótce`}>
                  <span className="team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow">PORTRET WKRÓTCE</span>
                </div>
                <div className="team-profile-heading">
                  <h3>Imię i nazwisko wkrótce</h3>
                  <span className="team-role">{role ?? "Rola do potwierdzenia"}</span>
                </div>
                <p>Krótki opis wkrótce.</p>
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

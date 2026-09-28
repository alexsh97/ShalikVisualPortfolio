import type { Metadata } from 'next';
import { Header, Contact, Footer } from '../shared';

export const metadata: Metadata = {
  title: 'Our Team — Shalik Visual',
  description: 'Meet the nine creatives behind Shalik Visual, an independent film and visual production team.',
};

const profiles = [
  'Director',
  'Camera operator',
  'Editor',
  'Producer',
  'Makeup artist',
  'Project manager',
  'Photographer',
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
            <span className="eyebrow">SHALIK VISUAL / OUR TEAM</span>
            <span className="eyebrow">09 PEOPLE. ONE SHARED VISION.</span>
          </div>
          <h1>INDEPENDENT MINDS.<br /><em>SHARED VISION.</em></h1>
          <p>We’re a team of nine creatives bringing different skills and perspectives to every production—from the first idea to the final cut.</p>
        </section>
        <section className="section team-section" aria-labelledby="team-heading">
          <div className="section-head team-grid-heading">
            <h2 id="team-heading">The people behind the picture.</h2>
            <span className="eyebrow">MEET SHALIK VISUAL</span>
          </div>
          <p className="team-draft-note">Meet our team. More portraits and introductions are coming soon.</p>
          <div className="team-grid">
            {profiles.map((role, index) => (
              <article className="team-card" key={index}>
                {index === 0 ? <>
                  <div className="team-portrait team-portrait-photo"><img src="/media/oleksandr-shaforostov.png" alt="Oleksandr Shaforostov" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">01</span></div>
                  <div className="team-profile-heading"><h3>Oleksandr Shaforostov</h3><span className="team-role">Co-founder · Cinematographer · Photographer</span></div>
                  <p>With eight years of experience in videography, photography and editing, Oleksandr brings a distinctive visual style to every project. He combines engineering knowledge with an artist’s eye, balancing technical precision with creative expression.</p>
                </> : <>
                <div className="team-portrait" role="img" aria-label={`Portrait to be added for team member ${index + 1}`}>
                  <span className="team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow">PORTRAIT COMING SOON</span>
                </div>
                <div className="team-profile-heading">
                  <h3>Name to be added</h3>
                  <span className="team-role">{role ?? 'Role to be confirmed'}</span>
                </div>
                <p>Personal introduction coming soon.</p>
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

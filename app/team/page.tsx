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
                  <p>Oleksandr brings eight years of experience in filmmaking, photography and editing to every production. Combining engineering knowledge with an artistic eye, he gives projects a distinctive visual style, balancing technical precision with a thoughtful approach to storytelling.</p>
                </> : index === 1 ? <>
                  <div className="team-portrait team-portrait-photo"><img src="/media/cofounder-producer.png" alt="Co-founder and producer" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">02</span></div>
                  <div className="team-profile-heading"><h3>Name to be added</h3><span className="team-role">Co-founder · Producer</span></div>
                  <p>With eight years in project management, sales, events and workshops, he connects people and ideas. Open-minded and approachable, he finds common ground across backgrounds, builds lasting relationships and brings the right people together to turn creative plans into productions.</p>
                </> : <>
                <div className="team-portrait" role="img" aria-label={`Portrait to be added for team member ${index + 1}`}>
                  <span className="team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow">PORTRAIT COMING SOON</span>
                </div>
                <div className="team-profile-heading">
                  <h3>{index === 2 ? 'Aleksander Drozd' : 'Name to be added'}</h3>
                  <span className="team-role">{index === 2 ? 'Editor · Camera operator · Photographer · Co-founder' : role ?? 'Role to be confirmed'}</span>
                </div>
                <p>{index === 2 ? 'Aleksander is a young, ambitious camera operator and editor with a film school education in cinematography and editing. He brings a fresh perspective and creative solutions to the team, giving each project energy, a modern, visually engaging feel and a distinctive visual character.' : 'Personal introduction coming soon.'}</p>
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

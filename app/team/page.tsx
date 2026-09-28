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
                  <div className="team-portrait team-portrait-photo"><img src="/media/cofounder-producer.png" alt="Arkadiusz Pawlik" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">02</span></div>
                  <div className="team-profile-heading"><h3>Arkadiusz Pawlik</h3><span className="team-role">Co-founder · Producer</span></div>
                  <p>With eight years in project management, sales, events and workshops, he connects people and ideas. Open-minded and approachable, he finds common ground across backgrounds, builds lasting relationships and brings the right people together to turn creative plans into productions.</p>
                </> : index === 3 ? <>
                  <div className="team-portrait team-portrait-photo"><img src="/media/natalia-pabijan.jpg" alt="Natalia Pabijan" loading="lazy" width="3921" height="5881"/><span className="team-photo-number" aria-hidden="true">04</span></div>
                  <div className="team-profile-heading"><h3>Natalia Pabijan</h3><span className="team-role">Shalik Studio Manager · Actress · Model · Costumes</span></div>
                  <p>Natalia is an arts graduate, professional model and the face of Shalik Studio. She brings passion and commitment to managing the studio, acting and costume work, combining artistic sensitivity with creative energy on set. Away from the studio, she enjoys spending time in the saddle.</p>
                </> : <>
                {index === 2 ? <div className="team-portrait team-portrait-photo"><img src="/media/aleksander-drozd.png" alt="Aleksander Drozd" loading="lazy" width="2075" height="3130"/><span className="team-photo-number" aria-hidden="true">03</span></div> : index === 4 ? <div className="team-portrait team-portrait-photo"><img src="/media/gabriele-giglio.jpeg" alt="Gabriele Giglio" loading="lazy" width="800" height="800"/><span className="team-photo-number" aria-hidden="true">05</span></div> : (
                <div className="team-portrait" role="img" aria-label={`Portrait to be added for team member ${index + 1}`}>
                  <span className="team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow">PORTRAIT COMING SOON</span>
                </div>
                )}
                <div className="team-profile-heading">
                  <h3>{index === 2 ? 'Aleksander Drozd' : index === 4 ? 'Gabriele Giglio' : 'Name to be added'}</h3>
                  <span className="team-role">{index === 2 ? 'Editor · Camera operator · Photographer · Co-founder' : index === 4 ? '3D Digital Designer · VR · AR' : role ?? 'Role to be confirmed'}</span>
                </div>
                <p>{index === 2 ? 'Aleksander is a young, ambitious camera operator and editor with a film school education in cinematography and editing. He brings a fresh perspective and creative solutions to the team, giving each project energy, a modern, visually engaging feel and a distinctive visual character.' : index === 4 ? 'Gabriele creates 3D models, textures, rigs and animation for immersive VR, AR and XR. His work spans stereoscopy, autostereoscopy, lenticular and holographic visuals, video editing and post-production. He also composes and arranges music, and develops 3D prints and prototypes.' : 'Personal introduction coming soon.'}</p>
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

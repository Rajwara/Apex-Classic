import Arrow from '@/components/Arrow';
import Hud from '@/components/Hud';
import PhImg from '@/components/PhImg';
import ScrollExperience from '@/components/ScrollExperience';
import Words from '@/components/Words';
import { BRAND, CAR_COLORS, MEDIA, type CarLayer } from '@/lib/brand';

const TriBar = ({ className }: { className: string }) => (
  <div className={`tribar ${className}`}><i></i><i></i><i></i></div>
);

const Brand = ({ className }: { className: string }) => (
  <div className={className}>
    <div className="brand-circle">{BRAND.initials}</div>
    <div className="tagline">{BRAND.tagline[0]}<br />{BRAND.tagline[1]}</div>
  </div>
);

const YEARS = [
  { year: 1986, model: BRAND.name, power: '147 kW/200 hp' },
  { year: 1987, model: `${BRAND.name} Evolution`, power: '159 kW/195 hp' },
  { year: 1988, model: `${BRAND.name} Convertible`, power: '144 kW/195 hp' },
  { year: 1990, model: `${BRAND.name} Sport Evolution`, power: '175 kW/238 hp' },
];

export default function Home() {
  return (
    <>
      {/* ================= FIXED STAGE (car + stripes) ================= */}
      <div className="stage" aria-hidden="true">
        <div className="stripes"><div className="stripes-intro"><i></i><i></i><i></i></div></div>
        <div className="car-pos">
          <div className="car-intro">
            <div className="car-flip">
              {(Object.keys(CAR_COLORS) as CarLayer[]).map(k => (
                <PhImg key={k} className={`car-img l-${k}`} src={MEDIA.car[k]} car={CAR_COLORS[k]} alt="" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Hud />

      <main>
        {/* ================= HERO ================= */}
        <section id="hero">
          <div className="hero-copy">
            <h1>
              <span className="ln indent"><span>Built for those</span></span>
              <span className="ln"><span>who live at</span></span>
              <span className="ln indent"><span>the redline.</span></span>
            </h1>
            <a href="#intro" className="btn">Learn More <Arrow /></a>
          </div>
          <Brand className="hero-brand" />
        </section>

        {/* ================= INTRO ================= */}
        <section id="intro" className="solid">
          <TriBar className="left" />
          <div className="wrap section-head">
            <div className="rule"></div>
            <div className="label">Introduction</div>

            <Words
              className="big"
              text={`Born directly from motorsport, the ${BRAND.name} was the first of its kind. With countless championship wins on the track, it quickly became one of the most iconic cars in the line-up.`}
            />

            <div className="pics">
              <div className="pic"><PhImg src={MEDIA.intro1} ph={`${BRAND.name} image 1`} alt={`${BRAND.name} image 1`} /></div>
              <div className="pic"><PhImg src={MEDIA.intro2} ph={`${BRAND.name} image 2`} dark alt={`${BRAND.name} image 2`} /></div>
            </div>

            <div className="models">
              <div className="label">Production Models</div>
              <div>
                <Words className="stmt" text="The engineers gave it the very best components straight from the racing parts shelf." />
                <hr />
                <div className="years">
                  {YEARS.map(y => (
                    <div className="year" key={y.year}>
                      <b>{y.year}</b>
                      <span>{y.model}<br />({y.power})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS (car scenes) ================= */}
        <section id="stats">
          <TriBar className="right inside" />
          <div className="pin">
            <div className="stat-row">
              <div className="stat"><div className="v"><span className="num" data-to="200">0</span><small>hp</small></div><div className="l">Power</div></div>
              <div className="stat"><div className="v"><span className="num" data-to="235">0</span><small>km/h</small></div><div className="l">Top Speed</div></div>
              <div className="stat"><div className="v"><span className="num" data-to="6.7" data-dec="1">0</span><small>s</small></div><div className="l">Zero to 100 km/h</div></div>
            </div>
            <div className="kg">
              <div className="v"><span className="num" data-to="6.5" data-dec="1">0</span><small>kg/hp</small></div>
              <p>The power-to-weight ratio of the first {BRAND.name}, impressive then, still fun today.</p>
            </div>
            <div className="note">When the {BRAND.name} was unveiled at the motor show, it was a sensation. Its performance set a brand-new benchmark!</div>
          </div>
        </section>

        {/* ================= RACING HISTORY ================= */}
        <section id="racing" className="solid dark">
          <TriBar className="left" />
          <div className="wrap section-head">
            <div className="rule"></div>
            <div className="label">Racing History</div>
            <Words
              className="big"
              text={`Like the road car, the ${BRAND.name} racing version was a huge success, winning a world title in its very first year and a European crown soon after.`}
            />
            <a href="#" className="btn light">Learn More <Arrow /></a>
          </div>
          <div className="media-wrap">
            <div className="media">
              {MEDIA.racingVideo ? (
                <video src={MEDIA.racingVideo} autoPlay muted loop playsInline />
              ) : (
                <>
                  <PhImg src={MEDIA.racingImage} ph={`${BRAND.name} racing video / image`} dark alt={`${BRAND.name} racing footage`} />
                  <div className="play">
                    <svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="35" fill="rgba(255,255,255,.12)" stroke="#fff" strokeOpacity=".5" /><path d="M29 23l22 13-22 13z" fill="#fff" /></svg>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section id="quotes" className="solid">
          <div className="wrap section-head">
            <div className="rule"></div>
            <div className="label">Testimonials</div>
            <div className="q-grid">
              <div className="sub">What people said<br />at the time.</div>
              <div className="q-body">
                <div className="q-mark">&rdquo;</div>
                <Words
                  className="q-text"
                  text={`Placeholder quote: the ${BRAND.name} isn't about getting somewhere, it's about driving. Hard. Fast. All the time. A road-legal race car that loves apexes more than boulevards.`}
                />
                <div className="q-src">Year &amp; Publication Name</div>
                <div className="author">
                  <div className="av"></div>
                  <div><div className="stars">★★★★★</div><small>Publication</small></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ETERNAL CLASSIC ================= */}
        <section id="eternal">
          <TriBar className="right inside" />
          <div className="pin">
            <div className="eternal-copy">
              <h2><span className="ln"><span>Eternal</span></span><span className="ln"><span>Classic.</span></span></h2>
              <a href="#" className="btn">Find a used {BRAND.name} <Arrow /></a>
            </div>
            <Brand className="eternal-brand" />
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer>
          <TriBar className="left" />
          <div className="rule" style={{ background: '#fff', opacity: 0.9 }}></div>
          <div className="f-grid">
            <div className="co">{BRAND.name}</div>
            <div><p>+00 00 000000</p><p>Street Address 00,<br />00000 City</p></div>
            <div><a href="#hero">Home</a><a href="#intro">Models</a><a href="#">About</a><a href="#">News</a></div>
            <div><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">X</a></div>
          </div>
          <div className="disclaimer">© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Replace this line with your own legal text.</div>
        </footer>
      </main>

      <ScrollExperience />
    </>
  );
}

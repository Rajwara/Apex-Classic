'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/* Drives the fixed car stage, smooth scrolling and every scroll-linked reveal. */
export default function ScrollExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ======================================================
       SMOOTH SCROLL
       ====================================================== */
    let lenis: Lenis | null = null;
    const raf = (t: number) => lenis?.raf(t * 1000);
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute('href');
      if (!lenis || !id || id.length < 2) return;
      e.preventDefault();
      lenis.scrollTo(id, { duration: 1.6 });
    };
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      document.addEventListener('click', onAnchor);
    }

    const ctx = gsap.context(() => {
      const car = '.car-pos', flip = '.car-flip', stripes = '.stripes';
      const layers: Record<string, string> = { red: '.l-red', rose: '.l-rose', white: '.l-white', black: '.l-black' };
      // Paint changes: fade the new layer in OVER the current one (no see-through), then hide the rest.
      const colorTo = (tl: gsap.core.Timeline, name: string, at: number, dur = .4) => {
        tl.to(layers[name], { opacity: 1, duration: dur, ease: 'none' }, at);
        Object.entries(layers).forEach(([k, sel]) => { if (k !== name) tl.set(sel, { opacity: 0 }, at + dur); });
      };

      /* Car "camera" positions */
      const S = {
        heroA:   { x: '70vw',  y: '6vh',  scale: 1.35 },
        heroB:   { x: '62vw',  y: '12vh', scale: 1.8 },
        front:   { x: '45vw',  y: '10vh', scale: 1.9 },
        side:    { x: '0vw',   y: '4vh',  scale: 1.0 },
        kg:      { x: '70vw',  y: '7vh',  scale: 1.5 },
        darkZ:   { x: '66vw',  y: '8vh',  scale: 2.4 },
        rear:    { x: '-60vw', y: '6vh',  scale: 1.9 },
        eterA:   { x: '8vw',   y: '6vh',  scale: 1.05 },
        eterB:   { x: '18vw',  y: '3vh',  scale: 1.22 }
      };
      const stripeHero  = { rotation: -24, y: '20vh', scaleY: 2.1, '--fade': '58%', opacity: 1 };
      const stripeFlat  = { rotation: -1.2, y: '0vh', scaleY: 0.85, '--fade': '120%', opacity: 1 };

      gsap.set(car, S.heroA);
      gsap.set(stripes, stripeHero);

      /* ---------- HERO: load-in ---------- */
      if (!reduce) {
        gsap.from('.hero-copy h1 .ln > span', { yPercent: 110, duration: 1.15, ease: 'power4.out', stagger: .12, delay: .15 });
        gsap.from('.hero-copy .btn', { opacity: 0, y: 24, duration: .9, ease: 'power3.out', delay: .65 });
        gsap.from('.hero-brand > *', { opacity: 0, y: 20, duration: .9, ease: 'power3.out', stagger: .1, delay: .8 });
        gsap.from('.car-intro', { x: '55vw', duration: 1.8, ease: 'power3.out' });
        gsap.from('.stripes-intro', { scaleX: 0, duration: 1.5, ease: 'power3.inOut', delay: .25 });
        gsap.from('.hud', { opacity: 0, y: -16, duration: .8, delay: .9 });
      }

      /* ---------- HERO: scroll camera ---------- */
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 } })
        .to('.hero-copy', { y: -140, opacity: 0, duration: .35 }, 0)
        .to('.hero-brand', { y: 60, opacity: 0, duration: .3 }, 0)
        .to(car, { ...S.heroB, duration: 1 }, 0)
        .to(stripes, { rotation: -5, y: '14vh', scaleY: 1.4, '--fade': '75%', duration: 1 }, 0);

      /* ---------- STATS: multi-shot car sequence ---------- */
      const nums = gsap.utils.toArray<HTMLElement>('#stats .stat-row .num');
      const kgNum = document.querySelector<HTMLElement>('#stats .kg .num')!;
      const count = (el: HTMLElement) => {
        const o = { v: 0 }, to = parseFloat(el.dataset.to ?? '0'), d = Number(el.dataset.dec ?? 0);
        return gsap.to(o, { v: to, duration: .6, ease: 'power1.out', onUpdate: () => { el.textContent = o.v.toFixed(d); } });
      };

      gsap.set(['#stats .stat', '#stats .kg', '#stats .note'], { opacity: 0, y: 30 });

      const st = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#stats', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
      st.set(car, S.front, 0)
        .set(flip, { scaleX: 1, opacity: 1 }, 0)
        .set(stripes, stripeFlat, 0);
      colorTo(st, 'red', 0, .01);
      // 1 → 2.2 : pull back to full side profile
      st.to(car, { ...S.side, duration: 1.2, ease: 'power1.inOut' }, 1);
      // stats in + count up
      st.to('#stats .stat', { opacity: 1, y: 0, stagger: .12, duration: .35 }, 1.9);
      nums.forEach((n, i) => st.add(count(n), 1.95 + i * .1));
      // paint changes
      colorTo(st, 'rose', 2.4, .45);
      colorTo(st, 'white', 3.0, .45);
      // 3.6 → kg/hp shot
      st.to('#stats .stat', { opacity: 0, y: -20, stagger: .06, duration: .3 }, 3.6)
        .to(car, { ...S.kg, duration: .9, ease: 'power1.inOut' }, 3.6)
        .to('#stats .kg', { opacity: 1, y: 0, duration: .35 }, 4.2);
      st.add(count(kgNum), 4.25);
      // 4.9 → dark close-up pan
      st.to('#stats .kg', { opacity: 0, y: -20, duration: .3 }, 4.9)
        .to(car, { ...S.darkZ, duration: .9, ease: 'power1.inOut' }, 4.9);
      colorTo(st, 'black', 4.9, .35);
      // 5.6 → slow dolly along the side to the rear
      st.to(car, { ...S.rear, duration: 1.4, ease: 'power1.inOut' }, 5.6)
        .to('#stats .note', { opacity: 1, y: 0, duration: .35 }, 6.7)
        .to({}, { duration: .3 }, 7.5);

      /* ---------- ETERNAL CLASSIC ---------- */
      gsap.set('.eternal-copy .ln > span', { yPercent: 110 });
      gsap.set('.eternal-copy .btn', { opacity: 0, y: 20 });
      const et = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#eternal', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
      et.set(car, S.eterA, 0)
        .set(flip, { scaleX: 1, opacity: 1 }, 0)
        .set(stripes, { opacity: 0 }, 0);
      colorTo(et, 'red', 0, .01);
      et.to(car, { ...S.eterB, duration: 1.4, ease: 'power1.inOut' }, 1.3)
        .to('.eternal-brand', { opacity: 0, y: 30, duration: .4 }, 1.3)
        .to('.eternal-copy .ln > span', { yPercent: 0, stagger: .12, duration: .5, ease: 'power3.out' }, 1.6)
        .to('.eternal-copy .btn', { opacity: 1, y: 0, duration: .4 }, 2.0)
        .to({}, { duration: .4 }, 2.7);

      /* ======================================================
         CONTENT REVEALS
         ====================================================== */
      // Rules draw in
      gsap.utils.toArray<HTMLElement>('.rule').forEach(r => gsap.from(r, {
        scaleX: 0, duration: 1.3, ease: 'power3.inOut', scrollTrigger: { trigger: r, start: 'top 90%' }
      }));
      gsap.utils.toArray<HTMLElement>('.label, .q-grid .sub').forEach(l => gsap.from(l, {
        opacity: 0, y: 14, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: l, start: 'top 92%' }
      }));

      // Word-by-word scrubbed text
      document.querySelectorAll('[data-words]').forEach(el => {
        gsap.fromTo(el.querySelectorAll('.w'), { opacity: .14 }, {
          opacity: 1, stagger: .08, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 50%', scrub: true }
        });
      });

      // Image clip reveal + parallax zoom
      gsap.utils.toArray<HTMLElement>('.pic').forEach((p, i) => {
        gsap.fromTo(p, { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut', delay: i * .12,
          scrollTrigger: { trigger: p, start: 'top 88%' }
        });
        gsap.fromTo(p.querySelector('img'), { scale: 1.3, yPercent: -6 }, {
          scale: 1, yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      // Years stagger
      gsap.from('.year', { opacity: 0, y: 30, duration: .8, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: '.years', start: 'top 90%' } });

      // Buttons
      gsap.utils.toArray<HTMLElement>('#racing .btn, #intro .btn').forEach(b => gsap.from(b, { opacity: 0, y: 20, duration: .8, scrollTrigger: { trigger: b, start: 'top 92%' } }));

      // Racing media expands to full-bleed
      gsap.fromTo('.media', { width: window.innerWidth < 820 ? '86%' : '70%' }, {
        width: '100%', ease: 'none',
        scrollTrigger: { trigger: '.media-wrap', start: 'top 85%', end: 'top 5%', scrub: true }
      });
      gsap.fromTo('.media img, .media video', { scale: 1.25 }, {
        scale: 1, ease: 'none', scrollTrigger: { trigger: '.media-wrap', start: 'top bottom', end: 'bottom top', scrub: true }
      });

      // Testimonial
      gsap.from('.q-mark', { opacity: 0, x: -30, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.q-grid', start: 'top 85%' } });
      gsap.from(['.q-src', '.author'], { opacity: 0, y: 20, stagger: .12, duration: .8, scrollTrigger: { trigger: '.q-src', start: 'top 92%' } });

      // Footer
      gsap.from('.f-grid > div', { opacity: 0, y: 30, stagger: .1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: 'footer', start: 'top 80%' } });

      // Tri-colour bars slide in
      gsap.utils.toArray<HTMLElement>('.tribar').forEach(t => gsap.from(t.children, {
        scaleX: 0, transformOrigin: t.classList.contains('right') ? '100% 50%' : '0% 50%', stagger: .08, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: t, start: 'top 95%' }
      }));
    });

    const refresh = () => ScrollTrigger.refresh();
    addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      removeEventListener('load', refresh);
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      ctx.revert();
    };
  }, []);

  return null;
}

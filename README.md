# Apex Classic

Scroll-driven showcase site for **Apex Classic**, built with Next.js (App Router), GSAP ScrollTrigger and Lenis smooth scrolling.

## Run

```bash
npm install
npm run dev
```

Production build: `npm run build && npm start`.

## Structure

- `app/page.tsx`: page markup (hero, intro, stats, racing, testimonials, eternal, footer)
- `app/globals.css`: all styles
- `components/ScrollExperience.tsx`: car "camera" timelines, smooth scroll and reveals
- `components/Hud.tsx`: sound toggle and logo
- `components/PhImg.tsx`: image with generated placeholder fallback
- `lib/brand.ts`: brand name, tagline and media paths

## Swapping in real media

Put files in `public/` and set their paths in `lib/brand.ts` (`MEDIA`). Anything left empty gets a generated placeholder.

- Car layers (`MEDIA.car.red|rose|white|black`): transparent PNG/WebP, side profile, front facing left, about 1000×400.
- Photos (`intro1`, `intro2`, `racingImage`): any jpg/png/webp.
- `racingVideo`: e.g. `/videos/racing.mp4`, which replaces the racing image.
- `engineSound`: e.g. `/audio/engine.mp3`, which enables the sound toggle.

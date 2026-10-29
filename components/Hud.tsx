'use client';

import { useRef, useState } from 'react';
import { BRAND, MEDIA } from '@/lib/brand';

export default function Hud() {
  const [muted, setMuted] = useState(true);
  const audio = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    const a = audio.current;
    if (!a || !MEDIA.engineSound) return;
    if (next) a.pause();
    else a.play().catch(() => {});
  };

  return (
    <>
      <div className="hud">
        <button className={muted ? 'muted' : ''} onClick={toggle} aria-label="Toggle sound">
          <svg className="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
          </svg>
          <svg className="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
            <path d="M16 9l6 6M22 9l-6 6" />
          </svg>
        </button>
        <a href="#hero" className="logo-box" aria-label={`${BRAND.name} home`}>
          <span className="logo-dot">{BRAND.initials}</span>
          <span className="logo-name">{BRAND.name}</span>
          <span className="mini-stripes"><i></i><i></i><i></i></span>
        </a>
      </div>
      {MEDIA.engineSound ? <audio ref={audio} src={MEDIA.engineSound} loop preload="none" /> : null}
    </>
  );
}

'use client';

import { useState } from 'react';
import { carSVG, photoSVG } from '@/lib/placeholders';

type Props = {
  src?: string;
  alt: string;
  className?: string;
  /** Car body colour — renders the car placeholder. */
  car?: string;
  /** Label text — renders the photo placeholder. */
  ph?: string;
  dark?: boolean;
};

/* <img> that falls back to a generated SVG placeholder when src is empty or fails. */
export default function PhImg({ src, alt, className, car, ph, dark }: Props) {
  const placeholder = () => (car ? carSVG(car) : photoSVG(ph ?? alt, dark));
  const [failed, setFailed] = useState(false);
  const url = src && !failed ? src : placeholder();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={url} alt={alt} onError={() => setFailed(true)} />
  );
}

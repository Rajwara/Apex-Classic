/*
  ============================================================
  BRAND + MEDIA CONFIG
  ------------------------------------------------------------
  Every media path left as '' gets an auto-generated placeholder.
  Drop your files into /public and set the path here, e.g.
     red: '/images/car-red.png'

  CAR LAYERS — transparent PNG/WebP, side profile,
  FRONT OF CAR FACING LEFT, roughly 1000 x 400 ratio.
  4 colour layers cross-fade on scroll: red, rose, white, black.
  (Use the same photo 4x if you only have one colour.)

  PHOTOS — any jpg/png/webp.
  RACING VIDEO — set racingVideo to e.g. '/videos/racing.mp4'.
  SOUND — set engineSound to e.g. '/audio/engine.mp3' to enable.
  ============================================================
*/

export const BRAND = {
  name: 'Apex Classic',
  initials: 'AC',
  tagline: ['The Apex Classic series.', "Driver's car of the year."],
} as const;

export const MEDIA = {
  car: {
    red: '',
    rose: '',
    white: '',
    black: '',
  },
  intro1: '',
  intro2: '',
  racingImage: '',
  racingVideo: '',
  engineSound: '',
} as const;

export const CAR_COLORS = {
  red: '#c4342a',
  rose: '#c7a9a6',
  white: '#dcd7d6',
  black: '#1c2027',
} as const;

export type CarLayer = keyof typeof CAR_COLORS;

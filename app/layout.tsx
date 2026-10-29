import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Oswald } from 'next/font/google';
import { BRAND } from '@/lib/brand';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
});

export const metadata: Metadata = {
  title: `${BRAND.name} | Scroll Experience`,
  description: `${BRAND.name}, built for those who live at the redline.`,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}

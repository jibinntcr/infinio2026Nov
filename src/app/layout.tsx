import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Infinio Technology Solutions · Engineer Anything',
  description:
    'Your technology and engineering partner, grounded in architectural excellence since 2016. Custom software, spatial 3D WebGL, cloud infrastructure, AI workflows, and cybersecurity across Kochi (CIAL Aero Park), Thrissur, and Dubai.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-white text-[#1f1f1f]">{children}</body>
    </html>
  );
}

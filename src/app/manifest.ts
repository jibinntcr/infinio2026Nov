import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Infinio Technology Solutions',
    short_name: 'Infinio',
    description:
      'Enterprise AI, Cloud Architecture, and Custom Software Engineering across Kochi (CIAL Aero Park), Thrissur, and Dubai.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a73e8',
    icons: [
      {
        src: '/images/infinio-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/infinio-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

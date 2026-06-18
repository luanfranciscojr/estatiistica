import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Estatísticas SENIB',
    short_name: 'SENIB',
    description: 'Painel operacional local do SENIB',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a1120',
    theme_color: '#111a2f',
    lang: 'pt-BR',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}

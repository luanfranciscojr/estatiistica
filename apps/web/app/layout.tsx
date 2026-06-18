import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Estatísticas SENIB',
  description: 'Painel operacional local do SENIB',
  applicationName: 'Estatísticas SENIB',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Estatísticas SENIB',
  },
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export const viewport = {
  themeColor: '#111a2f',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

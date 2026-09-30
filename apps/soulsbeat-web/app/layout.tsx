import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soulsbeat',
  description: 'Eventos, talentos y booking profesional.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

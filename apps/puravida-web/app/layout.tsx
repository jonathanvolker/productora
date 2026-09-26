import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pura Vida',
  description: 'Experiencias, viajes y acompañamiento personalizado.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

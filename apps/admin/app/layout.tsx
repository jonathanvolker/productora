import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administracion | Soulsbeat + Pura Vida',
  description: 'Panel interno de contenidos y consultas.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

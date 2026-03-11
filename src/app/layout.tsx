import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Demo Task Dashboard',
  description: 'Frontend-only demo task dashboard with role-aware views',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


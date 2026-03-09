import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Villa Estrella Costa Rica | Luxury All-Inclusive Villa',
  description: 'Experience the ultimate luxury retreat at Villa Estrella, a top-rated all-inclusive villa in Costa Rica with stunning ocean views, private pool, and personalized service.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

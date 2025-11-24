import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://goodmenmotors.com'),
  title: {
    default: 'Goodmen Motors – Premium Imported Vehicles',
    template: '%s | Goodmen Motors',
  },
  description:
    'Luxury vehicles curated in the USA and delivered to the Balkans with full transparency, inspections, and concierge logistics.',
  keywords: [' luxury cars', 'imported vehicles', 'USA cars', 'Goodmen Motors'],
  openGraph: {
    title: 'Goodmen Motors – Premium Imported Vehicles',
    description:
      'Luxury vehicles curated in the USA and delivered to the Balkans with full transparency.',
    url: 'https://goodmenmotors.com',
    siteName: 'Goodmen Motors',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        width: 1600,
        height: 900,
        alt: 'Goodmen Motors showfloor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@goodmenmotors',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#f5f5f5] antialiased dark:bg-black`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 bg-linear-to-b from-white via-white to-gray-100 dark:from-black dark:via-black dark:to-gray-950">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

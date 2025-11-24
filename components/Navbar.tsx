'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Listings' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur dark:border-gray-900/50 dark:bg-black/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
          <span>Goodmen</span>
          <span className="text-amber-500">Motors</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-600 transition hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex items-center justify-center rounded-xl p-2 text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={cn(
          'md:hidden transition-all duration-300',
          open ? 'max-h-96 border-t border-white/20 bg-white/90 dark:bg-black/80' : 'max-h-0 overflow-hidden',
        )}
      >
        <div className="space-y-4 px-4 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-gray-900 transition hover:text-amber-600 dark:text-gray-100 dark:hover:text-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}


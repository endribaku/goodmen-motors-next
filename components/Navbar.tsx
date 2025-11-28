'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'HOME' },
  { href: '/listings', label: 'MAKINAT' },
  { href: '/about', label: 'SHËRBIMET TONA' },
  { href: '/contact', label: 'KONTAKT' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
          <img src="/brand/logo/goodmen1.svg" alt="Goodmen Motors" className="" />
        </Link>

        <div className="flex items-center gap-16"> 
          <nav className="hidden items-center gap-16 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'headline text-[15px] font-normal tracking-[0.15em] text-white transition hover:text-white/80',
                  pathname === link.href && 'text-white',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

        
        </div>
        

        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex items-center justify-center rounded-xl p-2 text-white transition hover:bg-white/10 md:hidden"
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
          open ? 'max-h-96 border-t border-white/20 bg-black' : 'max-h-0 overflow-hidden',
        )}
      >
        <div className="space-y-4 px-4 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-white transition hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}


import Link from 'next/link';

const footerLinks = [
  { label: 'MAKINAT', href: '/listings' },
  { label: 'RRETH NESH', href: '/about' },
  { label: 'KONTAKT', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-[#E5E5E5] border-t ">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-white flex ">
            <img src="/brand/logo/goodmenfootertail.svg" alt="" className="" />
            <img src="/brand/logo/goodmenfooter.svg" alt="Goodmen Motors" className="" />
          </Link>
          
          <div className="flex items-center gap-16"> 
              <nav className="hidden items-center gap-16 md:flex">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[15px] tracking-[0.15em] font-normal headline text-[#5B5B5B]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <a
                href="https://www.instagram.com/goodmenmotors/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#5B5B5B] headline text-[15px] tracking-[0.15em] underline decoration-dotted transition hover:text-gray-400"
                aria-label="Instagram"
              >
                <img src="/helper-icons/contact us/instagram.svg" alt="" className="" />
                <span className="text-sm">INSTAGRAM</span>
              </a>
            </div>
          </div>
          
      </div>
    </footer>
  );
}


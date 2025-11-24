import Link from 'next/link';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Listings', href: '/listings' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  'Car import from USA',
  'Vehicle inspection & reporting',
  'Customs clearance assistance',
  'Door-to-door delivery',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/70 bg-white dark:border-gray-800/60 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              Goodmen <span className="text-amber-500">Motors</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Premium imports with concierge-level service, transparency, and precision.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Contact
            </p>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              +355 68 000 0000
              <br />
              concierge@goodmenmotors.com
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Tirana · Pristina · Skopje
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200/70 pt-6 text-center text-sm text-gray-500 dark:border-gray-800/70 dark:text-gray-400">
          © {year} Goodmen Motors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


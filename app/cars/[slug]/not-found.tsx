import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-500">
        Not Found
      </p>
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
        We can&apos;t locate this vehicle
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        It may have been sold or removed. Browse the full collection or reach out to our team for
        a custom search.
      </p>
      <div className="flex gap-4">
        <Link
          href="/listings"
          className="rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white"
        >
          View Listings
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  fetchAllCars,
  fetchCarBySlug,
  type CarListing,
} from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import ImageGallery from '@/components/ImageGallery';

interface CarPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const cars = await fetchAllCars();
  return cars.map((car) => ({ slug: car.slug.current }));
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await fetchCarBySlug(slug);
  if (!car) {
    return { title: 'Vehicle not found – Goodmen Motors' };
  }

  const image = car.mainImage ? urlFor(car.mainImage).width(1200).height(630).url() : undefined;

  return {
    title: `${car.title} (${car.year}) – Goodmen Motors`,
    description: `${car.year} ${car.make} ${car.model} - Premium imported vehicle from Goodmen Motors`,
    openGraph: {
      title: `${car.title} – Goodmen Motors`,
      description: `${car.year} ${car.make} ${car.model} - Premium imported vehicle from Goodmen Motors`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(
    price,
  );

const formatMileage = (value?: number) => {
  if (!value) return 'N/A';
  const formatted = new Intl.NumberFormat('en-US').format(value);
  return `${formatted}mi`;
};

const formatFuelType = (fuelType?: string) => {
  const fuelMap: Record<string, string> = {
    petrol: 'Benzinë',
    diesel: 'Naftë',
    hybrid: 'Hibrid',
    electric: 'Elektrik',
    other: 'Tjetër',
  };
  return fuelType ? fuelMap[fuelType] || fuelType : 'N/A';
};

const formatDriveType = (driveType?: string) => {
  const driveMap: Record<string, { label: string; subtitle: string }> = {
    fwd: { label: 'FWD', subtitle: 'Para' },
    rwd: { label: 'RWD', subtitle: 'Mbrapa' },
    awd: { label: 'AWD', subtitle: 'Të gjitha' },
    '4matic': { label: '4MATIC', subtitle: 'Të gjitha' },
    xdrive: { label: 'xDrive', subtitle: 'Të gjitha' },
    quattro: { label: 'quattro', subtitle: 'Të gjitha' },
  };
  return driveType ? driveMap[driveType] || { label: driveType, subtitle: '' } : { label: 'N/A', subtitle: '' };
};

const formatTransmission = (transmission?: string) => {
  const transMap: Record<string, string> = {
    automatic: 'Automatik',
    manual: 'Manuel',
    semi_automatic: 'Semi-Automatik',
  };
  return transmission ? transMap[transmission] || transmission : 'N/A';
};

export default async function CarPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = await fetchCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const driveInfo = formatDriveType(car.driveType);
  const engineDisplay = car.engineDisplacement
    ? `${car.engineDisplacement} ${car.engineLayout || ''}`.trim()
    : 'N/A';

  const specifications = [
    {
      label: 'VITI',
      icon: '/helper-icons/specs/calendar.svg',
      value: car.year.toString(),
      show: true,
    },
    {
      label: 'MILJET',
      icon: '/helper-icons/specs/speedometer.svg',
      value: formatMileage(car.mileage),
      show: !!car.mileage,
    },
    {
      label: 'MOTORRI',
      icon: '/helper-icons/specs/engine.svg',
      value: engineDisplay,
      show: !!car.engineDisplacement,
    },
    {
      label: 'KARBURANTI',
      icon: '/helper-icons/specs/fuel.svg',
      value: formatFuelType(car.fuelType),
      show: !!car.fuelType,
    },
    {
      label: 'GOMAT AKTIVE',
      icon: '/helper-icons/specs/steering.svg',
      value: `${driveInfo.label} (${driveInfo.subtitle})`,
      show: !!car.driveType,
    },
    {
      label: 'TRANSMISIONI',
      icon: '/helper-icons/specs/transmission.svg',
      value: formatTransmission(car.transmission),
      show: !!car.transmission,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/listings"
          className="mb-16 mt-8 inline-flex items-center gap-2 text-sm font-normal text-black headline tracking-[0.15em] py-2 px-4 border border-black"
        >
          <img src="/helper-icons/navbar/stroke-backwards.svg" alt="" className="h-3 w-3" />
          KTHEHU TE MAKINAT
        </Link>

        <div className="grid gap-12 md:gap-24 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column - Images */}
          <div className="w-full overflow-hidden">
            <ImageGallery car={car} />
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className=" text-[36px] font-normal text-black headline">{car.title}</h1>
              <p className="text-[24px] font-normal text-black headline">{formatPrice(car.price)}</p>
            </div>

            {/* Interested Section */}
            <div>
              <p className="mb-4 text-[15px] font-light headline decoration-dotted underline text-[#4E4E4E]">I interesuar?</p>
              <a
                href="https://wa.me/355682296290"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 headline bg-[#25D366] px-6 py-3 text-base font-normal tracking-[0.15em] text-[15px] text-white"
              >
                <img src="/helper-icons/contact us/whatsapp.svg" alt="" className="h-4 w-4" />
                KONTAKTO NË WHATSAPP
                <img src="/helper-icons/navbar/stroke(white).svg" alt="" className="" />
              </a>
            </div>

            {/* Description */}
            {(car.primaryUse || car.secondaryUse) && (
              <div>
                <h2 className="mb-1 text-[15px] tracking-[0.07em] text-[#4E4E4E] font-normal headline">PËRSHKRIMI</h2>
                <p className="text-[17px] font-light text-black headline">
                  Primare {car.primaryUse || 'Nuk ka'} / Sekondare {car.secondaryUse || 'Nuk ka'}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="space-y-5">
              {specifications
                .filter((spec) => spec.show)
                .map((spec) => (
                  <div key={spec.label} className="flex items-center gap-4">
                    <img src={spec.icon} alt="" className="h-6 w-6 self-start" />
                    <div>
                      <p className="text-[15px] font-normal text-[#4E4E4E] tracking-[0.07em] headline">{spec.label}</p>
                      <p className="text-[20px] font-normal text-black headline">{spec.value}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 pt-8 mb-8">
              <img src="/helper-icons/specs/warning.svg" alt="" className="mt-1 h-5 w-5 shrink-0" />
              <p className="text-[14px] font-light text-[#4E4E4E] headline">
                Pavarësisht përpjekjeve tona më të mira për të treguar defektet e makinës, kini parasysh se makina mund të ketë dëmtime të tjera të padukshme siç ka qenë ne ankand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

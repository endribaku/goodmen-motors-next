import type { Metadata } from 'next';
import Link from 'next/link';

import { fetchLatestArrivals } from '@/sanity/queries';
import HomeCarGrid from '@/components/HomeCarGrid';

export const metadata: Metadata = {
  title: 'Goodmen Motors – Premium Imported Vehicles from USA',
  description:
    'Discover premium imported vehicles curated in the USA and delivered to the Balkans with full transparency.',
};

export default async function Home() {
  const latestArrivals = await fetchLatestArrivals();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/home/homepage-hero.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <h1 className="text-[40px] font-normal michroma leading-tight text-white ">
              Bli makinën tënde të ëndrrave.
            </h1>
            <p className="mt-2 headline font-light text-white text-[18px]">
              Makina me porosi nga SHBA, Korea e Jugut dhe Kanada. Të gjitha me kontroll teknik dhe transport të sigurt.
            </p>
            <Link
              href="/listings"
              className="mt-8 headline tracking-[0.15em] text-[15px] inline-flex items-center gap-2 border-2 border-white bg-white text-black px-7 py-2.5 text-base font-normal"
            >
              SHIKO MAKINAT
              <img src="/helper-icons/navbar/stroke.svg" alt="" className="" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Listings Section */}
      {latestArrivals.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-[32px] font-normal text-gray-900 michroma">Listimet e fundit</h2>
              <Link
                href="/listings"
                className="inline-flex headline items-center gap-2 border-2 border-black bg-transparent px-4 py-2 text-base font-normal text-gray-900 transition tracking-[0.15em] text-[15px]"
              >
                TË GJITHA
                <img src="/helper-icons/navbar/stroke.svg" alt="" className="" />
              </Link>
            </div>
            <div className="mt-10">
              <HomeCarGrid cars={latestArrivals.slice(0, 4)} />
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="bg-[#FBFBFB] border-[#E5E5E5] border-b border-t py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-[24px] font-normal text-black michroma">
            Si funksionon?
          </h2>

          {/* Data array */}
          {(() => {
            const steps = [
              {
                icon: "/helper-icons/how-it-works/tabler-icon-car.svg",
                title: "Zgjedhja e makinës",
                description: "Na tregon çfarë kërkon - buxhet, markë, kilometrash, vit prodhimi.",
              },
              {
                icon: "/helper-icons/how-it-works/tabler-icon-ship.svg",
                title: "Ankandi & transporti",
                description:
                  "Ne gjejmë ofertën më të mirë, fitojmë ankandin dhe organizojmë transportin drejt Shqipërisë.",
              },
              {
                icon: "/helper-icons/how-it-works/tabler-icon-key.svg",
                title: "Mbërritja në Shqipëri",
                description:
                  "Makina mbërrin, kontrollohet, dhe e marrë dorë më dorë gati për rrugë.",
              },
            ];

            return (
              <div className="grid gap-12 md:grid-cols-3">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0044FF]">
                      <img src={step.icon} className="h-6 w-6 text-white" alt="" />
                    </div>
                    <h3 className="mb-2 text-[18px] font-normal text-black headline">{step.title}</h3>
                    <p className="text-black text-[16px] font-light headline">{step.description}</p>
                  </div>
                ))}
              </div>
            );
          })()}

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-transparent px-8 py-3 text-base font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              RRETH NESH
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-1 text-[24px] font-normal text-black michroma">Na kontaktoni</h2>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-8 text-lg text-gray-700">
                Jeni gati të porosisni makinën tuaj të ëndrrave?
              </p>
              <a
                href="https://wa.me/355682296290"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 inline-flex items-center gap-2 headline bg-[#25D366] px-6 py-2 text-base font-normal tracking-[0.15em] text-[15px] text-white"
              >
                <img src="/helper-icons/contact us/whatsapp.svg" alt="" className="h-4 w-4" />
                KONTAKTO NË WHATSAPP
                <img src="/helper-icons/navbar/stroke(white).svg" alt="" className="" />
              </a>
              <div className="space-y-4">
                {[
                  {
                    icon: "/helper-icons/contact us/tabler-icon-map-pin-2.svg",
                    title: "ADRESA",
                    lines: ["Rruga e Kosovarëve, Tiranë, Shqipëri"],
                  },
                  {
                    icon: "/helper-icons/contact us/tabler-icon-phone.svg",
                    title: "TELEFONI",
                    lines: ["+355 68 229 6290", "+355 68 938 8587"],
                  },
                  {
                    icon: "/helper-icons/contact us/tabler-icon-mail.svg",
                    title: "EMAIL",
                    lines: ["sales@goodmen.al"],
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <img
                      src={item.icon}
                      alt=""
                      className="h-5 w-5 text-blue-500"
                    />
                    <div className="mb-3">
                      <p className="font-normal text-[#4E4E4E] headline text-[15px] tracking-[0.07em]">{item.title}</p>

                      {item.lines.map((line, i) => (
                        <p key={i} className="mb-1 text-black text-[20px] font-normal headline">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-96 w-full overflow-hidden rounded-lg bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1676.2473300529248!2d19.81517398799004!3d41.31270496479977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135030fbbd7fa2c1%3A0x881f31e7ab1079aa!2sRruga%20e%20Kosovar%C3%ABve!5e1!3m2!1sen!2s!4v1764098225221!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

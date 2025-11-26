import type { Metadata } from 'next';
import HowItWorksSection from '@/components/HowItWorksSection';
export const metadata: Metadata = {
  title: 'Rreth Nesh – Goodmen Motors',
  description:
    'Goodmen Motors është partneri yt për importin e makinave nga Koreja e Jugut, SHBA dhe Kanada.',
};

const services = [
  {
    title: 'Blerje në ankande Copart & IAAI',
    description:
      'Jemi broker i licensuar në ankandet më të mëdha. Ne kërkojmë, verifikojmë dhe licitojmë për makinën që i përshtatet më mirë kërkesave të tua.',
  },
  {
    title: 'Kontroll teknik & përgatitje për rrugë',
    description:
      'Makina kontrollohet teknikisht para nisjes dhe pas mbërritjes, që të jetë e gatshme për rrugë dhe për regjistrim.',
  },
  {
    title: 'Transport ndërkombëtar detar & ajror',
    description:
      'Organizojmë transport të shpejtë dhe të sigurt me RO-RO ose konteiner, nga portet kryesore drejt Shqipërisë.',
  },
  {
    title: 'Dokumentacion & asistencë',
    description:
      'Nga dokumentet e eksportit deri te dogana, ne e menaxhojmë procesin që ti të mos humbasësh kohë me letra.',
  },
];

const howItWorks = [
  {
    icon: 'helper-icons/how-it-works/tabler-icon-car.svg',
    title: 'Zgjedhja e makinës',
    description: 'Na tregon çfarë kërkon - buxhet, markë, kilometrash, vit prodhimi.',
  },
  {
    icon: 'helper-icons/how-it-works/tabler-icon-ship.svg',
    title: 'Ankandi & transporti',
    description: 'Ne gjejmë ofertën më të mirë, fitojmë ankandin dhe organizojmë transportin drejt Shqipërisë.',
  },
  {
    icon: 'helper-icons/how-it-works/tabler-icon-key.svg',
    title: 'Mbërritja në Shqipëri',
    description: 'Makina mbërrin, kontrollohet, dhe e marrë dorë më dorë gati për rrugë.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-[32px] font-normal michroma text-black">
            Makina të përzgjedhura. Cilësi e garantuar.
          </h1>
          <p className="mt-3 headline font-light text-black text-[16px] ">
            Goodmen Motors është partneri yt për importin e makinave nga Koreja e Jugut, SHBA dhe Kanada. Për
            ne, çdo makinë është më shumë se mjet transporti - është pjesë e stilit tënd të jetesës. Ne
            kujdesemi për çdo hap, nga ankandi deri te dorëzimi në Shqipëri.
          </p>
        </div>
      </section>
      {/* Car Image - Full Width */}
      <div className="w-full">
        <img
          src="/about/about-hero-banner.jpg"
          alt="Premium imported vehicle"
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-start gap-6">
                {/* Blue Arrow Icon */}
                <div className="shrink-0 mb-1">
                  <img src="/helper-icons/about/tabler-icon-circle-arrow-right-filled.svg" alt="Arrow Icon" className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-normal headline text-black mb-1">{service.title}</h3>
                  <p className="headline font-light text-black text-[16px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <HowItWorksSection showAboutButton={false} />
    </div>
  );
}

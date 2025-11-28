import type { Metadata } from 'next';
import HowItWorksSection from '@/components/HowItWorksSection';
export const metadata: Metadata = {
  title: 'Rreth Nesh – Goodmen Motors',
  description:
    'Goodmen Motors është partneri yt për importin e makinave nga Koreja e Jugut, SHBA dhe Kanada.',
};

const services = [
  {
    title: 'Zgjidh makinën tënde të ëndrrave',
    description:
      'Të ndihmojmë të zgjedhësh makinën brenda buxhetit, duke gjetur ofertën më të mirë, duke shpjeguar dëmtimet, dhe duke llogaritur çmimin final.',
  },
  {
    title: 'Blerje në ankande Copart, IAAI dhe të tjera',
    description:
      'Jemi broker i licensuar në ankandet më të mëdha. Ne kërkojmë, verifikojmë dhe fitojmë ankandin për makinën që i përshtatet më mirë kërkesave të tua.',
  },
  {
    title: 'Transport i sigurtë',
    description:
      'Organizojmë ngarkimin, transportin detar (RO-RO ose konteiner) dhe mbërritjen në port, duke punuar me partnerë të specializuar logjistike.',
  },
  {
    title: 'Dokumentacion & asistencë gjatë procesit',
    description:
      'Të informojmë për kostot, afatet dhe hapat kryesorë, që të kesh transparencë të plotë nga porosia deri në mbërritjen e makinës.',
  },
];

const licenseLogos = [
  { src: '/brand/licenses/copart.svg', alt: 'Copart' },
  { src: '/brand/licenses/a.svg', alt: 'A' },
  { src: '/brand/licenses/manheim.svg', alt: 'Manheim' },
  { src: '/brand/licenses/adesa.svg', alt: 'ADESA' },
  { src: '/brand/licenses/acv.svg', alt: 'ACV' },
  { src: '/brand/licenses/block.svg', alt: 'Block' },
  { src: '/brand/licenses/openlane.svg', alt: 'OPENLANE' },
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

        {/* Licensed Broker Section */}
        <div className="mt-24">
          <h2 className="text-center text-[24px] font-normal michroma text-black mb-12">
            Ne jemi broker të liçensuar në:
          </h2>
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 md:flex-nowrap md:gap-x-9 md:gap-y-2 mb-12">
            {licenseLogos.map((logo, index) => (
              <div key={index} className="w-[calc(50%-12px)] md:w-auto flex justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto max-h-8 w-auto object-contain"
                />
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      
      <HowItWorksSection showAboutButton={false} />
    </div>
  );
}

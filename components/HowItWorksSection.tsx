import Link from 'next/link';

interface HowItWorksSectionProps {
  showAboutButton?: boolean;
}

export default function HowItWorksSection({ showAboutButton = true }: HowItWorksSectionProps) {
  const steps = [
    {
      icon: '/helper-icons/how-it-works/tabler-icon-car.svg',
      title: 'Zgjedhja e makinës',
      description: 'Na tregon çfarë kërkon - buxhet, markë, kilometrash, vit prodhimi.',
    },
    {
      icon: '/helper-icons/how-it-works/tabler-icon-ship.svg',
      title: 'Ankandi & transporti',
      description:
        'Ne gjejmë ofertën më të mirë, fitojmë ankandin dhe organizojmë transportin drejt Shqipërisë.',
    },
    {
      icon: '/helper-icons/how-it-works/tabler-icon-key.svg',
      title: 'Mbërritja në Shqipëri',
      description: 'Makina mbërrin, kontrollohet, dhe e marrë dorë më dorë gati për rrugë.',
    },
  ];

  return (
    <section className="bg-[#FBFBFB] border-[#E5E5E5] border-b border-t py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-16 text-center text-[24px] font-normal text-black michroma">
          Si funksionon?
        </h2>

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

        {showAboutButton && (
          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-transparent px-8 py-3 text-base font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              RRETH NESH
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}


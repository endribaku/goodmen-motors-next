import type { Metadata } from 'next';

import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'About Us – Goodmen Motors',
  description:
    'Learn about Goodmen Motors: our experience importing vehicles from the USA and the transparent process we follow.',
};

const pillars = [
  {
    title: 'Quality Assurance',
    description:
      'Multi-point inspections, high-resolution imagery, and verified auction data accompany every import.',
  },
  {
    title: 'Transparent Process',
    description:
      'We document every step, from bidding to shipping, so you understand exact costs and timelines.',
  },
  {
    title: 'Expert Network',
    description:
      'Licensed US buyers, logistics partners, and customs brokers streamline delivery into the Balkans.',
  },
  {
    title: 'Concierge Support',
    description:
      'Personalized sourcing and constant communication, whether you need market advice or shipping updates.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        <SectionTitle
          alignment="left"
          eyebrow="Who We Are"
          title="Precision imports with transparency and trust"
          subtitle="From sourcing at US auctions to delivering to your driveway, Goodmen Motors manages the complete lifecycle."
        />

        <Card className="mt-10 border-none bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
          <CardHeader>
            <Badge variant="outline" className="border-white/30 text-white">
              Since 2014
            </Badge>
            <CardTitle className="text-3xl text-white">
              Our Experience Importing from the USA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white/80">
            <p>
              We built relationships with major US auction houses, independent inspectors, and freight
              forwarders to make premium vehicles accessible in Albania, Kosovo, and North Macedonia.
            </p>
            <p>
              From luxury sedans and SUVs to rare performance models, every car undergoes verification of
              title, history, and mechanical condition before it ships overseas.
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trust & Transparency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                We believe informed clients make the best decisions. You receive inspection reports,
                vehicle history, cost breakdowns, and shipping milestones in real time.
              </p>
              <p>
                If a vehicle has blemishes, prior repairs, or pending recalls, we call them out before you
                commit. No surprises post-delivery.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inspection Process</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• On-site mechanical & cosmetic inspection</li>
                <li>• ECU scans and fluid checks where possible</li>
                <li>• Damage documentation with annotated photos</li>
                <li>• Verification of options, VIN, and service campaigns</li>
                <li>• Logistics planning with insurance coverage</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <section className="mt-14">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Why choose Goodmen Motors?
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="border-gray-200/70 dark:border-gray-800/60">
                <CardHeader>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-400">
                  {pillar.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


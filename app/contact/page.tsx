import type { Metadata } from 'next';

import SectionTitle from '@/components/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Goodmen Motors',
  description:
    'Reach the Goodmen Motors concierge team for vehicle inquiries, imports, and logistics support.',
};

const services = [
  'Vehicle sourcing & specs',
  'Auction bidding assistance',
  'Logistics & customs updates',
  'Private viewing appointments',
];

export default function ContactPage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        <SectionTitle
          alignment="left"
          eyebrow="Concierge Support"
          title="Let’s plan your next import"
          subtitle="Send us a message or reach us via WhatsApp/Instagram for a rapid response."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-gray-200/80 dark:border-gray-800/60">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <Card className="border-gray-200/80 dark:border-gray-800/60">
            <CardHeader>
              <CardTitle>Concierge Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-600 dark:text-gray-300">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Hours
                </p>
                <p className="mt-2">Available 24/7 via phone & WhatsApp</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Services
                </p>
                <ul className="mt-2 space-y-1">
                  {services.map((service) => (
                    <li key={service}>• {service}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2 rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/60">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Prefer WhatsApp or Instagram?
                </p>
                <p className="text-sm">
                  Mention the vehicle you like; we’ll send inspection media immediately.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" className="bg-gray-900 text-white hover:bg-black">
                    WhatsApp
                  </Button>
                  <Button variant="outline">Instagram DM</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


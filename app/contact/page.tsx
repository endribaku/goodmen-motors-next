import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Kontakt – Goodmen Motors',
  description: 'Na kontaktoni për makinat tuaja të ëndrrave.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ContactSection />
    </div>
  );
}

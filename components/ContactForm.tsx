'use client';

import { FormEvent, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Name *
          </label>
          <Input
            required
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Email *
          </label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Phone
        </label>
        <Input
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Message *
        </label>
        <Textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => onChange('message', e.target.value)}
        />
      </div>

      {status === 'success' && (
        <Card className="border-emerald-200/60 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-900/20">
          <CardContent className="p-4 text-sm text-emerald-900 dark:text-emerald-200">
            Thank you! Your message has been received. We&apos;ll get back within 24 hours.
          </CardContent>
        </Card>
      )}

      {status === 'error' && (
        <Card className="border-rose-200/60 bg-rose-50/80 dark:border-rose-800 dark:bg-rose-900/20">
          <CardContent className="p-4 text-sm text-rose-900 dark:text-rose-200">
            Something went wrong. Please try again or reach us via WhatsApp.
          </CardContent>
        </Card>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}


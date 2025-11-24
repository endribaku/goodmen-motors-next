import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    console.info('Incoming contact form submission', {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Plug into an email service or CRM.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


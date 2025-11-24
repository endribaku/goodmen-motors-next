import { NextRequest, NextResponse } from 'next/server';
import { fetchAllModels } from '@/sanity/queries';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const make = searchParams.get('make');

  try {
    const models = await fetchAllModels(make || undefined);
    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json({ models: [] }, { status: 500 });
  }
}


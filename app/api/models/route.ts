import { NextRequest, NextResponse } from 'next/server';
import { fetchAllModels } from '@/sanity/queries';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const makesParam = searchParams.get('makes');
  const makeParam = searchParams.get('make'); // Backward compatibility

  try {
    // Support both 'makes' (array) and 'make' (single) for backward compatibility
    if (makesParam) {
      const makes = makesParam.split(',').filter(Boolean);
      const allModels: string[] = [];
      
      // Fetch models for each make and combine (removing duplicates)
      for (const make of makes) {
        const models = await fetchAllModels(make);
        allModels.push(...models);
      }
      
      // Remove duplicates and sort
      const uniqueModels = Array.from(new Set(allModels)).sort();
      return NextResponse.json({ models: uniqueModels });
    } else if (makeParam) {
      // Backward compatibility: single make
      const models = await fetchAllModels(makeParam);
      return NextResponse.json({ models });
    } else {
      // No make filter: return all models
      const models = await fetchAllModels();
      return NextResponse.json({ models });
    }
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json({ models: [] }, { status: 500 });
  }
}


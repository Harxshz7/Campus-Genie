import { NextResponse } from 'next/server';
import { GOLDEN_PATH_RESPONSE, WHATIF_5HRS_RESPONSE } from '@/lib/fixtures';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const lower = (message || '').toLowerCase();

    // Check if what-if prompt
    if (
      lower.includes('5 hour') ||
      lower.includes('5 hrs') ||
      lower.includes('time') ||
      lower.includes('only have')
    ) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(WHATIF_5HRS_RESPONSE);
    }

    // Default golden path response
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(GOLDEN_PATH_RESPONSE);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process query', details: String(error) },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/constants/api'

export async function GET() {
  const url = API_ENDPOINTS.EPISODES;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching episodes' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

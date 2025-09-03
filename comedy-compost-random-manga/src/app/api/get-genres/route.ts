import { NextResponse } from 'next/server';

export async function GET() {

  try{
    const response = await fetch(
      'https://api.jikan.moe/v4/genres/manga'
    )

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
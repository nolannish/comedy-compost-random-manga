import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // let genre = '1';
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');

  const response = await fetch(
    `https://api.jikan.moe/v4/manga?genres=${genre}`
  )

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
}
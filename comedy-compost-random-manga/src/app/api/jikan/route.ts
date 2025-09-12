import { NextResponse } from 'next/server';

export async function GET() {
  const totalMangaResponse = await fetch(
    `https://api.jikan.moe/v4/manga?limit=1`
  )

  const totalManga = await totalMangaResponse.json();

  const maxAttempts = 10;
  let attempt = 0;
  let data = null;
  while (attempt < maxAttempts) {
    const randomNumber: number = getRandomInt(1, totalManga.pagination.items.total);
    console.log('random id selected: ', randomNumber);

    const response = await fetch(
      `https://api.jikan.moe/v4/manga/${randomNumber}`
    )

    if (response.ok) {
      const json = await response.json();

      if (json.data && json.data.title) {
        console.log('Success on attempt: ', attempt + 1);
        data = json;
        break;
      }
    }
    attempt++;
  }
    // console.log(data);
  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch manga after multiple attempts' }, { status: 500 });
  }

  return NextResponse.json(data);
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
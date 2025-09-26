import { NextResponse } from 'next/server';

type Genre = {
  mal_id: number;
  name: string;
}
export async function GET() {
  const totalMangaResponse = await fetch(
    `https://api.jikan.moe/v4/manga?limit=1`
  )

  const totalManga = await totalMangaResponse.json();

  const maxAttempts = 10;
  let attempt = 0;
  let data = null;
  
  // list of excluded genres as these are not suitable for a general audience
  const excludedGenres: number[] = [9, 49, 12]

  const excludedTypes: string[] = ['light novel', 'novel']

  while (attempt < maxAttempts) {
    const randomNumber: number = getRandomInt(1, totalManga.pagination.items.total);
    console.log('random id selected: ', randomNumber);

    const response = await fetch(
      `https://api.jikan.moe/v4/manga/${randomNumber}`
    )

    if (!response.ok) {
      attempt++;
      continue;
    }

    const json = await response.json();

    if (json.data && json.data.title) {
      const mangaGenres = json.data.genres.map((genre: Genre) => genre.mal_id);

      const hasExcludedGenres = mangaGenres.some((id: number) => excludedGenres.includes(id))

      const mangaType: string | undefined = json.data.type;

      const hasExcludedType = mangaType ? excludedTypes.includes(mangaType.toLowerCase()) : false;

      if (!hasExcludedGenres && !hasExcludedType) {
        console.log('Success on attempt: ', attempt + 1);
        data = {
          ...json,
          mal_id: randomNumber,
        };

        break;
      } else {
        console.log('Skipped due to innapropriate genre or invalid type')
        continue;
      }
    }
  }
  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch manga after multiple attempts' }, { status: 500 });
  }
  console.log('Final data returned: ', data);
  return NextResponse.json(data);
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
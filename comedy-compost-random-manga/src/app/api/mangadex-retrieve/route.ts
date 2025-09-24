// all credit goes to mangadex team and their open api for this specific section
// all information and documentation can be found here https://api.mangadex.org/docs/
import { NextRequest, NextResponse } from 'next/server';

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, ''); // remove spaces/punctuation
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mangaTitle = searchParams.get('title') || '';

  const baseUrl = 'https://api.mangadex.org';

  try {
    // fetch top 5 results instead of only 1
    const url = `${baseUrl}/manga?title=${encodeURIComponent(mangaTitle)}&limit=5`;
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch manga: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json(
        { error: 'No results found on MangaDex' },
        { status: 404 }
      );
    }

    // normalize query for comparison
    const queryNorm = normalize(mangaTitle);

    // try to find the best match
    let bestMatch = data.data[0]; // fallback if nothing exact
    for (const manga of data.data) {
      const titles: string[] = [];

      // add main title
      if (manga.attributes?.title) {
        titles.push(...Object.values(manga.attributes.title) as string[]);
      }

      // add alt titles
      if (Array.isArray(manga.attributes?.altTitles)) {
        for (const alt of manga.attributes.altTitles) {
          titles.push(...Object.values(alt) as string[]);
        }
      }

      // see if any title matches normalized query
      for (const t of titles) {
        if (normalize(t) === queryNorm) {
          bestMatch = manga;
          break;
        }
      }
    }

    const id = bestMatch.id;
    const pageUrl = `https://mangadex.org/title/${id}`;

    return NextResponse.json({ ...bestMatch, pageUrl });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}

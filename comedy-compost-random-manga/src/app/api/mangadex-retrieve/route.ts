// /api/mangadex-retrieve.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const malId = searchParams.get('mal_id'); // MAL ID from frontend
  const mangaTitle = searchParams.get('title') || '';

  if (!malId) {
    return NextResponse.json(
      { error: 'Missing mal_id parameter' },
      { status: 400 }
    );
  }

  const baseUrl = 'https://api.mangadex.org';

  try {
    // Fetch top 5 results for the given title
    const url = `${baseUrl}/manga?title=${encodeURIComponent(
      mangaTitle
    )}&limit=5`;
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
        {
          error: `No results found on MangaDex for "${mangaTitle}"`,
          title: mangaTitle,
          mal_id: malId,
        },
        { status: 404 }
      );
    }

    // Try to find exact MAL ID match
    let exactMatch = null;
    for (const manga of data.data) {
      if (manga.attributes.links?.mal === malId) {
        exactMatch = manga;
        break;
      }
    }

    if (!exactMatch) {
      // No exact match found
      return NextResponse.json(
        {
          error: `This manga could not be found on MangaDex. You may need to search manually to find it.`,
          title: mangaTitle,
          mal_id: malId,
        },
        { status: 404 }
      );
    }

    // Return only necessary fields
    const pageUrl = `https://mangadex.org/title/${exactMatch.id}`;

    return NextResponse.json({
      id: exactMatch.id,
      title: exactMatch.attributes.title,
      altTitles: exactMatch.attributes.altTitles,
      malId: exactMatch.attributes.links?.mal || null,
      pageUrl,
      matchType: 'exact',
    });
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


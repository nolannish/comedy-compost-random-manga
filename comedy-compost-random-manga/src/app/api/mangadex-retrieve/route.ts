// all credit goes to mangadex team and their open api for this specific section
// all information and documentation can be found here https://api.mangadex.org/docs/
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mangaTitle = searchParams.get('title') || '';
  
  const baseUrl = 'https://api.mangadex.org';

  try {
    const url = `${baseUrl}/manga?title=${encodeURIComponent(mangaTitle)}&limit=1`;
    
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch manga: ${response.statusText}`}, { status: response.status})
    }

    const data = await response.json();

    if(!data.data || data.data.length === 0) {
      return NextResponse.json({ error: 'No results found on MangaDex' }, { status: 404 });
    }

    const manga = data.data[0];
    const id = manga.id;
    const pageUrl=`https://mangadex.org/title/${id}`;

    return NextResponse.json({ ...manga, pageUrl });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred'}, { status: 500 });
    }
  }
}
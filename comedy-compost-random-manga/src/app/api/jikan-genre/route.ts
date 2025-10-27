import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const genre = searchParams.get('genre') || '';
  const genreExclude = searchParams.get('genres_exclude') || '';
  console.log('received: ', { genre, genreExclude });

  try{
    let url = `https://api.jikan.moe/v4/manga?page=1`;
    if (genre) url += `&genres=${genre}`;
    if (genreExclude) url += `&genres_exclude=${genreExclude}`;
    console.log('url: ', url);

    const response = await fetch(url);
   
    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch initial page: ${response.statusText}`});
    }
    const firstPageData = await response.json();
    // console.log('firstPageData: ', firstPageData);

    //if no manga found with given genres
    if (!firstPageData.data || firstPageData.data.length === 0) {
      return NextResponse.json( 
        { error: 'No manga found for the given combination of genres.' },
        { status: 404 } 
      );
    }

    const totalPages = firstPageData.pagination.last_visible_page;

    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    let randomPageUrl = `https://api.jikan.moe/v4/manga?page=${randomPage}`;
    if (genre) randomPageUrl += `&genres=${genre}`;
    if (genreExclude) randomPageUrl += `&genres_exclude=${genreExclude}`;

    const randomPageResponse = await fetch(randomPageUrl);
    const randomPageData = await randomPageResponse.json();

    // second check if data exists
    if (!randomPageData.data || randomPageData.data.length === 0) {
      return NextResponse.json(
        { error: 'No manga found for the given combination of genres' }, 
        { status: 404 }
      );
    }
    const randomManga = randomPageData.data[
      Math.floor(Math.random() * randomPageData.data.length)
    ];

    return NextResponse.json({ data: randomManga });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching random manga:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('An unexpected error occured while fetching random manga');
      return NextResponse.json({ error: 'An unexpceted error occurred' }, { status: 500 });
    }
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // let genre = '1';
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');
  const allResults = [];
  let currentPage = 1;
  let hasNextPage = true;
  const maxPages = 6;
  try {
    // while(hasNextPage && currentPage <= maxPages) {
    while (hasNextPage) {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?genres=${genre}&page=${currentPage}`
      );

      // if(!response.ok) {
      //   console.error(`Failed at page ${currentPage}:`, response.status, response.statusText);
      //   return NextResponse.json({ error: `Failed to fetch data for page ${currentPage}` }, { status: response.status });
      // }
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 3000;

        console.warn(`Rate limited on page ${currentPage}, retrying in ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
      const data = await response.json();

      allResults.push(...data.data);

      hasNextPage = data.pagination?.has_next_page;
      currentPage++;

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    // console.log(data);

    // return NextResponse.json(data);

    return NextResponse.json({ data: allResults });
  } catch (error) {
    if (error instanceof Error) {
      console.error('server error: ', error.message);
      return NextResponse.json({ error: error.message }, { status: 1000 });  
    } else {
      console.error('An unexpected error occurred while fetching manga with genres');
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
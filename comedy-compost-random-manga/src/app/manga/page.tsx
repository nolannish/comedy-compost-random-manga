'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
// import GenreDropdown from '@/components/GenreDropdown';
import dynamic from 'next/dynamic';
import { GetGenreOptions } from '../data/genre-options';

const GenreDropdown = dynamic(() => import('@/components/GenreDropdown'), {
  ssr: false,
});

export default function MangaPage() {
  const [manga, setManga] = useState<any>(null);
  const [isMangaFetched, setIsMangaFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selections, setSelections] = useState<number[]>([]);
  const [mangaResults, setMangaResults] = useState<any[]>([]);

  const fetchManga = async () => {
    setLoading(true);
    setError('');
    try{
      const response = await fetch ('/api/jikan');

      if (!response.ok) {
        throw new Error('Failed to get random manga');
      }

      const data = await response.json();
      const array = await GetGenreOptions()
      console.log(array);
      setIsMangaFetched(true);
      setManga(data.data);
      // fetchMangaWithGenres();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (genres: number[]) => {
    setSelections(genres);
    console.log('selected genres: ', genres);
  }
// below code migrated to another page (genre-search/page.tsx) for simpler use, will come back to delete later
  // const fetchMangaWithGenres = async () => {
  //   const genreString = selections.join(',');
  //   try{
  //     const response = await fetch(`/api/jikan-filter?genre=${genreString}`);

  //     if (!response.ok) {
  //       throw new Error('failed to fetch manga with selected genres');
  //     }
      
  //     const data = await response.json();
  //     console.log('genre data: ', data);

  //     setMangaResults(data)
  //     console.log('manga results: ', mangaResults)
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else {
  //       setError('An unexpected error occurred');
  //     }
  //   }
  // }

 
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      <Header />
      {/* <GenreDropdown onChange={handleSelectionChange}/> */}
       <h1 className="text-3xl font-bold mb-4">Random Manga Finder</h1>
      <h2>DISCLAIMER: Viewed discrestion is advised</h2>
      <h2>This pulls information from MyAnimeList, a website that hosts information about all different kinds of content, including content that is not suitable for all audiences</h2>
      <h2>As a result, please use this tool at your own discretion</h2>
      <h2>If you would like a search that is a little bit safer, please head to the advanced search section</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {manga && (
        <div className="flex flex-row">
          <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">{manga.title}</h2>
            {manga.images?.jpg?.image_url && (
              <img
                src={manga.images.jpg.image_url}
                alt={manga.title}
                className="w-full h-auto rounded mb-4"
              />
            )}
          </div>
          <div className="bg-white shadow-md rounded p-5 w-full max-w-md">
            <p>{manga.synopsis || 'No synopsis available.'}</p>
          </div>
        </div>
      )}

      {manga && (
        <button
          onClick={fetchManga}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Fetch Another
        </button>
      )}

      {!isMangaFetched && (
        <button
          onClick={fetchManga}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Fetch Manga
        </button>
      )}

      {/* <button
        onClick={fetchManga}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Fetch Another
      </button> */}
    </main>
  );
}

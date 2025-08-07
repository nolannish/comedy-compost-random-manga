'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
// import GenreDropdown from '@/components/GenreDropdown';
import dynamic from 'next/dynamic';
import { GetGenreOptions } from '../data/genre-options';

const GenreDropdown = dynamic(() => import('@/components/GenreDropdown'), {
  ssr: false,
});

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
type SelectOption ={
  value: number;
  label: string;
}

export default function MangaPage() {
  const [manga, setManga] = useState<any>(null);
  const [isMangaFetched, setIsMangaFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selections, setSelections] = useState<number[]>([])
  const [selectionsExclude, setSelectionsExclude] = useState<number[]>([]);

  const handleSelectionChange = (genres: number[]) => {
    setSelections(genres);
    console.log('selected genres: ', genres);
  }

  const handleSelectionChangeExclude = (genres: number[]) => {
    setSelectionsExclude(genres);
    console.log('selected genres to exclude: ', genres);
  }

  useEffect(() => {
    async function getOptions() {
      const genres = await GetGenreOptions();

      const selectOptions = genres.map((genre) => ({
        value: genre.mal_id,
        label: genre.name
      }));
      console.log('select options: ', options);
      setOptions(selectOptions);
    }
    
    getOptions();
  }, []);



  const fetchMangaWithGenres = async () => {
    const genreString = selections.join(',');
    const genreExcludeString = selectionsExclude.join(',');
    try{
      const response = await fetch(`/api/jikan-filter?genre=${genreString}&genres_exclude=${genreExcludeString}`);

      if (!response.ok) {
        throw new Error('failed to fetch manga with selected genres');
      }
      
      const data = await response.json();
      console.log('genre data: ', data);

      const randomInt = getRandomInt(0, data.data.length - 1);
      console.log('random int: ', randomInt);

      setManga(data.data[randomInt]);
      setIsMangaFetched(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  

 
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      <Header />
      <h2>Include Genres</h2>
      <GenreDropdown onChange={handleSelectionChange} options={options}/>
      <h2>Exclude Genres</h2>
      <GenreDropdown onChange={handleSelectionChangeExclude} options={options}/>
       <h1 className="text-3xl font-bold mb-4">Random Manga Finder</h1>
      <p className="text-gray-600 mb-4">Select genres to include or exclude, then click "Fetch Manga".</p>
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
          onClick={fetchMangaWithGenres}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Fetch Another
        </button>
      )}

      {!isMangaFetched && (
        <button
          onClick={fetchMangaWithGenres}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Fetch Manga
        </button>
      )}

      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded max-w-xl mt-4" role="alert">
        <strong className="font-bold">Rate Limit Warning: </strong>
        <span className="block sm:inline ml-1">
          Due to API rate limits, some searches may take a significant amount of time on the first attempt, due to their being thousands of results for some searches. Caching is implemented to make subsequen searches faster.
        </span>
      </div>
      {/* <button
        onClick={fetchMangaWithGenres}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Fetch Another
      </button> */}
    </main>
  );
}
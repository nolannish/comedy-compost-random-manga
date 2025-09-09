'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
// import GenreDropdown from '@/components/GenreDropdown';
import dynamic from 'next/dynamic';
import { GetGenreOptions } from '../data/genre-options';
import Image from 'next/image';
import type { Manga } from '@/types/index';
import { motion } from 'motion/react';

const GenreDropdown = dynamic(() => import('@/components/GenreDropdown'), {
  ssr: false,
});

type SelectOption ={
  value: number;
  label: string;
}

export default function MangaPage() {
  const [manga, setManga] = useState<Manga | null>(null);
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
      setLoading(true);

      //Fetch genre options from the API
      const genres = await GetGenreOptions();

      const selectOptions = genres.map((genre) => ({
        value: genre.mal_id,
        label: genre.name
      }));
      console.log('select options: ', selectOptions);
      setOptions(selectOptions);
      setLoading(false);
    }
    
    getOptions();
  }, []);



  const fetchMangaWithGenres = async () => {
    setLoading(true);
    const genreString = selections.join(',');
    const genreExcludeString = selectionsExclude.join(',');
    try{
      let url = `/api/jikan-genre?`;
      if (genreString) url += `genre=${genreString}`;
      if (genreExcludeString) url += `&genres_exclude=${genreExcludeString}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('failed to fetch manga with selected genres');
      }
      
      const data = await response.json();
      console.log('genre data: ', data);

      // setManga(data.data[randomInt]);
      setManga(data.data);
      setIsMangaFetched(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
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
      <p className="text-gray-600 mb-4">Select genres to include or exclude, then click &quot;Fetch Manga&quot;.</p>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {manga && (
        <div className="flex flex-row">
          <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">{manga.title}</h2>
            {manga.images?.jpg?.image_url && (
              <Image
                src={manga.images.jpg.image_url}
                alt={manga.title}
                width={400}
                height={600}
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
        <motion.button
          onClick={fetchMangaWithGenres}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.80 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 20,
          }}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Fetch Another
        </motion.button>
      )}


      {!isMangaFetched && (
        <motion.button
          onClick={fetchMangaWithGenres}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.80 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 20,
          }}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Get Manga
        </motion.button>
      )}

      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded max-w-xl mt-4" role="alert">
        <strong className="font-bold">Adult Content Warning: </strong>
        <span className="block sm:inline ml-1">
          Please be aware that some manga retrieved may contain adult content. Strong user discretion is advised.
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
'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import AdultContentWarning from '@/components/AdultContentWarning';
// import GenreDropdown from '@/components/GenreDropdown';
import dynamic from 'next/dynamic';
import { GetGenreOptions } from '../data/genre-options';
import Image from 'next/image';
import type { Manga } from '@/types/index';
import { motion, AnimatePresence } from 'motion/react';
import { PulseLoader } from 'react-spinners';

const GenreDropdown = dynamic(() => import('@/components/GenreDropdown'), {
  ssr: false,
});

type SelectOption ={
  value: number;
  label: string;
}

export default function GenreSearchPage() {
  const [manga, setManga] = useState<Manga | null>(null);
  const [isMangaFetched, setIsMangaFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [cantBeFoundError, setCantBeFoundError] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selections, setSelections] = useState<number[]>([])
  const [selectionsExclude, setSelectionsExclude] = useState<number[]>([]);
  const [mangadexUrl, setMangadexUrl] = useState('');

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
      // setLoading(true);

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
    setError('');
    setErrorDescription('');
    setCantBeFoundError(false);
    setMangadexUrl('');

    const genreString = selections.join(',');
    const genreExcludeString = selectionsExclude.join(',');
    try{
      let url = `/api/jikan-genre?`;
      if (genreString) url += `genre=${genreString}`;
      if (genreExcludeString) url += `&genres_exclude=${genreExcludeString}`;

      const response = await fetch(url);

      // check if no manga found for given genres
      if (response.status === 404) {
        const errData = await response.json();
        setError(errData.error || 'No manga found for the given combination of genres: ');
        setErrorDescription('Broader genre selections yield better results. Please try adjusting the genres you selected and try again.');
        setCantBeFoundError(true);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('failed to fetch manga with selected genres');
      }
      
      const data = await response.json();
      // console.log('genre data: ', data);
      // console.log('title: ', data.data.title);
      // console.log('MAL ID: ', data.data.mal_id);
      
      fetchMangadex(data.data.title, data.data.mal_id);
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

  const fetchMangadex = async (title: string, mal_id: number) => {
    try{
      const response = await fetch(`/api/mangadex-retrieve?title=${title}&mal_id=${mal_id}`);

      // update this in the future, as cannot exactly be considered an error, just that a result was not found
      // better way to handle this than big red error text on the screen
      if(response.status === 404) {
        setMangadexUrl('');
        throw new Error('No results found on Mangadex');
      }

      if(!response.ok) {
        throw new Error('Failed to fetch manga from Mangadex');
      }

      const data = await response.json();

      if (response.status === 404) {
        setMangadexUrl('');
        setError(data.error);
      } else {
        console.log('Mangadex data: ', data);
        setMangadexUrl(data.pageUrl);
      }
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  

 
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#2a2a2a] text-gray-100">
      <Header />
      <h1 className="text-3xl py-2 font-bold mb-4">Genre Search</h1>
      <p className="text-gray-400 mb-4">Select genres to include or exclude, then click &quot;Fetch Manga&quot;.</p>
      <div className="flex flex-col gap-6 py-4 md:flex-row md:gap-12 items-start">
        <div className="flex flex-col text-gray-400 min-w-[250px]">
          <motion.div
            key="include-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="font-bold">Include Genres</h2>
            <GenreDropdown onChange={handleSelectionChange} options={options.filter(opt => !selectionsExclude.includes(opt.value))}/>
          </motion.div>
        </div>
        <div className="flex flex-col text-gray-400 min-w-[250px]">
          <motion.div
            key="exclude-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="font-bold">Exclude Genres</h2>
            <GenreDropdown onChange={handleSelectionChangeExclude} options={options.filter(opt => !selections.includes(opt.value))}/>
          </motion.div>
        </div>
      </div>
      {/* {error && <p className="text-red-500">{error}</p>} */}

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row"
          >
            <div className="flex flex-row">
              {/* Manga Image Loader */}
              <div className="bg-[#121212] shadow-md rounded py-3 p-5 w-full max-w-md flex flex-col items-center justify-center">
                <PulseLoader color="#000000" size={15} />
              </div>

              {/* Manga Synopsis Loader */}
              <div className="bg-[#121212] shadow-md rounded py-3 p-5 w-full max-w-md flex items-center justify-center">
                <p className="text-gray-500 italic">Fetching new manga...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!loading && manga && !cantBeFoundError &&(
          <motion.div
            key="manga"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row"
          >
            <div className="flex flex-row">
              <div className="bg-[#121212] shadow-md rounded p-6 w-full max-w-md">
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
              <div className="bg-[#121212] shadow-md rounded p-5 w-full max-w-md">
                <p>{manga.synopsis || 'No synopsis available.'}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

      <AnimatePresence mode="wait">
        <div className="flex flex-col gap-6 md:flex-row md:gap-12 items-start">
          {mangadexUrl ? (
            // If we have a valid MangaDex URL, show the button
            <motion.div
              key={`md-button-${mangadexUrl}`} // unique key
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <motion.button
                onClick={() => window.open(mangadexUrl, '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 20,
                }}
                className="mt-6 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
              >
                Go to MangaDex
              </motion.button>
              <p className="mt-2 text-sm text-gray-600 max-w-xs">
                Note: Due to MangaDex&apos;s title searching methods, this link may not always be accurate.
              </p>
            </motion.div>
          ) : error ? (
            // If no MangaDex URL and there's an error, show it here
            <motion.div
              key={`md-error-${error}`} // unique key
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-4 rounded max-w-xs mt-6"
            >
              <p className="text-center">{error}</p>
              <p className="mt-1 text-sm text-gray-600 text-center">
                This manga could not be found on Mangadex, you can either search again or search manually for it.
              </p>
            </motion.div>
          ) : null}
        </div>
      </AnimatePresence>

      <AdultContentWarning />
      {/* <button
        onClick={fetchMangaWithGenres}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Fetch Another
      </button> */}
    </main>
  );
}
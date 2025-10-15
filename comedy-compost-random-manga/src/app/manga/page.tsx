'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import type { Manga } from '@/types/index';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { PulseLoader } from 'react-spinners';

export default function MangaPage() {
  const [manga, setManga] = useState<Manga | null>(null);
  const [isMangaFetched, setIsMangaFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mangadexUrl, setMangadexUrl] = useState('');
  // const [title, setTitle] = useState('');

  const fetchManga = async () => {
    // clear old results
    setMangadexUrl('');
    setLoading(true);
    setError('');

    try{
      const response = await fetch ('/api/jikan');

      if (!response.ok) {
        throw new Error('Failed to get random manga');
      }

      const data = await response.json();
      // const array = await GetGenreOptions()
      // console.log(array);
      fetchMangadex(data.data.title, data.mal_id);
      setIsMangaFetched(true);
      setManga({
        ...data.data,
        mal_id: data.mal_id,
      });
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

  const fetchMangadex = async (title: string, mal_id: number) => {
    try{
      const response = await fetch(`/api/mangadex-retrieve?title=${title}&mal_id=${mal_id}`);

      // update this in the future, as cannot exactly be considered an error, just that a result was not found
      // better way to handle this than big red error text on the screen
      if(response.status === 404) {
        setMangadexUrl('');
        throw new Error('No results found on mangadex');
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
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      <Header />
      {/* <GenreDropdown onChange={handleSelectionChange}/> */}
       <h1 className="text-3xl font-bold mb-4">Random Manga Finder</h1>
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
              <div className="bg-white shadow-md rounded p-6 w-full max-w-md flex flex-col items-center justify-center">
                <PulseLoader color="#000000" size={15} />
              </div>

              {/* Manga Synopsis Loader */}
              <div className="bg-white shadow-md rounded p-5 w-full max-w-md flex items-center justify-center">
                <p className="text-gray-500 italic">Fetching new manga...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!loading && manga && (
          <motion.div
            key="manga"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {manga && (
        <motion.button
          onClick={fetchManga}
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
          onClick={fetchManga}
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
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded max-w-xs mt-6"
            >
              <p>{error}</p>
              <p className="mt-1 text-sm text-gray-600">
                This manga could not be found on Mangadex, you can either search again or search manually for it.
              </p>
            </motion.div>
          ) : null}
        </div>
      </AnimatePresence>
      <div className="bg-red-100 border border-red-400 text-center text-red-700 px-4 py-4 rounded max-w-xl mt-4" role="alert">
        <strong className="font-bold">Sensitive Content Warning: </strong>
        <span className="block sm:inline ml-1">
          There are blocks in place to filter out manga that are specifically pornographic in nature, as this is not the intended use for this webapp. However, if these filters were made too strict, it would remove the possibility of finding some great stories, such as Berserk by Kentaro Miura.
          As a result, there is still a chance that some titles that contain pornographic material will appear and viewer discretion is advised.
        </span>
      </div>
      {/* <button
        onClick={fetchManga}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Fetch Another
      </button> */}
    </main>
  );
}

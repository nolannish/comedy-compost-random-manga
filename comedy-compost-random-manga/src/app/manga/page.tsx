'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import type { Manga } from '@/types/index';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function MangaPage() {
  const [manga, setManga] = useState<Manga | null>(null);
  const [isMangaFetched, setIsMangaFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchManga = async () => {
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
      setIsMangaFetched(true);
      setManga(data.data);
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

 
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      <Header />
      {/* <GenreDropdown onChange={handleSelectionChange}/> */}
       <h1 className="text-3xl font-bold mb-4">Random Manga Finder</h1>
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

      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded max-w-xl mt-4" role="alert">
        <strong className="font-bold">Sensitive Content Warning: </strong>
        <span className="block sm:inline ml-1">
          Some manga provided by this service may contain sensitive content, as it pull information from MyAnimeList.net which is known to host information about manga that may not be suitable for all audiences. Due to this function being completley random, I have no control over filtering this information out as of yet. Please be vigilant and double check whether the manga that you are viewing is suitable for you.
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

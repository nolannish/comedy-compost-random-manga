'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function MangaPage() {
  const [manga, setManga] = useState<any>(null);
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

  useEffect(() => {
    fetchManga();
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      <Header />
       <h1 className="text-3xl font-bold mb-4">Random Manga Finder</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {manga && (
        <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">{manga.title}</h2>
          {manga.images?.jpg?.image_url && (
            <img
              src={manga.images.jpg.image_url}
              alt={manga.title}
              className="w-full h-auto rounded mb-4"
            />
          )}
          <p>{manga.synopsis || 'No synopsis available.'}</p>
        </div>
      )}

      <button
        onClick={fetchManga}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Fetch Another
      </button>
    </main>
  );
}

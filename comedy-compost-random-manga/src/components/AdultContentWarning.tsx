'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function AdultContentWarning() {
  const [visible, setVisible] = useState(true);

  if(!visible) return null;

  return (
    <div className="relative bg-red-100 border border-red-400 text-center text-red-700 px-4 py-4 rounded max-w-xl mt-4" role="alert">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700 hover:bg-red-300 transition-colors"
        aria-label="Close warning"
      >
        <X size={18} />
      </button>
      <strong className="font-bold">Mature Content Warning: </strong>
      <span className="block sm:inline ml-1">
        Manga results are sourced from MyAnimeList and may include content that is unsuitable or inappropriate for some users. While measures have been taken to filter out such material, some results may still appears. Viewer discretion is advised.
      </span>
    </div>
  )
}
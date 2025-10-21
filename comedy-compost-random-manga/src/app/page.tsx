'use client';

import Header from "@/components/Header";
import { motion } from 'motion/react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#2a2a2a] text-gray-100">
      <Header />

      <section className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-shadow-lg mb-4">Random Manga Generator</h2>
        <p className="text-lg mb-6">Welcome to our random manga generator. Initially made for a YouTube Video, free for anyone to use!</p>
        <div className="flex flex-col gap-6 md:flex-row md:gap-12 items-start">
          <div className="flex flex-col">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.80 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 20,
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => {
                window.location.href = '/manga';
              }}
              >
                Get Manga
            </motion.button>
          </div>
          <div className="flex flex-col">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.80 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 20,
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => {
                window.location.href = '/genre-search';
              }}
              >
                Advanced Search
              </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
}

import GenreSearchPage from "./GenreSearchPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Manga Genre Search',
  description: 'Get random manga recommendations based on your favorite genres!',
};

export default function Page() {
  return (
    <GenreSearchPage />
  )
}
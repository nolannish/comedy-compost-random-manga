import MangaPage from "./MangaPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Manga Generator',
  description: 'Get a manga recommendation completely at random!',
};

export default function Page() {
  return (
    <MangaPage />
  )
}

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-800">Comedy Compost's Random Managa Generator</h1>
        </div>
        <nav className="flex flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8">
          <Link href="/manga" className="text-gray-600 hover:text-blue-600 font-medium">
            Get Manga
          </Link>
          <Link href='/about' className="text-gray-600 hover:text-blue-600 font-medium">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
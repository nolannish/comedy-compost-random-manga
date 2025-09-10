'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Header() {

  const pathname = usePathname();

  const navItems = [
    { name: 'Get Manga', href: '/manga' },
    { name: 'Advanced Search', href: '/genre-search' },
    { name: 'About', href: '/about' }
  ]

  return (
    <header className="bg-white shadow-md w-full">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href='/'>
            <h1 className="text-2xl font-bold text-gray-800">Comedy Compost&apos;s RMG</h1>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4">
          {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'px-2 py-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded-md transition-colors',
              {
                'font-bold text-blue-600': pathname === item.href,
              }
            )}
          >
            {item.name}
          </Link>
        ))}
        </nav>
      </div>
    </header>
  )
}
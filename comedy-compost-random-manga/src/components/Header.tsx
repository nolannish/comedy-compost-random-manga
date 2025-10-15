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
    <header className="bg-gradient-to-r from-[#384d48] to-[#334155] shadow-md border-b border-white/10 w-full">
      <div className="w-full mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href='/'>
            <h1 className="text-2xl font-semibold text-gray-100 hover:text-white transition-colors">Comedy Compost&apos;s RMG</h1>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4 font-medium">
          {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'relative px-3 py-2 text-gray-300 hover:text-white transition-all duration-200',
              'after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full after:opacity-0 hover:after:opacity-100',
              pathname === item.href && 'text-white after:w-full after:!left-0 after:opacity-100'
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
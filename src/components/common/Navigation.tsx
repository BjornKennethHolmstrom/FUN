import Link from 'next/link';
import { UserCircle, Bell, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-emerald-800 to-teal-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Left section - Logo and main nav */}
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold text-white">
                FUN(TIME)
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-emerald-100 hover:border-emerald-200 hover:text-white"
              >
                Dashboard
              </Link>
              <Link 
                href="/projects" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-emerald-100 hover:border-emerald-200 hover:text-white"
              >
                Projects Hub
              </Link>
              <Link 
                href="/action-hub" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-emerald-100 hover:border-emerald-200 hover:text-white"
              >
                Action Hub
              </Link>
              <Link 
                href="/community" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-emerald-100 hover:border-emerald-200 hover:text-white"
              >
                Community
              </Link>
              <Link 
                href="/learn" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-emerald-100 hover:border-emerald-200 hover:text-white"
              >
                Learn
              </Link>
            </div>
          </div>

          {/* Right section - Notifications and Profile */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button 
              className="rounded-full p-1 text-emerald-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
              aria-label="View notifications"
            >
              <Bell className="h-6 w-6" />
            </button>
            <Link 
              href="/profile" 
              className="group relative rounded-full p-1 text-emerald-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
              aria-label="View profile"
            >
              <UserCircle className="h-6 w-6" />
              <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Profile
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-emerald-100 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-emerald-100 hover:bg-emerald-700 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="block rounded-md px-3 py-2 text-base font-medium text-emerald-100 hover:bg-emerald-700 hover:text-white"
            >
              Projects Hub
            </Link>
            <Link
              href="/action-hub"
              className="block rounded-md px-3 py-2 text-base font-medium text-emerald-100 hover:bg-emerald-700 hover:text-white"
            >
              Action Hub
            </Link>
            <Link
              href="/community"
              className="block rounded-md px-3 py-2 text-base font-medium text-emerald-100 hover:bg-emerald-700 hover:text-white"
            >
              Community
            </Link>
            <Link
              href="/learn"
              className="block rounded-md px-3 py-2 text-base font-medium text-emerald-100 hover:bg-emerald-700 hover:text-white"
            >
              Learn
            </Link>
            <Link
              href="/profile"
              className="block rounded-md px-3 py-2 text-base font-medium text-emerald-100 hover:bg-emerald-700 hover:text-white"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

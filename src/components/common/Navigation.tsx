// src/components/common/Navigation.tsx
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
                href="/explore" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-emerald-100 hover:border-emerald-200 hover:text-white"
              >
                Explore Ideas
              </Link>
              <Link 
                href="/action-hub" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-blue-300 hover:text-gray-700"
              >
                Action Hub
              </Link>
              <Link 
                href="/community" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-blue-300 hover:text-gray-700"
              >
                Community
              </Link>
              <Link 
                href="/learn" 
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-blue-300 hover:text-gray-700"
              >
                Learn
              </Link>
            </div>
          </div>

          {/* Right section - Notifications and Profile */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button className="rounded-full p-1 text-emerald-100 hover:text-white">
              <Bell className="h-6 w-6" />
            </button>
            <Link href="/profile" className="rounded-full p-1 text-emerald-100 hover:text-white">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-emerald-100 hover:bg-emerald-700 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            <Link
              href="/explore"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-300 hover:bg-gray-50 hover:text-gray-700"
            >
              Explore Ideas
            </Link>
            <Link
              href="/action-hub"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-300 hover:bg-gray-50 hover:text-gray-700"
            >
              Action Hub
            </Link>
            <Link
              href="/community"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-300 hover:bg-gray-50 hover:text-gray-700"
            >
              Community
            </Link>
            <Link
              href="/learn"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-300 hover:bg-gray-50 hover:text-gray-700"
            >
              Learn
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

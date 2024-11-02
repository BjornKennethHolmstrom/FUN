// src/components/layout/MainLayout.tsx
import { ReactNode } from 'react';
import Head from 'next/head';
import Navigation from '../common/Navigation';
import OrganicSymbols from '../common/OrganicSymbols';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MainLayout({ 
  children, 
  title = 'FUN(TIME) - Freedom & Unity Network'
}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Freedom & Unity Network Through Individual Meaningful Effort" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <OrganicSymbols />
      
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </>
  );
}

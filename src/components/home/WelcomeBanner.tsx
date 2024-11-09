// src/components/home/WelcomeBanner.tsx
import { useState, useEffect } from 'react';
import { OrganicButton } from '../common/OrganicButton';

const quotes = [
  "Together we can create meaningful change",
  "Every individual effort nurtures global growth",
  "Unity through diversity, like nature itself",
  "Transform ourselves, transform the world"
];

export default function WelcomeBanner() {
  const [mounted, setMounted] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentQuote(prev => {
        const currentIndex = quotes.indexOf(prev);
        return quotes[(currentIndex + 1) % quotes.length];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C] p-12">
      {/* Organic background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="animate-emerge mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          FUN(TIME)
        </h1>
        <p className="animate-emerge mb-4 text-xl text-white/90">
          Freedom & Unity Network Through Individual Meaningful Effort
        </p>
        <p className="animate-emerge mb-8 text-lg italic text-white/80 transition-opacity duration-700">
          {currentQuote}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <OrganicButton variant="butterfly" href="/join">
            Join the Movement
          </OrganicButton>
          <OrganicButton variant="seed" href="/learn-more">
            Learn More
          </OrganicButton>
        </div>
      </div>

      {/* Living border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 transition-all duration-700 hover:border-white/20" />
    </div>
  );
}

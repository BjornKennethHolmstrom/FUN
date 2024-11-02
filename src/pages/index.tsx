// src/pages/index.tsx
import MainLayout from '../components/layout/MainLayout';
import WelcomeBanner from '../components/home/WelcomeBanner';
import QuickActions from '../components/home/QuickActions';
// import HighlightsFeed from '../components/home/HighlightsFeed';

export default function Home() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#1B4332]/5 to-white">
        {/* Organic background pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-0 h-full w-full transform bg-[#40916C]/5 blur-3xl" />
          <div className="absolute -bottom-1/2 right-0 h-full w-full transform bg-[#48CAE4]/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12">
          <WelcomeBanner />
          <QuickActions />
          { /*<HighlightsFeed />*/}
        </div>
      </div>
    </MainLayout>
  );
}

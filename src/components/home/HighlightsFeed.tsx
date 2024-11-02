// src/components/home/HighlightsFeed.tsx
import { trpc } from '@/lib/trpc';
import { BookOpen, Users, Calendar, Newspaper } from 'lucide-react';

export default function HighlightsFeed() {
  const { data: posts, isLoading } = trpc.post.getAll.useQuery();

  const getIcon = (type: string) => {
    switch (type) {
      case 'RESOURCE':
        return BookOpen;
      case 'SOCIAL':
        return Users;
      case 'EVENT':
        return Calendar;
      default:
        return Newspaper;
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="my-8">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">What's Happening Now</h2>
      <div className="space-y-4">
        {posts?.map((post) => {
          const Icon = getIcon(post.type);
          return (
            <div
              key={post.id}
              className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 p-3">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-gray-600">{post.content}</p>
                  {post.type === 'EVENT' && (
                    <p className="mt-2 text-sm text-emerald-600">
                      {new Date().toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

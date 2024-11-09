import React, { useState } from 'react';
import { Search, Filter, Tag, Users, ArrowRight } from 'lucide-react';
import Card from '../common/Card';

const categories = [
  { id: 'sustainability', name: 'Sustainability', count: 24 },
  { id: 'education', name: 'Education', count: 18 },
  { id: 'equality', name: 'Equality', count: 15 },
  { id: 'health', name: 'Health', count: 21 },
  { id: 'democracy', name: 'Democracy', count: 12 },
  { id: 'technology', name: 'Technology', count: 9 },
];

// Example idea data structure
const mockIdeas = [
  {
    id: 1,
    title: "Community Solar Networks",
    description: "Creating decentralized solar power networks managed by local communities",
    category: "sustainability",
    stage: "larvae",
    tags: ["renewable-energy", "community", "infrastructure"],
    contributors: 156,
    impact: "Regional",
  },
  {
    id: 2,
    title: "Open Education Platform",
    description: "Developing free, accessible learning resources for everyone",
    category: "education",
    stage: "butterfly",
    tags: ["learning", "accessibility", "digital"],
    contributors: 234,
    impact: "Global",
  },
  {
    id: 3,
    title: "Local Food Systems",
    description: "Building sustainable local food production and distribution networks",
    category: "sustainability",
    stage: "pupa",
    tags: ["food", "local", "sustainability"],
    contributors: 89,
    impact: "Local",
  },
];

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Explore Ideas</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover and join transformative initiatives at various stages of development
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search ideas..."
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Categories */}
        <div className="mb-12 flex flex-wrap gap-2">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${selectedCategory === 'all' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Ideas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${selectedCategory === category.id 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Ideas Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockIdeas.map((idea) => (
            <Card key={idea.id} className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="p-6">
                {/* Stage Indicator */}
                <div className="mb-4 flex items-center gap-2">
                  <div className={`rounded-full px-3 py-1 text-sm font-medium
                    ${idea.stage === 'egg' ? 'bg-gray-100 text-gray-700' : ''}
                    ${idea.stage === 'larvae' ? 'bg-emerald-100 text-emerald-700' : ''}
                    ${idea.stage === 'pupa' ? 'bg-amber-100 text-amber-700' : ''}
                    ${idea.stage === 'butterfly' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {idea.stage.charAt(0).toUpperCase() + idea.stage.slice(1)} Stage
                  </div>
                  <span className="text-sm text-gray-500">{idea.impact}</span>
                </div>

                {/* Title and Description */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{idea.title}</h3>
                <p className="mb-4 text-gray-600">{idea.description}</p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Contributors and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    {idea.contributors} contributors
                  </div>
                  <ArrowRight className="h-5 w-5 text-emerald-500 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;

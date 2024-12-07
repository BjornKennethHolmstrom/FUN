// src/pages/projects.tsx
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Tag, 
  Users, 
  ArrowRight,
  Globe,
  Sparkles,
  Link as LinkIcon,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import Card from '../common/Card';
import { OrganicButton } from '../common/OrganicButton';
import AnimatedStageIcon from '../common/AnimatedStageIcon';

// Example data structure for projects
const mockProjects = [
  {
    id: 1,
    title: "Open Source Ecology",
    description: "Creating open source industrial machines for sustainable living",
    type: "existing",
    category: "sustainability",
    stage: "butterfly",
    tags: ["open-source", "sustainability", "technology"],
    contributors: 156,
    impact: "Global",
    website: "https://www.opensourceecology.org",
    verified: true
  },
  {
    id: 2,
    title: "Local Food Network",
    description: "Building sustainable local food distribution networks",
    type: "new",
    category: "food",
    stage: "larvae",
    tags: ["food", "local", "community"],
    contributors: 12,
    impact: "Local",
    seeking: ["Coordinators", "Local Farmers"]
  }
];

export default function ProjectsHub() {
  const [view, setView] = useState('all'); // 'all', 'existing', 'new'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Projects Hub</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover existing initiatives or start something new
          </p>
        </div>

        {/* View Toggle */}
        <div className="mb-6 flex gap-4">
          <button 
            onClick={() => setView('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${view === 'all' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setView('existing')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${view === 'existing' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Globe className="h-4 w-4" />
            Existing Projects
          </button>
          <button 
            onClick={() => setView('new')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${view === 'new' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Sparkles className="h-4 w-4" />
            New Projects
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
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
          <OrganicButton 
            href="/projects/new"
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Project
          </OrganicButton>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockProjects
            .filter(project => view === 'all' || project.type === view)
            .map((project) => (
            <Card 
              key={project.id} 
              className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="p-6">
                {/* Project Type & Stage */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full px-3 py-1 text-sm font-medium
                      ${project.type === 'existing' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}
                    `}>
                      {project.type === 'existing' ? 'Established' : 'New'}
                    </div>
                    {project.verified && (
                      <div className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                        Verified
                      </div>
                    )}
                  </div>
                  <AnimatedStageIcon 
                    type={project.stage}
                    className="h-6 w-6 text-gray-400"
                  />
                </div>

                {/* Title and Description */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{project.title}</h3>
                <p className="mb-4 text-gray-600">{project.description}</p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Project Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    {project.contributors} contributors
                  </div>
                  {project.type === 'existing' ? (
                    <Link 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Visit Project
                    </Link>
                  ) : (
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      <ArrowRight className="h-4 w-4" />
                      Learn More
                    </Link>
                  )}
                </div>

                {/* Seeking (for new projects) */}
                {project.type === 'new' && project.seeking && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-sm font-medium text-gray-700">Seeking:</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.seeking.map((role) => (
                        <span key={role} className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

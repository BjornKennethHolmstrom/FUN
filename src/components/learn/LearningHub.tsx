import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Award,
  Clock,
  Filter,
  Calendar,
  ArrowRight,
  Search,
  Star,
  Play,
  FileText,
  MessageCircle
} from 'lucide-react';
import Card from '../common/Card';
import { OrganicButton } from '../common/OrganicButton';
import AnimatedStageIcon from '../common/AnimatedStageIcon';
import StageProgress from '../common/StageProgress';

// Mock data
const learningPaths = [
  {
    id: 'personal',
    title: 'Personal Growth',
    description: 'Develop your skills and understanding',
    progress: 65,
    activeUsers: 234,
    nextStep: 'Systems Thinking Fundamentals',
    stage: 'larvae'
  },
  {
    id: 'community',
    title: 'Community Building',
    description: 'Learn to create and nurture local initiatives',
    progress: 40,
    activeUsers: 189,
    nextStep: 'Facilitation Skills',
    stage: 'pupa'
  },
  {
    id: 'global',
    title: 'Global Impact',
    description: 'Understanding global systems and change',
    progress: 25,
    activeUsers: 156,
    nextStep: 'International Cooperation',
    stage: 'egg'
  }
];

const resources = [
  {
    id: 1,
    title: 'Introduction to System Change',
    type: 'course',
    format: 'interactive',
    duration: '2 hours',
    level: 'beginner',
    progress: 0,
    description: 'Learn the fundamentals of systems thinking and change',
    image: '/api/placeholder/400/200'
  },
  {
    id: 2,
    title: 'Community Organizing Workshop',
    type: 'workshop',
    format: 'video',
    duration: '1.5 hours',
    level: 'intermediate',
    progress: 60,
    description: 'Practical strategies for building local movements',
    image: '/api/placeholder/400/200'
  },
  {
    id: 3,
    title: 'Global Cooperation Guide',
    type: 'guide',
    format: 'text',
    duration: '45 mins',
    level: 'advanced',
    progress: 100,
    description: 'Best practices for international collaboration',
    image: '/api/placeholder/400/200'
  }
];

const upcomingSessions = [
  {
    title: 'Systems Thinking Workshop',
    type: 'workshop',
    datetime: '2024-03-20T14:00:00',
    duration: '2 hours',
    participants: 24
  },
  {
    title: 'Community Building Study Group',
    type: 'study_group',
    datetime: '2024-03-21T16:00:00',
    duration: '1 hour',
    participants: 12
  },
  {
    title: 'Expert Talk: Future of Democracy',
    type: 'talk',
    datetime: '2024-03-22T18:00:00',
    duration: '1 hour',
    participants: 156
  }
];

export default function LearningHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const getFormatIcon = (format) => {
    switch (format) {
      case 'video': return Play;
      case 'text': return FileText;
      case 'interactive': return MessageCircle;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Learning Hub</h1>
          <p className="mb-8 text-lg text-gray-600">
            Grow your knowledge, expand your impact
          </p>
          <div className="mx-auto max-w-4xl">
            <StageProgress 
              currentStage="larvae"
              onStageClick={(stage) => console.log('Stage clicked:', stage)}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <Card className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Award className="mr-3 h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Badges</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Star className="mr-3 h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Contributed</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Learning Paths */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Learning Paths</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {learningPaths.map((path) => (
              <Card 
                key={path.id}
                className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                    <AnimatedStageIcon 
                      type={path.stage}
                      className="h-6 w-6 text-emerald-600"
                      isActive={true}
                    />
                  </div>
                  <p className="mb-4 text-gray-600">{path.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-emerald-600">{path.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {path.activeUsers} active learners
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-900">Next Step:</p>
                    <p className="text-sm text-gray-600">{path.nextStep}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Resources Section */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select 
                  className="rounded-lg border border-gray-300 p-2"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  <option value="all">All Formats</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                  <option value="interactive">Interactive</option>
                </select>
                <select
                  className="rounded-lg border border-gray-300 p-2"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((resource) => (
                <Card 
                  key={resource.id}
                  className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="h-48 w-full rounded-t-lg object-cover"
                    />
                    {resource.progress > 0 && (
                      <div className="absolute bottom-0 h-1 w-full bg-gray-200">
                        <div 
                          className="h-1 bg-emerald-500"
                          style={{ width: `${resource.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                        {resource.type}
                      </span>
                      <span className="flex items-center text-sm text-gray-600">
                        <Clock className="mr-1 h-4 w-4" />
                        {resource.duration}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{resource.title}</h3>
                    <p className="mb-4 text-gray-600">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Level: {resource.level}
                      </span>
                      <ArrowRight className="h-5 w-5 text-emerald-500 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Side Section */}
          <div className="space-y-8">
            {/* Live Learning */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div 
                      key={index}
                      className="rounded-lg bg-gray-50 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{session.title}</h3>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                          {session.type}
                        </span>
                      </div>
                      <div className="mb-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(session.datetime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {session.duration}
                        </div>
                      </div>
                      <OrganicButton variant="seed" className="w-full justify-center">
                        Join Session
                      </OrganicButton>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Learning Community */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Learning Community</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <p className="font-medium text-gray-900">Study Groups</p>
                      <p className="text-sm text-gray-600">5 active groups</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <p className="font-medium text-gray-900">Discussion Forum</p>
                      <p className="text-sm text-gray-600">12 active discussions</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <p className="font-medium text-gray-900">Q&A</p>
                      <p className="text-sm text-gray-600">Ask the community</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

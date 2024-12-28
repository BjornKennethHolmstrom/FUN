import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Calendar, 
  Filter,
  Plus,
  Star,
  MapPin,
  ArrowRight,
  Award
} from 'lucide-react';
import Card from '../common/Card';
import { OrganicButton } from '../common/OrganicButton';
import AnimatedStageIcon from '../common/AnimatedStageIcon';
import StageProgress from '../common/StageProgress';

// Mock data
const communityGroups = [
  {
    id: 1,
    name: "Local Food Network",
    description: "Building sustainable food systems in our community",
    members: 128,
    stage: "larvae",
    location: "Stockholm",
    interests: ["sustainability", "food", "local"],
    image: "/api/placeholder/400/200"
  },
  {
    id: 2,
    name: "Digital Education Circle",
    description: "Making technology education accessible to everyone",
    members: 256,
    stage: "butterfly",
    location: "Global",
    interests: ["education", "technology", "accessibility"],
    image: "/api/placeholder/400/200"
  },
  {
    id: 3,
    name: "Urban Gardens Initiative",
    description: "Creating green spaces in urban environments",
    members: 89,
    stage: "pupa",
    location: "Oslo",
    interests: ["environment", "community", "sustainability"],
    image: "/api/placeholder/400/200"
  }
];

const activityFeed = [
  {
    type: "milestone",
    title: "Local Food Network reached 100 members!",
    time: "2 hours ago"
  },
  {
    type: "achievement",
    title: "Digital Education Circle completed 50 workshops",
    time: "5 hours ago"
  },
  {
    type: "new_group",
    title: "New group: Climate Action Network",
    time: "1 day ago"
  }
];

const featuredMembers = [
  {
    name: "Sarah Chen",
    role: "Community Leader",
    stage: "butterfly",
    contribution: "Led 20+ workshops"
  },
  {
    name: "Alex Kim",
    role: "Project Coordinator",
    stage: "pupa",
    contribution: "Started 3 local initiatives"
  }
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">FUN Community</h1>
          <p className="mb-8 text-lg text-gray-600">
            Connect, collaborate, and grow together
          </p>
          <div className="mx-auto max-w-4xl">
            <StageProgress 
              currentStage="larvae"
              onStageClick={(stage) => console.log('Stage clicked:', stage)}
            />
          </div>
        </div>

        {/* Stats and Quick Actions */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {/* Community Stats */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Community Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Members</span>
                <span className="text-2xl font-bold text-emerald-600">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Groups</span>
                <span className="text-2xl font-bold text-emerald-600">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Impact</span>
                <span className="text-2xl font-bold text-emerald-600">45K</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <OrganicButton variant="seed" className="justify-center">
                <Plus className="mr-2 h-4 w-4" />
                Start a Group
              </OrganicButton>
              <OrganicButton variant="bloom" className="justify-center">
                <Users className="mr-2 h-4 w-4" />
                Find Mentors
              </OrganicButton>
              <OrganicButton variant="butterfly" className="justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                See Events
              </OrganicButton>
            </div>
          </Card>

          {/* Search and Filters */}
          <Card className="p-6">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <select
                className="w-full rounded-lg border border-gray-300 p-2"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="stockholm">Stockholm</option>
                <option value="oslo">Oslo</option>
                <option value="global">Global</option>
              </select>
              <select
                className="w-full rounded-lg border border-gray-300 p-2"
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
              >
                <option value="all">All Interests</option>
                <option value="sustainability">Sustainability</option>
                <option value="education">Education</option>
                <option value="technology">Technology</option>
              </select>
              <select
                className="w-full rounded-lg border border-gray-300 p-2"
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
              >
                <option value="all">All Stages</option>
                <option value="egg">Egg</option>
                <option value="larvae">Larvae</option>
                <option value="pupa">Pupa</option>
                <option value="butterfly">Butterfly</option>
              </select>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Groups Grid */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Community Groups</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {communityGroups.map((group) => (
                <Card 
                  key={group.id}
                  className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="h-48 w-full rounded-t-lg object-cover"
                    />
                    <div className="absolute bottom-4 right-4">
                      <AnimatedStageIcon 
                        type={group.stage}
                        className="h-8 w-8 text-white"
                        isActive={true}
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
                      <span className="flex items-center text-sm text-gray-600">
                        <Users className="mr-1 h-4 w-4" />
                        {group.members}
                      </span>
                    </div>
                    <p className="mb-4 text-gray-600">{group.description}</p>
                    <div className="mb-4 flex items-center text-sm text-gray-600">
                      <MapPin className="mr-1 h-4 w-4" />
                      {group.location}
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {group.interests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    <OrganicButton variant="seed" className="w-full justify-center">
                      Join Group
                    </OrganicButton>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h2>
                <div className="space-y-4">
                  {activityFeed.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-gray-50 p-4"
                    >
                      {activity.type === 'milestone' && (
                        <Star className="h-5 w-5 text-yellow-500" />
                      )}
                      {activity.type === 'achievement' && (
                        <Award className="h-5 w-5 text-emerald-500" />
                      )}
                      {activity.type === 'new_group' && (
                        <Users className="h-5 w-5 text-blue-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Featured Members */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Featured Members</h2>
                <div className="space-y-4">
                  {featuredMembers.map((member, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
                    >
                      <div className="h-12 w-12 rounded-full bg-emerald-100 p-2">
                        <AnimatedStageIcon 
                          type={member.stage}
                          className="h-full w-full text-emerald-600"
                          isActive={true}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-emerald-600">{member.role}</p>
                        <p className="text-sm text-gray-500">{member.contribution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

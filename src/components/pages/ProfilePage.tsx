import React from 'react';
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  BookOpen, 
  Users,
  Edit,
  Flag
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/common/Card';
import AnimatedStageIcon from '@/components/common/AnimatedStageIcon';
import { OrganicButton } from '@/components/common/OrganicButton';

// This will eventually come from API/database
const mockUser = {
  name: "Sarah Chen",
  stage: "larvae",
  email: "sarah@example.com",
  location: "Stockholm, Sweden",
  joinedDate: "2024-01-15",
  bio: "Passionate about sustainable development and community building. Working to create positive change through local initiatives and global connections.",
  interests: ["sustainability", "education", "community-building", "technology"],
  recentActivity: [
    { type: "campaign", title: "Local Food Network", date: "2024-03-15" },
    { type: "resource", title: "Guide: Community Organizing", date: "2024-03-10" },
    { type: "connection", title: "Connected with Alex Kim", date: "2024-03-08" }
  ],
  stats: {
    campaigns: 3,
    contributions: 12,
    connections: 28
  }
};

const activityIcons = {
  campaign: Flag,
  resource: BookOpen,
  connection: Users
};

export default function ProfilePage() {
  return (
    <MainLayout title={`${mockUser.name} - FUN(TIME) Profile`}>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="relative mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Image Placeholder */}
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 flex items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-700">
                    {mockUser.name.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{mockUser.name}</h1>
                  <div className="mt-2 flex items-center space-x-4 text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {mockUser.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Joined {new Date(mockUser.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <OrganicButton variant="seed" href="/profile/edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </OrganicButton>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Info Cards */}
            <div className="space-y-8">
              {/* Stage Card */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Current Stage</h2>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <AnimatedStageIcon 
                        type={mockUser.stage}
                        className="mx-auto mb-4 h-16 w-16 text-emerald-600"
                        isActive={true}
                      />
                      <p className="text-sm font-medium text-gray-900 capitalize">{mockUser.stage} Stage</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats Card */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Impact Stats</h2>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">{mockUser.stats.campaigns}</p>
                      <p className="text-sm text-gray-500">Campaigns</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">{mockUser.stats.contributions}</p>
                      <p className="text-sm text-gray-500">Contributions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">{mockUser.stats.connections}</p>
                      <p className="text-sm text-gray-500">Connections</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Interests Card */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Bio and Activity */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio Card */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">About</h2>
                  <p className="text-gray-600">{mockUser.bio}</p>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h2>
                  <div className="space-y-4">
                    {mockUser.recentActivity.map((activity, index) => {
                      const Icon = activityIcons[activity.type];
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4"
                        >
                          <div className="rounded-full bg-emerald-100 p-2">
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

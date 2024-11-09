import React from 'react';
import Card from '../common/Card';
import { Activity, Calendar, BookOpen, Users, Star, Flag } from 'lucide-react';
import StageProgress from '../common/StageProgress';

const UserDashboard = ({ user = {
  name: "Example User",
  stage: "larvae",
  joinedCampaigns: 3,
  completedActions: 12,
  upcomingEvents: 2,
  savedResources: 5,
  connections: 8
} }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
        <p className="text-gray-600 mt-2">Continue your journey of meaningful change</p>
      </div>

      {/* Stage Progress */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Transformation Journey</h2>
        <StageProgress 
          currentStage={user.stage}
          onStageClick={(stage) => console.log('Stage clicked:', stage)}
        />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Flag className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{user.joinedCampaigns}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Actions</p>
              <p className="text-2xl font-bold text-gray-900">{user.completedActions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Connections</p>
              <p className="text-2xl font-bold text-gray-900">{user.connections}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upcoming Activities */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Activities</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Example Campaign Meeting</p>
                  <p className="text-sm text-gray-600">Tomorrow at 3:00 PM</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column - Resources and Learning */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Resources</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                <BookOpen className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Resource Title</p>
                  <p className="text-sm text-gray-600">Category</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;

import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  MapPin, 
  Calendar,
  Filter,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Download,
  Star,
  Globe,
  MessageCircle
} from 'lucide-react';
import Card from '../common/Card';
import { OrganicButton } from '../common/OrganicButton';

// Mock data
const urgentActions = [
  {
    id: 1,
    title: "Community Garden Defense",
    description: "Support local garden threatened by development",
    deadline: "2024-03-19T15:00:00",
    participantsNeeded: 100,
    currentParticipants: 45,
    type: "local",
    location: "Stockholm Center"
  },
  {
    id: 2,
    title: "Emergency Food Distribution",
    description: "Volunteers needed for food distribution",
    deadline: "2024-03-18T18:00:00",
    participantsNeeded: 20,
    currentParticipants: 12,
    type: "local",
    location: "South Stockholm"
  },
  {
    id: 3,
    title: "Digital Rights Campaign",
    description: "Sign and share the petition for digital privacy",
    deadline: "2024-03-25T23:59:59",
    participantsNeeded: 200,
    currentParticipants: 89,
    type: "digital",
    location: "Online"
  }
];

const campaigns = [
  {
    id: 1,
    title: "Clean Energy Transition",
    description: "Supporting local renewable energy initiatives",
    type: "petition",
    goal: 1000,
    current: 750,
    deadline: "2024-04-01T00:00:00",
    image: "/api/placeholder/400/200",
    location: "Stockholm",
    category: "environment"
  },
  {
    id: 2,
    title: "Youth Education Access",
    description: "Expanding educational opportunities for underprivileged youth",
    type: "community",
    goal: 50,
    current: 30,
    deadline: "2024-03-28T00:00:00",
    image: "/api/placeholder/400/200",
    location: "Multiple Cities",
    category: "education"
  },
  {
    id: 3,
    title: "Public Transport Improvement",
    description: "Campaign for better public transportation",
    type: "local",
    goal: 500,
    current: 275,
    deadline: "2024-03-31T00:00:00",
    image: "/api/placeholder/400/200",
    location: "Stockholm",
    category: "infrastructure"
  }
];

const upcomingEvents = [
  {
    title: "Community Meeting",
    datetime: "2024-03-18T18:00:00",
    location: "Community Center",
    type: "meeting"
  },
  {
    title: "Direct Action Training",
    datetime: "2024-03-18T19:30:00",
    location: "Online",
    type: "training"
  },
  {
    title: "Clean-up Action",
    datetime: "2024-03-19T10:00:00",
    location: "City Park",
    type: "action"
  }
];

export default function ActionHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return 'Ending soon';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Action Hub</h1>
          <p className="text-lg text-gray-600">
            Take immediate action for positive change
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-12 grid gap-6 sm:grid-cols-4">
          <Card className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Star className="mr-3 h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Calendar className="mr-3 h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Events This Week</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Users className="mr-3 h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">People Taking Action</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Globe className="mr-3 h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Total Impact</p>
                <p className="text-2xl font-bold text-gray-900">1.2K</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Urgent Actions */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Urgent Actions</h2>
            <span className="animate-pulse text-red-600">
              <AlertCircle className="h-5 w-5" />
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {urgentActions.map((action) => (
              <Card 
                key={action.id}
                className="group overflow-hidden"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                        {getTimeRemaining(action.deadline)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {action.type}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{action.title}</h3>
                    <p className="mb-4 text-gray-600">{action.description}</p>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Participants Needed</span>
                      <span className="font-medium text-emerald-600">
                        {action.currentParticipants}/{action.participantsNeeded}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-emerald-500 transition-all"
                        style={{ 
                          width: `${(action.currentParticipants / action.participantsNeeded) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex items-center text-sm text-gray-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    {action.location}
                  </div>

                  <OrganicButton variant="bloom" className="w-full justify-center">
                    Take Action
                  </OrganicButton>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Campaigns Section */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Current Campaigns</h2>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select 
                  className="rounded-lg border border-gray-300 p-2"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  <option value="stockholm">Stockholm</option>
                  <option value="online">Online</option>
                </select>
                <select
                  className="rounded-lg border border-gray-300 p-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="environment">Environment</option>
                  <option value="education">Education</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <Card 
                  key={campaign.id}
                  className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="h-48 w-full object-cover sm:h-full"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                            {campaign.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {getTimeRemaining(campaign.deadline)}
                          </span>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">{campaign.title}</h3>
                        <p className="mb-4 text-gray-600">{campaign.description}</p>
                      </div>

                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-emerald-600">
                            {campaign.current}/{campaign.goal}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div 
                            className="h-2 rounded-full bg-emerald-500 transition-all"
                            style={{ 
                              width: `${(campaign.current / campaign.goal) * 100}%` 
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-1 h-4 w-4" />
                          {campaign.location}
                        </div>
                        <OrganicButton variant="seed">
                          Join Campaign
                        </OrganicButton>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Side Section */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div 
                      key={index}
                      className="rounded-lg bg-gray-50 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                          {event.type}
                        </span>
                      </div>
                      <div className="mb-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(event.datetime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      <OrganicButton variant="seed" className="w-full justify-center">
                        RSVP
                      </OrganicButton>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Resource Center */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Resource Center</h2>
                <div className="space-y-4">
                  <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Campaign Templates</p>
                      <p className="text-sm text-gray-600">Ready-to-use campaign materials</p>
                    </div>
                    <Download className="h-5 w-5 text-emerald-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Action Guides</p>
                      <p className="text-sm text-gray-600">Step-by-step action guides</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-emerald-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Social Media Kit</p>
                      <p className="text-sm text-gray-600">Share your impact</p>
                    </div>
                    <Download className="h-5 w-5 text-emerald-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Safety Guidelines</p>
                      <p className="text-sm text-gray-600">Important safety information</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-emerald-500" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

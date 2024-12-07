import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Tag,
  Save
} from 'lucide-react';
import Card from '@/components/common/Card';
import MainLayout from '@/components/layout/MainLayout';
import { OrganicButton } from '@/components/common/OrganicButton';
import AnimatedStageIcon from '@/components/common/AnimatedStageIcon';

// This will eventually come from API/database
const mockUser = {
  name: "Sarah Chen",
  stage: "larvae",
  email: "sarah@example.com",
  location: "Stockholm, Sweden",
  bio: "Passionate about sustainable development and community building. Working to create positive change through local initiatives and global connections.",
  interests: ["sustainability", "education", "community-building", "technology"],
};

const availableInterests = [
  // Existing categories
  "sustainability",
  "education",
  "community-building",
  "technology",
  "social-justice",
  "health",
  "democracy",
  "arts-culture",
  "innovation",
  "environment",
  
  // Unity and Understanding categories
  "interfaith-dialogue",          // For uniting faiths
  "science-spirituality",         // Bridging science and spiritual perspectives
  "secular-sacred-bridge",        // Connecting secular and religious worldviews
  "consciousness-exploration",    // For thoughtful discussion of psychedelics/entheogens
  "cross-cultural-unity",         // Building understanding between cultures
  "future-life-preparedness",     // Preparing for potential contact with new forms of life
  "human-ai-harmony",            // Fostering positive human-AI relations
  "nature-human-connection",     // Reconnecting humans with nature
  "global-unity",                // Uniting humanity across borders
  "fear-to-understanding",       // Converting fear of the unknown into curiosity
  
  // Meta categories
  "bridging-divides",            // General category for unity work
  "wisdom-traditions",           // Understanding different knowledge systems
  "future-anthropology",         // Studying potential future human developments
  "bioharmony",                  // Harmony between biological and technological systems
];

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    location: mockUser.location,
    bio: mockUser.bio,
    interests: mockUser.interests
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Add API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title="Edit Profile - FUN(TIME)">
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <button 
              onClick={() => router.push('/profile')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Profile
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Info Card */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900">Basic Information</h2>
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Bio Card */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900">About You</h2>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="Tell us about yourself, your motivations, and what you hope to achieve..."
                  />
                </div>
              </Card>

              {/* Interests Card */}
              <Card>
                <div className="p-6">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {availableInterests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                          ${formData.interests.includes(interest)
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        <span className="flex items-center">
                          <Tag className="mr-1 h-3 w-3" />
                          {interest}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <OrganicButton
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </OrganicButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

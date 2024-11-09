import React, { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useRouter } from 'next/router';
import { Stage } from '@prisma/client';
import { 
  User, 
  Mail, 
  Lock, 
  Globe, 
  MapPin, 
  Heart,
  ChevronRight,
  ChevronLeft,
  CheckCircle
} from 'lucide-react';
import Card from '../common/Card';

type FormStep = 'basics' | 'interests' | 'journey' | 'confirm';

interface FormData {
  email: string;
  password: string;
  name: string;
  location: string;
  interests: string[];
  motivation: string;
  startingPath: 'personal' | 'community' | 'global';
  preferredLanguage: string;
  agreeToTerms: boolean;
  subscribeToUpdates: boolean;
}

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<FormStep>('basics');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    location: '',
    interests: [],
    motivation: '',
    startingPath: '',
    preferredLanguage: 'en',
    agreeToTerms: false,
    subscribeToUpdates: true
  });

  const interests = [
    'Environmental Sustainability',
    'Social Justice',
    'Education',
    'Healthcare',
    'Technology',
    'Community Building',
    'Economic Justice',
    'Arts & Culture',
    'Democracy & Governance',
    'Peace & Conflict Resolution'
  ];

  const paths = [
    {
      id: 'personal',
      title: 'Personal Growth',
      description: 'Focus on individual transformation and local impact'
    },
    {
      id: 'community',
      title: 'Community Builder',
      description: 'Connect and strengthen local networks'
    },
    {
      id: 'global',
      title: 'Global Catalyst',
      description: 'Work on international initiatives and connections'
    }
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    updateFormData('interests', newInterests);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'basics':
        return formData.email && formData.password && formData.name;
      case 'interests':
        return formData.interests.length > 0;
      case 'journey':
        return formData.startingPath && formData.motivation;
      case 'confirm':
        return formData.agreeToTerms;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'confirm' && formData.agreeToTerms) {
      try {
        await signup.mutate({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          location: formData.location,
          interests: formData.interests,
          motivation: formData.motivation,
          startingPath: formData.startingPath,
          preferredLanguage: formData.preferredLanguage,
          subscribeToUpdates: formData.subscribeToUpdates,
        });
      } catch (error) {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // Get the mutation
  const signup = trpc.user.signup.useMutation({
    onSuccess: (data) => {
      // Store the token in localStorage or a secure cookie
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard or onboarding
      router.push('/dashboard');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Add error display to the form
  const renderError = () => {
    if (!error) return null;
    return (
      <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
        <p className="text-sm">{error}</p>
      </div>
    );
  };

  // Add loading state to the submit button
  const isLoading = signup.isLoading;


  const renderStep = () => {
    switch (currentStep) {
      case 'basics':
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your@email.com"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Your name"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="City, Country"
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select the areas you're most passionate about (select at least one):
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors
                    ${formData.interests.includes(interest)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      case 'journey':
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Choose your starting path:
              </label>
              <div className="space-y-3">
                {paths.map((path) => (
                  <div
                    key={path.id}
                    onClick={() => updateFormData('startingPath', path.id)}
                    className={`cursor-pointer rounded-lg border p-4 transition-colors
                      ${formData.startingPath === path.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-200'
                      }`}
                  >
                    <h3 className="font-medium text-gray-900">{path.title}</h3>
                    <p className="text-sm text-gray-600">{path.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                What motivates you to join FUN?
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                rows={4}
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                placeholder="Share your story and what brings you here..."
              />
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="space-y-6">
            <div className="rounded-lg bg-emerald-50 p-4">
              <h3 className="mb-2 font-medium text-emerald-800">
                Ready to begin your journey!
              </h3>
              <ul className="space-y-2 text-sm text-emerald-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {formData.interests.length} areas of interest selected
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Starting as a {paths.find(p => p.id === formData.startingPath)?.title}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Connected from {formData.location}
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  checked={formData.agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                />
                <span className="text-sm text-gray-600">
                  I agree to FUN's Terms of Service and Privacy Policy, and commit to contributing positively to the community
                </span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  checked={formData.subscribeToUpdates}
                  onChange={(e) => updateFormData('subscribeToUpdates', e.target.checked)}
                />
                <span className="text-sm text-gray-600">
                  Keep me updated about FUN's activities and opportunities (you can unsubscribe anytime)
                </span>
              </label>
            </div>
          </div>
        );
    }
  };

  const steps: FormStep[] = ['basics', 'interests', 'journey', 'confirm'];
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="mx-auto max-w-2xl px-4">
        <Card className="overflow-hidden">
          {renderError()}
          <div className="px-6 pt-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Join FUN(TIME)</h1>
              <p className="mt-2 text-sm text-gray-600">
                {currentStep === 'basics' && "Let's get to know you"}
                {currentStep === 'interests' && "What matters to you?"}
                {currentStep === 'journey' && "Choose your path"}
                {currentStep === 'confirm' && "Almost there!"}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex flex-1 items-center"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm
                        ${index <= currentStepIndex
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 flex-1
                          ${index < currentStepIndex
                            ? 'bg-emerald-500'
                            : 'bg-gray-200'
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {renderStep()}
            </form>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between bg-gray-50 px-6 py-4">
            {currentStepIndex > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(steps[currentStepIndex - 1])}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid() || isLoading}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                ${isStepValid() && !isLoading
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⋮</span>
                  Signing up...
                </>
              ) : (
                <>
                  {currentStep === 'confirm' ? 'Complete Signup' : 'Continue'}
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;

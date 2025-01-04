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
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useFormValidation } from '@/lib/validation';
import Card from '../common/Card';
import { 
  SignupFormData, 
  FormStep, 
  SIGNUP_PATHS, 
  INTEREST_CATEGORIES 
} from '@/types/auth';

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<FormStep>('basics');
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    name: '',
    location: '',
    interests: [],
    motivation: '',
    startingPath: 'personal',
    preferredLanguage: 'en',
    agreeToTerms: false,
    subscribeToUpdates: true
  });

  const { validate, getFieldError } = useFormValidation(currentStep, formData);

  const updateFormData = (field: keyof SignupFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    updateFormData('interests', newInterests);
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
  };

  const showError = (field: string) => {
    return touchedFields.has(field) ? getFieldError(field) : null;
  };

  const validateStep = () => {
    const result = validate();
    // Mark all fields in current step as touched when attempting to proceed
    const stepFields = Object.keys(formData).filter(field => 
      currentStep === 'basics' ? ['email', 'password', 'name'].includes(field) :
      currentStep === 'interests' ? ['interests'].includes(field) :
      currentStep === 'journey' ? ['startingPath', 'motivation'].includes(field) :
      currentStep === 'confirm' ? ['agreeToTerms'].includes(field) : false
    );
    setTouchedFields(prev => new Set([...prev, ...stepFields]));
    return result.isValid;
  };

  const handleContinue = () => {
    if (validateStep()) {
      const stepOrder: FormStep[] = ['basics', 'interests', 'journey', 'confirm'];
      const currentIndex = stepOrder.indexOf(currentStep);
      if (currentIndex < stepOrder.length - 1) {
        setCurrentStep(stepOrder[currentIndex + 1]);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    const stepOrder: FormStep[] = ['basics', 'interests', 'journey', 'confirm'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  // Get the mutation
  const signup = trpc.user.signup.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async () => {
    if (validateStep()) {
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
        // The error will be handled by the mutation's onError
      }
    }
  };

  const renderFieldError = (field: string) => {
    const error = showError(field);
    if (!error) return null;
    return (
      <p className="mt-1 flex items-center text-sm text-red-600">
        <AlertCircle className="mr-1 h-4 w-4" />
        {error}
      </p>
    );
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
                  className={`w-full rounded-lg border pl-10 pr-4 focus:ring-emerald-500
                    ${showError('email') 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-emerald-500'}`}
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="your@email.com"
                />
                <Mail className={`absolute left-3 top-2.5 h-5 w-5
                  ${showError('email') ? 'text-red-400' : 'text-gray-400'}`} />
              </div>
              {renderFieldError('email')}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className={`w-full rounded-lg border pl-10 pr-4 focus:ring-emerald-500
                    ${showError('password') 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-emerald-500'}`}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                />
                <Lock className={`absolute left-3 top-2.5 h-5 w-5
                  ${showError('password') ? 'text-red-400' : 'text-gray-400'}`} />
              </div>
              {renderFieldError('password')}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full rounded-lg border pl-10 pr-4 focus:ring-emerald-500
                    ${showError('name') 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-emerald-500'}`}
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Your name"
                />
                <User className={`absolute left-3 top-2.5 h-5 w-5
                  ${showError('name') ? 'text-red-400' : 'text-gray-400'}`} />
              </div>
              {renderFieldError('name')}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 pl-10 pr-4 focus:border-emerald-500 focus:ring-emerald-500"
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
              {INTEREST_CATEGORIES.map((interest) => (
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
            {renderFieldError('interests')}
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
                {SIGNUP_PATHS.map((path) => (
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
              {renderFieldError('startingPath')}
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                What motivates you to join FUN?
              </label>
              <textarea
                className={`w-full rounded-lg border focus:ring-emerald-500
                  ${showError('motivation') 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-emerald-500'}`}
                rows={4}
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                onBlur={() => handleBlur('motivation')}
                placeholder="Share your story and what brings you here..."
              />
              {renderFieldError('motivation')}
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
                  Starting as a {formData.startingPath === 'personal' ? 'Personal Growth Journey' 
                    : formData.startingPath === 'community' ? 'Community Builder' 
                    : 'Global Catalyst'}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Connected from {formData.location || 'Worldwide'}
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className={`mt-1 rounded border focus:ring-emerald-500
                    ${showError('agreeToTerms') 
                      ? 'border-red-300 text-red-500' 
                      : 'border-gray-300 text-emerald-600'}`}
                  checked={formData.agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                />
                <span className="text-sm text-gray-600">
                  I agree to FUN's Terms of Service and Privacy Policy, and commit to contributing positively to the community
                </span>
              </label>
              {renderFieldError('agreeToTerms')}

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
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
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

            <form onSubmit={(e) => e.preventDefault()}>
              {renderStep()}
            </form>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between bg-gray-50 px-6 py-4">
            {currentStepIndex > 0 ? (
              <button
                type="button"
                onClick={handleBack}
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
              onClick={handleContinue}
              disabled={signup.isLoading}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                ${validateStep() && !signup.isLoading
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              {signup.isLoading ? (
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

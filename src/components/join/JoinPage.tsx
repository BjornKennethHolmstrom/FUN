import React, { useState } from 'react';
import { Mail, User, Globe, Sparkles } from 'lucide-react';
import Card from '../common/Card';
import StageProgress from '../common/StageProgress';

const JoinPage = () => {
  const [step, setStep] = useState(1);

  const pathOptions = [
    {
      title: "Individual Changemaker",
      icon: User,
      description: "Start your personal journey of growth and impact",
      benefits: [
        "Personal transformation tracking",
        "Connect with like-minded individuals",
        "Access to learning resources",
        "Join local initiatives"
      ]
    },
    {
      title: "Organization Representative",
      icon: Globe,
      description: "Connect your organization to the movement",
      benefits: [
        "Network with other organizations",
        "Share resources and knowledge",
        "Collaborate on campaigns",
        "Amplify your impact"
      ]
    },
    {
      title: "Local Community Leader",
      icon: Sparkles,
      description: "Build and nurture your local FUN community",
      benefits: [
        "Start local initiatives",
        "Organize community events",
        "Access leadership resources",
        "Guide local transformation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Join the Movement
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Begin your journey of transformation and become part of a global community working towards positive change
          </p>
        </div>

        {/* Transformation Journey Preview */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">
            Your Transformation Journey
          </h2>
          <StageProgress 
            currentStage="egg" 
            onStageClick={(stage) => console.log('Stage clicked:', stage)}
          />
        </div>

        {/* Choose Your Path */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">
            Choose Your Path
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {pathOptions.map((path) => (
              <Card 
                key={path.title}
                className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => window.location.href = '/signup'}
              >
                <div className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-emerald-100 p-3 transition-colors group-hover:bg-emerald-200">
                      <path.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-center text-xl font-semibold text-gray-900">
                    {path.title}
                  </h3>
                  <p className="mb-6 text-center text-gray-600">
                    {path.description}
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    {path.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 px-6 py-12 text-center text-white">
          <h2 className="mb-6 text-3xl font-bold">Ready to Start?</h2>
          <p className="mb-8 text-lg">
            Join now and begin your journey with FUN(TIME)
          </p>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-emerald-800 shadow-sm hover:bg-emerald-50"
          >
            <Mail className="mr-2 h-5 w-5" />
            Sign Up with Email
          </button>
        </section>
      </div>
    </div>
  );
};

export default JoinPage;

import React, { useState } from 'react';
import { 
  Sprout, 
  Users, 
  Globe, 
  Heart, 
  ArrowRight, 
  Leaf,
  Scale,
  Wind
} from 'lucide-react';
import Card from '../common/Card';
import StageProgress from '../common/StageProgress';

const LearnMorePage = () => {
  const [activeSection, setActiveSection] = useState('mission');

  const coreValues = [
    {
      icon: Globe,
      title: "Unity & Diversity",
      description: "Fostering global connection while celebrating individual uniqueness and local cultures"
    },
    {
      icon: Scale,
      title: "Freedom & Responsibility",
      description: "Balancing personal liberty with collective well-being and environmental stewardship"
    },
    {
      icon: Heart,
      title: "Empathy & Understanding",
      description: "Building bridges across differences through compassion and open dialogue"
    },
    {
      icon: Wind,
      title: "Transformation & Growth",
      description: "Supporting continuous personal and societal evolution towards positive change"
    }
  ];

  const challenges = [
    "Environmental degradation",
    "Social inequality",
    "Access to resources",
    "Democratic participation",
    "Economic justice",
    "Health and wellbeing"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Freedom & Unity Network
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Through Individual Meaningful Effort, we're building a future where humanity thrives in harmony with our planet
          </p>
        </div>

        {/* Mission Video/Animation Placeholder */}
        <div className="relative mb-16 overflow-hidden rounded-2xl bg-emerald-900 px-6 py-20 shadow-xl sm:px-12 sm:py-32">
          <div className="relative mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-6 text-lg leading-8">
              To solve major global and local issues by connecting and empowering individuals and organizations, 
              creating a world where all life can flourish in freedom and unity.
            </p>
          </div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.100),theme(colors.emerald.900))]" />
        </div>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Core Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <Card key={value.title} className="group transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-emerald-100 p-3">
                    <value.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Transformation Journey */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Our Transformation Journey
          </h2>
          <StageProgress 
            currentStage="egg" 
            onStageClick={(stage) => console.log('Stage clicked:', stage)}
          />
        </section>

        {/* Challenges We Address */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Challenges We Address
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Through collective action and innovative solutions, we're tackling:
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <div 
                key={challenge}
                className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-emerald-50"
              >
                <Sprout className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-gray-700">{challenge}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 px-6 py-12 text-center text-white shadow-xl sm:px-12">
          <h2 className="mb-6 text-3xl font-bold">Join the Movement</h2>
          <p className="mb-8 text-lg">
            Every individual has the power to contribute to positive change. Start your journey with us today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <button className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-emerald-800 shadow-sm hover:bg-emerald-50">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-base font-medium text-white hover:bg-white/10">
              Explore Ideas
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearnMorePage;

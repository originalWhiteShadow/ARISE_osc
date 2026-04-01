"use client";

import Link from "next/link";
import { 
  IoSparkles, 
  IoRocketOutline, 
  IoPeopleOutline,
  IoBulbOutline,
  IoArrowForwardOutline
} from "react-icons/io5";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[--color-brand-cyan] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-[--color-brand-pink] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[--color-brand-gold] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[--color-brand-cyan] animate-pulse-subtle" />
            <span className="caption text-[--color-brand-cyan] uppercase tracking-widest">
              Welcome to the collective
            </span>
          </div>

          {/* Main Heading - Premium Typography */}
          <div className="space-y-4">
            <h1 className="heading-1">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[--color-brand-cyan] via-[--color-brand-pink] to-[--color-brand-gold] animate-fade-in">
                ARISE
              </span>
            </h1>
            <p className="heading-3 text-[--text-secondary]">
              Where consciousness meets creation
            </p>
          </div>

          {/* Description */}
          <p className="body-lg max-w-2xl mx-auto">
            A living open-source ecosystem where innovative projects, transformative ideas, and conscious creators collaborate to evolve together. Step into the lucid dream.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/ecosystem"
              className="btn btn-primary group rounded-lg"
            >
              <span>Enter the Ecosystem</span>
              <IoArrowForwardOutline className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="btn btn-secondary rounded-lg"
            >
              <IoRocketOutline />
              Explore Projects
            </Link>
          </div>

          {/* Stats / Highlights */}
          <div className="pt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass rounded-lg p-4 space-y-2">
              <p className="text-2xl font-bold text-[--color-brand-cyan]">11</p>
              <p className="caption">Active Routes</p>
            </div>
            <div className="glass rounded-lg p-4 space-y-2">
              <p className="text-2xl font-bold text-[--color-brand-pink]">∞</p>
              <p className="caption">Possibilities</p>
            </div>
            <div className="glass rounded-lg p-4 space-y-2">
              <p className="text-2xl font-bold text-[--color-brand-gold]">1</p>
              <p className="caption">Community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Why ARISE?</h2>
            <p className="body-lg text-[--text-secondary]">
              A platform built on principles of collaboration, consciousness, and continuous evolution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: IoSparkles,
                title: "Conscious Design",
                description: "Built with awareness of impact and intentionality",
                color: "text-[--color-brand-cyan]",
              },
              {
                icon: IoRocketOutline,
                title: "Innovation Hub",
                description: "Launchpad for groundbreaking open-source projects",
                color: "text-[--color-brand-pink]",
              },
              {
                icon: IoPeopleOutline,
                title: "Collective Power",
                description: "Community-driven development and shared ownership",
                color: "text-[--color-brand-gold]",
              },
              {
                icon: IoBulbOutline,
                title: "Idea Incubation",
                description: "From concept to reality with community support",
                color: "text-[--color-brand-violet]",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="glass p-6 rounded-lg hover:bg-white/10 transition-all duration-300 group space-y-4"
                >
                  <Icon className={`text-4xl ${feature.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="heading-4">{feature.title}</h3>
                  <p className="caption text-[--text-secondary]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="glass-accent rounded-2xl p-12 space-y-6">
            <h2 className="heading-2">Ready to Join the Dream?</h2>
            <p className="body-lg text-[--text-secondary]">
              Explore projects, share ideas, connect with creators, and track your journey through the lucid ecosystem.
            </p>
            <Link
              href="/ecosystem"
              className="inline-block btn btn-primary rounded-lg"
            >
              Begin Your Journey
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

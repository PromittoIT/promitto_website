'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TeamCard from '../../../components/TeamCard';
import { directors, leadership, getProfile, leadershipProfileSlug } from '../../../data/team';

type TeamTab = 'board' | 'management';

const teamTabs: { id: TeamTab; label: string }[] = [
  { id: 'board', label: 'Board of Directors' },
  { id: 'management', label: 'Our Leadership' },
];

// First paragraph of a bio, for the card's hover text
const excerptOf = (bio: string) => bio.split('\n\n')[0];

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState<TeamTab>('board');

  // Allow linking straight to a tab: /about/team/#management
  // (also reacts when only the #hash changes, e.g. a menu link while already on this page)
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'board' || hash === 'management') setActiveTab(hash);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const selectTab = (tab: TeamTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[440px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about_us_hero_image.jpeg"
            alt="About Promitto Limited"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-end pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <div className="w-1 h-16 bg-secondary mr-6"></div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Our Team
                </h1>
              </div>
              <p className="text-xl text-white font-medium leading-relaxed">
                Meet the dedicated professionals behind Promitto&apos;s success
              </p>
            </div>
          </div>
        </div>

        {/* Team switcher: sits inside the bottom of the hero */}
        <div className="absolute inset-x-0 bottom-6 z-20 px-4">
          <div
            role="tablist"
            aria-label="Team"
            className="mx-auto flex max-w-2xl rounded-full border-4 border-white bg-gray-100 p-1.5 shadow-xl"
          >
            {teamTabs.map((tab) => {
              const on = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => selectTab(tab.id)}
                  className={`flex-1 rounded-full px-4 py-3 text-sm font-bold transition-all duration-300 sm:py-4 sm:text-base ${
                    on
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-primary/70 hover:bg-white hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      {activeTab === 'board' && (
        <section id="panel-board" role="tabpanel" aria-labelledby="tab-board" className="pt-14 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="sr-only">Board of Directors</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {directors.map((d) => (
                <TeamCard
                  key={d.slug}
                  name={d.name}
                  subtitle={d.role}
                  image={d.image}
                  excerpt={d.bio ? excerptOf(d.bio) : undefined}
                  href={d.bio ? `/about/team/${d.slug}/` : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Leadership */}
      {activeTab === 'management' && (
        <section id="panel-management" role="tabpanel" aria-labelledby="tab-management" className="pt-14 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="sr-only">Our Leadership</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {leadership.map((m) => {
                // Their own profile, or their director profile if they also sit on the board
                const slug = leadershipProfileSlug(m);
                const profile = slug ? getProfile(slug) : undefined;
                return (
                  <TeamCard
                    key={m.name}
                    name={m.name}
                    subtitle={m.title}
                    image={m.image}
                    excerpt={profile ? excerptOf(profile.bio) : undefined}
                    href={profile ? `/about/team/${profile.slug}/` : undefined}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default TeamPage;

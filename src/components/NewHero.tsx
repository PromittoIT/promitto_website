'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';
import VideoBanner, { BannerSlide } from './VideoBanner';

const slides: BannerSlide[] = [
  {
    tab: 'Dream Home',
    title: 'Find Your Dream Home',
    description:
      "Discover exceptional projects designed for modern living with Promitto's premium real estate solutions.",
  },
  {
    tab: 'Luxury',
    title: 'Luxury Living Redefined',
    description:
      'Experience luxury and comfort in our carefully crafted residential developments across Kenya and Zambia.',
  },
  {
    tab: 'Quality',
    title: 'Quality Homes, Quality Life',
    description:
      'From cozy bungalows to elegant mansions, find your perfect home with our diverse property portfolio.',
  },
  {
    tab: 'Build',
    title: 'Building Dreams Into Reality',
    description:
      'Transform your homeownership dreams into reality with our innovative financing and construction solutions.',
  },
  {
    tab: 'Premium',
    title: 'Premium Projects, Premium Service',
    description:
      'Join thousands of satisfied homeowners who chose Promitto for their perfect home investment.',
  },
];

const NewHero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (propertyType !== 'all') params.append('type', propertyType);
    if (location.trim()) params.append('location', location.trim());
    const qs = params.toString();
    router.push(`/properties${qs ? `?${qs}` : ''}`);
  };

  return (
    <VideoBanner
      variant="hero"
      videoSrc="/video/promitto-banner.mp4"
      poster="/slider/2bdrm.png"
      eyebrow="Promitto Homes"
      slides={slides}
      actions={[
        { href: '/properties', label: 'Browse Projects', primary: true },
        { href: '/how-to-own', label: 'How to Own' },
        // DEL City project page (Thika)
        { href: '/properties/2b836fe4-0756-4e6e-902f-897948db0ecd/', label: 'Del City' },
      ]}
    >
      <form onSubmit={handleSearch} className="mt-10">
        <div className="rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_1.2fr_auto]">
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                aria-label="Project type"
                className="w-full appearance-none rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-base font-medium text-gray-900 focus:outline-none"
              >
                <option value="all">All Projects</option>
                <option value="House">Houses</option>
                <option value="Apartment">Apartments</option>
                <option value="Villa">Villas</option>
                <option value="Commercial">Commercial</option>
              </select>
              <HomeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-base font-medium text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <MapPinIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Projects..."
                className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-base font-medium text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-white transition-colors duration-300 hover:bg-secondary hover:text-primary"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </VideoBanner>
  );
};

export default NewHero;

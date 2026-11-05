'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDesignCard from '@/components/PropertyDesignCard';
import PropertyDesignFilters from '@/components/PropertyDesignFilters';
import type { PropertyDesign } from '@/data/propertyDesigns';

type Props = {
  title: string;
  subtitle: string;
  heroImage?: string;
  designs: PropertyDesign[];
  loading?: boolean;
  /** Where each card's "View Details" goes */
  detailHref: (id: string) => string;
  /** Shown when there are no designs at all (before any filtering) */
  emptyTitle?: string;
  emptyMessage?: string;
};


/** The Property Designs page layout: hero with search, filters sidebar and design grid. */
export default function DesignsBrowser({
  title,
  subtitle,
  heroImage = '/hero-house.jpg',
  designs,
  loading = false,
  detailHref,
  emptyTitle = 'No designs yet',
  emptyMessage = 'New designs will appear here soon.',
}: Props) {
  const [filteredDesigns, setFilteredDesigns] = useState<PropertyDesign[]>(designs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    bedrooms: 0,
    roofType: '',
    houseType: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = useCallback(() => {
    let filtered = [...designs];

    // Apply search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(design =>
        design.name.toLowerCase().includes(searchLower) ||
        design.roofType.toLowerCase().includes(searchLower) ||
        design.houseType.toLowerCase().includes(searchLower) ||
        (design.description && design.description.toLowerCase().includes(searchLower)) ||
        (design.features && design.features.some(feature => 
          feature.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(design => design.bedrooms === filters.bedrooms);
    }

    // Filter by roof type
    if (filters.roofType && filters.roofType !== 'All types') {
      filtered = filtered.filter(design => design.roofType === filters.roofType);
    }

    // Filter by house type
    if (filters.houseType && filters.houseType !== 'All types') {
      filtered = filtered.filter(design => design.houseType === filters.houseType);
    }

    setFilteredDesigns(filtered);
  }, [designs, searchQuery, filters]);

  // Apply filters when designs, search query, or filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Apply real-time search
    applyFilters();
  };

  const clearSearch = () => {
    setSearchQuery('');
    applyFilters();
  };

  const handleFilterChange = (newFilters: { bedrooms: number; roofType: string; houseType: string }) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      <div>
        {/* Hero Section with Search */}
        <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] bg-cover bg-center" style={{ backgroundImage: `url("${heroImage}")` }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex flex-col items-center mb-4 sm:mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                  {title}
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8">
                {subtitle}
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search by design name, roof type..."
                  className="w-full pl-10 sm:pl-12 pr-16 sm:pr-24 py-3 sm:py-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button 
                  type="submit"
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"
                >
                  Search
                </button>
                <svg
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
              {/* Filters Sidebar */}
              <div className={`w-full lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'} lg:static top-0 z-10 lg:z-auto`}>
                <PropertyDesignFilters 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Designs Grid */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      {loading ? 'Loading Designs...' : `${filteredDesigns.length} Designs Available`}
                    </h2>
                    {searchQuery && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span>Search results for:</span>
                        <span className="font-semibold text-primary">&quot;{searchQuery}&quot;</span>
                        <button 
                          onClick={clearSearch}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <select
                      className="p-2 sm:p-3 border border-gray-300 rounded-xl bg-white text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary font-medium w-full sm:w-auto"
                      defaultValue="newest"
                    >
                      <option value="newest">Newest First</option>
                      <option value="bedrooms-asc">Bedrooms: Low to High</option>
                      <option value="bedrooms-desc">Bedrooms: High to Low</option>
                      <option value="area-asc">Area: Small to Large</option>
                      <option value="area-desc">Area: Large to Small</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-pulse">
                        <div className="bg-gray-200 h-40 sm:h-48 rounded-xl mb-3 sm:mb-4"></div>
                        <div className="bg-gray-200 h-3 sm:h-4 rounded mb-2"></div>
                        <div className="bg-gray-200 h-3 sm:h-4 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : designs.length === 0 ? (
                  <div className="text-center py-12 sm:py-16">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{emptyTitle}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{emptyMessage}</p>
                  </div>
                ) : filteredDesigns.length === 0 ? (
                  <div className="text-center py-12 sm:py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4 sm:mb-6">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No designs found</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                    <button
                      onClick={() => setShowFilters(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Adjust Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {filteredDesigns.map((design) => (
                      <PropertyDesignCard key={design.id} design={design} href={detailHref(design.id)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
} 
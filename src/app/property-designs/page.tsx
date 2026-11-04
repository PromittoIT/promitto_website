'use client';

import DesignsBrowser from '@/components/designs/DesignsBrowser';
import { propertyDesigns } from '@/data/propertyDesigns';

export default function PropertyDesignsPage() {
  return (
    <DesignsBrowser
      title="Property Designs"
      subtitle="Explore our comprehensive collection of architectural designs"
      designs={propertyDesigns}
      detailHref={(id) => `/property-designs/${id}`}
    />
  );
}

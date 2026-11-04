'use client';

import React, { useEffect, useState } from 'react';
import DesignsBrowser from './DesignsBrowser';
import type { PropertyDesign } from '@/data/propertyDesigns';
import { designsPagePath, fetchProject, fetchProjectDesigns } from '@/lib/projectDesigns';

/** A project's page (e.g. Del City) shown as a designs catalogue, like Property Designs. */
export default function ProjectDesignsPage({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Awaited<ReturnType<typeof fetchProject>>>(null);
  const [designs, setDesigns] = useState<PropertyDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Load separately so the banner still shows if the designs fail to load
    Promise.allSettled([fetchProject(projectId), fetchProjectDesigns(projectId)]).then(([p, d]) => {
      if (cancelled) return;
      if (p.status === 'fulfilled') setProject(p.value);
      if (d.status === 'fulfilled') setDesigns(d.value);
      else console.error('Failed to load project designs:', d.reason);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const name = project?.name ?? 'Del City';
  const where = project?.location ? ` in ${project.location}` : '';

  return (
    <DesignsBrowser
      title={name}
      subtitle={`Explore the house designs available at ${name}${where}`}
      heroImage={project?.featuredImage || '/hero-house.jpg'}
      designs={designs}
      loading={loading}
      detailHref={(id) => `${designsPagePath(projectId)}/${id}/`}
      emptyTitle="Designs coming soon"
      emptyMessage={`House designs for ${name} will be listed here shortly.`}
    />
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DesignDetailView from '@/components/designs/DesignDetailView';
import type { PropertyDesign } from '@/data/propertyDesigns';
import { designsPagePath, fetchProject, fetchProjectDesign, getDesignProjectBySlug } from '@/lib/projectDesigns';

/** A single design within a project, e.g. /property-designs/del-city/<design id>/ */
export default function ProjectDesignDetailPage() {
  const params = useParams();
  // Unknown project slug -> empty id, which finds no design and shows "Design Not Found"
  const projectId = getDesignProjectBySlug(params.id as string)?.id ?? '';
  const designId = params.designId as string;
  const [design, setDesign] = useState<PropertyDesign | null>(null);
  const [projectName, setProjectName] = useState('Del City');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!projectId) {
      setLoading(false);
      return;
    }
    Promise.allSettled([fetchProject(projectId), fetchProjectDesign(projectId, designId)]).then(([p, d]) => {
      if (cancelled) return;
      if (p.status === 'fulfilled' && p.value?.name) setProjectName(p.value.name);
      if (d.status === 'fulfilled') setDesign(d.value);
      else console.error('Failed to load design:', d.reason);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [projectId, designId]);

  return (
    <DesignDetailView
      design={design}
      loading={loading}
      backHref={`${designsPagePath(projectId)}/`}
      backLabel={projectName}
    />
  );
}

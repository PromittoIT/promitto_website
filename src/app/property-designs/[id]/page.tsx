'use client';

import { useParams } from 'next/navigation';
import DesignDetailView from '@/components/designs/DesignDetailView';
import ProjectDesignsPage from '@/components/designs/ProjectDesignsPage';
import { getPropertyDesign } from '@/data/propertyDesigns';
import { getDesignProjectBySlug } from '@/lib/projectDesigns';

/** /property-designs/<x>/ is either a project's designs catalogue (e.g. del-city) or a built-in design. */
export default function PropertyDesignDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const project = getDesignProjectBySlug(id);
  if (project) return <ProjectDesignsPage projectId={project.id} />;

  const design = getPropertyDesign(id) ?? null;
  return <DesignDetailView design={design} backHref="/property-designs" backLabel="Property Designs" />;
}

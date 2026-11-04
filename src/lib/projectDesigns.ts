// Designs offered inside a specific project (e.g. Del City), stored in Supabase `project_designs`.
// Table setup: docs/sql/project_designs.sql
import { supabase } from '@/lib/supabase';
import type { PropertyDesign } from '@/data/propertyDesigns';

export const DEL_CITY_ID = '2b836fe4-0756-4e6e-902f-897948db0ecd';

/**
 * Projects with their own designs catalogue at /property-designs/<slug>/ (designs at /property-designs/<slug>/<design id>/).
 * The project's normal page (/properties/<id>/) is unchanged.
 * To add a catalogue for another project, add one line here; admins can then add its designs.
 * Slugs must not clash with the built-in design ids in src/data/propertyDesigns.ts.
 */
export const DESIGN_PROJECTS: { id: string; slug: string }[] = [{ id: DEL_CITY_ID, slug: 'del-city' }];

export const DESIGN_PROJECT_IDS = DESIGN_PROJECTS.map((p) => p.id);

export const getDesignProjectBySlug = (slug: string) => DESIGN_PROJECTS.find((p) => p.slug === slug);

/** Catalogue page for a project, e.g. '/property-designs/del-city' */
export const designsPagePath = (propertyId: string) => {
  const project = DESIGN_PROJECTS.find((p) => p.id === propertyId);
  return project ? `/property-designs/${project.slug}` : `/properties/${propertyId}`;
};

/** Row shape of public.project_designs */
export interface ProjectDesignRow {
  id: string;
  property_id: string;
  name: string;
  bedrooms: number;
  roof_type: string;
  house_type: string;
  area: string | null;
  description: string | null;
  features: string[];
  images: string[];
  sort_order: number;
  created_at: string;
}

export const rowToDesign = (row: ProjectDesignRow): PropertyDesign => ({
  id: row.id,
  name: row.name,
  bedrooms: row.bedrooms,
  roofType: row.roof_type,
  houseType: row.house_type,
  area: row.area || undefined,
  description: row.description || undefined,
  features: row.features || [],
  images: row.images || [],
  imagePath: row.images?.[0] || '/images/placeholder.png',
});

export async function fetchProjectDesigns(propertyId: string): Promise<PropertyDesign[]> {
  const { data, error } = await supabase
    .from('project_designs')
    .select('*')
    .eq('property_id', propertyId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data as ProjectDesignRow[]).map(rowToDesign);
}

export async function fetchProjectDesign(propertyId: string, designId: string): Promise<PropertyDesign | null> {
  const { data, error } = await supabase
    .from('project_designs')
    .select('*')
    .eq('property_id', propertyId)
    .eq('id', designId)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToDesign(data as ProjectDesignRow) : null;
}

/** Name, location and banner photo of the project */
export async function fetchProject(propertyId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('id, name, location, featuredImage')
    .eq('id', propertyId)
    .maybeSingle();
  if (error) throw error;
  return data as { id: string; name: string; location: string | null; featuredImage: string | null } | null;
}

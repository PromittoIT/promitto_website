'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { HOUSE_TYPES, ROOF_TYPES } from '@/data/propertyDesigns';
import { DESIGN_PROJECT_IDS, DEL_CITY_ID, designsPagePath, type ProjectDesignRow } from '@/lib/projectDesigns';

type FormState = {
  name: string;
  bedrooms: number;
  house_type: string;
  roof_type: string;
  area: string;
  description: string;
  features: string; // one per line
  sort_order: number;
};

const emptyForm: FormState = {
  name: '',
  bedrooms: 3,
  house_type: HOUSE_TYPES[0],
  roof_type: ROOF_TYPES[0],
  area: '',
  description: '',
  features: '',
  sort_order: 0,
};

const MAX_PHOTOS = 10;

export default function ProjectDesignsAdminPage() {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [projectId, setProjectId] = useState(DEL_CITY_ID);
  const [designs, setDesigns] = useState<ProjectDesignRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tableMissing, setTableMissing] = useState(false);

  // Form: null = closed, 'new' = adding, otherwise the id being edited
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [photos, setPhotos] = useState<string[]>([]); // already-uploaded URLs
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  const projectName = projects.find((p) => p.id === projectId)?.name ?? 'Del City';

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  // Names of the design projects for the selector
  useEffect(() => {
    supabase
      .from('properties')
      .select('id, name')
      .in('id', DESIGN_PROJECT_IDS)
      .then(({ data }) => setProjects(data || []));
  }, []);

  const loadDesigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('project_designs')
      .select('*')
      .eq('property_id', projectId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) {
      // Table not created yet
      if (error.code === '42P01' || error.code === 'PGRST205' || /project_designs/.test(error.message)) {
        setTableMissing(true);
      } else {
        setError(`Failed to load designs: ${error.message}`);
      }
      setDesigns([]);
    } else {
      setTableMissing(false);
      setDesigns((data as ProjectDesignRow[]) || []);
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

  const openNew = () => {
    setEditing('new');
    setForm({ ...emptyForm, sort_order: designs.length });
    setPhotos([]);
    setNewFiles([]);
    setError(null);
  };

  const openEdit = (d: ProjectDesignRow) => {
    setEditing(d.id);
    setForm({
      name: d.name,
      bedrooms: d.bedrooms,
      house_type: d.house_type,
      roof_type: d.roof_type,
      area: d.area || '',
      description: d.description || '',
      features: (d.features || []).join('\n'),
      sort_order: d.sort_order ?? 0,
    });
    setPhotos(d.images || []);
    setNewFiles([]);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setEditing(null);
    setNewFiles([]);
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    const room = MAX_PHOTOS - photos.length - newFiles.length;
    if (picked.length > room) setError(`A design can have up to ${MAX_PHOTOS} photos.`);
    setNewFiles((prev) => [...prev, ...picked.slice(0, Math.max(room, 0))]);
    e.target.value = '';
  };

  const makeCover = (i: number) =>
    setPhotos((prev) => [prev[i], ...prev.filter((_, idx) => idx !== i)]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError('Please enter a design name.');
    if (photos.length + newFiles.length === 0) return setError('Please add at least one photo.');

    setSaving(true);
    try {
      // Upload new photos to the public "properties" bucket
      const uploaded: string[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const path = `designs/${projectId}/${Date.now()}-${i}.${ext}`;
        const { error: upErr } = await supabase.storage.from('properties').upload(path, file, { upsert: false });
        if (upErr) throw new Error(`Photo upload failed: ${upErr.message}`);
        uploaded.push(supabase.storage.from('properties').getPublicUrl(path).data.publicUrl);
      }

      const record = {
        property_id: projectId,
        name: form.name.trim(),
        bedrooms: Number(form.bedrooms),
        house_type: form.house_type,
        roof_type: form.roof_type,
        area: form.area.trim() || null,
        description: form.description.trim() || null,
        features: form.features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
        images: [...photos, ...uploaded],
        sort_order: Number(form.sort_order) || 0,
      };

      const { error: dbErr } =
        editing === 'new'
          ? await supabase.from('project_designs').insert(record)
          : await supabase.from('project_designs').update(record).eq('id', editing!);
      if (dbErr) throw new Error(dbErr.message);

      showSuccess(editing === 'new' ? 'Design added.' : 'Design updated.');
      closeForm();
      loadDesigns();
    } catch (err: any) {
      setError(err.message || 'Failed to save design.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (d: ProjectDesignRow) => {
    if (!window.confirm(`Delete "${d.name}" from ${projectName}? This cannot be undone.`)) return;
    const { error } = await supabase.from('project_designs').delete().eq('id', d.id);
    if (error) setError(`Failed to delete: ${error.message}`);
    else {
      showSuccess('Design deleted.');
      if (editing === d.id) closeForm();
      loadDesigns();
    }
  };

  const input =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Designs</h1>
          <p className="mt-1 text-sm text-gray-600">
            House designs shown on a project&apos;s page, laid out like Property Designs.
          </p>
        </div>
        <div className="flex items-end gap-3">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-gray-700">Project</span>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className={input}>
              {(projects.length ? projects : [{ id: DEL_CITY_ID, name: 'DEL City' }]).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <Link
            href={`${designsPagePath(projectId)}/`}
            target="_blank"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View page
          </Link>
          {!tableMissing && editing === null && (
            <button onClick={openNew} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
              + Add Design
            </button>
          )}
        </div>
      </div>

      {success && <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{success}</div>}
      {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      {tableMissing && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">The designs table hasn&apos;t been set up yet.</p>
          <p className="mt-1">
            Run <code className="rounded bg-white px-1">docs/sql/project_designs.sql</code> in the Supabase SQL Editor,
            then refresh this page.
          </p>
        </div>
      )}

      {/* Add / edit form */}
      {editing !== null && (
        <form onSubmit={handleSave} className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            {editing === 'new' ? `Add a design to ${projectName}` : `Edit design`}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Design name *</span>
              <input
                className={input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. 3 Bedroom Pitched Roof Bungalow"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Bedrooms *</span>
              <select className={input} value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}>
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Area</span>
              <input className={input} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="e.g. 110 sqm" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">House type *</span>
              <select className={input} value={form.house_type} onChange={(e) => setForm({ ...form, house_type: e.target.value })}>
                {HOUSE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Roof type *</span>
              <select className={input} value={form.roof_type} onChange={(e) => setForm({ ...form, roof_type: e.target.value })}>
                {ROOF_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="text-sm md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Description</span>
              <textarea
                className={input}
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Key features (one per line)</span>
              <textarea
                className={input}
                rows={5}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder={'3 Bedrooms\n2 Bathrooms\nOpen Plan Living'}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Display order</span>
              <input
                type="number"
                className={input}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
              <span className="mt-1 block text-xs text-gray-500">Lower numbers show first.</span>
            </label>

            {/* Photos */}
            <div className="text-sm md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">
                Photos * <span className="font-normal text-gray-500">(first photo is the cover, up to {MAX_PHOTOS})</span>
              </span>
              <div className="flex flex-wrap gap-3">
                {photos.map((url, i) => (
                  <div key={url} className="relative h-24 w-32 overflow-hidden rounded-lg border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    {i === 0 && <span className="absolute left-1 top-1 rounded bg-primary px-1.5 text-[10px] font-bold text-white">Cover</span>}
                    <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/60 px-1 py-0.5 text-[11px] text-white">
                      {i > 0 ? (
                        <button type="button" onClick={() => makeCover(i)} className="hover:underline">
                          Make cover
                        </button>
                      ) : (
                        <span />
                      )}
                      <button type="button" onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {newFiles.map((f, i) => (
                  <div key={`${f.name}-${i}`} className="relative flex h-24 w-32 flex-col items-center justify-center rounded-lg border border-dashed border-primary/40 bg-primary/5 p-2 text-center text-[11px] text-gray-700">
                    <span className="line-clamp-2 break-all">{f.name}</span>
                    <span className="text-gray-500">to upload</span>
                    <button
                      type="button"
                      onClick={() => setNewFiles(newFiles.filter((_, idx) => idx !== i))}
                      className="mt-1 text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {photos.length + newFiles.length < MAX_PHOTOS && (
                  <label className="flex h-24 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-primary hover:text-primary">
                    + Add photos
                    <input type="file" accept="image/*" multiple onChange={onPickFiles} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
            >
              {saving ? 'Saving…' : editing === 'new' ? 'Add Design' : 'Save Changes'}
            </button>
            <button type="button" onClick={closeForm} className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Designs list */}
      {!tableMissing && (
        <div className="overflow-hidden rounded-xl bg-white shadow">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading designs…</p>
          ) : designs.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">No designs for {projectName} yet. Use “+ Add Design” to create the first one.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Design</th>
                  <th className="px-4 py-3 font-semibold">Bedrooms</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Area</th>
                  <th className="px-4 py-3 font-semibold">Photos</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {designs.map((d) => (
                  <tr key={d.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {d.images?.[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={d.images[0]} alt="" className="h-12 w-16 rounded object-cover" />
                        )}
                        <span className="font-medium text-gray-900">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{d.bedrooms}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {d.house_type} · {d.roof_type}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{d.area || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{d.images?.length || 0}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Link href={`${designsPagePath(projectId)}/${d.id}/`} target="_blank" className="mr-3 text-gray-600 hover:text-primary">
                        View
                      </Link>
                      <button onClick={() => openEdit(d)} className="mr-3 font-medium text-primary hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(d)} className="font-medium text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

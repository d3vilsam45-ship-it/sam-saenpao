import { useState, useEffect } from 'react';
import { api } from '../api';
import ImagePicker from '../components/ImagePicker';

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  image: string;
  category: string;
  role: string;
  description: string;
  read_time: string;
  client?: string;
  builder?: string;
  area?: string;
  design_team?: string;
  photographer?: string;
  gallery: string[];
  sort_order: number;
  featured: number;
}

const EMPTY: Omit<Project, 'id'> = { title: '', location: '', year: '', image: '', category: 'Interior', role: 'Design Team Member', description: '', read_time: '', client: '', builder: '', area: '', design_team: '', photographer: '', gallery: [], sort_order: 0, featured: 1 };
const CATEGORIES = ['Interior', 'Retail', 'Food & Beverage', 'Commercial', 'Residential', 'Architecture'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<(Omit<Project, 'id'> & { id?: number }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [galleryInput, setGalleryInput] = useState('');
  const [picker, setPicker] = useState<'cover' | 'gallery' | null>(null);

  useEffect(() => { api.projects.list().then(setProjects); }, []);

  function openNew() { setEditing({ ...EMPTY }); setGalleryInput(''); }
  function openEdit(p: Project) { setEditing({ ...p }); setGalleryInput(p.gallery.join('\n')); }

  async function save() {
    if (!editing || !editing.title) return;
    setSaving(true);
    const data = { ...editing, gallery: galleryInput.split('\n').map(s => s.trim()).filter(Boolean) };
    if (editing.id) {
      const updated = await api.projects.update(editing.id, data);
      setProjects(prev => prev.map(p => p.id === editing.id ? updated : p));
    } else {
      const created = await api.projects.create(data);
      setProjects(prev => [...prev, created]);
    }
    setSaving(false);
    setEditing(null);
  }

  async function del(id: number) {
    if (!confirm('Delete this project?')) return;
    await api.projects.delete(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-white">Projects <span className="text-stone-500 text-sm font-normal ml-2">{projects.length} total</span></h2>
        <button onClick={openNew} className="bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-stone-200 transition-colors">+ Add Project</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map(p => (
          <div key={p.id} className="group grid grid-cols-12 gap-0 border border-stone-800 hover:border-stone-600 transition-colors bg-stone-900 overflow-hidden">
            {/* Image */}
            <div className="col-span-5 relative overflow-hidden bg-stone-800">
              {p.image
                ? <img src={p.image} alt={p.title} className="w-full h-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-700" />
                : <div className="aspect-[16/10] flex items-center justify-center text-stone-600 text-xs uppercase tracking-wider">No Image</div>
              }
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-stone-900 text-[9px] font-bold uppercase tracking-widest px-2 py-1">{p.category}</span>
              </div>
              {!!p.featured && (
                <div className="absolute top-3 right-3">
                  <span className="bg-amber-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">★ Featured</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="col-span-7 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">{p.year}</span>
                  {p.location && <>
                    <span className="text-stone-700">·</span>
                    <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">{p.location}</span>
                  </>}
                  {p.gallery.length > 0 && <>
                    <span className="text-stone-700">·</span>
                    <span className="text-stone-600 text-[10px] font-mono uppercase tracking-widest">{p.gallery.length} photos</span>
                  </>}
                </div>
                <h3 className="text-white text-lg font-semibold leading-snug mb-2">{p.title}</h3>
                <p className="text-stone-500 text-xs uppercase tracking-wider mb-3">{p.role}</p>
                {p.description && <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{p.description}</p>}
                <div className="flex flex-wrap gap-4 mt-3">
                  {p.client && <span className="text-stone-500 text-xs">Client: <span className="text-stone-300">{p.client}</span></span>}
                  {p.area && <span className="text-stone-500 text-xs">Area: <span className="text-stone-300">{p.area}</span></span>}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => openEdit(p)}
                  className="text-xs font-bold uppercase tracking-wider bg-white text-black px-4 py-2 hover:bg-stone-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(p.id)}
                  className="text-xs font-bold uppercase tracking-wider border border-red-900 text-red-400 hover:bg-red-900/30 px-4 py-2 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {picker && (
        <ImagePicker
          mode={picker === 'cover' ? 'single' : 'multi'}
          onClose={() => setPicker(null)}
          onSelect={urls => {
            if (picker === 'cover') {
              setEditing(e => e && ({ ...e, image: urls[0] }));
            } else {
              setGalleryInput(prev => {
                const existing = prev.trim();
                const added = urls.join('\n');
                return existing ? `${existing}\n${added}` : added;
              });
            }
            setPicker(null);
          }}
        />
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto py-8">
          <div className="bg-stone-950 border border-stone-800 w-full max-w-2xl mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">{editing.id ? 'Edit Project' : 'New Project'}</h3>
              <button onClick={() => setEditing(null)} className="text-stone-400 hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="space-y-4">
              <Field label="Title *" value={editing.title} onChange={v => setEditing(e => e && ({ ...e, title: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Location" value={editing.location} onChange={v => setEditing(e => e && ({ ...e, location: v }))} />
                <Field label="Year" value={editing.year} onChange={v => setEditing(e => e && ({ ...e, year: v }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Category</label>
                  <select value={editing.category} onChange={e => setEditing(ed => ed && ({ ...ed, category: e.target.value }))} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <Field label="Read Time" value={editing.read_time} onChange={v => setEditing(e => e && ({ ...e, read_time: v }))} placeholder="5 min read" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs text-stone-400 uppercase tracking-wider">Cover Image URL</label>
                  <button type="button" onClick={() => setPicker('cover')} className="text-xs text-stone-400 hover:text-white border border-stone-700 hover:border-stone-400 px-2 py-0.5 transition-colors">Browse</button>
                </div>
                <input value={editing.image} onChange={e => setEditing(ed => ed && ({ ...ed, image: e.target.value }))} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2" />
                {editing.image && <img src={editing.image} alt="" className="mt-2 h-24 object-cover bg-stone-800" />}
              </div>
              <TextArea label="Description" value={editing.description} onChange={v => setEditing(e => e && ({ ...e, description: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Client" value={editing.client || ''} onChange={v => setEditing(e => e && ({ ...e, client: v }))} />
                <Field label="Builder" value={editing.builder || ''} onChange={v => setEditing(e => e && ({ ...e, builder: v }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Area" value={editing.area || ''} onChange={v => setEditing(e => e && ({ ...e, area: v }))} placeholder="250 sqm" />
                <Field label="Photographer" value={editing.photographer || ''} onChange={v => setEditing(e => e && ({ ...e, photographer: v }))} />
              </div>
              <Field label="Design Team" value={editing.design_team || ''} onChange={v => setEditing(e => e && ({ ...e, design_team: v }))} />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs text-stone-400 uppercase tracking-wider">Gallery (one URL per line)</label>
                  <button type="button" onClick={() => setPicker('gallery')} className="text-xs text-stone-400 hover:text-white border border-stone-700 hover:border-stone-400 px-2 py-0.5 transition-colors">Browse & Insert</button>
                </div>
                <textarea value={galleryInput} onChange={e => setGalleryInput(e.target.value)} rows={5} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2 font-mono resize-y" placeholder="/photos/project-slug/image.jpg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Sort Order" type="number" value={String(editing.sort_order)} onChange={v => setEditing(e => e && ({ ...e, sort_order: parseInt(v) || 0 }))} />
                <div className="flex items-center gap-3 pt-5">
                  <input type="checkbox" id="featured" checked={!!editing.featured} onChange={e => setEditing(ed => ed && ({ ...ed, featured: e.target.checked ? 1 : 0 }))} className="w-4 h-4" />
                  <label htmlFor="featured" className="text-sm text-stone-300">Featured</label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-6 border-t border-stone-800">
              <button onClick={save} disabled={saving} className="bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-2 hover:bg-stone-200 disabled:opacity-50">
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setEditing(null)} className="text-xs text-stone-400 hover:text-white border border-stone-700 px-4 py-2 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1">{label}</label>
      <input type={type || 'text'} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2" />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2 resize-y" />
    </div>
  );
}

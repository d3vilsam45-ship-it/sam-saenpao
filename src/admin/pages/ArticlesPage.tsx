import { useState, useEffect } from 'react';
import { api } from '../api';
import ImagePicker from '../components/ImagePicker';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  read_time: string;
  featured: boolean;
  gallery: string[];
  sort_order: number;
}

const EMPTY: Omit<Article, 'id'> = { title: '', excerpt: '', image: '', category: 'Current Project', date: '', read_time: '', featured: true, gallery: [], sort_order: 0 };

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<(Omit<Article, 'id'> & { id?: number }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [galleryInput, setGalleryInput] = useState('');
  const [picker, setPicker] = useState<'cover' | 'gallery' | null>(null);

  useEffect(() => { api.articles.list().then(setArticles); }, []);

  function openNew() { setEditing({ ...EMPTY }); setGalleryInput(''); }
  function openEdit(a: Article) { setEditing({ ...a }); setGalleryInput(a.gallery.join('\n')); }

  async function save() {
    if (!editing || !editing.title) return;
    setSaving(true);
    const data = { ...editing, gallery: galleryInput.split('\n').map(s => s.trim()).filter(Boolean) };
    if (editing.id) {
      const updated = await api.articles.update(editing.id, data);
      setArticles(prev => prev.map(a => a.id === editing.id ? updated : a));
    } else {
      const created = await api.articles.create(data);
      setArticles(prev => [...prev, created]);
    }
    setSaving(false);
    setEditing(null);
  }

  async function del(id: number) {
    if (!confirm('Delete this article?')) return;
    await api.articles.delete(id);
    setArticles(prev => prev.filter(a => a.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-white">Articles <span className="text-stone-500 text-sm font-normal ml-2">{articles.length} total</span></h2>
        <button onClick={openNew} className="bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-stone-200 transition-colors">+ Add Article</button>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-6">
        {articles.map(a => (
          <div key={a.id} className="group grid grid-cols-12 gap-0 border border-stone-800 hover:border-stone-600 transition-colors bg-stone-900 overflow-hidden">
            {/* Image — left 5 cols */}
            <div className="col-span-5 relative overflow-hidden bg-stone-800">
              {a.image
                ? <img src={a.image} alt={a.title} className="w-full h-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-700" />
                : <div className="aspect-[16/10] flex items-center justify-center text-stone-600 text-xs uppercase tracking-wider">No Image</div>
              }
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-stone-900 text-[9px] font-bold uppercase tracking-widest px-2 py-1">{a.category}</span>
              </div>
              {a.featured && (
                <div className="absolute top-3 right-3">
                  <span className="bg-amber-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">★ Featured</span>
                </div>
              )}
            </div>

            {/* Text — right 7 cols */}
            <div className="col-span-7 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">{a.date}</span>
                  {a.read_time && <>
                    <span className="text-stone-700">·</span>
                    <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest">{a.read_time}</span>
                  </>}
                  {a.gallery.length > 0 && <>
                    <span className="text-stone-700">·</span>
                    <span className="text-stone-600 text-[10px] font-mono uppercase tracking-widest">{a.gallery.length} photos</span>
                  </>}
                </div>
                <h3 className="text-white text-lg font-semibold leading-snug mb-3">{a.title}</h3>
                {a.excerpt && <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{a.excerpt}</p>}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => openEdit(a)}
                  className="text-xs font-bold uppercase tracking-wider bg-white text-black px-4 py-2 hover:bg-stone-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(a.id)}
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
              <h3 className="text-white font-semibold">{editing.id ? 'Edit Article' : 'New Article'}</h3>
              <button onClick={() => setEditing(null)} className="text-stone-400 hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="space-y-4">
              <Field label="Title *" value={editing.title} onChange={v => setEditing(e => e && ({ ...e, title: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category" value={editing.category} onChange={v => setEditing(e => e && ({ ...e, category: v }))} />
                <Field label="Date" value={editing.date} onChange={v => setEditing(e => e && ({ ...e, date: v }))} placeholder="2025 — In Progress" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs text-stone-400 uppercase tracking-wider">Cover Image URL</label>
                  <button type="button" onClick={() => setPicker('cover')} className="text-xs text-stone-400 hover:text-white border border-stone-700 hover:border-stone-400 px-2 py-0.5 transition-colors">Browse</button>
                </div>
                <input value={editing.image} onChange={e => setEditing(ed => ed && ({ ...ed, image: e.target.value }))} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2" />
                {editing.image && <img src={editing.image} alt="" className="mt-2 h-28 w-full object-cover bg-stone-800" />}
              </div>
              <TextArea label="Excerpt" value={editing.excerpt} onChange={v => setEditing(e => e && ({ ...e, excerpt: v }))} />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs text-stone-400 uppercase tracking-wider">Gallery (one URL per line)</label>
                  <button type="button" onClick={() => setPicker('gallery')} className="text-xs text-stone-400 hover:text-white border border-stone-700 hover:border-stone-400 px-2 py-0.5 transition-colors">Browse & Insert</button>
                </div>
                <textarea value={galleryInput} onChange={e => setGalleryInput(e.target.value)} rows={5} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2 font-mono resize-y" placeholder="/photos/project-slug/image.jpg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Read Time" value={editing.read_time} onChange={v => setEditing(e => e && ({ ...e, read_time: v }))} placeholder="5 min read" />
                <Field label="Sort Order" type="number" value={String(editing.sort_order)} onChange={v => setEditing(e => e && ({ ...e, sort_order: parseInt(v) || 0 }))} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="art-featured" checked={!!editing.featured} onChange={e => setEditing(ed => ed && ({ ...ed, featured: e.target.checked }))} className="w-4 h-4" />
                <label htmlFor="art-featured" className="text-sm text-stone-300">Featured on homepage</label>
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

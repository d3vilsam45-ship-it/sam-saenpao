import { useState, useEffect, useRef } from 'react';
import { api } from '../api';

interface Folder { name: string; files: string[] }

export default function MediaPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState('');
  const [newFolder, setNewFolder] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await api.media.folders();
    setFolders(data);
    if (data.length && !selected) setSelected(data[0].name);
  }

  async function upload(files: FileList) {
    if (!selected && !newFolder) return;
    const folder = newFolder.trim() || selected!;
    setUploading(true);
    await api.media.upload(Array.from(files), folder);
    setNewFolder('');
    await load();
    setSelected(folder);
    setUploading(false);
  }

  async function del(path: string) {
    if (!confirm('Delete this file?')) return;
    await api.media.delete(path);
    setFolders(prev => prev.map(f => ({ ...f, files: f.files.filter(p => p !== path) })));
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(''), 2000);
  }

  const currentFiles = folders.find(f => f.name === selected)?.files || [];

  return (
    <div className="flex gap-6 h-full">
      {/* Sidebar */}
      <div className="w-48 flex-shrink-0">
        <p className="text-xs text-stone-400 uppercase tracking-wider mb-3">Folders</p>
        <div className="space-y-1">
          {folders.map(f => (
            <button key={f.name} onClick={() => setSelected(f.name)} className={`w-full text-left text-sm px-3 py-2 transition-colors truncate ${selected === f.name ? 'bg-white text-black' : 'text-stone-300 hover:text-white hover:bg-stone-800'}`}>
              {f.name} <span className="text-xs opacity-60">({f.files.length})</span>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-stone-800">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Upload to folder</p>
          <input value={newFolder} onChange={e => setNewFolder(e.target.value)} placeholder="new-folder or select" className="w-full bg-stone-900 border border-stone-700 text-white text-xs px-2 py-1.5 mb-2" />
          <button onClick={() => inputRef.current?.click()} disabled={uploading} className="w-full bg-white text-black text-xs font-bold uppercase tracking-wider px-3 py-2 hover:bg-stone-200 disabled:opacity-50">
            {uploading ? 'Uploading…' : 'Choose Files'}
          </button>
          <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => e.target.files && upload(e.target.files)} />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-medium">{selected} <span className="text-stone-400 text-sm font-normal">— {currentFiles.length} files</span></p>
        </div>
        {currentFiles.length === 0 ? (
          <p className="text-stone-500 text-sm">No images in this folder.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {currentFiles.map(file => (
              <div key={file} className="group relative aspect-square bg-stone-900">
                <img src={file} alt="" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <button onClick={() => copy(file)} className="text-xs text-white bg-stone-700 hover:bg-stone-600 px-2 py-1 w-full text-center transition-colors">
                    {copied === file ? '✓ Copied' : 'Copy URL'}
                  </button>
                  <button onClick={() => del(file)} className="text-xs text-red-400 hover:text-red-300 px-2 py-1 w-full text-center">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

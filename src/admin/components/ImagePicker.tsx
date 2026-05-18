import { useState, useEffect } from 'react';
import { api } from '../api';

interface FolderData {
  name: string;
  files: string[];
}

interface Props {
  mode: 'single' | 'multi';
  onSelect: (urls: string[]) => void;
  onClose: () => void;
}

export default function ImagePicker({ mode, onSelect, onClose }: Props) {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.media.folders().then((data: FolderData[]) => {
      setFolders(data);
      if (data.length > 0) setActiveFolder(data[0].name);
      setLoading(false);
    });
  }, []);

  const currentFiles = folders.find(f => f.name === activeFolder)?.files ?? [];

  function toggle(url: string) {
    if (mode === 'single') {
      onSelect([url]);
      return;
    }
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex items-start justify-center overflow-y-auto py-8" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-stone-950 border border-stone-700 w-full max-w-4xl mx-4 flex flex-col" style={{ maxHeight: '85vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800 flex-shrink-0">
          <div>
            <h3 className="text-white font-semibold text-sm">Browse Media</h3>
            <p className="text-stone-500 text-xs mt-0.5">{mode === 'single' ? 'Click an image to select it' : 'Click images to select, then Insert'}</p>
          </div>
          <div className="flex items-center gap-3">
            {mode === 'multi' && selected.size > 0 && (
              <button
                onClick={() => { onSelect(Array.from(selected)); }}
                className="bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-stone-200"
              >
                Insert {selected.size} image{selected.size !== 1 ? 's' : ''}
              </button>
            )}
            <button onClick={onClose} className="text-stone-400 hover:text-white text-xl leading-none">×</button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Folder sidebar */}
          <div className="w-44 flex-shrink-0 border-r border-stone-800 overflow-y-auto py-2">
            {loading ? (
              <p className="text-stone-500 text-xs px-4 py-2">Loading…</p>
            ) : folders.length === 0 ? (
              <p className="text-stone-500 text-xs px-4 py-2">No folders</p>
            ) : (
              folders.map(f => (
                <button
                  key={f.name}
                  onClick={() => setActiveFolder(f.name)}
                  className={`w-full text-left text-xs px-4 py-2.5 truncate transition-colors ${activeFolder === f.name ? 'bg-white text-black' : 'text-stone-400 hover:text-white hover:bg-stone-900'}`}
                >
                  {f.name}
                  <span className={`ml-1.5 ${activeFolder === f.name ? 'text-stone-500' : 'text-stone-600'}`}>({f.files.length})</span>
                </button>
              ))
            )}
          </div>

          {/* Image grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {currentFiles.length === 0 ? (
              <p className="text-stone-500 text-sm">No images in this folder.</p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {currentFiles.map(url => {
                  const isSelected = selected.has(url);
                  return (
                    <button
                      key={url}
                      onClick={() => toggle(url)}
                      className={`relative aspect-square overflow-hidden border-2 transition-all ${isSelected ? 'border-white' : 'border-transparent hover:border-stone-500'}`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover bg-stone-800" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                          <span className="bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

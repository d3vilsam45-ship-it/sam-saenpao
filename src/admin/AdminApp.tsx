import { useState } from 'react';
import { login, logout, isLoggedIn } from './api';
import ProjectsPage from './pages/ProjectsPage';
import ArticlesPage from './pages/ArticlesPage';
import MediaPage from './pages/MediaPage';
import SettingsPage from './pages/SettingsPage';

type Page = 'projects' | 'articles' | 'media' | 'settings';

const NAV: { id: Page; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'articles', label: 'Articles' },
  { id: 'media', label: 'Media' },
  { id: 'settings', label: 'Settings' },
];

export default function AdminApp() {
  const [authed, setAuthed] = useState(isLoggedIn());
  const [page, setPage] = useState<Page>('projects');

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-white font-semibold tracking-widest text-sm uppercase">Sam Saenpao <span className="text-stone-500">/ Admin</span></span>
          <nav className="flex gap-1">
            {NAV.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className={`text-xs uppercase tracking-wider px-3 py-1.5 transition-colors ${page === n.id ? 'bg-white text-black' : 'text-stone-400 hover:text-white'}`}>
                {n.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer" className="text-xs text-stone-500 hover:text-white transition-colors">View Site ↗</a>
          <button onClick={() => { logout(); setAuthed(false); }} className="text-xs text-stone-500 hover:text-red-400 transition-colors">Sign Out</button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {page === 'projects' && <ProjectsPage />}
        {page === 'articles' && <ArticlesPage />}
        {page === 'media' && <MediaPage />}
        {page === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(password);
      onLogin();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <div className="mb-10 text-center">
          <h1 className="text-white text-lg font-semibold tracking-widest uppercase">Sam Saenpao</h1>
          <p className="text-stone-500 text-xs mt-1 tracking-wider">Admin Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-stone-400 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-stone-900 border border-stone-700 text-white px-4 py-3 text-sm focus:border-stone-400 outline-none transition-colors"
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-3 hover:bg-stone-200 disabled:opacity-50 transition-colors">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

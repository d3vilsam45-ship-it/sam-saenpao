import { useState, useEffect } from 'react';
import { api } from '../api';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.settings.get().then(setSettings); }, []);

  async function save() {
    setSaving(true);
    await api.settings.update(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function set(key: string, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <button onClick={save} disabled={saving} className="bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-stone-200 disabled:opacity-50">
          {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        <Section title="Site">
          <Field label="Site Title" value={settings.site_title || ''} onChange={v => set('site_title', v)} />
          <TextArea label="Meta Description" value={settings.meta_description || ''} onChange={v => set('meta_description', v)} />
        </Section>

        <Section title="Hero">
          <Field label="Hero Title" value={settings.hero_title || ''} onChange={v => set('hero_title', v)} />
          <TextArea label="Hero Subtitle" value={settings.hero_subtitle || ''} onChange={v => set('hero_subtitle', v)} />
        </Section>

        <Section title="About">
          <TextArea label="Bio" value={settings.about_bio || ''} onChange={v => set('about_bio', v)} rows={5} />
        </Section>

        <Section title="Status">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="available" checked={settings.available === 'true'} onChange={e => set('available', e.target.checked ? 'true' : 'false')} className="w-4 h-4" />
            <label htmlFor="available" className="text-sm text-stone-300">Show "Available for work" indicator</label>
          </div>
        </Section>

        <Section title="Admin Password">
          <p className="text-xs text-stone-500 mb-3">To change the admin password, update the ADMIN_PASSWORD value in your .env file and restart the server.</p>
          <div className="bg-stone-900 border border-stone-800 p-3 font-mono text-xs text-stone-400">
            ADMIN_PASSWORD=your-new-password
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-stone-800 p-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="w-full bg-stone-900 border border-stone-700 text-white text-sm px-3 py-2 resize-y" />
    </div>
  );
}

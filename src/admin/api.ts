const BASE = '/api';

function getToken() {
  return localStorage.getItem('admin_token') || '';
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

export async function login(password: string) {
  const res = await fetch(`${BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('admin_token', data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('admin_token');
}

export function isLoggedIn() {
  return !!localStorage.getItem('admin_token');
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, { headers: authHeaders(), ...options });
  if (res.status === 401) { logout(); window.location.reload(); }
  return res.json();
}

export const api = {
  projects: {
    list: () => apiFetch('/projects'),
    create: (data: unknown) => apiFetch('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: unknown) => apiFetch(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => apiFetch(`/projects/${id}`, { method: 'DELETE' }),
  },
  articles: {
    list: () => apiFetch('/articles'),
    create: (data: unknown) => apiFetch('/articles', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: unknown) => apiFetch(`/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => apiFetch(`/articles/${id}`, { method: 'DELETE' }),
  },
  makers: {
    list: () => apiFetch('/makers'),
    create: (data: unknown) => apiFetch('/makers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: unknown) => apiFetch(`/makers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => apiFetch(`/makers/${id}`, { method: 'DELETE' }),
  },
  experience: {
    list: () => apiFetch('/experience'),
    create: (data: unknown) => apiFetch('/experience', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: unknown) => apiFetch(`/experience/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => apiFetch(`/experience/${id}`, { method: 'DELETE' }),
  },
  settings: {
    get: () => apiFetch('/settings'),
    update: (data: unknown) => apiFetch('/settings', { method: 'PUT', body: JSON.stringify(data) }),
  },
  media: {
    folders: () => apiFetch('/media/folders'),
    upload: async (files: File[], folder: string) => {
      const form = new FormData();
      files.forEach(f => form.append('files', f));
      const res = await fetch(`${BASE}/media/upload?folder=${folder}`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: form });
      return res.json();
    },
    delete: (path: string) => apiFetch('/media/file', { method: 'DELETE', body: JSON.stringify({ path }) }),
  },
};

import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

function parseProject(row: Record<string, unknown>) {
  return { ...row, gallery: JSON.parse((row.gallery as string) || '[]') };
}

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM projects ORDER BY sort_order ASC').all() as Record<string, unknown>[];
  res.json(rows.map(parseProject));
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id) as Record<string, unknown> | undefined;
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(parseProject(row));
});

router.post('/', requireAuth, (req, res) => {
  const { title, location, year, image, category, role, description, read_time, client, builder, area, design_team, photographer, gallery, sort_order, featured } = req.body;
  const result = db.prepare(`
    INSERT INTO projects (title, location, year, image, category, role, description, read_time, client, builder, area, design_team, photographer, gallery, sort_order, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, location, year, image, category, role, description, read_time, client, builder, area, design_team, photographer, JSON.stringify(gallery || []), sort_order || 0, featured ? 1 : 0);
  const newRow = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid) as Record<string, unknown>;
  res.status(201).json(parseProject(newRow));
});

router.put('/:id', requireAuth, (req, res) => {
  const { title, location, year, image, category, role, description, read_time, client, builder, area, design_team, photographer, gallery, sort_order, featured } = req.body;
  db.prepare(`
    UPDATE projects SET title=?, location=?, year=?, image=?, category=?, role=?, description=?, read_time=?, client=?, builder=?, area=?, design_team=?, photographer=?, gallery=?, sort_order=?, featured=?
    WHERE id=?
  `).run(title, location, year, image, category, role, description, read_time, client, builder, area, design_team, photographer, JSON.stringify(gallery || []), sort_order || 0, featured ? 1 : 0, req.params.id);
  const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id) as Record<string, unknown>;
  res.json(parseProject(updated));
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;

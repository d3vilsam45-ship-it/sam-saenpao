import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

function parseArticle(row: Record<string, unknown>) {
  return { ...row, gallery: JSON.parse((row.gallery as string) || '[]'), featured: !!(row.featured) };
}

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM articles ORDER BY sort_order ASC').all() as Record<string, unknown>[];
  res.json(rows.map(parseArticle));
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id) as Record<string, unknown> | undefined;
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(parseArticle(row));
});

router.post('/', requireAuth, (req, res) => {
  const { title, excerpt, image, category, date, read_time, featured, gallery, sort_order } = req.body;
  const result = db.prepare(`
    INSERT INTO articles (title, excerpt, image, category, date, read_time, featured, gallery, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, excerpt, image, category, date, read_time, featured ? 1 : 0, JSON.stringify(gallery || []), sort_order || 0);
  const newRow = db.prepare('SELECT * FROM articles WHERE id = ?').get(result.lastInsertRowid) as Record<string, unknown>;
  res.status(201).json(parseArticle(newRow));
});

router.put('/:id', requireAuth, (req, res) => {
  const { title, excerpt, image, category, date, read_time, featured, gallery, sort_order } = req.body;
  db.prepare(`
    UPDATE articles SET title=?, excerpt=?, image=?, category=?, date=?, read_time=?, featured=?, gallery=?, sort_order=?
    WHERE id=?
  `).run(title, excerpt, image, category, date, read_time, featured ? 1 : 0, JSON.stringify(gallery || []), sort_order || 0, req.params.id);
  const updated = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id) as Record<string, unknown>;
  res.json(parseArticle(updated));
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;

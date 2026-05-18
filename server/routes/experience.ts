import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(db.prepare('SELECT * FROM experience ORDER BY sort_order ASC').all());
});

router.post('/', requireAuth, (req, res) => {
  const { year, title, company, description, logo, sort_order } = req.body;
  const result = db.prepare('INSERT INTO experience (year, title, company, description, logo, sort_order) VALUES (?, ?, ?, ?, ?, ?)').run(year, title, company, description, logo, sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM experience WHERE id = ?').get(result.lastInsertRowid));
});

router.put('/:id', requireAuth, (req, res) => {
  const { year, title, company, description, logo, sort_order } = req.body;
  db.prepare('UPDATE experience SET year=?, title=?, company=?, description=?, logo=?, sort_order=? WHERE id=?').run(year, title, company, description, logo, sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM experience WHERE id = ?').get(req.params.id));
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM experience WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;

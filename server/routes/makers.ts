import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(db.prepare('SELECT * FROM makers ORDER BY sort_order ASC').all());
});

router.post('/', requireAuth, (req, res) => {
  const { name, type, image, origin, description, sort_order } = req.body;
  const result = db.prepare('INSERT INTO makers (name, type, image, origin, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)').run(name, type, image, origin, description, sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM makers WHERE id = ?').get(result.lastInsertRowid));
});

router.put('/:id', requireAuth, (req, res) => {
  const { name, type, image, origin, description, sort_order } = req.body;
  db.prepare('UPDATE makers SET name=?, type=?, image=?, origin=?, description=?, sort_order=? WHERE id=?').run(name, type, image, origin, description, sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM makers WHERE id = ?').get(req.params.id));
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM makers WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;

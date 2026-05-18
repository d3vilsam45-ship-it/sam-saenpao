import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAuth } from '../auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'public', 'photos', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folder = (req.query.folder as string) || 'uploads';
    const dest = path.join(__dirname, '..', '..', 'public', 'photos', folder);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9._-]/g, '-');
    cb(null, `${name}${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

const router = Router();

router.get('/folders', requireAuth, (_req, res) => {
  const photosDir = path.join(__dirname, '..', '..', 'public', 'photos');
  const folders = fs.readdirSync(photosDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const files = fs.readdirSync(path.join(photosDir, d.name))
        .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
        .map(f => `/photos/${d.name}/${f}`);
      return { name: d.name, files };
    });
  res.json(folders);
});

router.post('/upload', requireAuth, upload.array('files', 20), (req, res) => {
  const folder = (req.query.folder as string) || 'uploads';
  const files = (req.files as Express.Multer.File[]).map(f => `/photos/${folder}/${f.filename}`);
  res.json({ files });
});

router.delete('/file', requireAuth, (req, res) => {
  const filePath = req.body.path as string;
  if (!filePath?.startsWith('/photos/')) return res.status(400).json({ error: 'Invalid path' });
  const abs = path.join(__dirname, '..', '..', 'public', filePath);
  if (fs.existsSync(abs)) fs.unlinkSync(abs);
  res.json({ ok: true });
});

export default router;

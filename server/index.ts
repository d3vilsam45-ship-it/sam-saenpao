import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createToken } from './auth.js';
import projectsRouter from './routes/projects.js';
import articlesRouter from './routes/articles.js';
import makersRouter from './routes/makers.js';
import experienceRouter from './routes/experience.js';
import settingsRouter from './routes/settings.js';
import mediaRouter from './routes/media.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));
app.use(express.json());

// Auth
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  res.json({ token: createToken() });
});

// API routes
app.use('/api/projects', projectsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/makers', makersRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/media', mediaRouter);

// Serve static files in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

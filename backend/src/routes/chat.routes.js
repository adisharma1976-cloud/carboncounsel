import express from 'express';
import { answerQuery } from '../services/chat.service.js';

const router = express.Router();

router.post('/', (req, res) => {
  const query = req.body.message || req.body.query;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'A message or query string is required' });
  }

  res.json({ success: true, ...answerQuery(query.trim()) });
});

export default router;

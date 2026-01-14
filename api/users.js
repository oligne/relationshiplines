import { createClient } from '@libsql/client';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await turso.execute('SELECT * FROM users ORDER BY id ASC');
      res.status(200).json(result.rows);
    } catch (e) {
      console.error('API ERROR:', e); // Ajoute ce log
      res.status(500).json({ error: e.message, stack: e.stack });
    }
  } else if (req.method === 'POST') {
    try {
      const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || 'unknown';
      const existing = await turso.execute({
        sql: 'SELECT * FROM users WHERE ip = ?',
        args: [ip],
      });
      if (existing.rows.length > 0) {
        return res.status(200).json(existing.rows[0]);
      }
      const userNum = Math.floor(1000 + Math.random() * 9000);
      const pseudo = `user${userNum}`;
      const result = await turso.execute({
        sql: 'INSERT INTO users (pseudo, ip) VALUES (?, ?) RETURNING *',
        args: [pseudo, ip],
      });
      res.status(200).json(result.rows[0]);
    } catch (e) {
      console.error('API ERROR:', e); // Ajoute ce log
      res.status(500).json({ error: e.message, stack: e.stack });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

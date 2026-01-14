import { turso } from '@/lib/turso';

// GET/POST pour les utilisateurs

export async function GET() {
  const result = await turso.execute('SELECT * FROM users ORDER BY id ASC');
  return Response.json(result.rows);
}

export async function POST() {
  const userNum = Math.floor(1000 + Math.random() * 9000);
  const pseudo = `user${userNum}`;
  const result = await turso.execute({
    sql: 'INSERT INTO users (pseudo) VALUES (?) RETURNING *',
    args: [pseudo],
  });
  return Response.json(result.rows[0]);
}

import { turso } from '@/lib/turso';

// PATCH pour modifier le nom
export async function PATCH(request, { params }) {
  const { pseudo } = await request.json();
  await turso.execute({
    sql: 'UPDATE users SET pseudo = ? WHERE id = ?',
    args: [pseudo, params.id],
  });
  const result = await turso.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [params.id],
  });
  return Response.json(result.rows[0]);
}

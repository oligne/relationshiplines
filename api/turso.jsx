// src/api/turso.js
// Exemple d'accès à Turso depuis le front (à adapter selon ton backend)

export async function getUsers() {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Erreur API');
  return await res.json();
}

export async function createUser(ip) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip })
  });
  if (!res.ok) throw new Error('Erreur API');
  return await res.json();
}

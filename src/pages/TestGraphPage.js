import ForceGraph3DView from '../components/ForceGraph3DView';

export default function TestGraphPage() {
  const users = [
    { id: 1, pseudo: 'A' },
    { id: 2, pseudo: 'B' }
  ];
  const me = users[0];
  const onlineUsers = { 1: true, 2: true };

  return (
    <main>
      <h2 style={{ fontFamily: 'Menlo', margin: 16 }}>Test Graph 3D (nodes statiques)</h2>
      <ForceGraph3DView users={users} me={me} onlineUsers={onlineUsers} />
    </main>
  );
}

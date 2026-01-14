import { useEffect, useState, useRef } from 'react';
import ForceGraph3DView from '../components/ForceGraph3DView.jsx';
import { getUsers, createUser } from '../api/turso';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});
  const [error, setError] = useState(null);
  const heartbeatRef = useRef();

  useEffect(() => {
    createUser('client-ip').then(user => {
      setMe(user);
      refresh();
    }).catch(e => setError(e.message));
  }, []);

  function refresh() {
    getUsers().then(data => {
      setUsers(data);
      const now = Date.now();
      const online = {};
      data.forEach(u => {
        if (u.last_seen && now - new Date(u.last_seen).getTime() < 20000) {
          online[u.id] = true;
        }
      });
      setOnlineUsers(online);
    }).catch(e => setError(e.message));
  }

  async function savePseudo(id) {
    if (!editValue.trim()) return;
    // PATCH à adapter selon ton backend
    await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ pseudo: editValue }),
      headers: { 'Content-Type': 'application/json' },
    });
    setEditId(null);
    refresh();
  }

  return (
    <main>
      {error && (
        <div style={{ color: 'red', fontFamily: 'Menlo', margin: 16 }}>Erreur API: {error}</div>
      )}
      <ForceGraph3DView
        users={users}
        me={me}
        onlineUsers={onlineUsers}
        onEdit={id => setEditId(id)}
        editId={editId}
        editValue={editValue}
        onEditValueChange={e => setEditValue(e.target.value)}
        onSave={savePseudo}
        onRefresh={refresh}
      />
    </main>
  );
}

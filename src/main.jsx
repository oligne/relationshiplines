import { useEffect, useState, useRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import ForceGraph3DView from './components/ForceGraph3DView.jsx';
import { getUsers, createUser } from '../api/turso.jsx';

function MainPage() {
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
    await fetch(`./api/users/${id}`, {
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
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
        <span className="title" style={{ fontSize: 20, textAlign: 'center' }}>what if everything was visible ?</span>
        <button className="menu" style={{ position: 'absolute', right: 32, fontSize: 18 }} onClick={refresh}>refresh ↻</button>
      </div>
      <ForceGraph3DView users={users} me={me} onlineUsers={onlineUsers} />
      <div style={{
        position: 'fixed',
        left: 16,
        bottom: 16,
        background: 'rgba(255,255,255,0.95)',
        fontFamily: 'Menlo, monospace',
        fontSize: 16,
        color: '#000',
        padding: '12px 18px 12px 12px',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        zIndex: 1000,
        minWidth: 120,
        maxHeight: '40vh',
        overflowY: 'auto',
      }}>
        {users.map(user => (
          <div key={user.id} style={{ fontWeight: me?.id === user.id ? 700 : 400 }}>
            /user/{user.pseudo}
          </div>
        ))}
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
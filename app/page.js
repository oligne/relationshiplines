// Page principale
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetch('/api/users', { method: 'POST' })
      .then(res => res.json())
      .then(user => {
        setMe(user);
        refresh();
      });
  }, []);

  function refresh() {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }

  async function savePseudo(id) {
    await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ pseudo: editValue }),
      headers: { 'Content-Type': 'application/json' },
    });
    setEditId(null);
    refresh();
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-mono">relationshiplines</h1>
      <button
        className="mb-6 px-4 py-2 border rounded font-mono"
        onClick={refresh}
      >
        refresh
      </button>
      <div className="flex flex-wrap gap-8 justify-center">
        {users.map(user => (
          <div key={user.id} className="flex flex-col items-center">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-black" />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center font-mono text-sm">
                {editId === user.id ? (
                  <>
                    <input
                      autoFocus
                      className="border-b outline-none w-24"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={() => savePseudo(user.id)}
                      onKeyDown={e => e.key === 'Enter' && savePseudo(user.id)}
                    />
                    <span className="animate-blink ml-1">|</span>
                  </>
                ) : (
                  <>
                    <span>{user.pseudo}</span>
                    {me?.id === user.id && (
                      <span
                        className="ml-1 cursor-pointer animate-blink"
                        onClick={() => {
                          setEditId(user.id);
                          setEditValue(user.pseudo);
                        }}
                      >
                        |
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </main>
  );
}

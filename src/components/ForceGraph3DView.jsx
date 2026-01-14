import ForceGraph3D from 'react-force-graph-3d';

export default function ForceGraph3DView({ users }) {
  const nodes = users.map(u => ({ id: u.id, name: u.pseudo }));
  return (
    <div style={{ width: '100vw', height: '70vh', minHeight: 400 }}>
      <ForceGraph3D
        graphData={{ nodes, links: [] }}
        nodeLabel="name"
        nodeColor={() => '#ff00ff'}
        nodeRelSize={16}
        backgroundColor="#ffeedd"
        showNavInfo={false}
        cameraPosition={{ x: 0, y: 0, z: 200 }}
      />
    </div>
  );
}

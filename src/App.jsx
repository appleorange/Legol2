import React, { useState, useEffect } from 'react';
import MosaicGraph from './components/MosaicGraph';
import QueryInput from './components/QueryInput';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Intelligence from './components/Intelligence';
import { api } from './api';
import './App.css';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Remove showWelcome for the new design as Hero replaces it

  useEffect(() => {
    fetchGraph();
  }, []);

  const processGraphData = (data) => {
    if (!data.nodes) return { nodes: [], edges: [] };

    const processedNodes = data.nodes.map(node => {
      const backendType = node.data?.type?.toLowerCase() || 'default';

      let nodeType = 'default';
      if (['document', 'agency', 'action'].includes(backendType)) {
        nodeType = backendType;
      } else if (backendType === 'event') {
        nodeType = 'action';
      }

      return {
        ...node,
        type: nodeType,
      };
    });

    return { nodes: processedNodes, edges: data.edges || [] };
  };

  const fetchGraph = async () => {
    try {
      const data = await api.getGraph();
      if (data.nodes && data.nodes.length > 0) {
        const { nodes, edges } = processGraphData(data);
        setNodes(nodes);
        setEdges(edges);
      }
    } catch (err) {
      console.error("Failed to fetch graph:", err);
    }
  };

  const handleQuery = async (queryText) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.sendQuery(queryText);
      if (result.graph) {
        const { nodes, edges } = processGraphData(result.graph);
        setNodes(nodes);
        setEdges(edges);
      }
    } catch (err) {
      console.error("Query failed:", err);
      setError("Failed to process query.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await api.clearGraph();
      setNodes([]);
      setEdges([]);
    } catch (err) {
      console.error("Clear failed", err);
    }
  };

  return (
    <div className="App" style={{ background: '#F6F8FA', minHeight: '100vh', margin: 0 }}>
      <Hero />
      <Vision />

      <Intelligence>
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
          {/* Graph Controls Overlay */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '90%',
            maxWidth: '600px'
          }}>
            <QueryInput onQuery={handleQuery} isLoading={isLoading} />
          </div>

          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              padding: '8px 16px',
              background: '#fff',
              color: '#dc3545',
              border: '1px solid #dc3545',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>

          {/* Actual Graph */}
          <MosaicGraph initialNodes={nodes} initialEdges={edges} />
        </div>
      </Intelligence>

      {/* Spacer to allow full scroll through Intelligence */}
      <div style={{ height: '50vh', background: '#F6F8FA' }}>
        <p style={{ textAlign: 'center', color: '#999', paddingTop: '50px' }}>End of Demo</p>
      </div>
    </div>
  );
}

export default App;

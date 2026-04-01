"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  id: string;
  label: string;
  type: "project" | "contributor" | "idea";
  x: number;
  y: number;
  radius: number;
  color: string;
  connections: string[];
}

export function EcosystemVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Sample ecosystem data
  const nodes: Node[] = [
    {
      id: "core-1",
      label: "Core Framework",
      type: "project",
      x: 0,
      y: 0,
      radius: 20,
      color: "#1ae5e5",
      connections: ["contrib-1", "contrib-2", "idea-1"],
    },
    {
      id: "proj-1",
      label: "UI Module",
      type: "project",
      x: 80,
      y: 40,
      radius: 15,
      color: "#d94fd6",
      connections: ["core-1", "contrib-3"],
    },
    {
      id: "proj-2",
      label: "API Gateway",
      type: "project",
      x: -80,
      y: 50,
      radius: 15,
      color: "#ebb134",
      connections: ["core-1", "contrib-1"],
    },
    {
      id: "contrib-1",
      label: "Alice",
      type: "contributor",
      x: 30,
      y: -50,
      radius: 10,
      color: "#00ff88",
      connections: ["core-1", "proj-2"],
    },
    {
      id: "contrib-2",
      label: "Bob",
      type: "contributor",
      x: -40,
      y: -60,
      radius: 10,
      color: "#00ff88",
      connections: ["core-1"],
    },
    {
      id: "contrib-3",
      label: "Carol",
      type: "contributor",
      x: 60,
      y: -20,
      radius: 10,
      color: "#00ff88",
      connections: ["proj-1"],
    },
    {
      id: "idea-1",
      label: "Performance Opt",
      type: "idea",
      x: -60,
      y: 20,
      radius: 8,
      color: "#9d4edd",
      connections: ["core-1"],
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to parent container size
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = Math.max(400, rect.width - 16);
      canvas.height = Math.max(300, Math.min(600, window.innerHeight * 0.6));
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear with dark background
    ctx.fillStyle = "rgba(6, 5, 18, 0.1)";
    ctx.fillRect(0, 0, width, height);

    // Center point
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw connections first (so they appear behind nodes)
    ctx.strokeStyle = "rgba(26, 229, 229, 0.2)";
    ctx.lineWidth = 1;
    nodes.forEach((node) => {
      node.connections.forEach((connId) => {
        const connNode = nodes.find((n) => n.id === connId);
        if (connNode) {
          const x1 = centerX + node.x * zoom + pan.x;
          const y1 = centerY + node.y * zoom + pan.y;
          const x2 = centerX + connNode.x * zoom + pan.x;
          const y2 = centerY + connNode.y * zoom + pan.y;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    nodes.forEach((node) => {
      const x = centerX + node.x * zoom + pan.x;
      const y = centerY + node.y * zoom + pan.y;
      let radius = node.radius * zoom;

      // Enhanced rendering for hovered/selected nodes
      if (hoveredNode === node.id || selectedNode === node.id) {
        radius *= 1.5;

        // Glow effect
        ctx.fillStyle = node.color + "40";
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Node circle
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = hoveredNode === node.id ? node.color : "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label (only for main nodes when zoomed in or hovered)
      if (zoom > 0.5 || hoveredNode === node.id) {
        ctx.fillStyle = "rgba(237, 237, 237, 0.8)";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, x, y);
      }
    });

    // Draw legend
    ctx.fillStyle = "rgba(237, 237, 237, 0.6)";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("◉ Projects", 20, 30);
    ctx.fillStyle = "#1ae5e5";
    ctx.fillRect(10, 20, 8, 8);

    ctx.fillStyle = "rgba(237, 237, 237, 0.6)";
    ctx.fillText("● Contributors", 20, 55);
    ctx.fillStyle = "#00ff88";
    ctx.fillRect(10, 45, 8, 8);

    ctx.fillStyle = "rgba(237, 237, 237, 0.6)";
    ctx.fillText("◆ Ideas", 20, 80);
    ctx.fillStyle = "#9d4edd";
    ctx.fillRect(10, 70, 8, 8);
  }, [hoveredNode, selectedNode, zoom, pan]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Check which node is hovered
    for (const node of nodes) {
      const nodeX = centerX + node.x * zoom + pan.x;
      const nodeY = centerY + node.y * zoom + pan.y;
      const radius = node.radius * zoom;

      const dist = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2));
      if (dist < radius * 2) {
        setHoveredNode(node.id);
        return;
      }
    }
    setHoveredNode(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (const node of nodes) {
      const nodeX = centerX + node.x * zoom + pan.x;
      const nodeY = centerY + node.y * zoom + pan.y;
      const radius = node.radius * zoom;

      const dist = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2));
      if (dist < radius * 2) {
        setSelectedNode(node.id === selectedNode ? null : node.id);
        return;
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseMove={handleCanvasMouseMove}
        onClick={handleCanvasClick}
        className="rounded-lg border border-white/10 bg-linear-to-br from-[--brand-purple]/20 to-[--brand-midnight]/40 cursor-crosshair w-full h-auto max-w-4xl mx-auto block"
      />

      {/* Node Info Panel */}
      {selectedNode && (
        <div className="p-4 rounded-lg border border-[--color-brand-cyan]/50 bg-linear-to-r from-[--brand-purple]/30 to-[--brand-midnight]/40 backdrop-blur-sm">
          {nodes
            .filter((n) => n.id === selectedNode)
            .map((node) => (
              <div key={node.id}>
                <h3 className="text-lg font-bold text-[--foreground] mb-2">{node.label}</h3>
                <p className="text-[--foreground] opacity-70 text-sm mb-3">
                  Type: <span className="capitalize">{node.type}</span>
                </p>
                <p className="text-[--foreground] opacity-70 text-sm">
                  Connections: {node.connections.length}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-[--foreground] transition-all"
        >
          Zoom Out
        </button>
        <button
          onClick={() => setZoom(1)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-[--foreground] transition-all"
        >
          Reset
        </button>
        <button
          onClick={() => setZoom(Math.min(3, zoom + 0.2))}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-[--foreground] transition-all"
        >
          Zoom In
        </button>
      </div>
    </div>
  );
}

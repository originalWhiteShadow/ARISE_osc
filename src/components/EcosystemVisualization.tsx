"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: string;
  label: string;
  type: "project" | "contributor" | "idea";
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  connections: string[];
}

const initialNodes: Node[] = [
  { id: "core-1", label: "Core Framework", type: "project", x: 0, y: 0, baseX: 0, baseY: 0, radius: 26, color: "#00E5FF", connections: ["contrib-1", "contrib-2", "idea-1", "proj-1", "proj-2", "idea-2"] },
  { id: "proj-1", label: "UI Module", type: "project", x: 120, y: 60, baseX: 120, baseY: 60, radius: 18, color: "#FF2A6D", connections: ["core-1", "contrib-3", "idea-3"] },
  { id: "proj-2", label: "API Gateway", type: "project", x: -120, y: 80, baseX: -120, baseY: 80, radius: 18, color: "#FDB813", connections: ["core-1", "contrib-1"] },
  { id: "contrib-1", label: "Alice", type: "contributor", x: 50, y: -80, baseX: 50, baseY: -80, radius: 12, color: "#00FFA3", connections: ["core-1", "proj-2", "idea-4"] },
  { id: "contrib-2", label: "Bob", type: "contributor", x: -60, y: -100, baseX: -60, baseY: -100, radius: 12, color: "#00FFA3", connections: ["core-1"] },
  { id: "contrib-3", label: "Carol", type: "contributor", x: 90, y: -30, baseX: 90, baseY: -30, radius: 12, color: "#00FFA3", connections: ["proj-1"] },
  { id: "idea-1", label: "Refactor API", type: "idea", x: -90, y: 30, baseX: -90, baseY: 30, radius: 10, color: "#B14EFF", connections: ["core-1"] },
  { id: "idea-2", label: "GraphQL Layer", type: "idea", x: -30, y: 110, baseX: -30, baseY: 110, radius: 10, color: "#B14EFF", connections: ["core-1"] },
  { id: "idea-3", label: "Dark Mode 2.0", type: "idea", x: 140, y: -20, baseX: 140, baseY: -20, radius: 10, color: "#B14EFF", connections: ["proj-1"] },
  { id: "idea-4", label: "Caching", type: "idea", x: 20, y: -130, baseX: 20, baseY: -130, radius: 10, color: "#B14EFF", connections: ["contrib-1"] },
];

export function EcosystemVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use refs for animation loop performance (avoiding React re-renders)
  const nodesRef = useRef<Node[]>(initialNodes);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const hoveredNodeInfoRef = useRef<{ id: string } | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredNodeInfo, setHoveredNodeInfo] = useState<{
    id: string;
    label: string;
    type: string;
    itemsCount: number;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const dragState = useRef({
    isDraggingBackdrop: false,
    draggedNodeId: null as string | null,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
  });

  useEffect(() => {
    zoomRef.current = zoomLevel;
  }, [zoomLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;

    const render = (time: number) => {
      // Dynamic resize based on parent
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        const targetWidth = Math.max(400, rect.width - 16);
        const targetHeight = Math.max(300, Math.min(600, window.innerHeight * 0.6));
        
        // Prevent layout thrashing
        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const zoom = zoomRef.current;
      const pan = panRef.current;
      const hoveredId = hoveredNodeInfoRef.current?.id;
      const draggedId = dragState.current.draggedNodeId;

      // Draw connections
      ctx.lineCap = "round";
      nodesRef.current.forEach((node) => {
        node.connections.forEach((connId) => {
          const connNode = nodesRef.current.find((n) => n.id === connId);
          if (connNode) {
            const x1 = centerX + node.x * zoom + pan.x;
            const y1 = centerY + node.y * zoom + pan.y;
            const x2 = centerX + connNode.x * zoom + pan.x;
            const y2 = centerY + connNode.y * zoom + pan.y;

            const isHighlighted = hoveredId === node.id || hoveredId === connNode.id || draggedId === node.id || draggedId === connNode.id;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            
            if (isHighlighted) {
              const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
              gradient.addColorStop(0, node.color);
              gradient.addColorStop(1, connNode.color);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 3 * zoom;
              ctx.globalAlpha = 0.9;
            } else {
              ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
              ctx.lineWidth = 1.5 * zoom;
              ctx.globalAlpha = 0.4;
            }
            ctx.stroke();
            ctx.globalAlpha = 1.0; 
          }
        });
      });

      // Draw nodes
      nodesRef.current.forEach((node) => {
        const x = centerX + node.x * zoom + pan.x;
        const y = centerY + node.y * zoom + pan.y;
        let radius = node.radius * zoom;
        const isHoveredOrDragged = hoveredId === node.id || draggedId === node.id;

        if (isHoveredOrDragged) {
          radius *= 1.3;
          // Outer glow ambient
          ctx.fillStyle = node.color + "50";
          ctx.beginPath();
          ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main node circle solid fill
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner rim highlight (glassmorphic 3D pop)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1.5 * zoom;
        ctx.beginPath();
        ctx.arc(x, y, radius - (1 * zoom), 0, Math.PI * 2);
        ctx.stroke();

        // Labels
        if (zoom > 0.6 || isHoveredOrDragged) {
          ctx.font = `600 ${Math.max(12, 14 * zoom)}px "Inter", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          const labelY = y + radius + (18 * zoom);

          // Deep dark stroke for supreme readability 
          ctx.lineWidth = 4 * zoom;
          ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
          ctx.lineJoin = "round";
          ctx.strokeText(node.label, x, labelY);

          // Crisp white fill
          ctx.fillStyle = "#ffffff";
          ctx.fillText(node.label, x, labelY);
        }
      });
      
      // Update canvas cursor based on interaction state
      canvas.style.cursor = dragState.current.isDraggingBackdrop ? "grabbing" : (dragState.current.draggedNodeId ? "grabbing" : (hoveredId ? "grab" : "crosshair"));

      // Draw static legend
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.font = "600 13px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText("◉ Projects", 25, 30);
      ctx.fillStyle = "#00E5FF";
      ctx.fillRect(10, 20, 10, 10);

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText("● Contributors", 25, 55);
      ctx.fillStyle = "#00FFA3";
      ctx.fillRect(10, 45, 10, 10);

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText("◆ Ideas", 25, 80);
      ctx.fillStyle = "#B14EFF";
      ctx.fillRect(10, 70, 10, 10);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const zoom = zoomRef.current;
    const pan = panRef.current;

    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const node = nodesRef.current[i];
      const x = centerX + node.x * zoom + pan.x;
      const y = centerY + node.y * zoom + pan.y;
      const radius = node.radius * zoom;

      // Generous hit test
      if (Math.hypot(mouseX - x, mouseY - y) < radius * 1.5) { 
        dragState.current.draggedNodeId = node.id;
        setSelectedNode(node);
        return;
      }
    }

    // Didn't click a node -> Drag background
    dragState.current.isDraggingBackdrop = true;
    dragState.current.startX = mouseX;
    dragState.current.startY = mouseY;
    dragState.current.startPanX = pan.x;
    dragState.current.startPanY = pan.y;
    setSelectedNode(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const zoom = zoomRef.current;

    // 1. Handle Node Dragging
    if (dragState.current.draggedNodeId) { 
       const node = nodesRef.current.find(n => n.id === dragState.current.draggedNodeId);
       if (node) {
         node.x = (mouseX - centerX - panRef.current.x) / zoom;
         node.y = (mouseY - centerY - panRef.current.y) / zoom;
         // Sync base coords so restoring floating effect later won't jump
         node.baseX = node.x; 
         node.baseY = node.y;
       }
       return;
    }

    // 2. Handle Canvas Panning
    if (dragState.current.isDraggingBackdrop) { 
       panRef.current.x = dragState.current.startPanX + (mouseX - dragState.current.startX);
       panRef.current.y = dragState.current.startPanY + (mouseY - dragState.current.startY);
       return;
    }

    // 3. Handle Hover Selection
    let foundHover = false;
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const node = nodesRef.current[i];
      const x = centerX + node.x * zoom + panRef.current.x;
      const y = centerY + node.y * zoom + panRef.current.y;
      const radius = node.radius * zoom;

      if (Math.hypot(mouseX - x, mouseY - y) < radius * 1.5) {
        
        // Calculate items (Total direct connections)
        // Some connections point TO this node, some are listed inside this node's connections array.
        // We accumulate both to get true items count.
        const outgoingConnections = node.connections.length;
        const incomingConnections = nodesRef.current.filter(n => n.connections.includes(node.id)).length;
        const totalItems = outgoingConnections + incomingConnections;

        setHoveredNodeInfo({
          id: node.id,
          label: node.label,
          type: node.type,
          itemsCount: totalItems,
          mouseX: e.clientX,
          mouseY: e.clientY,
        });
        hoveredNodeInfoRef.current = { id: node.id };
        foundHover = true;
        break;
      }
    }

    if (!foundHover) {
       if (hoveredNodeInfo) setHoveredNodeInfo(null);
       hoveredNodeInfoRef.current = null;
    }
  };

  const handleMouseUp = () => {
    dragState.current.isDraggingBackdrop = false;
    dragState.current.draggedNodeId = null;
  };

  const handleMouseLeave = () => {
    dragState.current.isDraggingBackdrop = false;
    dragState.current.draggedNodeId = null;
    setHoveredNodeInfo(null);
    hoveredNodeInfoRef.current = null;
  };

  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-[12px] w-full h-auto max-w-4xl mx-auto block shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors hover:bg-white/10"
      />

      {/* Floating Tooltip matching website theme */}
      <AnimatePresence>
        {hoveredNodeInfo && !dragState.current.isDraggingBackdrop && !dragState.current.draggedNodeId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 glass border border-white/20 px-4 py-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl bg-black/40"
            style={{
              left: hoveredNodeInfo.mouseX + 20,
              top: hoveredNodeInfo.mouseY + 20,
            }}
          >
            <div className="font-black text-white text-base whitespace-nowrap mb-1 tracking-tight drop-shadow-md">
              {hoveredNodeInfo.label}
            </div>
            <div className="text-[10px] text-white/60 uppercase tracking-[0.2em] font-bold mb-3 border-b border-white/10 pb-2">
              {hoveredNodeInfo.type}
            </div>
            <div className="flex items-center gap-2 text-[--color-brand-cyan] font-semibold text-xs bg-[--color-brand-cyan]/10 px-2 py-1 rounded border border-[--color-brand-cyan]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[--color-brand-cyan] shadow-[0_0_8px_#1ae5e5] animate-pulse" />
              Connected Items: {hoveredNodeInfo.itemsCount}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Node Details Panel */}
      {selectedNode && (
        <div className="p-5 rounded-xl border border-[--color-brand-cyan]/30 glass shadow-[0_10px_30px_rgba(26,229,229,0.1)] mt-4 max-w-sm mx-auto w-full backdrop-blur-md bg-white/5 animate-slide-up">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-white tracking-tight">{selectedNode.label}</h3>
            <button onClick={() => setSelectedNode(null)} className="text-white/50 hover:text-white transition-colors">
              ✕
            </button>
          </div>
          <p className="text-white/70 text-sm mb-4 leading-relaxed">
            Role: <span className="capitalize font-semibold text-white tracking-wide">{selectedNode.type}</span>
          </p>
          <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-4" />
          <p className="text-[--color-brand-cyan] font-medium text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[--color-brand-cyan] inline-block shadow-[0_0_5px_currentColor]" />
            Active Connections ({selectedNode.connections.length + initialNodes.filter(n => n.connections.includes(selectedNode.id)).length})
          </p>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
          className="px-6 py-2.5 rounded-full glass border border-white/20 hover:bg-white/10 hover:border-white/40 active:scale-95 text-white font-bold tracking-wide transition-all shadow-lg backdrop-blur-md text-sm"
        >
          Zoom Out
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="px-6 py-2.5 rounded-full glass border border-[--color-brand-cyan]/40 bg-[--color-brand-cyan]/10 hover:bg-[--color-brand-cyan]/20 active:scale-95 text-white font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(26,229,229,0.2)] backdrop-blur-md text-sm"
        >
          Reset View
        </button>
        <button
          onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.2))}
          className="px-6 py-2.5 rounded-full glass border border-white/20 hover:bg-white/10 hover:border-white/40 active:scale-95 text-white font-bold tracking-wide transition-all shadow-lg backdrop-blur-md text-sm"
        >
          Zoom In
        </button>
      </div>
    </div>
  );
}

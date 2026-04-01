"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// We use a simple global reference to track if the canvas wrapper is being hovered
// This prevents the default (0,0) pointer from keeping a permanent hole in the mesh
const pointerState = { isHovered: false };

const RepulsionNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  
  // Geometries stored in refs
  const pointsGeom = useRef<THREE.BufferGeometry | null>(null);
  const linesGeom = useRef<THREE.EdgesGeometry | null>(null);

  // Original pristine vertex arrays arrays for physics references
  const originalPoints = useRef<Float32Array | null>(null);
  const originalLines = useRef<Float32Array | null>(null);
  
  // Shared vectors
  const mouseWorldPos = useRef(new THREE.Vector3());
  const dummyMesh = useRef(new THREE.Object3D());

  // Setup circle texture for the points
  const circleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    if (context) {
      context.beginPath();
      context.arc(32, 32, 30, 0, Math.PI * 2);
      context.fillStyle = "#ffffff";
      context.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    // 1. Build the base geometry (our nodes).
    // Switched to a TorusKnot for an intricate, organic, conscious "network/brain" aesthetic
    const baseGeom = new THREE.TorusKnotGeometry(1.5, 0.5, 64, 12);
    pointsGeom.current = baseGeom;
    originalPoints.current = new Float32Array(baseGeom.attributes.position.array);

    // 2. Build the edges geometry (our connecting lines) based off the exact base geometry
    const edges = new THREE.EdgesGeometry(baseGeom);
    linesGeom.current = edges;
    originalLines.current = new Float32Array(edges.attributes.position.array);

    // 3. Attach standard buffering to Refs
    if (pointsRef.current) pointsRef.current.geometry = baseGeom;
    if (linesRef.current) linesRef.current.geometry = edges;
    
    // Cleanup
    return () => {
      baseGeom.dispose();
      edges.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsGeom.current || !linesGeom.current || !originalPoints.current || !originalLines.current) return;

    // Slowly rotate the virtual center
    dummyMesh.current.rotation.x += delta * 0.1;
    dummyMesh.current.rotation.y += delta * 0.15;
    dummyMesh.current.updateMatrixWorld();

    const pPositions = pointsGeom.current.attributes.position.array as Float32Array;
    const lPositions = linesGeom.current.attributes.position.array as Float32Array;

    // Configurable physics params
    const influenceRadiusSq = 2.5 * 2.5; 
    const pushStrength = 1.3;
    const springBack = 0.15;
    
    // Track if we are hovering
    const isInteracting = pointerState.isHovered;

    if (isInteracting) {
      // Map screen mouse [-1, 1] to world space at z=0 (camera looks down Z axis at origin)
      mouseWorldPos.current.set(
        (state.pointer.x * state.viewport.width) / 2,
        (state.pointer.y * state.viewport.height) / 2,
        0
      );
    } else {
      // Throw mouse infinitely far away to prevent repulsion when not hovering
      mouseWorldPos.current.set(9999, 9999, 9999);
    }

    // Calculate mouse position relative to our rotating mesh local space
    const localMousePos = mouseWorldPos.current.clone().applyMatrix4(dummyMesh.current.matrixWorld.clone().invert());

    // --- 1. PHYSICS LOOP FOR THE NODES (POINTS) ---
    for (let i = 0; i < pPositions.length; i += 3) {
      const ox = originalPoints.current[i];
      const oy = originalPoints.current[i + 1];
      const oz = originalPoints.current[i + 2];

      let cx = pPositions[i];
      let cy = pPositions[i + 1];
      let cz = pPositions[i + 2];

      const dx = ox - localMousePos.x;
      const dy = oy - localMousePos.y;
      const dz = oz - localMousePos.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      let targetX = ox;
      let targetY = oy;
      let targetZ = oz;

      if (distSq < influenceRadiusSq) {
        const dist = Math.sqrt(distSq);
        const force = (Math.sqrt(influenceRadiusSq) - dist) / Math.sqrt(influenceRadiusSq);
        
        const px = dist > 0 ? dx / dist : 0;
        const py = dist > 0 ? dy / dist : 0;
        const pz = dist > 0 ? dz / dist : 0;

        targetX += px * force * pushStrength;
        targetY += py * force * pushStrength;
        targetZ += pz * force * pushStrength;
      }

      // Spring step
      cx += (targetX - cx) * springBack;
      cy += (targetY - cy) * springBack;
      cz += (targetZ - cz) * springBack;

      pPositions[i] = cx;
      pPositions[i + 1] = cy;
      pPositions[i + 2] = cz;
    }
    pointsGeom.current.attributes.position.needsUpdate = true;

    // --- 2. PHYSICS LOOP FOR THE LINES (EDGES) WITH DISCONNECTION LOGIC ---
    for (let i = 0; i < lPositions.length; i += 6) {
      const oxA = originalLines.current[i];
      const oyA = originalLines.current[i + 1];
      const ozA = originalLines.current[i + 2];
      
      const oxB = originalLines.current[i + 3];
      const oyB = originalLines.current[i + 4];
      const ozB = originalLines.current[i + 5];

      const dxA = oxA - localMousePos.x;
      const dyA = oyA - localMousePos.y;
      const dzA = ozA - localMousePos.z;
      const distSqA = dxA * dxA + dyA * dyA + dzA * dzA;

      const dxB = oxB - localMousePos.x;
      const dyB = oyB - localMousePos.y;
      const dzB = ozB - localMousePos.z;
      const distSqB = dxB * dxB + dyB * dyB + dzB * dzB;

      const isRepulsedA = distSqA < influenceRadiusSq;
      const isRepulsedB = distSqB < influenceRadiusSq;

      if (isRepulsedA || isRepulsedB) {
        lPositions[i] = 9999;
        lPositions[i + 1] = 9999;
        lPositions[i + 2] = 9999;
        lPositions[i + 3] = 9999;
        lPositions[i + 4] = 9999;
        lPositions[i + 5] = 9999;
      } else {
        let cxA = lPositions[i];
        if (cxA === 9999) {
          lPositions[i] = oxA;
          lPositions[i + 1] = oyA;
          lPositions[i + 2] = ozA;
          lPositions[i + 3] = oxB;
          lPositions[i + 4] = oyB;
          lPositions[i + 5] = ozB;
        } else {
          lPositions[i] += (oxA - lPositions[i]) * springBack;
          lPositions[i + 1] += (oyA - lPositions[i + 1]) * springBack;
          lPositions[i + 2] += (ozA - lPositions[i + 2]) * springBack;
          
          lPositions[i + 3] += (oxB - lPositions[i + 3]) * springBack;
          lPositions[i + 4] += (oyB - lPositions[i + 4]) * springBack;
          lPositions[i + 5] += (ozB - lPositions[i + 5]) * springBack;
        }
      }
    }
    linesGeom.current.attributes.position.needsUpdate = true;
    
    // Finally, apply the dummy rotation
    if (pointsRef.current) pointsRef.current.rotation.copy(dummyMesh.current.rotation);
    if (linesRef.current) linesRef.current.rotation.copy(dummyMesh.current.rotation);
  });

  const themeColor = "#0ea5e9";

  return (
    <group>
      {/* Edges Connection Lines */}
      <lineSegments ref={linesRef}>
        <lineBasicMaterial 
          color={themeColor} 
          transparent={true} 
          opacity={0.35} 
        />
      </lineSegments>
      
      {/* Node Spheres */}
      <points ref={pointsRef}>
        {circleTexture && (
          <pointsMaterial 
            map={circleTexture}
            color={themeColor}
            size={0.06}
            sizeAttenuation={true}
            transparent={true}
            alphaTest={0.5}
            depthWrite={false}
          />
        )}
      </points>
    </group>
  );
};

export const InteractiveAurora = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Start tracking hover when mouse moves anywhere in window
    const handleMove = () => { pointerState.isHovered = true; };
    const handleLeave = () => { pointerState.isHovered = false; };
    
    window.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerleave', handleLeave);
    
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <Canvas 
        eventSource={document.body}
        eventPrefix="client"
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        
        {/* The Node Network Blob */}
        <RepulsionNetwork />

        {/* 3D Starfield */}
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={["#000000", 8, 25]} />
      </Canvas>

      {/* Grid Pattern overlay for texture */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-30 mix-blend-overlay pointer-events-none" />
    </div>
  );
};

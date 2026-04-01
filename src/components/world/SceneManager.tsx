"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

export function SceneManager() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="world-layer">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#d94fd6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1ae5e5" />
          
          {/* Subtle slow floating particles could be added here later */}
        </Suspense>
      </Canvas>
    </div>
  );
}

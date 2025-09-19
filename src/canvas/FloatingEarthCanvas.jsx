import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const FloatingEarth = () => {
  const meshRef = useRef();
  // RECOMMENDATION: Replace this 8K texture with a 2K or 4K version for better performance.
  // For example: /textures/2k_earth_daymap.jpg
  const earthTexture = useLoader(TextureLoader, "/textures/8k_earth_daymap.jpg");

  useFrame(({ clock, viewport }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      // The radius used for boundary calculations MUST match the mesh's scale.
      const earthRadius = 3.5; // This now matches the new, larger scale prop below.

      // Slow spin
      meshRef.current.rotation.y = t * 0.1;

      // Calculate the maximum distance the center can move without the edge going off-screen
      const amplitudeX = (viewport.width / 2) - earthRadius;
      const amplitudeY = (viewport.height / 2) - earthRadius;

      // Main edge-to-edge motion
      const x = Math.sin(t * 0.2) * amplitudeX;
      const y = Math.cos(t * 0.25) * amplitudeY;

      // Depth oscillation
      const z = Math.sin(t * 0.15) * 0.4;

      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    // Set the scale here. I've increased it from 2.5 to 3.5 to make the Earth bigger.
    <mesh ref={meshRef} scale={3.5}>
      {/* Increased segments from 32 to 64 to make the sphere smoother/"rounder" */}
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

const FloatingEarthCanvas = () => (
  // This is correct - no inline styles needed.
  <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <FloatingEarth />
  </Canvas>
);

export default FloatingEarthCanvas;
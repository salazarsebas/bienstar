"use client";

/**
 * BitcoinModelCanvas component
 * Renders a 3D Bitcoin model with continuous animation
 */
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, useAnimations, Environment, ContactShadows, useProgress, Html } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Loading indicator for 3D model
function Loader() {
  const { progress } = useProgress();
  
  // Hide loader when progress reaches 100%
  if (progress >= 100) return null;
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-black dark:text-white">
        <div className="w-24 h-24 border-4 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-lg font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

// Preload and cache the model
useGLTF.preload('/3d/bitcoin-3d.glb');

function BitcoinModel() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/3d/bitcoin-3d.glb');
  const { /* actions, mixer */ } = useAnimations(animations, modelRef);
  
  // State for model status
  const [isReady, setIsReady] = useState(false);
  
  // Clone the scene to avoid mutation issues
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  // Handle model initialization
  useEffect(() => {
    if (modelRef.current) {
      // Apply any material optimizations
      modelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          
          // Optimize materials
          if (mesh.material) {
            // Enable shadows
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            // Set high quality rendering
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(mat => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.envMapIntensity = 1;
                }
                mat.needsUpdate = true;
              });
            } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.envMapIntensity = 1;
              mesh.material.needsUpdate = true;
            } else {
              mesh.material.needsUpdate = true;
            }
          }
        }
      });
      
      // Mark as ready after optimizations
      setIsReady(true);
    }
  }, [modelRef]);
  
  // Continuous rotation animation
  useFrame((state, delta) => {
    if (modelRef.current && isReady) {
      // Smooth rotation
      modelRef.current.rotation.y += delta * 0.3;
    }
  });
  
  return (
    <Float 
      speed={1} // Animation speed
      rotationIntensity={0.3} // Rotation intensity
      floatIntensity={0.3} // Float intensity
      floatingRange={[-0.1, 0.1]} // Smaller range for subtle movement
    >
      <primitive 
        ref={modelRef}
        object={clonedScene} 
        scale={2.5} 
        position={[0, 0, 0]} 
        rotation={[0, Math.PI / 4, 0]} 
        dispose={null} // Prevent disposal to improve performance
      />
    </Float>
  );
}

export default function BitcoinModelCanvas() {
  return (
    <div className="w-full h-full">
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-lg font-medium text-black dark:text-white">Loading 3D Model...</p>
            </div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
            precision: 'highp',
          }}
          dpr={[1, 2]} // Responsive DPR for better performance
          shadows
          onCreated={({ gl }) => {
            // Modern Three.js settings
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
            gl.outputColorSpace = 'srgb';
          }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Environment and shadows */}
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2} 
            far={4} 
            resolution={256} 
          />
          
          {/* Bitcoin 3D Model */}
          <BitcoinModel />
          
          {/* Loading indicator */}
          <Loader />
        </Canvas>
      </Suspense>
    </div>
  );
}

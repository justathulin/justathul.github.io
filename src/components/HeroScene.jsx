import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';

// A single abstract centerpiece instead of a literal metaphor (no orbiting
// planets, no web of lines) — a liquid-metal core with a slowly
// counter-rotating wireframe shell around it, plus ambient particle dust.
const ParticleField = ({ count = 700 }) => {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const r = 3.2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fdba74" size={0.03} transparent opacity={0.4} depthWrite={false} sizeAttenuation />
    </points>
  );
};

const WireShell = ({ reduceMotion }) => {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!reduceMotion && ref.current) ref.current.rotation.y -= delta * 0.12;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.05, 1]} />
      <meshBasicMaterial color="#fdba74" wireframe transparent opacity={0.18} />
    </mesh>
  );
};

const LiquidCore = ({ reduceMotion }) => (
  <Float speed={reduceMotion ? 0 : 1.3} rotationIntensity={reduceMotion ? 0 : 0.45} floatIntensity={reduceMotion ? 0 : 0.7}>
    <mesh>
      <icosahedronGeometry args={[1.6, 6]} />
      <MeshDistortMaterial
        color="#f97316"
        emissive="#7a2e07"
        emissiveIntensity={0.35}
        roughness={0.15}
        metalness={0.6}
        distort={reduceMotion ? 0.08 : 0.36}
        speed={reduceMotion ? 0 : 1.7}
      />
    </mesh>
  </Float>
);

const HeroScene = ({ reduceMotion = false, particleCount = 700 }) => (
  <Canvas
    dpr={[1, 1.6]}
    camera={{ position: [0, 0, 6.5], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    style={{ position: 'absolute', inset: 0 }}
  >
    <ambientLight intensity={0.55} />
    <pointLight position={[4, 3, 4]} intensity={1.5} color="#fdba74" />
    <pointLight position={[-4, -2, -3]} intensity={0.7} color="#f97316" />

    <LiquidCore reduceMotion={reduceMotion} />
    <WireShell reduceMotion={reduceMotion} />
    <ParticleField count={particleCount} />

    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={!reduceMotion}
      autoRotateSpeed={0.5}
      minPolarAngle={Math.PI / 2.6}
      maxPolarAngle={Math.PI / 1.6}
    />
  </Canvas>
);

export default HeroScene;

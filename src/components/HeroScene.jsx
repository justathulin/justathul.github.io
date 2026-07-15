import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, MeshDistortMaterial, OrbitControls } from '@react-three/drei';

const ORBIT_TOOLS = [
  { icon: '☁️', color: '#f97316' },
  { icon: '☸️', color: '#fbbf24' },
  { icon: '🐳', color: '#fdba74' },
  { icon: '🧱', color: '#22c55e' },
  { icon: '📊', color: '#f97316' },
  { icon: '🔁', color: '#fbbf24' },
];

const ParticleField = ({ count = 900 }) => {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const r = 4 + Math.random() * 3;
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
      <pointsMaterial color="#fdba74" size={0.035} transparent opacity={0.45} depthWrite={false} sizeAttenuation />
    </points>
  );
};

const OrbitingSatellites = ({ reduceMotion }) => {
  const group = useRef(null);
  useFrame((_, delta) => {
    if (!reduceMotion && group.current) group.current.rotation.y += delta * 0.18;
  });

  const satellites = useMemo(
    () =>
      ORBIT_TOOLS.map(({ icon, color }, i) => {
        const angle = (i / ORBIT_TOOLS.length) * Math.PI * 2;
        const radius = 2.5;
        return {
          icon,
          color,
          position: [Math.cos(angle) * radius, Math.sin(angle * 1.4) * 0.6, Math.sin(angle) * radius],
          size: 0.22 + (i % 2) * 0.05,
        };
      }),
    []
  );

  return (
    <group ref={group}>
      {satellites.map((s, i) => (
        <Float key={i} speed={reduceMotion ? 0 : 1.6 + i * 0.2} floatIntensity={reduceMotion ? 0 : 1.1} rotationIntensity={reduceMotion ? 0 : 0.4}>
          <mesh position={s.position}>
            <sphereGeometry args={[s.size, 24, 24]} />
            <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.4} roughness={0.3} metalness={0.4} />
            <Html center distanceFactor={7} occlude={false} style={{ pointerEvents: 'none' }}>
              <div className="text-base leading-none select-none">{s.icon}</div>
            </Html>
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const DistortedCore = ({ reduceMotion }) => (
  <Float speed={reduceMotion ? 0 : 1.4} rotationIntensity={reduceMotion ? 0 : 0.5} floatIntensity={reduceMotion ? 0 : 0.9}>
    <mesh>
      <icosahedronGeometry args={[1.35, 5]} />
      <MeshDistortMaterial
        color="#f97316"
        emissive="#7a2e07"
        emissiveIntensity={0.35}
        roughness={0.2}
        metalness={0.55}
        distort={reduceMotion ? 0.08 : 0.32}
        speed={reduceMotion ? 0 : 1.6}
      />
    </mesh>
  </Float>
);

const HeroScene = ({ reduceMotion = false, particleCount = 900 }) => (
  <Canvas
    dpr={[1, 1.6]}
    camera={{ position: [0, 0, 6.2], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    style={{ position: 'absolute', inset: 0 }}
  >
    <ambientLight intensity={0.55} />
    <pointLight position={[4, 3, 4]} intensity={1.4} color="#fdba74" />
    <pointLight position={[-4, -2, -3]} intensity={0.6} color="#f97316" />

    <DistortedCore reduceMotion={reduceMotion} />
    <OrbitingSatellites reduceMotion={reduceMotion} />
    <ParticleField count={particleCount} />

    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={!reduceMotion}
      autoRotateSpeed={0.7}
      minPolarAngle={Math.PI / 2.6}
      maxPolarAngle={Math.PI / 1.6}
    />
  </Canvas>
);

export default HeroScene;

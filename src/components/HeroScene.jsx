import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Line, MeshDistortMaterial, OrbitControls } from '@react-three/drei';

// A hub-and-spoke "network" layout, not a solar-system ring — nodes are
// scattered at uneven positions/depths and wired back to the core, like an
// infrastructure diagram, instead of orbiting it in a flat circle.
const TECH_NODES = [
  { icon: '☁️', color: '#f97316', position: [-2.5, 0.95, 0.3], size: 0.27 },
  { icon: '☸️', color: '#fbbf24', position: [2.35, 1.25, -0.55], size: 0.3 },
  { icon: '🐳', color: '#fdba74', position: [-2.05, -1.1, -0.75], size: 0.24 },
  { icon: '🧱', color: '#22c55e', position: [2.55, -0.75, 0.65], size: 0.26 },
  { icon: '📊', color: '#f97316', position: [-0.55, 1.85, -1.3], size: 0.22 },
  { icon: '🔁', color: '#fbbf24', position: [0.75, -1.75, 1.05], size: 0.24 },
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

const DataPulse = ({ to, color, speed, reduceMotion }) => {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (Math.sin(clock.elapsedTime * speed) + 1) / 2;
    ref.current.position.set(to[0] * t, to[1] * t, to[2] * t);
  });
  if (reduceMotion) return null;
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const TechNode = ({ data, reduceMotion, index }) => {
  const gemRef = useRef(null);
  useFrame((_, delta) => {
    if (!reduceMotion && gemRef.current) gemRef.current.rotation.y += delta * (0.5 + index * 0.1);
  });

  return (
    <>
      <Line points={[[0, 0, 0], data.position]} color={data.color} transparent opacity={0.3} lineWidth={1} />
      <DataPulse to={data.position} color={data.color} speed={0.5 + index * 0.15} reduceMotion={reduceMotion} />

      <Float
        position={data.position}
        speed={reduceMotion ? 0 : 1.5 + index * 0.2}
        floatIntensity={reduceMotion ? 0 : 0.9}
        rotationIntensity={reduceMotion ? 0 : 0.3}
      >
        <mesh ref={gemRef}>
          <icosahedronGeometry args={[data.size, 0]} />
          <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.45} roughness={0.25} metalness={0.5} flatShading />
        </mesh>

        <Html center distanceFactor={7} occlude={false} style={{ pointerEvents: 'none' }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-base border border-white/20 backdrop-blur-sm select-none"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${data.color}, ${data.color}55)`,
              boxShadow: `0 0 16px ${data.color}aa, 0 4px 14px rgba(0,0,0,0.35)`,
            }}
          >
            {data.icon}
          </div>
        </Html>
      </Float>
    </>
  );
};

const TechNetwork = ({ reduceMotion }) => (
  <group>
    {TECH_NODES.map((n, i) => (
      <TechNode key={i} data={n} reduceMotion={reduceMotion} index={i} />
    ))}
  </group>
);

const HubCore = ({ reduceMotion }) => (
  <Float speed={reduceMotion ? 0 : 1.2} rotationIntensity={reduceMotion ? 0 : 0.4} floatIntensity={reduceMotion ? 0 : 0.6}>
    <mesh>
      <icosahedronGeometry args={[1.15, 5]} />
      <MeshDistortMaterial
        color="#f97316"
        emissive="#7a2e07"
        emissiveIntensity={0.35}
        roughness={0.2}
        metalness={0.55}
        distort={reduceMotion ? 0.06 : 0.24}
        speed={reduceMotion ? 0 : 1.4}
      />
    </mesh>
  </Float>
);

const HeroScene = ({ reduceMotion = false, particleCount = 900 }) => (
  <Canvas
    dpr={[1, 1.6]}
    camera={{ position: [0, 0, 6.5], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    style={{ position: 'absolute', inset: 0 }}
  >
    <ambientLight intensity={0.55} />
    <pointLight position={[4, 3, 4]} intensity={1.4} color="#fdba74" />
    <pointLight position={[-4, -2, -3]} intensity={0.6} color="#f97316" />

    <HubCore reduceMotion={reduceMotion} />
    <TechNetwork reduceMotion={reduceMotion} />
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

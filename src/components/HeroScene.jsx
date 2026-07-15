import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// A literal CI/CD pipeline: a glowing tube carries pulses of light through
// commit -> build -> test -> deploy stages, each marked with an icon badge.
// This is the actual DevOps concept, not a decorative abstract shape.
const STAGES = [
  { t: 0.06, icon: '📝', label: 'Commit', color: '#fdba74' },
  { t: 0.32, icon: '🔨', label: 'Build', color: '#f97316' },
  { t: 0.58, icon: '🧪', label: 'Test', color: '#fbbf24' },
  { t: 0.86, icon: '🚀', label: 'Deploy', color: '#22c55e' },
];

const CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-3.1, 1.4, 0.4),
  new THREE.Vector3(-1.5, 0.3, 1.1),
  new THREE.Vector3(0, -0.7, -0.9),
  new THREE.Vector3(1.6, 0.7, 0.7),
  new THREE.Vector3(3.1, -1.0, -0.3),
]);

const ParticleField = ({ count = 600 }) => {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const r = 3.5 + Math.random() * 3;
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
      <pointsMaterial color="#fdba74" size={0.03} transparent opacity={0.35} depthWrite={false} sizeAttenuation />
    </points>
  );
};

const PipelineTube = () => (
  <mesh>
    <tubeGeometry args={[CURVE, 140, 0.05, 10, false]} />
    <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} roughness={0.3} metalness={0.4} transparent opacity={0.55} />
  </mesh>
);

const Packet = ({ offset, speed, reduceMotion }) => {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (reduceMotion || !ref.current) return;
    const t = (clock.elapsedTime * speed + offset) % 1;
    const p = CURVE.getPointAt(t);
    ref.current.position.copy(p);
  });
  const start = useMemo(() => CURVE.getPointAt(offset % 1), [offset]);
  return (
    <mesh ref={ref} position={start}>
      <sphereGeometry args={[0.075, 10, 10]} />
      <meshBasicMaterial color="#ffe8c9" />
    </mesh>
  );
};

const StageMarker = ({ stage, reduceMotion }) => {
  const position = useMemo(() => CURVE.getPointAt(stage.t), [stage.t]);
  return (
    <Float speed={reduceMotion ? 0 : 1.4} floatIntensity={reduceMotion ? 0 : 0.5} rotationIntensity={reduceMotion ? 0 : 0.2}>
      <group position={position}>
        <mesh>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.5} roughness={0.25} metalness={0.5} flatShading />
        </mesh>
        <Html center distanceFactor={7} occlude={false} style={{ pointerEvents: 'none' }}>
          <div className="flex flex-col items-center gap-1 select-none">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-base border border-white/20 backdrop-blur-sm"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${stage.color}, ${stage.color}55)`,
                boxShadow: `0 0 16px ${stage.color}aa, 0 4px 14px rgba(0,0,0,0.35)`,
              }}
            >
              {stage.icon}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/70 whitespace-nowrap">{stage.label}</span>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const Pipeline = ({ reduceMotion }) => (
  <group>
    <PipelineTube />
    {!reduceMotion &&
      [0, 0.2, 0.4, 0.6, 0.8].map((offset, i) => (
        <Packet key={i} offset={offset} speed={0.12} reduceMotion={reduceMotion} />
      ))}
    {STAGES.map((s) => (
      <StageMarker key={s.label} stage={s} reduceMotion={reduceMotion} />
    ))}
  </group>
);

const HeroScene = ({ reduceMotion = false, particleCount = 600 }) => (
  <Canvas
    dpr={[1, 1.6]}
    camera={{ position: [0, 0, 7], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    style={{ position: 'absolute', inset: 0 }}
  >
    <ambientLight intensity={0.55} />
    <pointLight position={[4, 3, 4]} intensity={1.4} color="#fdba74" />
    <pointLight position={[-4, -2, -3]} intensity={0.6} color="#f97316" />

    <Pipeline reduceMotion={reduceMotion} />
    <ParticleField count={particleCount} />

    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={!reduceMotion}
      autoRotateSpeed={0.4}
      minPolarAngle={Math.PI / 2.6}
      maxPolarAngle={Math.PI / 1.6}
    />
  </Canvas>
);

export default HeroScene;

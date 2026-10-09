import React from 'react';

// Ambient background layer: a faint schematic grid, a few pulsing telemetry
// nodes, and a slow vertical scan sweep — replaces soft decorative blur-blobs
// with a mission-control/telemetry feel. `palette` lets each section carry
// its own node/sweep color instead of repeating the same accent everywhere.
const BackgroundBlobs = ({ className = '', palette }) => {
  const [c1, c2, c3] = palette || ['var(--color-accent)', 'var(--color-accent-2)', 'var(--color-accent-3)'];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none grid-paper ${className}`}>
      <div
        className="absolute inset-x-0 h-40 opacity-[0.07] animate-scanline"
        style={{ background: `linear-gradient(180deg, transparent, ${c1}, transparent)` }}
      />

      <div className="absolute top-[12%] left-[6%] w-2 h-2 rounded-full animate-node-pulse" style={{ background: c1, boxShadow: `0 0 18px 4px ${c1}` }} />
      <div className="absolute bottom-[18%] right-[8%] w-1.5 h-1.5 rounded-full animate-node-pulse" style={{ background: c2, boxShadow: `0 0 16px 4px ${c2}`, animationDelay: '0.8s' }} />
      <div className="absolute top-[55%] right-[22%] w-1.5 h-1.5 rounded-full animate-node-pulse" style={{ background: c3, boxShadow: `0 0 14px 3px ${c3}`, animationDelay: '1.5s' }} />
      <div className="absolute top-[30%] left-[32%] w-1 h-1 rounded-full animate-node-pulse" style={{ background: c2, boxShadow: `0 0 10px 2px ${c2}`, animationDelay: '2.2s' }} />

      <div className="absolute top-[-15%] right-[-10%] w-80 h-80 rounded-full opacity-[0.06] blur-3xl" style={{ background: c1 }} />
      <div className="absolute bottom-[-15%] left-[-10%] w-80 h-80 rounded-full opacity-[0.05] blur-3xl" style={{ background: c2 }} />
    </div>
  );
};

export default BackgroundBlobs;

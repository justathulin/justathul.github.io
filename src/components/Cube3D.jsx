import React from 'react';
import { motion } from 'framer-motion';

const faces = ['☁️', '☸️', '🐳', '🧱', '📊', '🔁'];

// A continuously spinning CSS 3D cube with DevOps icons on each face.
const Cube3D = ({ size = 64, className = '' }) => {
  const half = size / 2;

  return (
    <div className={className} style={{ perspective: 600, width: size, height: size }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        {faces.map((face, i) => {
          const transforms = [
            `rotateY(0deg) translateZ(${half}px)`,
            `rotateY(180deg) translateZ(${half}px)`,
            `rotateY(90deg) translateZ(${half}px)`,
            `rotateY(-90deg) translateZ(${half}px)`,
            `rotateX(90deg) translateZ(${half}px)`,
            `rotateX(-90deg) translateZ(${half}px)`,
          ];
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center rounded-lg glass text-lg"
              style={{ transform: transforms[i], backfaceVisibility: 'hidden' }}
            >
              {face}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Cube3D;

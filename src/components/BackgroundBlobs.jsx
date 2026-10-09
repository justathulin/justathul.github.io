import React from 'react';

// Soft floating gradient blobs used as an ambient background layer across sections.
// `palette` lets each section carry its own color mood instead of repeating the same orange trio everywhere.
const BackgroundBlobs = ({ className = '', palette }) => {
  const [c1, c2, c3] = palette || ['var(--color-accent)', 'var(--color-accent-3)', 'var(--color-accent-2)'];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 md:w-96 md:h-96 rounded-full opacity-20 blur-3xl animate-blob" style={{ background: c1 }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 md:w-96 md:h-96 rounded-full opacity-15 blur-3xl animate-blob" style={{ background: c2, animationDelay: '3s' }} />
      <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full opacity-10 blur-3xl animate-blob" style={{ background: c3, animationDelay: '6s' }} />
    </div>
  );
};

export default BackgroundBlobs;

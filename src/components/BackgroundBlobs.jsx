import React from 'react';

// Soft floating gradient blobs used as an ambient background layer across sections.
const BackgroundBlobs = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className="absolute top-[-10%] left-[-5%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-[var(--color-accent)] opacity-20 blur-3xl animate-blob" />
    <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-[var(--color-accent-3)] opacity-15 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
    <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-[var(--color-accent-2)] opacity-10 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />
  </div>
);

export default BackgroundBlobs;

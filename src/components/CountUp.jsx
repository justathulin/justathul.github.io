import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

// Animates a number from 0 to `to` once it scrolls into view.
const CountUp = ({ to, duration = 1.6, prefix = '', suffix = '', decimals = 0, className = '', style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
};

export default CountUp;

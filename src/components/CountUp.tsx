import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  value: number;
  format?: (n: number) => string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ value, format, className }) => {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 120, damping: 20, mass: 0.5 });
  const ref = useRef<HTMLSpanElement>(null);
  const formatter = format ?? ((n: number) => Math.round(n).toLocaleString());

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatter(latest);
      }
    });
    return unsubscribe;
  }, [spring, formatter]);

  return (
    <motion.span ref={ref} className={className}>
      {formatter(value)}
    </motion.span>
  );
};

export default CountUp;

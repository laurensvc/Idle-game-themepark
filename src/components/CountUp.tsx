import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

export interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  /** When false, the count animation does not run. */
  startWhen?: boolean;
  /** React Bits-style alias for `startWhen` (default true when omitted). */
  startCounting?: boolean;
  separator?: string;
  /** When set, formats the displayed number (e.g. compact currency). Takes precedence over `separator` / Intl formatting. */
  formatDisplay?: (n: number) => string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  startCounting,
  separator = '',
  formatDisplay,
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const formatDisplayRef = useRef(formatDisplay);
  formatDisplayRef.current = formatDisplay;

  const shouldRun = startCounting !== undefined ? startCounting : startWhen;

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals, 10) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };

      const formattedNumber = new Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator],
  );

  const display = useCallback(
    (latest: number) => {
      const fd = formatDisplayRef.current;
      return fd ? fd(latest) : formatValue(latest);
    },
    [formatValue],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = display(direction === 'down' ? to : from);
    }
  }, [from, to, direction, display]);

  useEffect(() => {
    if (isInView && shouldRun) {
      if (typeof onStart === 'function') {
        onStart();
      }

      const timeoutId = window.setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const durationTimeoutId = window.setTimeout(() => {
        if (typeof onEnd === 'function') {
          onEnd();
        }
      }, delay * 1000 + duration * 1000);

      return () => {
        window.clearTimeout(timeoutId);
        window.clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, shouldRun, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = display(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, display]);

  return <span className={className} ref={ref} />;
}

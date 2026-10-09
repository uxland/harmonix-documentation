import { useEffect, useRef, useState } from 'react';

/**
 * Drives a looping diagram: the step advances only while the diagram is visible, and stays on
 * the last step (the complete picture) for people who prefer reduced motion.
 *
 * @param durations How long each step lasts, in milliseconds. Its length is the number of steps.
 * @param still The step shown without animation. By default, the last one.
 */
export const useLoop = <T extends HTMLElement>(durations: number[], still = durations.length - 1) => {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(still);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setStep(still);
      return;
    }
    if (!visible) return;
    let current = 0;
    let timer: number;
    const advance = () => {
      setStep(current);
      timer = window.setTimeout(() => {
        current = (current + 1) % durations.length;
        advance();
      }, durations[current]);
    };
    advance();
    return () => window.clearTimeout(timer);
    // The durations are constant for each diagram.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduced]);

  return { ref, step, animated: visible && !reduced };
};

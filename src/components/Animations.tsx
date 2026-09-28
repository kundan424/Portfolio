import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className = '', delay = 0, y = 30 }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SplitTextProps {
  text: string;
  className?: string;
}

export function SplitText({ text, className = '' }: SplitTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const child = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.9 } },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`inline-block ${className}`}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

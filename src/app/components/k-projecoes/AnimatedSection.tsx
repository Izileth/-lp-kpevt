// src/app/components/k-projecoes/AnimatedSection.tsx
import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection: React.FC<Props> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

 const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

  return (
    <motion.section
      ref={ref}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  );
};

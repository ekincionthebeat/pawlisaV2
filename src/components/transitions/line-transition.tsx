// Beyaz çizgi geçiş efekti bileşeni
'use client';

import { motion } from 'framer-motion';

// LineTransition bileşeni özellikleri
interface LineTransitionProps {
  isVisible?: boolean;
}

// LineTransition bileşeni
export const LineTransition = ({ isVisible = true }: LineTransitionProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] overflow-hidden z-50">
      <motion.div
        className="w-full h-full bg-white"
        initial={{ x: '-100%' }}
        animate={{
          x: isVisible ? '0%' : '100%'
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default LineTransition; 
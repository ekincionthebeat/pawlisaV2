// Lamba efekti bileşeni
// Bu bileşen ana sayfada kullanılacak olan lamba efektini içerir

"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Animasyon varyantlarını tanımlıyoruz
const lampVariants = {
  hidden: {
    opacity: 0.5,
    width: "5rem",
  },
  visible: {
    opacity: 1,
    width: "30rem",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.5,
    },
  },
};

// Animasyon varyantlarını güncelliyoruz
const glowVariants = {
  hidden: {
    opacity: 0,
    width: "5rem",
  },
  visible: {
    opacity: 0.5,
    width: "28rem",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
};

export function LampDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false, // Her görünüme girdiğinde tetiklensin
    amount: 0.5, // Yarısı görünür olduğunda tetiklensin
    margin: "-100px 0px", // Margin ekleyerek erken tetiklenmeyi önlüyoruz
  });

  return (
    <AnimatePresence mode="wait">
      <LampContainer ref={containerRef}>
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Build lamps <br /> the right way
        </motion.h1>
      </LampContainer>
    </AnimatePresence>
  );
}

export const LampContainer = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(({ children, className }, ref) => {
  const isInView = useInView(ref as React.RefObject<HTMLDivElement>, {
    once: false,
    amount: 0.5,
    margin: "-100px 0px",
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#060606] w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          variants={lampVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-white via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-[#060606] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-[#060606] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          variants={lampVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-white text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-[#060606] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-[#060606] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#060606] blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <motion.div
          variants={glowVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-white blur-3xl"
        ></motion.div>
        <motion.div
          variants={{
            hidden: { width: "4rem" },
            visible: {
              width: "16rem",
              transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-white blur-2xl"
        ></motion.div>
        <motion.div
          variants={lampVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-white"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#060606]"></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}); 
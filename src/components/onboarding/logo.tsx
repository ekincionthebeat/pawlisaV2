"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface LogoProps {
  className?: string
}

const LOGO_LETTERS = [
  { 
    letter: 'P', 
    baseClass: 'hover:text-purple-400 active:text-purple-400',
    activeClass: 'text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.7)]'
  },
  { 
    letter: 'A', 
    baseClass: 'hover:text-amber-400 active:text-amber-400',
    activeClass: 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]'
  },
  { 
    letter: 'W', 
    baseClass: 'hover:text-white active:text-white',
    activeClass: 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]'
  },
  { 
    letter: 'L', 
    baseClass: 'hover:text-lime-400 active:text-lime-400',
    activeClass: 'text-lime-400 drop-shadow-[0_0_12px_rgba(163,230,53,0.7)]'
  },
  { 
    letter: 'I', 
    baseClass: 'hover:text-indigo-400 active:text-indigo-400',
    activeClass: 'text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.7)]'
  },
  { 
    letter: 'S', 
    baseClass: 'hover:text-sky-400 active:text-sky-400',
    activeClass: 'text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]'
  },
  { 
    letter: 'A', 
    baseClass: 'hover:text-[#00ffff] active:text-[#00ffff]',
    activeClass: 'text-[#00ffff] drop-shadow-[0_0_12px_rgba(0,255,255,0.7)]'
  },
] as const

export function Logo({ className }: LogoProps) {
  const [activeLetters, setActiveLetters] = useState<number[]>([])

  const handleLetterClick = (index: number) => {
    setActiveLetters((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      }
      return [...prev, index]
    })
  }

  return (
    <div className={cn("fixed top-6 left-6 z-50 flex items-center gap-3", className)}>
      <div className="relative w-10 h-10 md:w-[40px] md:h-[40px]">
        <Image
          src="/assets/onboarding/pawlogo.webp"
          alt="Pawlisa Logo"
          fill
          className="[image-rendering:pixelated] object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-xl tracking-wide select-none font-press-start">
          {LOGO_LETTERS.map(({ letter, baseClass, activeClass }, index) => (
            <span
              key={`${letter}-${index}`}
              onClick={() => handleLetterClick(index)}
              className={cn(
                "inline-block transition-all duration-300 cursor-pointer",
                baseClass,
                "hover:-translate-y-1",
                "active:scale-90",
                activeLetters.includes(index) && [
                  activeClass,
                  "-translate-y-1",
                  "animate-bounce"
                ]
              )}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 
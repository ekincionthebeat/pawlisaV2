"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ConnectButton } from "./connect/connect-button"
import { ConnectedCatButton } from "./connect/connected-cat-button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll handling
  useEffect(() => {
    const observers = new Map()
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const activeItem = items.find((item) => item.url === `#${sectionId}`)
          if (activeItem) {
            setActiveTab(activeItem.name)
          }
        }
      })
    }

    // Create observers for each section
    items.forEach((item) => {
      if (item.url.startsWith("#")) {
        const sectionId = item.url.substring(1)
        const section = document.getElementById(sectionId)
        
        if (section) {
          const observer = new IntersectionObserver(handleIntersect, options)
          observer.observe(section)
          observers.set(sectionId, observer)
        }
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault()
    setActiveTab(item.name)
    
    if (item.url.startsWith('#')) {
      const element = document.querySelector(item.url)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <ConnectedCatButton />
      <div
        className={cn(
          "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
          className,
        )}
      >
        <div className="flex items-center gap-3 bg-black/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={(e) => handleClick(e, item)}
                className={cn(
                  "relative cursor-pointer text-xs font-press-start px-6 py-2 rounded-full transition-all duration-300 select-none tracking-wider",
                  "text-white/60 hover:text-white",
                  isActive && "bg-white/5 text-white [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_10px_rgba(255,255,255,0.3),0_2px_0_rgba(0,0,0,0.5)]",
                  !isActive && "[text-shadow:0_2px_0_rgba(0,0,0,0.5)]"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                      <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
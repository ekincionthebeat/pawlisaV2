"use client"

import { Squares } from "@/components/onboarding/squares"
import { NavBar } from "@/components/onboarding/nav-bar"
import { Logo } from "@/components/onboarding/logo"
import { Home, User, Settings } from "lucide-react"
import { LampDemo } from "@/components/onboarding/lamp-demo"

const navItems = [
  {
    name: "Intro",
    url: "#introductions",
    icon: Home,
  },
  {
    name: "Profil",
    url: "#profile",
    icon: User,
  },
  {
    name: "Ayarlar",
    url: "#settings",
    icon: Settings,
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Squares direction="diagonal" speed={0.5} borderColor="#333" />
      </div>

      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <NavBar items={navItems} />
      
      {/* Content */}
      <div className="relative z-10">
        <section id="introductions" className="min-h-screen flex items-center justify-center bg-transparent">
          <LampDemo />
        </section>
        
        <section id="profile" className="min-h-screen flex items-center justify-center bg-transparent">
          <h1 className="text-4xl font-press-start">Profil</h1>
        </section>
        
        <section id="settings" className="min-h-screen flex items-center justify-center bg-transparent">
          <h1 className="text-4xl font-press-start">Ayarlar</h1>
        </section>
      </div>
    </main>
  )
} 
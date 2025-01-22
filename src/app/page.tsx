"use client"

import { Squares } from "@/components/onboarding/squares"
import { NavBar } from "@/components/onboarding/nav-bar"
import { Logo } from "@/components/onboarding/logo"
import { Home, User, Settings } from "lucide-react"

const navItems = [
  {
    name: "Ana Sayfa",
    url: "#home",
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
        <section id="home" className="min-h-screen flex items-center justify-center bg-transparent">
          <h1 className="text-4xl font-press-start">Ana Sayfa</h1>
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
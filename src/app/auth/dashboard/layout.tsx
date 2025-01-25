"use client"

import dynamic from 'next/dynamic'
import { Press_Start_2P } from "next/font/google"
import { cn } from "@/lib/utils"
import { WindowProvider } from './contexts/WindowContext'
import { Suspense } from 'react'

// Font yüklemesi için güvenli bir yaklaşım
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  preload: true,
  display: 'swap'
})

// FileTreeView'u client-side'da dinamik olarak yükle
const FileTreeView = dynamic(
  () => import('./components/sidebar/file-tree/FileTreeView').then(mod => mod.FileTreeView),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-white text-sm">Yükleniyor...</div>
      </div>
    )
  }
)

// Sidebar bileşeni - Güvenli ve izole edilmiş
function Sidebar() {
  return (
    <aside className="w-[340px] flex flex-col bg-[#09090b] border-r border-[#2a2a2c]">
      <div className="flex-1 overflow-hidden border-b border-[#2a2a2c]">
        <FileTreeView />
      </div>
    </aside>
  )
}

// Ana layout bileşeni
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WindowProvider>
      <div className={cn(
        "flex h-screen bg-[#09090b]",
        pressStart2P.variable
      )}>
        <Sidebar />
        <main className="flex-1 overflow-auto bg-[#09090b] p-6">
          <div className="h-full">
            <Suspense fallback={
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-white text-sm">İçerik yükleniyor...</div>
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </WindowProvider>
  )
}

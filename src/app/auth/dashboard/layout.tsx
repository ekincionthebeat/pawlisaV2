"use client"

import { FileTreeView } from "./components/sidebar/file-tree/FileTreeView"
import { Press_Start_2P } from "next/font/google"
import { cn } from "@/lib/utils"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#09090b]">
      {/* Sidebar */}
      <aside className="w-[340px] flex flex-col bg-[#09090b] border-r border-[#2a2a2c]">
        {/* File Tree */}
        <div className="flex-1 overflow-hidden border-b border-[#2a2a2c]">
          <FileTreeView />
        </div>

        {/* Alt Kısım */}
        <div className="h-[100px]">
          <h2 className="text-lg font-semibold px-4 py-2 text-white">Alt Kısım</h2>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#09090b] p-6">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  )
}

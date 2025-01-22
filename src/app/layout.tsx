import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import "./globals.css"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
})

export const metadata: Metadata = {
  title: "Pawlisa v2",
  description: "Pawlisa version 2",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={pressStart2P.variable}>{children}</body>
    </html>
  )
} 
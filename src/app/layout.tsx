import type { Metadata } from "next"
import "./globals.css"

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
      <body>{children}</body>
    </html>
  )
} 
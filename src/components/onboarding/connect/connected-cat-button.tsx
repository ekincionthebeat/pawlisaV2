"use client"

import { ConnectButton } from "./components/connect-button"
import { CatAnimation } from "./components/cat-animation"
import "./styles/cat-animation.scss"

interface ConnectedCatButtonProps {
  className?: string
}

export function ConnectedCatButton({ className }: ConnectedCatButtonProps) {
  return (
    <div className="fixed sm:top-6 sm:right-6 right-4 top-4 z-[60]">
      <div className="connect-container relative">
        <ConnectButton />
        <CatAnimation className="all-wrap" />
      </div>
    </div>
  )
} 
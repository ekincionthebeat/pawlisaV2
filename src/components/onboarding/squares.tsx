"use client"

import { useRef, useEffect } from "react"

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal"
  speed?: number
  borderColor?: string
  squareSize?: number
  className?: string
}

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  className,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const numSquaresX = useRef<number>()
  const numSquaresY = useRef<number>()
  const gridOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas background
    canvas.style.background = "#060606"

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize

      ctx.lineWidth = 0.5
      ctx.strokeStyle = borderColor

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize)
          const squareY = y - (gridOffset.current.y % squareSize)
          ctx.strokeRect(squareX, squareY, squareSize, squareSize)
        }
      }

      // Draw edge gradients
      const gradientSize = 100 // Size of the gradient effect

      // Top gradient
      const topGradient = ctx.createLinearGradient(0, 0, 0, gradientSize)
      topGradient.addColorStop(0, "#060606")
      topGradient.addColorStop(1, "rgba(6, 6, 6, 0)")
      ctx.fillStyle = topGradient
      ctx.fillRect(0, 0, canvas.width, gradientSize)

      // Bottom gradient
      const bottomGradient = ctx.createLinearGradient(0, canvas.height - gradientSize, 0, canvas.height)
      bottomGradient.addColorStop(0, "rgba(6, 6, 6, 0)")
      bottomGradient.addColorStop(1, "#060606")
      ctx.fillStyle = bottomGradient
      ctx.fillRect(0, canvas.height - gradientSize, canvas.width, gradientSize)

      // Left gradient
      const leftGradient = ctx.createLinearGradient(0, 0, gradientSize, 0)
      leftGradient.addColorStop(0, "#060606")
      leftGradient.addColorStop(1, "rgba(6, 6, 6, 0)")
      ctx.fillStyle = leftGradient
      ctx.fillRect(0, 0, gradientSize, canvas.height)

      // Right gradient
      const rightGradient = ctx.createLinearGradient(canvas.width - gradientSize, 0, canvas.width, 0)
      rightGradient.addColorStop(0, "rgba(6, 6, 6, 0)")
      rightGradient.addColorStop(1, "#060606")
      ctx.fillStyle = rightGradient
      ctx.fillRect(canvas.width - gradientSize, 0, gradientSize, canvas.height)
    }

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed * 0.5, 0.05) // Reduced speed by 50%

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
          break
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize
          break
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize
          break
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
          break
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
          break
      }

      drawGrid()
      requestRef.current = requestAnimationFrame(updateAnimation)
    }

    // Initial setup
    resizeCanvas()
    requestRef.current = requestAnimationFrame(updateAnimation)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [direction, speed, borderColor, squareSize])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  )
} 
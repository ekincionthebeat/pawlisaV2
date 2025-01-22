"use client"

import { useRef, useEffect, useCallback } from "react"
import { useWindowSize } from "../../hooks/use-window-size"

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal"
  speed?: number
  borderColor?: string
  squareSize?: number
  className?: string
  gradientSize?: number
  backgroundColor?: string
}

const DEFAULT_GRADIENT_SIZE = 100
const DEFAULT_BACKGROUND_COLOR = "#060606"
const DEFAULT_LINE_WIDTH = 0.5

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  className = "",
  gradientSize = DEFAULT_GRADIENT_SIZE,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  // Memoize grid dimensions
  const gridDimensions = useRef({
    numSquaresX: 0,
    numSquaresY: 0,
    offset: { x: 0, y: 0 }
  })

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    gridDimensions.current.numSquaresX = Math.ceil(canvas.width / squareSize) + 1
    gridDimensions.current.numSquaresY = Math.ceil(canvas.height / squareSize) + 1
  }, [squareSize])

  // Draw gradient overlay
  const drawGradient = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Top gradient
    const topGradient = ctx.createLinearGradient(0, 0, 0, gradientSize)
    topGradient.addColorStop(0, backgroundColor)
    topGradient.addColorStop(1, `${backgroundColor}00`)
    ctx.fillStyle = topGradient
    ctx.fillRect(0, 0, canvas.width, gradientSize)

    // Bottom gradient
    const bottomGradient = ctx.createLinearGradient(0, canvas.height - gradientSize, 0, canvas.height)
    bottomGradient.addColorStop(0, `${backgroundColor}00`)
    bottomGradient.addColorStop(1, backgroundColor)
    ctx.fillStyle = bottomGradient
    ctx.fillRect(0, canvas.height - gradientSize, canvas.width, gradientSize)

    // Left gradient
    const leftGradient = ctx.createLinearGradient(0, 0, gradientSize, 0)
    leftGradient.addColorStop(0, backgroundColor)
    leftGradient.addColorStop(1, `${backgroundColor}00`)
    ctx.fillStyle = leftGradient
    ctx.fillRect(0, 0, gradientSize, canvas.height)

    // Right gradient
    const rightGradient = ctx.createLinearGradient(canvas.width - gradientSize, 0, canvas.width, 0)
    rightGradient.addColorStop(0, `${backgroundColor}00`)
    rightGradient.addColorStop(1, backgroundColor)
    ctx.fillStyle = rightGradient
    ctx.fillRect(canvas.width - gradientSize, 0, gradientSize, canvas.height)
  }, [backgroundColor, gradientSize])

  // Draw grid
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const { offset } = gridDimensions.current
    const startX = Math.floor(offset.x / squareSize) * squareSize
    const startY = Math.floor(offset.y / squareSize) * squareSize

    // Draw grid lines
    ctx.lineWidth = DEFAULT_LINE_WIDTH
    ctx.strokeStyle = borderColor

    for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
      for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
        const squareX = x - (offset.x % squareSize)
        const squareY = y - (offset.y % squareSize)
        ctx.strokeRect(squareX, squareY, squareSize, squareSize)
      }
    }

    // Draw gradient overlay
    drawGradient(ctx, canvas)
  }, [borderColor, drawGradient, squareSize])

  // Update animation
  const updateAnimation = useCallback(() => {
    const effectiveSpeed = Math.max(speed * 0.5, 0.05)
    const { offset } = gridDimensions.current

    switch (direction) {
      case "right":
        offset.x = (offset.x - effectiveSpeed + squareSize) % squareSize
        break
      case "left":
        offset.x = (offset.x + effectiveSpeed + squareSize) % squareSize
        break
      case "up":
        offset.y = (offset.y + effectiveSpeed + squareSize) % squareSize
        break
      case "down":
        offset.y = (offset.y - effectiveSpeed + squareSize) % squareSize
        break
      case "diagonal":
        offset.x = (offset.x - effectiveSpeed + squareSize) % squareSize
        offset.y = (offset.y - effectiveSpeed + squareSize) % squareSize
        break
    }

    drawGrid()
    animationFrameRef.current = requestAnimationFrame(updateAnimation)
  }, [direction, drawGrid, speed, squareSize])

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.style.background = backgroundColor
    handleResize()

    const cleanup = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    cleanup()
    animationFrameRef.current = requestAnimationFrame(updateAnimation)

    return cleanup
  }, [backgroundColor, handleResize, updateAnimation])

  // Handle window resize
  useEffect(() => {
    handleResize()
  }, [handleResize, windowWidth, windowHeight])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
      aria-hidden="true"
    />
  )
} 
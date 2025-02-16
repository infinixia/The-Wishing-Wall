"use client"

import { useEffect, useRef } from "react"

export const Snowfall = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const snowflakes: { x: number; y: number; radius: number; speed: number }[] = []

    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 3 + 1,
      })
    }

    function drawSnowflakes() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.beginPath()
      for (const flake of snowflakes) {
        ctx.moveTo(flake.x, flake.y)
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true)
      }
      ctx.fill()
      moveSnowflakes()
      requestAnimationFrame(drawSnowflakes)
    }

    function moveSnowflakes() {
      for (const flake of snowflakes) {
        flake.y += flake.speed
        if (flake.y > canvas.height) {
          flake.y = 0
        }
      }
    }

    drawSnowflakes()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
}


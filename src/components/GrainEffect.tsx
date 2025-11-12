import { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'

interface GrainEffectProps {
  intensity?: number
  opacity?: number
  animate?: boolean
  speed?: number
}

export const GrainEffect = ({ 
  intensity = 0.5, 
  opacity = 0.15, 
  animate = true,
  speed = 1 
}: GrainEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Generate noise function
    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255 * intensity
        data[i] = noise     // Red
        data[i + 1] = noise // Green
        data[i + 2] = noise // Blue
        data[i + 3] = 255   // Alpha
      }
      
      ctx.putImageData(imageData, 0, 0)
    }

    // Animation loop
    let frameCount = 0
    const animateFrame = () => {
      if (animate) {
        frameCount++
        // Only update every few frames for performance
        if (frameCount % Math.max(1, Math.floor(3 / speed)) === 0) {
          generateNoise()
        }
        animationRef.current = requestAnimationFrame(animateFrame)
      } else {
        generateNoise()
      }
    }

    generateNoise()
    setIsLoaded(true)
    
    if (animate) {
      animationRef.current = requestAnimationFrame(animateFrame)
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity, animate, speed])

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      pointerEvents="none"
      opacity={isLoaded ? opacity : 0}
      transition="opacity 0.3s ease"
      zIndex={2}
      mixBlendMode="overlay"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </Box>
  )
}
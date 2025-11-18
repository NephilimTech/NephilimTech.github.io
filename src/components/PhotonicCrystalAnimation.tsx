import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import p5 from 'p5'

interface PhotonicCrystalAnimationProps {}

export const PhotonicCrystalAnimation = ({}: PhotonicCrystalAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<p5 | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Get container dimensions with fallback
    const width = containerRef.current.clientWidth || 800
    const height = containerRef.current.clientHeight || 500

    if (width === 0 || height === 0) {
      console.warn('Container has zero dimensions')
      return
    }

    const sketch = (p: p5) => {
      let data: any = null
      let viewScale = 0.015
      let offsetX = 0
      let offsetY = 0
      let animating = true
      let lightParticles: any[] = []
      let scaleCalculated = false

      const calculateViewScale = () => {
        if (!data || !data.holes.length) return

        const minX = Math.min(...data.holes.map((h: any) => h.x))
        const maxX = Math.max(...data.holes.map((h: any) => h.x))
        const minY = Math.min(...data.holes.map((h: any) => h.y))
        const maxY = Math.max(...data.holes.map((h: any) => h.y))

        const padding = 40
        const structureWidth = maxX - minX
        const structureHeight = maxY - minY

        const availableWidth = width - padding * 2
        const availableHeight = height - padding * 2
        viewScale = Math.min(availableWidth / structureWidth, availableHeight / structureHeight)

        offsetX = (width - structureWidth * viewScale) / 2 - minX * viewScale
        offsetY = (height - structureHeight * viewScale) / 2 - minY * viewScale

        scaleCalculated = true
      }

      const initLightParticles = () => {
        if (!data || !data.individual_waveguides) return

        lightParticles = []

        const mainY = data.waveguide.y_center
        const mainStartX = -17000

        lightParticles.push({
          x: mainStartX,
          y: mainY,
          type: 'gaussian',
          color: p.color(255, 255, 255),
          beamWidth: 400,
          progress: 0
        })

        const colors = [p.color(255, 50, 50), p.color(50, 255, 50), p.color(50, 50, 255)]
        data.cavities.forEach((cavity: any, idx: number) => {
          lightParticles.push({
            x: cavity.x,
            y: cavity.y,
            type: 'cavity_resonance',
            particleColor: colors[idx],
            intensity: 0,
            active: false
          })
        })

        data.individual_waveguides.forEach((wg: any, idx: number) => {
          const seg = wg.segments[0]
          lightParticles.push({
            x: seg.x1,
            y: seg.y1,
            targetX: seg.x2,
            targetY: seg.y2,
            type: 'diagonal',
            particleColor: colors[idx],
            cavityIdx: idx,
            cavityX: data.cavities[idx].x,
            progress: 0,
            active: false,
            segmentData: seg
          })
        })
      }

      p.setup = async () => {
        p.createCanvas(width, height)
        p.frameRate(30)
        
        // Load JSON data
        try {
          const response = await fetch('/src/assets/phc_structure.json')
          data = await response.json()
          calculateViewScale()
          initLightParticles()
        } catch (error) {
          console.error('Error loading data:', error)
        }
      }

      p.draw = () => {
        p.clear()

        if (!data || !scaleCalculated) {
          p.fill(100)
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(16)
          p.text('Loading...', width / 2, height / 2)
          return
        }

        p.push()
        p.translate(offsetX, offsetY)

        // Get lattice boundaries
        const minX = Math.min(...data.holes.map((h: any) => h.x))
        const maxX = Math.max(...data.holes.map((h: any) => h.x))
        const minY = Math.min(...data.holes.map((h: any) => h.y))
        const maxY = Math.max(...data.holes.map((h: any) => h.y))

        // Draw photonic crystal lattice background
        p.fill(220, 220, 220)
        p.noStroke()
        p.rect(
          minX * viewScale,
          minY * viewScale,
          (maxX - minX) * viewScale,
          (maxY - minY) * viewScale
        )

        // Update and draw animated light particles
        if (animating) {
          lightParticles.forEach((particle) => {
            if (particle.type === 'gaussian') {
              particle.x += 180
              if (particle.x > 16000) {
                particle.x = -17000
                lightParticles.forEach((p: any) => {
                  if (p.type === 'cavity_resonance') {
                    p.active = false
                    p.intensity = 0
                  }
                })
              }

              lightParticles.forEach((dp: any) => {
                if (dp.type === 'cavity_resonance' && !dp.active) {
                  const cavityX = data.cavities[lightParticles.filter((p: any) => p.type === 'cavity_resonance').indexOf(dp)].x
                  if (Math.abs(particle.x - cavityX) < 1000) {
                    dp.active = true
                    dp.intensity = 1.0

                    lightParticles.forEach((wg: any) => {
                      if (wg.type === 'diagonal' && wg.cavityIdx === lightParticles.filter((p: any) => p.type === 'cavity_resonance').indexOf(dp)) {
                        wg.active = true
                        wg.progress = 0
                      }
                    })
                  }
                }
              })

              drawGaussianBeam(particle.x * viewScale, particle.y * viewScale, particle.beamWidth * viewScale, p.color(255, 255, 255, 200))
            } else if (particle.type === 'cavity_resonance' && particle.active) {
              particle.intensity *= 0.95
              drawCavityResonance(particle.x * viewScale, particle.y * viewScale, particle.particleColor, particle.intensity)
            } else if (particle.type === 'diagonal' && particle.active) {
              particle.progress += 0.020
              particle.intensity = 1
              if (particle.progress >= 0.9) {
                particle.active = false
                particle.intensity = 0
                if (particle.progress >= 1.1) {
                  particle.progress = 0
                }
              }

              const seg = particle.segmentData
              particle.x = seg.x1 + (seg.x2 - seg.x1) * particle.progress
              particle.y = seg.y1 + (seg.y2 - seg.y1) * particle.progress

              drawColoredLight(particle.x * viewScale, particle.y * viewScale, particle.particleColor, 900 * viewScale)
            }
          })
        }

        // Draw holes
        p.noStroke()
        p.fill(80, 80, 80)
        data.holes.forEach((hole: any) => {
          p.circle(hole.x * viewScale, hole.y * viewScale, hole.r * 2 * viewScale)
        })

        // Restore clipping context
        ;(p.drawingContext as CanvasRenderingContext2D).restore()
        p.pop()

        p.pop()
      }

      const drawGaussianBeam = (x: number, y: number, width: number, col: p5.Color) => {
        p.push()
        p.noStroke()
        const maxRadius = width * 2.5

        for (let r = maxRadius; r > 0; r -= maxRadius / 8) {
          const alpha = p.map(r, 0, maxRadius, 255, 0)
          p.fill(p.red(col), p.green(col), p.blue(col), alpha)
          p.circle(x, y, r * 2)
        }
        p.pop()
      }

      const drawCavityResonance = (x: number, y: number, col: p5.Color, intensity: number) => {
        p.push()
        p.noStroke()
        const maxRadius = 800 * viewScale
        for (let r = maxRadius; r > 0; r -= maxRadius / 10) {
          const alpha = p.map(r, 0, maxRadius, 255, 0) * intensity
          p.fill(p.red(col), p.green(col), p.blue(col), alpha)
          p.circle(x, y, r * 2)
        }
        p.pop()
      }

      const drawColoredLight = (x: number, y: number, col: p5.Color, radius: number) => {
        p.push()
        p.noStroke()
        for (let r = radius; r > 0; r -= radius / 8) {
          const alpha = p.map(r, 0, radius, 255, 0) * 0.6
          p.fill(p.red(col), p.green(col), p.blue(col), alpha)
          p.circle(x, y, r * 2)
        }
        p.pop()
      }
    }

    p5Instance.current = new p5(sketch, containerRef.current)

    return () => {
      p5Instance.current?.remove()
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      width="100%"
      height="100%"
      minHeight="300px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    />
  )
}

import { useEffect, useRef, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

interface VideoBackgroundProps {
  src: string
  poster?: string
  fallbackImage?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}

export const VideoBackground = ({
  src,
  poster,
  fallbackImage = "/wallpaper.png",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      if (autoPlay) {
        video.play().catch(err => {
          console.warn("Video autoplay failed:", err)
          setHasError(true)
        })
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = (e: Event) => {
      console.error("Video error:", e)
      setHasError(true)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    // Set video attributes
    video.muted = muted
    video.loop = loop
    video.playsInline = playsInline

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
    }
  }, [autoPlay, muted, loop, playsInline])

  // Fallback to image if video fails
  if (hasError) {
    return (
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        overflow="hidden"
        zIndex={0}
      >
        <Image
          src={fallbackImage}
          alt="Background fallback"
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          top={0}
          left={0}
        />
      </Box>
    )
  }

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      overflow="hidden"
      zIndex={0}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
        aria-label="Background video"
        aria-hidden="true"
      />
      
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(135deg, #e55d87 0%, #5fc3e4 100%)"
          opacity={1}
          transition="opacity 0.5s ease"
        />
      )}
    </Box>
  )
}
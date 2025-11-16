import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  usePrefersReducedMotion,
  HStack,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { ScrollIndicator } from './components/ScrollIndicator'
import { MobileNavigation } from './components/MobileNavigation'
import { GrainEffect } from './components/GrainEffect'
import { VideoBackground } from './components/VideoBackground'
import { BackgroundConfig } from './components/BackgroundConfig'
import { TypewriterText } from './components/TypewriterText'
import { Footer } from './components/Footer'
import { AboutSection } from './components/AboutSection'
import { QuantumSection } from './components/QuantumSection'
import { AISection } from './components/AISection'
import { LifeScienceSection } from './components/LifeScienceSection'

type BackgroundType = 'gradient' | 'video'

const logoPop = keyframes`
  0% { opacity: 0; transform: translateY(20px) scale(.35); filter: blur(4px) hue-rotate(-8deg); }
  60% { opacity: 1; transform: translateY(0px) scale(1.0); filter: blur(0) hue-rotate(0); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`

function App() {
  const prefersReduced = usePrefersReducedMotion()
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('video')
  const [grainEffectEnabled, setGrainEffectEnabled] = useState(true)
  
  // Responsive values
  // const isMobile = useBreakpointValue({ base: true, md: false })
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const logoSize = useBreakpointValue({ base: '120px', md: '200px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'lg', md: '2xl' })
  const navFontSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const bannerFontSize = useBreakpointValue({ base: '3xl', md: '3xl' })
  
  // Sample video URL - can be easily replaced
  const videoUrl = "/test.mp4"
  
  // Simple scroll function
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Simple scroll to next section
  const scrollToNext = () => {
    scrollToSection('quantum')
  }

  // Handle scroll event to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        // Show navbar when we've scrolled past 30% of the hero section
        setIsNavVisible(heroBottom < window.innerHeight * 0.3)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ensure page starts at top on load
  useEffect(() => {
    // Force scroll to top immediately and prevent browser scroll restoration
    window.scrollTo(0, 0)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Force scroll to top again after a short delay to override any browser behavior
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }, [])


  return (
    // outer inset so the rounded gradient box sits responsive padding from each screen edge
    <Box minH="100vh" p={padding} bg="transparent">
      {/* Desktop Navigation - Hidden on mobile */}
      <Box
        position="fixed"
        top={padding}
        height={'10vh'}
        left={padding}
        right={padding}
        zIndex={1000}
        opacity={isNavVisible ? 1 : 0}
        transform={isNavVisible ? 'translateY(0)' : 'translateY(-20px)'}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        pointerEvents={isNavVisible ? 'auto' : 'none'}
        display={{ base: 'none', md: 'block' }}
      >
        <Box
          /* translucent gradient (glassmorphism) */
          bgGradient="linear(135deg, rgba(187,125,164,0.8) 0%, rgba(96,194,227,0.8) 100%)"
          borderRadius={borderRadius}
          px={{ base: 4, md: 8 }}
          py={{ base: 3, md: 4 }}
          backdropFilter="blur(4px) saturate(120%)"
          sx={{ WebkitBackdropFilter: 'blur(12px) saturate(120%)' }}
          opacity={1}
        >
          <HStack justify="space-between" align="center" spacing={{ base: 2, md: 4 }}>
            <HStack spacing={2}>
              <Image
                src="/neplogo.png"
                alt="Nephilim Logo"
                boxSize="40px"
                objectFit="contain"
                animation={!prefersReduced ? `${logoPop} 900ms cubic-bezier(.2,.9,.2,1) forwards` : undefined}
                aria-hidden={prefersReduced}
              />
              <Text
                fontSize={bannerFontSize}
                fontWeight="bold"
                color="white"
                cursor="pointer"
                onClick={() => scrollToSection('hero')}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.8s"
              >
                Nephilim
              </Text>
            </HStack>
            
            <HStack spacing={{ base: 1, md: 2 }}>
                <Button
                variant="ghost"
                color="white"
                fontSize={navFontSize}
                transition="background 0.2s, border-radius 0.2s"
                _hover={{ bg: 'whiteAlpha.200', borderRadius: '9999px' }}
                onClick={() => scrollToSection('quantum')}
                >
                Quantum
                </Button>
              <Button
                variant="ghost"
                color="white"
                fontSize={navFontSize}
                _hover={{ bg: 'whiteAlpha.200', borderRadius: '9999px' }}
                onClick={() => scrollToSection('ai')}
              >
                AI
              </Button>
              <Button
                variant="ghost"
                color="white"
                fontSize={navFontSize}
                _hover={{ bg: 'whiteAlpha.200', borderRadius: '9999px' }}
                onClick={() => scrollToSection('life-science')}
              >
                Life Science
              </Button>
              <Button
                variant="ghost"
                color="white"
                fontSize={navFontSize}
                _hover={{ bg: 'whiteAlpha.200', borderRadius: '9999px' }}
                onClick={() => scrollToSection('about')}
              >
                About
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <MobileNavigation
        scrollToSection={scrollToSection}
        isNavVisible={isNavVisible}
      />

      {/* Global scrollbar styles - removed scroll-snap to avoid conflicts */}
      <style>{`
        /* WebKit browsers */
        ::-webkit-scrollbar { width: 12px; height: 12px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.06); }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.22); border-radius: 999px; border: 3px solid transparent; background-clip: padding-box; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.32); }

        /* Firefox */
        html { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.22) rgba(0,0,0,0.06); }
        
        /* Smooth scroll behavior only - removed scroll-snap to avoid conflicts with useScrollManager */
        html {
          scroll-behavior: smooth;
        }
        
        /* Prevent momentum scrolling on mobile for better control */
        @media (max-width: 768px) {
          body {
            overscroll-behavior: contain;
          }
        }
      `}</style>
      <Box
        borderRadius={borderRadius}
        overflow="hidden"
        height={{ base: 'calc(100vh - 20px)', md: 'calc(100vh - 30px)' }}
        position="relative"
      >
      {/* Hero */}
      <Box
        id="hero"
        position="relative"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Background Layer */}
        {backgroundType === 'video' ? (
          <VideoBackground
            src={videoUrl}
            fallbackImage="/wallpaper.png"
          />
        ) : (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(135deg, #e55d87 0%, #5fc3e4 100%)"
            zIndex={0}
          />
        )}
        
        {/* Grain Effect Overlay */}
        <GrainEffect
          intensity={0.5}
          opacity={0.15}
          animate={true}
          speed={1}
        />

        <Container
          maxW={{ base: 'container.sm', md: 'container.md' }}
          zIndex={1}
          textAlign="center"
          px={{ base: 4, md: 6 }}
          position="relative"
        >
          <VStack spacing={{ base: 6, md: 8 }}>
            <Image
              src="/neplogo.png"
              alt="Nephilim Logo"
              boxSize={logoSize}
              objectFit="contain"
              opacity={0}
              animation={!prefersReduced ? `${logoPop} 900ms cubic-bezier(.2,.9,.2,1) forwards` : undefined}
              aria-hidden={prefersReduced}
            />

            <Box
              width={{ base: '48px', md: '64px' }}
              height={{ base: '3px', md: '4px' }}
              bg="white"
              opacity={0}
              transform="scaleX(.7)"
              animation={!prefersReduced ? `separator 600ms ease forwards` : undefined}
              sx={{
                '@keyframes separator': {
                  from: { opacity: 0, transform: 'scaleX(.6)' },
                  to: { opacity: 1, transform: 'scaleX(1)' },
                },
                animationDelay: '850ms',
              }}
            />

            <TypewriterText
              heading="Nephilim"
              taglines={[
                "Accelerating research with AI.",
                "Transforming data into insights.",
                "Powering next-generation solutions.",
                "Innovating for a smarter future."
              ]}
              typingSpeed={50}
              deletingSpeed={20}
              pauseDuration={2000}
              cursorBlinkSpeed={400}
              headingSize={headingSize}
              textSize={textSize}
              color="white"
              prefersReducedMotion={prefersReduced}
            />

            {/* Animated Scroll Indicator */}
            <Box mt={{ base: 6, md: 8 }}>
              <ScrollIndicator
                onClick={() => scrollToNext()}
                size={{ base: '32px', md: '40px' }}
              />
            </Box>
          </VStack>
        </Container>
      </Box>

    </Box>
    
    {/* Grain Effect Toggle */}
    {/* <Box
      position="fixed"
      bottom={4}
      left={4}
      zIndex={1000}
      bg="rgba(0, 0, 0, 0.6)"
      backdropFilter="blur(8px)"
      borderRadius="md"
      p={3}
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Text color="white" fontSize="sm">Grain Effect</Text>
      <Button
        size="sm"
        colorScheme={grainEffectEnabled ? "blue" : "gray"}
        onClick={() => setGrainEffectEnabled(!grainEffectEnabled)}
      >
        {grainEffectEnabled ? 'ON' : 'OFF'}
      </Button>
    </Box> */}
    
    {/* Background Configuration */}
    {/* <BackgroundConfig
      onBackgroundChange={setBackgroundType}
      currentBackground={backgroundType}
    /> */}
      {/* Quantum Section */}
      <QuantumSection grainEffectEnabled={grainEffectEnabled} />

      {/* AI Section */}
      <AISection grainEffectEnabled={grainEffectEnabled} />

      {/* Life Science Section */}
      <LifeScienceSection grainEffectEnabled={grainEffectEnabled} />

      {/* About Section */}
      <AboutSection grainEffectEnabled={grainEffectEnabled} />

      {/* Footer Section */}
      <Footer grainEffectEnabled={grainEffectEnabled} />
    </Box>
  )
}

export default App

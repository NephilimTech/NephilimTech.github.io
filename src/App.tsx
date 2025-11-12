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
  
  // Responsive values
  // const isMobile = useBreakpointValue({ base: true, md: false })
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const logoSize = useBreakpointValue({ base: '120px', md: '200px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'lg', md: '2xl' })
  const navFontSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const bannerFontSize = useBreakpointValue({ base: '3xl', md: '3xl' })
  
  // Simple scroll function
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Simple scroll to next section
  const scrollToNext = () => {
    scrollToSection('coming-soon')
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
          backdropFilter="blur(12px) saturate(120%)"
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
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={() => scrollToSection('hero')}
              >
                Quantum
              </Button>
              <Button
                variant="ghost"
                color="white"
                fontSize={navFontSize}
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={() => scrollToSection('hero')}
              >
                AI
              </Button>
              <Button
                variant="ghost"
                color="white"
                fontSize={navFontSize}
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={() => scrollToSection('hero')}
              >
                Life Science
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
        bgGradient="linear(135deg, #e55d87 0%, #5fc3e4 100%)"
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
        

        <Container
          maxW={{ base: 'container.sm', md: 'container.md' }}
          zIndex={1}
          textAlign="center"
          px={{ base: 4, md: 6 }}
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

            <Heading
              as="h1"
              size={headingSize}
              color="white"
              opacity={0}
              animation={!prefersReduced ? `${fadeUp} 700ms ease forwards` : undefined}
              style={{ animationDelay: '900ms' }}
            >
              Nephilim
            </Heading>

            <Text
              fontSize={textSize}
              color="white"
              opacity={0}
              animation={!prefersReduced ? `${fadeUp} 700ms ease forwards` : undefined}
              style={{ animationDelay: '1050ms' }}
            >
              Accelerating research with AI.
            </Text>

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
      {/* Coming Soon Section */}
      <Box
        id="coming-soon"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <Container
          maxW={{ base: 'container.sm', md: 'container.md' }}
          textAlign="center"
          px={{ base: 4, md: 6 }}
        >
          <Heading
            size={{ base: 'lg', md: 'xl' }}
            mb={{ base: 4, md: 6 }}
          >
            Coming Soon
          </Heading>
          <Box
            width={{ base: '48px', md: '64px' }}
            height={{ base: '3px', md: '4px' }}
            bg="gray.800"
            mx="auto"
            mb={{ base: 4, md: 6 }}
          />
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            lineHeight={{ base: 1.6, md: 1.8 }}
          >
            We're working hard to launch something amazing.
            <br />
            Stay tuned for updates!
          </Text>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box id="footer" pt={padding} bg="transparent">
        <Box
          borderRadius={borderRadius}
          overflow="hidden"
          height={{ base: 'calc(100vh - 80px)', md: 'calc(100vh - 120px)' }}
          bgGradient="linear(135deg, #4e4e4eff 0%, #171b1dff 100%)"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Container
            maxW="100%"
            textAlign="center"
            px={{ base: 4, md: 6 }}
          >
            <VStack spacing={{ base: 6, md: 8 }}>
              <Heading
                as="h1"
                size={{ base: '2xl', md: '4xl' }}
                width="100%"
                textAlign="center"
              >
                © Nephilim Technologies Pvt Ltd
              </Heading>
              <HStack
                spacing={{ base: 4, md: 8 }}
                wrap="wrap"
                justifyContent="center"
              >
                <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.85}>© Nephilim 2025</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.85}>Privacy</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.85}>Terms</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.85}>Contact</Text>
              </HStack>
              <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.7}>
                Dummy footer content — links, social, or small print can go here.
              </Text>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default App

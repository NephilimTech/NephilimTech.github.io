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
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // ensure top padding for fixed header (Chakra header not present here)
    document.documentElement.style.scrollBehavior = 'smooth'

    // Handle scroll event to show/hide navbar
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        // Show navbar when we've scrolled past 80% of the hero section
        setIsNavVisible(heroBottom < window.innerHeight * 0.3)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    // outer inset so the rounded gradient box sits 25px from each screen edge
    <Box minH="100vh" p="15px" bg="transparent">
      {/* Sticky Navbar - transforms from gradient */}
      <Box
        position="fixed"
        top="15px"
        left="15px"
        right="15px"
        zIndex={1000}
        opacity={isNavVisible ? 1 : 0}
        transform={isNavVisible ? 'translateY(0)' : 'translateY(-20px)'}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        pointerEvents={isNavVisible ? 'auto' : 'none'}
      >
        <Box
          /* translucent gradient (glassmorphism) */
          bgGradient="linear(135deg, rgba(187,125,164,0.8) 0%, rgba(96,194,227,0.8) 100%)"
          // border="1px solid rgba(255,255,255,0.12)"
          borderRadius="25px"
          px={8}
          py={4}
          // boxShadow="0 8px 32px rgba(8,15,24,0.28)"
          backdropFilter="blur(12px) saturate(120%)"
          sx={{ WebkitBackdropFilter: 'blur(12px) saturate(120%)' }}
          opacity={1}
        >
          <HStack justify="space-between" align="center">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              /* use theme font (Outfit) */
              cursor="pointer"
              onClick={() => scrollToSection('hero')}
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.8s"
            >
              Nephilim
            </Text>
            
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => scrollToSection('hero')}
            >
              Quantum
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => scrollToSection('hero')}
            >
              Silicon
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => scrollToSection('hero')}
            >
              Computing
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => scrollToSection('hero')}
            >
              AI
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => scrollToSection('hero')}
            >
              Life Science
            </Button>
          </HStack>
        </Box>
      </Box>

      {/* Global scrollbar styles */}
      <style>{`
        /* WebKit browsers */
        ::-webkit-scrollbar { width: 12px; height: 12px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.06); }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.22); border-radius: 999px; border: 3px solid transparent; background-clip: padding-box; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.32); }

        /* Firefox */
        html { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.22) rgba(0,0,0,0.06); }
      `}</style>
      <Box borderRadius="25px" overflow="hidden" height="calc(100vh - 30px)" bgGradient="linear(135deg, #e55d87 0%, #5fc3e4 100%)">
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
        

        <Container maxW="container.md" zIndex={1} textAlign="center">
          <VStack spacing={8}>
            <Image
              src="/neplogo.png"
              alt="Nephilim Logo"
              boxSize="200px"
              objectFit="contain"
              opacity={0}
              animation={!prefersReduced ? `${logoPop} 900ms cubic-bezier(.2,.9,.2,1) forwards` : undefined}
              aria-hidden={prefersReduced}
            />

            <Box
              width="64px"
              height="4px"
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
              size="3xl"
              color="white"
              /* use theme font (Outfit) */
              opacity={0}
              animation={!prefersReduced ? `${fadeUp} 700ms ease forwards` : undefined}
              style={{ animationDelay: '900ms' }}
            >
              Nephilim
            </Heading>

            <Text
              fontSize="2xl"
              color="white"
              opacity={0}
              animation={!prefersReduced ? `${fadeUp} 700ms ease forwards` : undefined}
              style={{ animationDelay: '1050ms' }}
            >
              Accelerating research with AI.
            </Text>

            <Button
              variant="ghost"
              aria-label="Scroll to coming soon"
              onClick={() => scrollToSection('coming-soon')}
              mt={4}
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              {/* Minimal down arrow instead of mouse graphic */}
              <Box as="span" fontSize="2xl" lineHeight="1" color="white">ꜜ</Box>
            </Button>
          </VStack>
        </Container>
      </Box>

    </Box>
    {/* Coming Soon */}
    <Box id="coming-soon" minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
        <Container maxW="container.md" textAlign="center">
          <Heading size="xl" mb={6}>
            Coming Soon
          </Heading>
          <Box width="64px" height="4px" bg="gray.800" mx="auto" mb={6} />
          <Text fontSize="lg" color="gray.600">
            We're working hard to launch something amazing.
            <br />
            Stay tuned for updates!
          </Text>
        </Container>
      </Box>

      {/* Big gradient footer (rounded, inset 25px) */}
      <Box pt="25px" bg="transparent">
        <Box borderRadius="25px" overflow="hidden" height="calc(100vh - 120px)" bgGradient="linear(135deg, #4e4e4eff 0%, #171b1dff 100%)" color="white" display="flex" alignItems="center" justifyContent="center">
          <Container maxW="100%" textAlign="center">
            <VStack spacing={8}>
              <Heading as="h1" size="4xl" width="100%" textAlign="center">
                © Nephilim Technologies Pvt Ltd
              </Heading>
              <HStack spacing={8} wrap="wrap" justifyContent="center">
                <Text fontSize="sm" opacity={0.85}>© Nephilim 2025</Text>
                <Text fontSize="sm" opacity={0.85}>Privacy</Text>
                <Text fontSize="sm" opacity={0.85}>Terms</Text>
                <Text fontSize="sm" opacity={0.85}>Contact</Text>
              </HStack>
              <Text fontSize="xs" opacity={0.7}>Dummy footer content — links, social, or small print can go here.</Text>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default App

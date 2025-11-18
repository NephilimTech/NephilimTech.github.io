import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Button,
  useBreakpointValue,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { Twitter, Linkedin, ArrowUp } from 'lucide-react'
import { PrivacyModal } from './PrivacyModal'
import { TermsModal } from './TermsModal'
import { GrainEffect } from './GrainEffect'
import { useState, useEffect } from 'react'

interface FooterProps {
  grainEffectEnabled?: boolean
}

export function Footer({ grainEffectEnabled = false }: FooterProps) {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Responsive values matching the existing design
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: 'lg', md: 'lg' })
  const textSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const addressSize = useBreakpointValue({ base: '2xs', md: 'xs' })

  const openPrivacyModal = () => setIsPrivacyOpen(true)
  const closePrivacyModal = () => setIsPrivacyOpen(false)

  const openTermsModal = () => setIsTermsOpen(true)
  const closeTermsModal = () => setIsTermsOpen(false)

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setShowScrollTop(heroBottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll to Top Button */}
      <IconButton
        position="fixed"
        bottom={{ base: '20px', md: '30px' }}
        right={{ base: '20px', md: '30px' }}
        zIndex={999}
        aria-label="Scroll to top"
        icon={<ArrowUp size={20} />}
        size={{ base: 'sm', md: 'md' }}
        borderRadius="full"
        bgGradient="linear(135deg, rgba(187,125,164,0.9) 0%, rgba(96,194,227,0.9) 100%)"
        color="white"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        opacity={showScrollTop ? 1 : 0}
        transform={showScrollTop ? 'translateY(0)' : 'translateY(20px)'}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        pointerEvents={showScrollTop ? 'auto' : 'none'}
        _hover={{
          transform: showScrollTop ? 'scale(1.1)' : 'translateY(20px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
        onClick={scrollToTop}
      />

      {/* Main Footer Section */}
      <Box id="footer" pt={padding} bg="transparent">
        <Box
          borderRadius={borderRadius}
          overflow="hidden"
          height={{ base: 'calc(88vh)', md: 'calc(88vh)' }}
          bgGradient="linear(135deg, #4e4e4eff 0%, #171b1dff 100%)"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {/* Grain Effect Overlay */}
          {grainEffectEnabled && (
            <GrainEffect
              intensity={0.5}
              opacity={0.15}
              animate={true}
              speed={1}
            />
          )}
          <Container
            maxW="container.lg"
            textAlign="center"
            px={{ base: 4, md: 6 }}
            position="relative"
            zIndex={1}
          >
            <VStack spacing={{ base: 6, md: 8 }}>
              {/* Company Title */}
              <Heading
                as="h1"
                size={headingSize}
                width="100%"
                textAlign="center"
                fontWeight="bold"
              >
                © Nephilim Technologies Pvt Ltd
              </Heading>

              {/* Contact Information */}
              <VStack spacing={2}>
                <Text fontSize={textSize} opacity={0.9}>
                  <Link
                    href="mailto:support@nephilim.co.in"
                    color="white"
                    textDecoration="underline"
                    _hover={{ opacity: 0.8 }}
                    transition="opacity 0.2s"
                  >
                    support@nephilim.co.in
                  </Link>
                </Text>
              </VStack>

              {/* Company Address */}
              <Box
                maxWidth="600px"
                mx="auto"
                px={{ base: 2, md: 4 }}
              >
                <Text
                  fontSize={addressSize}
                  opacity={0.8}
                  lineHeight={1.6}
                  textAlign="center"
                >
                  235, Binnamangala, 2nd Flr, 13th Cross Road, 2nd Stage,<br />
                  Bangalore North, Indiranagar (Bangalore),<br />
                  Bangalore - 560038, Karnataka, India
                </Text>
              </Box>

              {/* Legal Links */}
              <HStack
                spacing={{ base: 4, md: 8 }}
                wrap="wrap"
                justifyContent="center"
              >
                <Button
                  variant="ghost"
                  color="white"
                  fontSize={textSize}
                  opacity={0.85}
                  _hover={{ opacity: 1, bg: 'whiteAlpha.100' }}
                  onClick={openPrivacyModal}
                  borderRadius="full"
                  px={3}
                >
                  Privacy
                </Button>
                <Button
                  variant="ghost"
                  color="white"
                  fontSize={textSize}
                  opacity={0.85}
                  _hover={{ opacity: 1, bg: 'whiteAlpha.100' }}
                  onClick={openTermsModal}
                  borderRadius="full"
                  px={3}
                >
                  Terms
                </Button>
                <Link
                  href="mailto:contact@nephilim.co.in"
                  color="white"
                  fontSize={textSize}
                  opacity={0.85}
                  _hover={{ opacity: 1, textDecoration: 'underline' }}
                  transition="all 0.2s"
                >
                  Contact
                </Link>
              </HStack>

              {/* Social Icons */}
              <HStack
                spacing={{ base: 4, md: 6 }}
                justifyContent="center"
              >
                <IconButton
                  as="a"
                  href="https://twitter.com/nephilimtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on X (Twitter)"
                  icon={<Twitter size={20} />}
                  size={{ base: 'sm', md: 'md' }}
                  borderRadius="full"
                  bgGradient="linear(135deg, rgba(187,125,164,0.9) 0%, rgba(96,194,227,0.9) 100%)"
                  color="white"
                  boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  _hover={{
                    transform: 'scale(1.1)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                />
                <IconButton
                  as="a"
                  href="https://linkedin.com/company/nephilimtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with us on LinkedIn"
                  icon={<Linkedin size={20} />}
                  size={{ base: 'sm', md: 'md' }}
                  borderRadius="full"
                  bgGradient="linear(135deg, rgba(187,125,164,0.9) 0%, rgba(96,194,227,0.9) 100%)"
                  color="white"
                  boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  _hover={{
                    transform: 'scale(1.1)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                />
              </HStack>

              {/* Copyright */}
              <Text fontSize={textSize} opacity={0.7}>
                © Nephilim 2025
              </Text>
            </VStack>
          </Container>
        </Box>
      </Box>

      {/* Modals */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={closePrivacyModal} />
      <TermsModal isOpen={isTermsOpen} onClose={closeTermsModal} />
    </>
  )
}
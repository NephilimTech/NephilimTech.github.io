import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  useDisclosure,
  IconButton,
  Portal,
  Image,
} from '@chakra-ui/react'
// Custom SVG icons since @chakra-ui/icons is not available
const HamburgerIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

interface MobileNavigationProps {
  scrollToSection: (sectionId: string) => void
  isNavVisible: boolean
}

export const MobileNavigation = ({ scrollToSection, isNavVisible }: MobileNavigationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    onClose()
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Box
        position="fixed"
        top="15px"
        right="15px"
        zIndex={1001}
        opacity={isNavVisible ? 1 : 0}
        transform={isNavVisible ? 'translateY(0)' : 'translateY(-20px)'}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        pointerEvents={isNavVisible ? 'auto' : 'none'}
        display={{ base: 'block', md: 'none' }}
      >
        <IconButton
          aria-label="Open Menu"
          size="lg"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          bg="rgba(187,125,164,0.8)"
          color="white"
          _hover={{
            bg: 'rgba(187,125,164,0.9)',
            transform: 'scale(1.05)'
          }}
          _active={{
            transform: 'scale(0.95)'
          }}
          borderRadius="12px"
          backdropFilter="blur(12px) saturate(120%)"
          sx={{ WebkitBackdropFilter: 'blur(12px) saturate(120%)' }}
        />
      </Box>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <Portal>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.5)"
            zIndex={1002}
            onClick={onClose}
            opacity={isOpen ? 1 : 0}
            transition="opacity 0.3s ease"
          />
          <Box
            position="fixed"
            top={0}
            right={0}
            h="100vh"
            w="80%"
            maxW="320px"
            bgGradient="linear(135deg, rgba(187,125,164,0.95) 0%, rgba(96,194,227,0.95) 100%)"
            zIndex={1003}
            transform={isOpen ? 'translateX(0)' : 'translateX(100%)'}
            transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            boxShadow="-4px 0 20px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(12px) saturate(120%)"
            sx={{ WebkitBackdropFilter: 'blur(12px) saturate(120%)' }}
          >
            <VStack h="100%" p={6} spacing={6} align="stretch">
              {/* Close Button */}
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  aria-label="Close Menu"
                  size="md"
                  icon={<CloseIcon />}
                  onClick={onClose}
                  bg="whiteAlpha.200"
                  color="white"
                  _hover={{
                    bg: 'whiteAlpha.300',
                    transform: 'rotate(90deg)'
                  }}
                  _active={{
                    transform: 'rotate(90deg) scale(0.95)'
                  }}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                />
              </Box>

              {/* Logo */}
              <HStack justify="center" spacing={2}>
                <Image
                  src="/neplogo.png"
                  alt="Nephilim Logo"
                  boxSize="64px"
                  objectFit="contain"
                />
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                  cursor="pointer"
                  onClick={() => handleNavClick('hero')}
                  transition="opacity 0.3s ease"
                  _hover={{ opacity: 0.8 }}
                >
                  Nephilim
                </Text>
              </HStack>

              {/* Navigation Items */}
              <VStack spacing={4} align="stretch" flex={1}>
                <Button
                  variant="ghost"
                  color="white"
                  justifyContent="flex-start"
                  fontSize="lg"
                  py={4}
                  _hover={{ bg: 'whiteAlpha.200', transform: 'translateX(8px)' }}
                  transition="all 0.2s ease"
                  onClick={() => handleNavClick('hero')}
                >
                  Quantum
                </Button>
                
                <Button
                  variant="ghost"
                  color="white"
                  justifyContent="flex-start"
                  fontSize="lg"
                  py={4}
                  _hover={{ bg: 'whiteAlpha.200', transform: 'translateX(8px)' }}
                  transition="all 0.2s ease"
                  onClick={() => handleNavClick('hero')}
                >
                  AI
                </Button>
                <Button
                  variant="ghost"
                  color="white"
                  justifyContent="flex-start"
                  fontSize="lg"
                  py={4}
                  _hover={{ bg: 'whiteAlpha.200', transform: 'translateX(8px)' }}
                  transition="all 0.2s ease"
                  onClick={() => handleNavClick('hero')}
                >
                  Life Science
                </Button>
              </VStack>

              {/* Footer Info */}
              <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.200">
                <Text color="white" fontSize="sm" textAlign="center">
                  © Nephilim Technologies Pvt Ltd
                </Text>
                <Text color="white" fontSize="xs" textAlign="center" mt={2}>
                  © 2025 All rights reserved
                </Text>
              </Box>
            </VStack>
          </Box>
        </Portal>
      )}
    </>
  )
}
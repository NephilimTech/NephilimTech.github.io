import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Heading,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const modalSize = useBreakpointValue({ base: 'sm', md: 'md' })
  const padding = useBreakpointValue({ base: 4, md: 6 })

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={modalSize}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay 
        bg="blackAlpha.600" 
        backdropFilter="blur(8px)"
      />
      <ModalContent
        bgGradient="linear(135deg, rgba(187,125,164,0.95) 0%, rgba(96,194,227,0.95) 100%)"
        color="white"
        borderRadius="25px"
        boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      >
        <ModalHeader 
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="bold"
          pb={2}
        >
          Privacy Policy
        </ModalHeader>
        <ModalCloseButton 
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
          borderRadius="full"
        />
        
        <ModalBody px={padding}>
          <VStack spacing={4} align="start">
            <Box>
              <Heading size="sm" mb={2}>Information We Collect</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                We collect information you provide directly to us, such as when you contact us for support or inquire about our services. This may include your name, email address, and any other information you choose to provide.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>How We Use Your Information</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                We use the information we collect to provide, maintain, and improve our services, process requests, and communicate with you about our products, services, and promotional offers.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Information Sharing</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy or as required by law.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Data Security</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Contact Us</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                If you have any questions about this Privacy Policy, please contact us at support@nephilim.co.in
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter pt={4}>
          <Button 
            bg="whiteAlpha.200" 
            color="white" 
            _hover={{ bg: 'whiteAlpha.300' }}
            onClick={onClose}
            borderRadius="full"
            px={6}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
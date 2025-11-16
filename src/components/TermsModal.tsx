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

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
          Terms of Service
        </ModalHeader>
        <ModalCloseButton 
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
          borderRadius="full"
        />
        
        <ModalBody px={padding}>
          <VStack spacing={4} align="start">
            <Box>
              <Heading size="sm" mb={2}>Acceptance of Terms</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                By accessing and using Nephilim Technologies Pvt Ltd's services, you accept and agree to be bound by the terms and provision of this agreement.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Use License</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                Permission is granted to temporarily access the materials (information or software) on Nephilim's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Disclaimer</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                The materials on Nephilim's website are provided on an 'as is' basis. Nephilim makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Limitations</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                In no event shall Nephilim Technologies Pvt Ltd or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nephilim's website.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Privacy Policy</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                Your Privacy is important to us. Please review our Privacy Policy, which also governs the Site, to understand our practices.
              </Text>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>Contact Information</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} opacity={0.9}>
                Questions about the Terms of Service should be sent to us at support@nephilim.co.in
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
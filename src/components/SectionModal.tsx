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
  useBreakpointValue,
  Text as ChakraText,
} from '@chakra-ui/react'

interface SectionModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content?: string
  gradient?: string
  category?: string
}

export const SectionModal = ({ 
  isOpen, 
  onClose, 
  title, 
  content = "Additional details will be added here soon. This modal will contain more information about this section.",
  gradient = "linear(135deg, #667eea 0%, #764ba2 100%)",
  category,
}: SectionModalProps) => {
  const modalSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const contentLines = content
    ? content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
    : []

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={modalSize}
      isCentered
    >
      <ModalOverlay 
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
      />
      <ModalContent
        borderRadius={borderRadius}
        bg="white"
        boxShadow="0 20px 60px rgba(0,0,0,0.3)"
      >
        <ModalHeader
          bgGradient={gradient}
          bgClip="text"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          textAlign="center"
          py={6}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton 
          color="gray.600"
          _hover={{ color: "gray.800" }}
        />
        
        <ModalBody py={6}>
          <VStack spacing={4} align="start">
            {category && (
              <ChakraText
                fontSize="sm"
                color="#667eea"
                textTransform="uppercase"
                letterSpacing="wide"
                fontWeight="bold"
              >
                {category}
              </ChakraText>
            )}

            {contentLines.map((line, idx) => {
              const isBullet = /^[-•]/.test(line)
              const textValue = isBullet ? line.replace(/^[-•]\s*/, '') : line
              return (
                <Text
                  key={`${title}-line-${idx}`}
                  fontSize={{ base: isBullet ? 'sm' : 'md', md: isBullet ? 'md' : 'lg' }}
                  color={isBullet ? 'gray.600' : 'gray.700'}
                  lineHeight={1.8}
                >
                  {isBullet ? `• ${textValue}` : textValue}
                </Text>
              )
            })}
          </VStack>
        </ModalBody>

        <ModalFooter 
          bg="gray.50"
          borderBottomRadius={borderRadius}
          py={4}
        >
          <Button 
            colorScheme="blue" 
            mr={3} 
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
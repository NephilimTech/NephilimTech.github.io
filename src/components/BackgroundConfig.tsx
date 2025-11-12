import { useState } from 'react'
import { Box, Button, HStack, Text, useBreakpointValue } from '@chakra-ui/react'

type BackgroundType = 'gradient' | 'video'

interface BackgroundConfigProps {
  onBackgroundChange: (type: BackgroundType) => void
  currentBackground: BackgroundType
}

export const BackgroundConfig = ({ 
  onBackgroundChange, 
  currentBackground 
}: BackgroundConfigProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' })
  const fontSize = useBreakpointValue({ base: 'xs', md: 'sm' })

  const toggleConfig = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      zIndex={1000}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      gap={2}
    >
      {/* Configuration Panel */}
      {isVisible && (
        <Box
          bg="rgba(0, 0, 0, 0.8)"
          backdropFilter="blur(8px)"
          borderRadius="md"
          p={4}
          mb={2}
          minW="200px"
        >
          <Text
            color="white"
            fontSize={fontSize}
            mb={3}
            fontWeight="medium"
          >
            Background Type
          </Text>
          <HStack spacing={2}>
            <Button
              size={buttonSize}
              colorScheme={currentBackground === 'gradient' ? 'blue' : 'gray'}
              onClick={() => onBackgroundChange('gradient')}
              fontSize={fontSize}
            >
              Gradient
            </Button>
            <Button
              size={buttonSize}
              colorScheme={currentBackground === 'video' ? 'blue' : 'gray'}
              onClick={() => onBackgroundChange('video')}
              fontSize={fontSize}
            >
              Video
            </Button>
          </HStack>
        </Box>
      )}
      
      {/* Toggle Button */}
      <Button
        size={buttonSize}
        colorScheme="blackAlpha"
        onClick={toggleConfig}
        bg="rgba(0, 0, 0, 0.6)"
        color="white"
        _hover={{ bg: "rgba(0, 0, 0, 0.8)" }}
        fontSize={fontSize}
      >
        {isVisible ? 'Hide' : 'Show'} BG Options
      </Button>
    </Box>
  )
}
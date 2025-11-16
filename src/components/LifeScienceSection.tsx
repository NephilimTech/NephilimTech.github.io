import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
  Image,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { SectionModal } from './SectionModal'
import { GrainEffect } from './GrainEffect'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

interface LifeScienceSectionProps {
  grainEffectEnabled?: boolean
}

export const LifeScienceSection = ({ grainEffectEnabled = false }: LifeScienceSectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' })

  // Life Science section data
  const lifeScienceSection = {
    id: 1,
    title: "Biomedical Research",
    subtitle: "Advancing Human Health",
    description: "Pioneering breakthrough discoveries in biomedical research that are transforming healthcare. Our interdisciplinary approach combines cutting-edge molecular biology, advanced computational analysis, and innovative clinical research to develop next-generation therapies and diagnostic tools.",
    image: "/lifescience-placeholder-1.jpg",
    imageAlt: "Biomedical Research Visualization"
  }

  return (
    <Box id="life-science" pt={padding} bg="transparent">
      <Box
        borderRadius={borderRadius}
        overflow="hidden"
        minH="100vh"
        position="relative"
        bg="#f5f5f0ff"
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
          maxW="container.xl"
          py={{ base: 12, md: 16 }}
          px={{ base: 4, md: 6 }}
        >
          <VStack spacing={{ base: 10, md: 12 }}>
            {/* Section Header */}
            <Box
              width="100%"
              textAlign="left"
              animation={`${fadeIn} 0.8s ease-out`}
            >
              <Heading
                as="h2"
                size={headingSize}
                mb={6}
                bgGradient="linear(135deg, #4CAF50 0%, #2E7D32 100%)"
                bgClip="text"
                fontWeight="bold"
              >
                Life Sciences
              </Heading>
              
              <Box
                width={{ base: "60px", md: "80px" }}
                height="4px"
                bgGradient="linear(135deg, #4CAF50 0%, #2E7D32 100%)"
                mr="auto"
                mb={8}
                borderRadius="full"
              />
              
              <Text
                fontSize={textSize}
                color="gray.600"
                lineHeight={1.8}
                maxW="4xl"
                mx="auto"
                mb={8}
              >
                Advancing human health through innovative life sciences research. Our interdisciplinary teams 
                combine biology, chemistry, and computational science to develop breakthrough therapies and 
                diagnostic tools that are transforming medicine and improving lives worldwide.
              </Text>
            </Box>

            {/* Life Science Section */}
            <Box
              width="100%"
              cursor="pointer"
              onClick={onOpen}
              transition="all 0.3s ease"
              animation={`${fadeIn} 0.8s ease-out`}
            >
              <Flex
                direction={{ base: 'column', md: 'row' }}
                align="center"
                justify="space-between"
                gap={{ base: 6, md: 10 }}
              >
                {/* Image Section */}
                <Box
                  flex={{ base: 1, md: 1 }}
                  minH={{ base: '200px', md: '300px' }}
                  bg="gray.100"
                  position="relative"
                  overflow="hidden"
                >
                  <Image
                    src={lifeScienceSection.image}
                    alt={lifeScienceSection.imageAlt}
                    fallbackSrc="https://via.placeholder.com/400x300/4CAF50/ffffff?text=Life+Science+Section"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>

                {/* Text Section */}
                <Box
                  flex={{ base: 1, md: 1 }}
                  p={{ base: 6, md: 10 }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <VStack align="start" spacing={4}>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="gray.500"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      {lifeScienceSection.subtitle}
                    </Text>
                    
                    <Heading
                      as="h3"
                      size={{ base: 'lg', md: 'xl' }}
                      bgGradient="linear(135deg, #4CAF50 0%, #2E7D32 100%)"
                      bgClip="text"
                      fontWeight="bold"
                    >
                      {lifeScienceSection.title}
                    </Heading>
                    
                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color="gray.600"
                      lineHeight={1.8}
                    >
                      {lifeScienceSection.description}
                    </Text>
                    
                    <Text
                      fontSize="sm"
                      color="#4CAF50"
                      fontWeight="medium"
                      mt={2}
                    >
                      Click to learn more →
                    </Text>
                  </VStack>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box>
      
      {/* Section Modal */}
      <SectionModal
        isOpen={isOpen}
        onClose={onClose}
        title="Life Sciences"
        content="Life Sciences research is at the forefront of medical innovation, combining biological insights with technological advances to solve some of humanity's most pressing health challenges."
        gradient="linear(135deg, #4CAF50 0%, #2E7D32 100%)"
      />
    </Box>
  )
}
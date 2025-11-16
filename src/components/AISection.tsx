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

interface AISectionProps {
  grainEffectEnabled?: boolean
}

export const AISection = ({ grainEffectEnabled = false }: AISectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' })

  // AI sections data
  const aiSections = [
    {
      id: 1,
      title: "Machine Learning",
      subtitle: "Intelligent Systems Development",
      description: "Creating sophisticated machine learning models that can learn from data, recognize patterns, and make intelligent decisions. Our AI systems leverage deep learning architectures to solve complex problems across various domains.",
      image: "/ai-placeholder-1.jpg",
      imageAlt: "Machine Learning Visualization"
    },
    {
      id: 2,
      title: "Neural Networks",
      subtitle: "Advanced AI Architecture",
      description: "Designing and implementing cutting-edge neural network architectures that mimic human cognitive processes. These networks power everything from natural language processing to computer vision applications.",
      image: "/ai-placeholder-2.jpg",
      imageAlt: "Neural Networks Visualization"
    }
  ]

  return (
    <Box id="ai" pt={padding} bg="transparent">
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
              textAlign="right"
              animation={`${fadeIn} 0.8s ease-out`}
            >
              <Heading
                as="h2"
                size={headingSize}
                mb={6}
                bgGradient="linear(135deg, #f093fb 0%, #f5576c 100%)"
                bgClip="text"
                fontWeight="bold"
              >
                Artificial Intelligence
              </Heading>
              
              <Box
                width={{ base: "60px", md: "80px" }}
                height="4px"
                bgGradient="linear(135deg, #f093fb 0%, #f5576c 100%)"
                ml="auto"
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
                Harnessing the power of artificial intelligence to solve complex problems and drive innovation. 
                Our AI research division develops cutting-edge machine learning models and intelligent systems 
                that transform data into actionable insights across industries.
              </Text>
            </Box>

            {/* AI Sections */}
            <VStack spacing={{ base: 8, md: 12 }} width="100%">
              {aiSections.map((section, index) => (
                <Box
                  key={section.id}
                  width="100%"
                  cursor="pointer"
                  onClick={onOpen}
                  transition="all 0.3s ease"
                  animation={`${fadeIn} 0.8s ease-out`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Flex
                    direction={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
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
                        src={section.image}
                        alt={section.imageAlt}
                        fallbackSrc="https://via.placeholder.com/400x300/f093fb/ffffff?text=AI+Section"
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
                          {section.subtitle}
                        </Text>
                        
                        <Heading
                          as="h3"
                          size={{ base: 'lg', md: 'xl' }}
                          bgGradient="linear(135deg, #f093fb 0%, #f5576c 100%)"
                          bgClip="text"
                          fontWeight="bold"
                        >
                          {section.title}
                        </Heading>
                        
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          color="gray.600"
                          lineHeight={1.8}
                        >
                          {section.description}
                        </Text>
                        
                        <Text
                          fontSize="sm"
                          color="#f093fb"
                          fontWeight="medium"
                          mt={2}
                        >
                          Click to learn more →
                        </Text>
                      </VStack>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>
      
      {/* Section Modal */}
      <SectionModal
        isOpen={isOpen}
        onClose={onClose}
        title="Artificial Intelligence"
        content="Artificial Intelligence is revolutionizing how we interact with technology and process information. Our AI research focuses on developing intelligent systems that can learn, adapt, and make decisions in complex environments."
        gradient="linear(135deg, #f093fb 0%, #f5576c 100%)"
      />
    </Box>
  )
}
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

interface QuantumSectionProps {
  grainEffectEnabled?: boolean
}

export const QuantumSection = ({ grainEffectEnabled = false }: QuantumSectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' })

  // Quantum sections data
  const quantumSections = [
    {
      id: 1,
      title: "Quantum Computing",
      subtitle: "Revolutionary Processing Power",
      description: "Harnessing the fundamental principles of quantum mechanics to create computing systems that can solve problems impossible for classical computers. Our quantum processors leverage superposition and entanglement to achieve unprecedented computational capabilities.",
      image: "/quantum-placeholder-1.jpg",
      imageAlt: "Quantum Computing Visualization"
    },
    {
      id: 2,
      title: "Quantum Algorithms",
      subtitle: "Advanced Computational Methods",
      description: "Developing sophisticated quantum algorithms that can optimize complex systems, accelerate drug discovery, and enhance machine learning models. These algorithms represent the next frontier in computational problem-solving.",
      image: "/quantum-placeholder-2.jpg",
      imageAlt: "Quantum Algorithms Visualization"
    },
    {
      id: 3,
      title: "Quantum Applications",
      subtitle: "Real-World Solutions",
      description: "Applying quantum computing to solve real-world challenges in cryptography, optimization, and simulation. Our research bridges theoretical quantum mechanics with practical applications that will transform industries.",
      image: "/quantum-placeholder-3.jpg",
      imageAlt: "Quantum Applications Visualization"
    }
  ]

  return (
    <Box id="quantum" pt={padding} bg="transparent">
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
                bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
                bgClip="text"
                fontWeight="bold"
              >
                Quantum Computing
              </Heading>
              
              <Box
                width={{ base: "60px", md: "80px" }}
                height="4px"
                bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
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
                Pioneering the future of computation through quantum mechanics. Our quantum research division 
                is at the forefront of developing revolutionary quantum technologies that will transform 
                industries from healthcare to finance.
              </Text>
            </Box>

            {/* Quantum Sections */}
            <VStack spacing={{ base: 8, md: 12 }} width="100%">
              {quantumSections.map((section, index) => (
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
                        fallbackSrc="https://via.placeholder.com/400x300/667eea/ffffff?text=Quantum+Section"
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
                          bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
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
                          color="#667eea"
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
        title="Quantum Computing"
        content="Quantum computing represents a fundamental shift in how we process information. By harnessing the principles of quantum mechanics, we can create systems that solve problems currently intractable for classical computers."
        gradient="linear(135deg, #667eea 0%, #764ba2 100%)"
      />
    </Box>
  )
}
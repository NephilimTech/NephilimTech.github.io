import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
  Image,
  Flex,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { SectionModal } from './SectionModal'
import { GrainEffect } from './GrainEffect'
import lifeScienceAnimation from '../assets/Design_biologics.png'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

interface LifeScienceSectionProps {
  grainEffectEnabled?: boolean
}

interface LifeScienceSectionItem {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  category: string
}

export const LifeScienceSection = ({ grainEffectEnabled = false }: LifeScienceSectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const [selectedSection, setSelectedSection] = useState<LifeScienceSectionItem | null>(null)

  // Life Science sections data
  const lifeScienceSections: LifeScienceSectionItem[] = [
    {
      id: 1,
      title: "In-silico Biologics Platform",
      subtitle: "Precision Engineering at Molecular Scale",
      description: "Our proprietary platform revolutionizes the development of biologics by moving the design process into the digital realm. We utilize high-fidelity simulations and machine learning to predict protein structure, function, and developability, enabling the creation of optimized therapeutic candidates faster and more efficiently than traditional methods.",
      image: lifeScienceAnimation,
      imageAlt: "In-silico Biologics Design Visualization",
      category: "Computational Biology"
    }
  ]

  const handleLearnMore = (section: LifeScienceSectionItem) => {
    setSelectedSection(section)
    onOpen()
  }

  return (
    <Box id="life-science" pt={padding} bg="transparent" scrollMarginTop={{ base: 'calc(9vh)', md: 'calc(9vh)' }}>
      <Box
        borderRadius={borderRadius}
        overflow="hidden"
        minH="100vh"
        position="relative"
        bgGradient="linear(135deg, #4e4e4eff 0%, #171b1dff 100%)"
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
                bgGradient="linear(135deg, #5fac61ff 0%, #38613aff 100%)"
                bgClip="text"
                fontWeight="bold"
              >
                Life Science
              </Heading>

              <Box
                width={{ base: "60px", md: "80px" }}
                height="4px"
                bgGradient="linear(135deg, #5fac61ff 0%, #38613aff 100%)"
                mr="auto"
                mb={8}
                borderRadius="full"
              />

              <Text
                fontSize={textSize}
                color="gray.300"
                lineHeight={1.8}
                maxW="4xl"
                mx="auto"
                mb={8}
              >
                Accelerating the future of medicine with our premier In-silico Biologics Design platform. We harness the power of advanced computational modeling and artificial intelligence to engineer next-generation biologics with superior efficacy and developability.
              </Text>
            </Box>

            {/* Life Science Sections */}
            <VStack spacing={{ base: 8, md: 12 }} width="100%">
              {lifeScienceSections.map((section, index) => (
                <Box
                  key={section.id}
                  width="100%"
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
                      h={{ base: '300px', md: '400px' }}
                      bg="gray.100"
                      position="relative"
                      overflow="hidden"
                      borderRadius={{ base: '16px', md: '24px' }}
                    >
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
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
                          fontSize="xs"
                          fontWeight="bold"
                          color="#5fac61ff"
                          textTransform="uppercase"
                          letterSpacing="widest"
                        >
                          {section.category}
                        </Text>

                        <Heading
                          as="h3"
                          size={{ base: 'lg', md: 'xl' }}
                          bgGradient="linear(135deg, #5fac61ff 0%, #38613aff 100%)"
                          bgClip="text"
                          fontWeight="bold"
                        >
                          {section.title}
                        </Heading>

                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color="gray.300"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          {section.subtitle}
                        </Text>

                        <Button
                          variant="link"
                          color="#5fac61ff"
                          fontWeight="semibold"
                          mt={2}
                          onClick={() => handleLearnMore(section)}
                        >
                          Click to learn more →
                        </Button>
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
        title={selectedSection?.title ?? "In-silico Biologics Design"}
        content={selectedSection?.description}
        category={selectedSection?.category}
        gradient="linear(135deg, #4CAF50 0%, #2E7D32 100%)"
      />
    </Box>
  )
}
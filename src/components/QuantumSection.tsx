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
import photonicsAnimation from '../assets/photonics_animation.gif'
import interconnectAnimation from '../assets/interconnect.gif'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

interface QuantumSectionProps {
  grainEffectEnabled?: boolean
}

interface QuantumSectionItem {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  category: string
}

export const QuantumSection = ({ grainEffectEnabled = false }: QuantumSectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const [selectedSection, setSelectedSection] = useState<QuantumSectionItem | null>(null)

  // Quantum sections data
  const quantumSections: QuantumSectionItem[] = [
    {
      id: 1,
      title: "Quantum Photonic Interconnect & Processor",
      subtitle: "Integrated photonic hardware for quantum information and coherent classical signal processing.",
      description: [
        "We design and fabricate silicon photonic chips that do two things extremely well:",
        "- Route and multiplex quantum and classical light using high-Q photonic crystal nanocavities (PCNs), rings, and wavelength MUX/DEMUX structures.",
        "- Implement programmable interferometer meshes that act as a configurable linear-optical processor for quantum and photonic ML experiments.",
        "Together, these chips form the interconnect and processing layer for quantum systems: QKD nodes, photonic quantum processors, quantum repeaters and hybrid quantum–classical links."
      ].join('\n\n'),
      image: photonicsAnimation,
      imageAlt: "Quantum Computing Visualization",
      category: "Photonic Hardware",
    },
    {
      id: 2,
      title: "AI-Driven Photonic Design & Foundry Integration Studio",
      subtitle: "AI-designed PICs for real-world applications, made manufacturable.",
      description: "Beyond individual products, we operate an AI-driven photonic design studio focused on quantum-enabling PIC components in silicon and SiC. We work with Indian and global partners to co-design, optimise and tape-out custom photonic building blocks.",
      image: interconnectAnimation,
      imageAlt: "Photonic Crystal Cavity Animation",
      category: "Photonic Platform",
    },
    // {
    //   id: 3,
    //   title: "Nanophotonic Quantum & Bio Sensing Platform",
    //   subtitle: "Photonic-crystal nanocavity integrate chips for quantum-grade, biomedical and industrial sensing and readout.",
    //   description: ["We develop integrated nanophotonic sensor chips that use photonic crystal nanocavities (PCNs) as ultra-sensitive probes, combined with on-chip routing and optical readout. The same platform serves three families of applications:",
    //     "-    Biomedical and biochemical sensing",
    //     "-    Chemical spill and industrial safety monitoring",
    //     "-    Quantum-compatible field, strain and temperature sensing"].join('\n\n'),
    //   image: "/quantum-placeholder-3.jpg",
    //   imageAlt: "Quantum Applications Visualization",
    //   category: "Applied Research",
    // }
  ]

  const handleLearnMore = (section: QuantumSectionItem) => {
    setSelectedSection(section)
    onOpen()
  }

  return (
    <Box id="quantum" pt={padding} bg="transparent" scrollMarginTop={{ base: 'calc(9vh)', md: 'calc(9vh)' }}>
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
                bgGradient="linear(135deg, #eeeeeeff 0%, #a1a1a1ff 100%)"
                bgClip="text"
                fontWeight="bold"
              >
                Quantum Technology
              </Heading>

              <Box
                width={{ base: "60px", md: "80px" }}
                height="4px"
                bgGradient="linear(135deg, #eeeeeeff 0%, #a1a1a1ff 100%)"
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
                Our quantum research division is at the forefront of developing revolutionary quantum technologies that will transform
                industries like telecommunication, finance and healthcare.
              </Text>
            </Box>

            {/* Quantum Sections */}
            <VStack spacing={{ base: 8, md: 12 }} width="100%">
              {quantumSections.map((section, index) => (
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
                          fontSize="xs"
                          fontWeight="bold"
                          color="#8a8a8aff"
                          textTransform="uppercase"
                          letterSpacing="widest"
                        >
                          {section.category}
                        </Text>

                        <Heading
                          as="h3"
                          size={{ base: 'lg', md: 'xl' }}
                          bgGradient="linear(135deg, #eeeeeeff 0%, #a1a1a1ff 100%)"
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
                          color="#8a8a8aff"
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
        title={selectedSection?.title ?? "Quantum Technology"}
        content={selectedSection?.description}
        category={selectedSection?.category}
        gradient="linear(135deg, #667eea 0%, #764ba2 100%)"
      />
    </Box>
  )
}
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

interface AISectionProps {
  grainEffectEnabled?: boolean
}

interface AISectionItem {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  category: string
}

export const AISection = ({ grainEffectEnabled = false }: AISectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const [selectedSection, setSelectedSection] = useState<AISectionItem | null>(
    null
  )

  const aiSections: AISectionItem[] = [
    {
      id: 1,
      title: 'AI Multi-Agent Orchestration Platform',
      subtitle: 'From chaotic agents to coordinated intelligence across your stack.',
      category: 'AI Platforms',
      description: [
        'Our AI multi-agent orchestration platform turns scattered experiments into a coherent, production-ready intelligence layer that spans your entire organization.',
        '',
        '- Coordinate specialized agents for research, data analysis, code generation, simulation, and reporting – all within a single, governed environment.',
        '- Plug into your existing tools, APIs, and data sources so agents can act with context and traceability rather than in isolation.',
        '- Design reusable workflows and playbooks that allow non-technical teams to safely trigger complex, multi-step AI processes.',
        '- Monitor agent behavior, interventions, and outcomes with observability features that make AI-driven decisions auditable and explainable.',
        '',
        'Whether you are automating R&D workflows, augmenting engineering teams, or building AI-first products, the platform acts as the coordination fabric between people, models, and systems.',
      ].join('\n'),
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'AI orchestration visualization',
    },
    {
      id: 2,
      title: 'AI Research Companion Agent',
      subtitle: 'A tireless collaborator for deep technical and scientific work.',
      category: 'AI Research Tools',
      description: [
        'Our AI research companion agent is built for scientists, engineers, and founders who work at the edge of what is possible.',
        '',
        '- Ingest and digest research papers, patents, documentation, and experiment logs into a living knowledge base that is queryable in natural language.',
        '- Propose hypotheses, generate literature reviews, and surface non-obvious connections between ideas, datasets, and prior work.',
        '- Assist with experiment design, parameter exploration, and result interpretation across simulation, hardware, or hybrid setups.',
        '- Produce structured summaries, figures, and draft write-ups that accelerate communication without diluting technical rigor.',
        '',
        'The companion agent is designed to sit beside domain experts – not replace them – amplifying their ability to explore, iterate, and communicate complex ideas at research speed.',
      ].join('\n'),
      image:
        'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'AI research assistant visualization',
    },
  ]

  const handleLearnMore = (section: AISectionItem) => {
    setSelectedSection(section)
    onOpen()
  }

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
                      borderRadius={{ base: '16px', md: '24px' }}
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
                          fontSize="xs"
                          fontWeight="bold"
                          color="#f093fb"
                          textTransform="uppercase"
                          letterSpacing="widest"
                        >
                          {section.category}
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
                          fontSize="sm"
                          fontWeight="bold"
                          color="gray.500"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          {section.subtitle}
                        </Text>

                        <Text
                          as={Button}
                          variant="link"
                          fontSize="sm"
                          color="#f093fb"
                          fontWeight="semibold"
                          mt={2}
                          onClick={() => handleLearnMore(section)}
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
        title={selectedSection?.title ?? 'Artificial Intelligence'}
        content={selectedSection?.description}
        category={selectedSection?.category}
        gradient="linear(135deg, #f093fb 0%, #f5576c 100%)"
      />
    </Box>
  )
}
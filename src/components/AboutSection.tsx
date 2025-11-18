import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useBreakpointValue,

  SimpleGrid,
  Divider,
  Flex,
  Stack,
  Image,


} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { GrainEffect } from './GrainEffect'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const abstractParagraphs = [
  `At Nephilim, we envision a future where the convergence of quantum computing, artificial intelligence, and life sciences revolutionizes how we understand and interact with the world.`,
  `Our mission is to accelerate scientific discovery and technological innovation by developing cutting-edge solutions that address humanity's most pressing challenges through the synergy of interdisciplinary teams.`,
]

const teamMembers = [
  {
    name: 'Aaditya Mishra',
    position: 'Chief Scientist',
    bio: 'PhD in Quantum Computing from MIT with 15+ years of experience in AI research and development.',
    affiliations: [{ name: 'University of Birmingham', symbol: '*' }],
    expertise: ['Quantum Computing', 'AI Strategy', 'Research Leadership'],
  },
  {
    name: 'Abhijit Pati',
    position: 'Chief Operating Officer',
    bio: 'Former lead architect at Google AI with expertise in machine learning and distributed systems.',
    affiliations: [{ name: '', symbol: '' }],
    expertise: ['Machine Learning', 'System Architecture', 'Cloud Infrastructure'],
  },
  {
    name: 'Abhishek Purohit',
    position: 'VP of Engineering',
    bio: 'MD and PhD in Computational Biology from Stanford, focused on drug discovery and genomics.',
    affiliations: [{ name: 'University of Glasgow', symbol: '†' }],
    expertise: ['Computational Biology', 'Drug Discovery', 'Genomics'],
  },
  {
    name: 'Aman Singh Katariya',
    position: 'Chief Executive Officer',
    bio: 'Former senior engineer at Microsoft with deep expertise in scalable software solutions.',
    affiliations: [{ name: 'IIT Delhi', symbol: '‡' }],
    expertise: ['Software Engineering', 'Scalability', 'DevOps'],
  },
  {
    name: 'Ojas Singh',
    position: 'Chief Technology Officer',
    bio: 'Former senior engineer at Microsoft with deep expertise in scalable software solutions.',
    affiliations: [{ name: 'Maynooth University', symbol: '§' }],
    expertise: ['Software Engineering', 'Scalability', 'DevOps'],
  },
]

interface AboutSectionProps {
  grainEffectEnabled?: boolean
}

export const AboutSection = ({ grainEffectEnabled = false }: AboutSectionProps) => {
  const [selectedAuthorIndex, setSelectedAuthorIndex] = useState<number | null>(null)
  // selectedMember is not used — we'll use the index to highlight anchors when clicked

  const padding = useBreakpointValue({ base: '10px', md: '15px' })
  const borderRadius = useBreakpointValue({ base: '15px', md: '25px' })
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' })

  const textSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const teamTextSize = useBreakpointValue({ base: 'sm', md: 'md' })


  const paperBg = 'linear(to-b, #fdfddfff, #f8f8cdff)'
  const paperBorder = 'gray.300'

  const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const handleAuthorClick = (index: number) => {
    const anchor = slugify(teamMembers[index].name)
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setSelectedAuthorIndex(index)
  }

  return (
    <Box id="about" pt={padding} bg="transparent" scrollMarginTop={{ base: 'calc(9vh)', md: 'calc(9vh)' }}>
      <Box borderRadius={borderRadius} overflow="hidden" minH="70vh" bgGradient={paperBg} position="relative">
        {/* Grain Effect Overlay */}
        {grainEffectEnabled && (
          <GrainEffect
            intensity={0.5}
            opacity={0.9}
            animate={true}
            speed={1}
          />
        )}
        <Container
          maxW="100%"
          py={{ base: 12, md: 16 }}
          px={{ base: 2, md: 6 }}
        >
          <VStack spacing={{ base: 10, md: 12 }}>
            <Box
              width="100%"
              animation={`${fadeIn} 0.8s ease-out`}
            >
              <Stack
                direction={{ base: 'column', lg: 'row' }}
                spacing={{ base: 8, lg: 12 }}
                align="flex-start"
              >
                <Box w="100%" borderRadius="2xl" p={{ base: 0, md: 0 }} borderWidth="0px" borderColor={paperBorder}>
                  <VStack align="center" spacing={4} mb={6}>
                    {/* removed the Research Bulletin heading per user request */}
                    <Heading as="h2" size={headingSize} color="gray.900" textAlign="center"
                      bgGradient="linear(135deg, #535554ff 0%, #111111ff 20%)"
                      bgClip="text"
                      fontWeight="extrabold">
                      Solving world problems few at a time
                    </Heading>

                    <Divider borderColor="gray.400" />
                  </VStack>

                  <Box mb={6} textAlign="center">
                    <Text fontSize={teamTextSize} fontWeight="semibold" color="gray.900" mb={2}>
                      Authors
                    </Text>

                    <HStack spacing={{ base: 4, md: 6 }} justify="center" align="center" wrap="wrap">
                      {teamMembers.map((member, index) => (
                        <HStack key={member.name} spacing={2} align="center" role="button" tabIndex={0} cursor="pointer" onClick={() => handleAuthorClick(index)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAuthorClick(index) }}>
                          <Text as="span" fontWeight="semibold" _hover={{ textDecoration: 'none' }}>{member.name}</Text>
                          {/* Affiliation symbol for quick visual mapping */}
                          {member.affiliations && member.affiliations.length > 0 && (
                            <Box as="span" aria-hidden="true" fontSize="lg" title={member.affiliations[0].name}>
                              {member.affiliations[0].symbol}
                            </Box>
                          )}
                        </HStack>
                      ))}
                    </HStack>

                    {/* Show affiliation list for authors (primary affiliations) before Nephilim */}
                    <HStack spacing={4} justify="center" mt={2} align="center" wrap="wrap">
                      {Array.from(new Map(teamMembers.flatMap(m => (m.affiliations || []).map(a => [a.name, a]))).values()).map((a) => (
                        <HStack key={a.name} spacing={2} align="center">
                          <Box fontSize="lg">{a.symbol}</Box>
                          <Text fontSize="sm" color="gray.700">{a.name}</Text>
                        </HStack>
                      ))}
                    </HStack>

                    {/* All authors are also affiliated with Nephilim by default */}
                    <HStack spacing={2} align="center" justify="center" w="100%" mt={5}>
                      <Image
                        src="/neplogo.png"
                        alt="Nephilim Logo"
                        boxSize="40px"
                        objectFit="contain"
                        filter="invert(1)"
                      />
                      <Text fontSize="md" color="gray.700">Nephilim Technologies</Text>
                    </HStack>
                  </Box>

                  <Box borderRadius="2xl" p={{ base: 6, md: 8 }} borderWidth="0px">
                    <Flex align="center" justify="center" mb={4}>
                      <Heading
                        as="h3"
                        size="md"
                        color="gray.900"
                        letterSpacing="wide"
                        textTransform="uppercase"
                      >
                        Vision
                      </Heading>
                      {false}
                    </Flex>

                    <VStack align="center" spacing={4}>
                      {abstractParagraphs.map((paragraph) => (
                        <Text key={paragraph.slice(0, 40)} fontSize={textSize} color="gray.900" lineHeight={1.2} textAlign="center">
                          {paragraph}
                        </Text>
                      ))}
                    </VStack>

                    {/* Author detail anchors - plain typographic styling for a PDF feel */}
                    <Box mt={8} textAlign="left">
                      <Divider borderColor="gray.500" />
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={6}>
                        {teamMembers.map((member, idx) => (
                          <Box key={member.name} id={slugify(member.name)} px={{ base: 2, md: 4 }} borderLeftWidth={selectedAuthorIndex === idx ? '3px' : '0px'} borderLeftColor="gray.700" pl={selectedAuthorIndex === idx ? 3 : 0}>
                            <HStack spacing={4} align="center">
                              <Box>
                                <Text fontWeight="semibold">{member.name}</Text>
                              </Box>
                            </HStack>
                            <Text mt={2} color="gray.900">{member.bio}</Text>
                            {member.affiliations && member.affiliations.length > 0 && (
                              <HStack mt={2} spacing={2} align="center">
                                <Text fontSize="sm" color="gray.700">Affiliations:</Text>
                                <HStack spacing={2} wrap="wrap">
                                  {member.affiliations.map((a) => (
                                    <HStack key={a.name} spacing={1} align="center">
                                      <Box fontSize="sm">{a.symbol}</Box>
                                      <Text fontSize="sm" color="gray.700">{a.name}</Text>
                                    </HStack>
                                  ))}
                                  {/* Nephilim is always an affiliation by default */}
                                  <HStack spacing={1} align="center">
                                    <Box fontSize="sm"></Box>
                                    <Text fontSize="sm" color="gray.700">Nephilim Technologies</Text>
                                  </HStack>
                                </HStack>
                              </HStack>
                            )}
                            {member.expertise && member.expertise.length > 0 && (
                              <Text fontSize="sm" color="gray.700" mt={1}>Key Expertise: {member.expertise.join(', ')}</Text>
                            )}
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
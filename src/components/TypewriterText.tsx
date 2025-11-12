import { useEffect, useState } from 'react'
import { Text, Heading, VStack } from '@chakra-ui/react'

interface TypewriterTextProps {
  heading: string
  taglines: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  cursorBlinkSpeed?: number
  headingSize?: string
  textSize?: string
  color?: string
  style?: React.CSSProperties
  textStyle?: React.CSSProperties
  prefersReducedMotion?: boolean
  startDelay?: number
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  heading,
  taglines,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  cursorBlinkSpeed = 500,
  headingSize,
  textSize,
  color = 'white',
  style,
  textStyle,
  prefersReducedMotion = false,
  startDelay = 900
}) => {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const [headingCharIndex, setHeadingCharIndex] = useState(0)
  const [isTypingHeading, setIsTypingHeading] = useState(true)

  // If reduced motion is preferred, show all text at once
  if (prefersReducedMotion) {
    return (
      <VStack spacing={4}>
        <Heading size={headingSize} color={color} style={style}>
          {heading}
        </Heading>
        <Text fontSize={textSize} color={color} style={textStyle}>
          {taglines[0]}
        </Text>
      </VStack>
    )
  }

  // Typing effect for heading
  useEffect(() => {
    if (!isTypingHeading) return
    
    if (headingCharIndex < heading.length) {
      const timeout = setTimeout(() => {
        setHeadingCharIndex(prev => prev + 1)
      }, typingSpeed)
      return () => clearTimeout(timeout)
    } else {
      // Finished typing heading, start tagline animation after a pause
      setTimeout(() => {
        setIsTypingHeading(false)
        setHasStarted(true)
      }, 1000) // 1 second pause after heading completes
    }
  }, [headingCharIndex, isTypingHeading, heading.length, typingSpeed])

  // Handle cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(interval)
  }, [cursorBlinkSpeed])

  // Handle typing and deleting animation
  useEffect(() => {
    if (!hasStarted) return

    const currentTagline = taglines[currentTaglineIndex]
    
    if (isDeleting) {
      // Deleting phase
      if (currentCharIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev - 1)
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next tagline
        setIsDeleting(false)
        setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length)
      }
    } else {
      // Typing phase
      if (currentCharIndex < currentTagline.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1)
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, pause before deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentCharIndex, currentTaglineIndex, isDeleting, taglines, typingSpeed, deletingSpeed, pauseDuration, hasStarted])

  // Only show cursor after typing has started
  const shouldShowCursor = hasStarted && showCursor

  return (
    <VStack spacing={4}>
      <Heading size={headingSize} color={color} style={style} minHeight="1.2em">
        {heading.substring(0, headingCharIndex)}
        {isTypingHeading && shouldShowCursor && <span style={{ marginLeft: '2px' }}>|</span>}
      </Heading>
      <Text fontSize={textSize} color={color} style={textStyle} minHeight="1.5em">
        {taglines[currentTaglineIndex].substring(0, currentCharIndex)}
        {!isTypingHeading && shouldShowCursor && <span style={{ marginLeft: '2px' }}>|</span>}
      </Text>
    </VStack>
  )
}
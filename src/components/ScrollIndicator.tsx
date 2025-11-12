import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useState } from 'react'

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`

// const pulse = keyframes`
//   0% {
//     opacity: 1;
//     transform: scale(1);
//   }
//   50% {
//     opacity: 0.6;
//     transform: scale(1.1);
//   }
//   100% {
//     opacity: 1;
//     transform: scale(1);
//   }
// `

interface ScrollIndicatorProps {
  onClick: () => void
  color?: string
  size?: string | { base: string; md?: string }
}

export const ScrollIndicator = ({
  onClick,
  color = "white",
  size = "40px"
}: ScrollIndicatorProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Box
      position="relative"
      width={typeof size === 'string' ? size : size.base}
      height={typeof size === 'string' ? size : size.base}
      cursor="pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="all 0.3s ease"
      _hover={{ transform: 'scale(1.1)' }}
      sx={{
        '@media (min-width: 768px)': {
          width: typeof size === 'string' ? size : size.md || size.base,
          height: typeof size === 'string' ? size : size.md || size.base,
        }
      }}
    >
      {/* Mouse wheel outer */}
      <Box
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        width="24px"
        height="40px"
        border="2px solid"
        borderColor={color}
        borderRadius="12px"
        opacity={isHovered ? 1 : 0.8}
        transition="opacity 0.3s ease"
      />
      
      {/* Mouse wheel inner (scrolling dot) */}
      <Box
        position="absolute"
        top="8px"
        left="45%"
        transform="translateX(-50%)"
        width="4px"
        height="8px"
        bg={color}
        borderRadius="2px"
        animation={`${bounce} 2s infinite`}
        opacity={isHovered ? 1 : 0.8}
        transition="opacity 0.3s ease"
      />
      
      {/* Pulsing ring effect */}
      {/* <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%"
        height="100%"
        border="2px solid"
        borderColor={color}
        borderRadius="50%"
        opacity={0}
        sx={{
          animation: `${pulse} 2s infinite`,
          animationDelay: '0.5s'
        }}
      /> */}
      
      {/* Arrow indicators */}
      <Box
        position="absolute"
        bottom="-15px"
        left="50%"
        transform="translateX(-50%)"
        width="0"
        height="0"
        borderLeft="6px solid transparent"
        borderRight="6px solid transparent"
        borderTop={`8px solid ${color}`}
        opacity={isHovered ? 1 : 0.6}
        transition="opacity 0.3s ease"
      />
    </Box>
  )
}
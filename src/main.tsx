import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'

const theme = extendTheme({
  fonts: {
    heading: `Outfit, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
    body: `Outfit, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
  },
  styles: {
    global: {
      body: {
        bg: 'white',
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)

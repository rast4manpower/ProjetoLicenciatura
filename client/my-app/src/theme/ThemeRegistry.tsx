import { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

type ThemeRegistryProps = {
  children: ReactNode
}

const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeRegistry

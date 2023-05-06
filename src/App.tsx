import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import AppRoutes from './routes'
import theme from './theme'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App

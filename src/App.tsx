import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import AppRoutes from './routes'
import theme from './theme'

import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={5000}
        >
          <AppRoutes />
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App

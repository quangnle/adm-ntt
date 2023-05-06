import type {} from '@mui/lab/themeAugmentation'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true
        }
      }
    }
  }
})

export default theme

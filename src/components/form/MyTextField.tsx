import { styled, TextField, textFieldClasses } from '@mui/material'

const MyTextField = styled(TextField)(() => ({
  [`&.${textFieldClasses.root}`]: {
    marginBottom: '1rem'
  }
}))

export default MyTextField

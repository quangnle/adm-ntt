import MyTextField from '@/components/form/MyTextField'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { ComponentModuleType } from '..'

const DEFAULT_FORM: Record<string, string> = {
  heading: '',
  subHeading: '',
  background: '',
  content: ''
}

type ContentImageProps = typeof DEFAULT_FORM
const NewsLetterModule: FC<
  ComponentModuleType & { data?: ContentImageProps | null }
> = ({ data, onChange }) => {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const newForm = {
      ...data,
      [name]: value
    }

    onChange && onChange(newForm)
  }
  const [errors, _] = useState<Record<string, string>>({})

  return (
    <Grid container>
      <Grid item xs={12}>
        <MyTextField
          required
          fullWidth
          label="Heading"
          name="heading"
          value={data?.heading}
          placeholder="Enter Heading..."
          onChange={handleChangeInput}
          error={!!errors['heading']}
          helperText={errors['heading']}
        />
        <MyTextField
          required
          fullWidth
          label="Sub Heading"
          name="subHeading"
          value={data?.subHeading}
          placeholder="Enter Sub Heading..."
          onChange={handleChangeInput}
          error={!!errors['subHeading']}
          helperText={errors['hesubHeadingading']}
        />
      </Grid>
    </Grid>
  )
}

export default NewsLetterModule

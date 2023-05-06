import MyTextField from '@/components/form/MyTextField'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'

type ContentImageProps = {
  heading: string
  subHeading: string
  background: string
}

const DEFAULT_FORM: ContentImageProps = {
  heading: '',
  subHeading: '',
  background: ''
}

const NewsLetterModule: FC<{ data?: ContentImageProps }> = ({ data }) => {
  const [form, setForm] = useState(data || DEFAULT_FORM)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const newForm = {
      ...form,
      [name]: value
    }

    setForm(newForm)
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
          value={form.heading}
          placeholder="Enter Heading..."
          onChange={handleChangeInput}
          error={!!errors['heading']}
          helperText={errors['heading']}
        />
        <MyTextField
          required
          fullWidth
          label="Sub Heading"
          name="Sub Heading"
          value={form.subHeading}
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

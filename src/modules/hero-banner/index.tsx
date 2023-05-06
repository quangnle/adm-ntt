import MyTextField from '@/components/form/MyTextField'
import TextEditor from '@/components/form/TextEditor'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'

type HeroBannerProps = {
  subHeading: string
  heading: string
  content: string
  rightImg: string
  background: string
}

const DEFAULT_FORM: HeroBannerProps = {
  subHeading: '',
  heading: '',
  content: '',
  rightImg: '',
  background: ''
}

const HeroBannerModule: FC<{ data?: HeroBannerProps }> = ({ data }) => {
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
          label="Sub Heading"
          name="subHeading"
          value={form.subHeading}
          placeholder="Enter Sub Heading..."
          onChange={handleChangeInput}
          error={!!errors['subHeading']}
          helperText={errors['subHeading']}
        />
        <MyTextField
          required
          fullWidth
          label="Heading"
          name="heading"
          value={form.subHeading}
          placeholder="Enter Heading..."
          onChange={handleChangeInput}
          error={!!errors['heading']}
          helperText={errors['heading']}
        />
        <TextEditor
          value={form.content}
          setValue={(value) => setForm((prev) => ({ ...prev, content: value }))}
          error={!!errors['content']}
          helperText={errors['content']}
        />
      </Grid>
    </Grid>
  )
}

export default HeroBannerModule

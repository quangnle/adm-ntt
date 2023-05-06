import MyTextField from '@/components/form/MyTextField'
import TextEditor from '@/components/form/TextEditor'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'

type ContentImageProps = {
  heading: string
  content: string
  rightImg: string
  background: string
}

const DEFAULT_FORM: ContentImageProps = {
  heading: '',
  content: '',
  rightImg: '',
  background: ''
}

const ContentImageModule: FC<{ data?: ContentImageProps }> = ({ data }) => {
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

export default ContentImageModule

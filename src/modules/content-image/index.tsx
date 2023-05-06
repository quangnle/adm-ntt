import MyTextField from '@/components/form/MyTextField'
import TextEditor from '@/components/form/TextEditor'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { ComponentModuleType } from '..'

const DEFAULT_FORM = {
  heading: '',
  content: '',
  rightImg: '',
  background: ''
}

type ContentImageProps = typeof DEFAULT_FORM

const ContentImageModule: FC<
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
        <TextEditor
          value={data?.content}
          setValue={(value) =>
            onChange && onChange({ ...data, content: value })
          }
          error={!!errors['content']}
          helperText={errors['content']}
        />
      </Grid>
    </Grid>
  )
}

export default ContentImageModule

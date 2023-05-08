import TextEditor from '@/components/form/TextEditor'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { ComponentModuleType } from '..'

const DEFAULT_FORM = {
  content: ''
}

type ContactDetailProps = typeof DEFAULT_FORM
const ContactDetailModule: FC<
  ComponentModuleType & {
    data?: ContactDetailProps | null
  }
> = ({ data, onChange }) => {
  const [errors, _] = useState<Record<string, string>>({})
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
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

export default ContactDetailModule

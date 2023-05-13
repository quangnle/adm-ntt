import TextEditor from '@/components/form/TextEditor'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { ComponentModuleType } from '..'

const DEFAULT_FORM: Record<string, string> = {
  content: ''
}

type AboutUsProps = typeof DEFAULT_FORM
const AboutUsModule: FC<
  ComponentModuleType & {
    data?: AboutUsProps | null
  }
> = ({ data, onChange }) => {
  const [errors, _] = useState<Record<string, string>>({})
  return (
    <Grid container>
      <Grid item xs={12}>
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

export default AboutUsModule

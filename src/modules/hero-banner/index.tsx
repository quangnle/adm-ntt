import MyTextField from '@/components/form/MyTextField'
import TextEditor from '@/components/form/TextEditor'
import UploadImage from '@/components/form/UploadImage'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { ComponentModuleType } from '..'

const DEFAULT_FORM = {
  subHeading: '',
  heading: '',
  content: '',
  rightImg: '',
  background: ''
}

type HeroBannerProps = typeof DEFAULT_FORM
const HeroBannerModule: FC<
  ComponentModuleType & {
    data?: HeroBannerProps | null
  }
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
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <MyTextField
          required
          fullWidth
          label="Sub Heading"
          name="subHeading"
          value={data?.subHeading}
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

      <Grid container item xs={4} spacing={2}>
        <Grid item xs={12}>
          <UploadImage
            value={data?.rightImg}
            onChange={(value) =>
              onChange && onChange({ ...data, rightImg: value })
            }
            folder="upload"
          />
        </Grid>
        <Grid item xs={12}>
          <UploadImage
            value={data?.background}
            onChange={(value) =>
              onChange && onChange({ ...data, background: value })
            }
            folder="upload"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HeroBannerModule

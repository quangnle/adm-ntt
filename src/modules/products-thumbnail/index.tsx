import MyTextField from '@/components/form/MyTextField'
import UploadImage from '@/components/form/UploadImage'
import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { ComponentModuleType } from '..'

const DEFAULT_FORM = {
  title: '',
  description: '',
  background: '',
  content: ''
}

type ProductsThumbnailProps = typeof DEFAULT_FORM
const ProductThumbnails: FC<
  ComponentModuleType & {
    data?: ProductsThumbnailProps | null
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
          label="Title"
          name="title"
          value={data?.title}
          placeholder="Enter Title..."
          onChange={handleChangeInput}
          error={!!errors['title']}
          helperText={errors['title']}
        />
        <MyTextField
          required
          fullWidth
          label="Description"
          name="description"
          value={data?.description}
          placeholder="Enter Description..."
          onChange={handleChangeInput}
          error={!!errors['description']}
          helperText={errors['description']}
          multiline
          rows={5}
        />
      </Grid>

      <Grid container item xs={4} spacing={2}>
        <Grid item xs={12}>
          <UploadImage
            value={data?.background}
            onChange={(value) =>
              onChange && onChange({ ...data, background: value })
            }
            module="upload"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductThumbnails

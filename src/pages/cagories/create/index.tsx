import categoryService from '@/api/category'
import MyTextField from '@/components/form/MyTextField'
import TextEditor from '@/components/form/TextEditor'
import UploadImage from '@/components/form/UploadImage'
import { ICategory } from '@/constants/types'
import { mergePattern } from '@/utils'
import { LoadingButton } from '@mui/lab'
import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const DEFAULT_FORM = {
  id: 0,
  title: '',
  thumbnail: '',
  description: '',
  background: '',
  link_url: '',
  content: ''
}

export default function CreateCategory({
  data,
  onSuccess
}: {
  data: ICategory | null
  onSuccess?: () => void
}) {
  const [isCreating, setIsCreating] = useState(false)

  const [form, setForm] = useState<typeof DEFAULT_FORM>(
    data
      ? (mergePattern(DEFAULT_FORM, {
          ...data
        }) as typeof DEFAULT_FORM)
      : { ...DEFAULT_FORM }
  )
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newForm = {
      ...form,
      [name]: value
    }
    setForm(newForm)
  }

  const handleSubmitForm = async () => {
    try {
      setIsCreating(true)
      const payload = { ...form }
      const request = payload.id
        ? categoryService.update
        : categoryService.create

      const { data } = await request(payload)
      if (data) {
        onSuccess && onSuccess()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Stack p={2}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {form?.id ? 'Update' : 'Create'} Group
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <label>Thumbnail</label>
          <UploadImage
            value={form?.thumbnail}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, thumbnail: value }))
            }
            module="upload"
          />
        </Grid>
        <Grid item xs={5}>
          <label>Background</label>
          <UploadImage
            value={form?.background}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, background: value }))
            }
            module="upload"
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            fullWidth
            label="Title"
            name="title"
            value={form?.title}
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            fullWidth
            label="Link Url"
            name="link_url"
            value={form?.link_url}
            onChange={handleChangeInput}
          />
        </Grid>

        <Grid item xs={12}>
          <MyTextField
            fullWidth
            label="Description"
            name="description"
            value={form?.description}
            onChange={handleChangeInput}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            value={form?.content}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, content: value }))
            }
          />
        </Grid>
      </Grid>

      <LoadingButton
        variant="contained"
        sx={{ mx: 'auto', mt: 6 }}
        onClick={handleSubmitForm}
        loading={isCreating}
      >
        {form?.id ? 'Update' : 'Create'}
      </LoadingButton>
    </Stack>
  )
}

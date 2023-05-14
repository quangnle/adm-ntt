import productService from '@/api/product'
import MyTextField from '@/components/form/MyTextField'
import TextEditor from '@/components/form/TextEditor'
import UploadImage from '@/components/form/UploadImage'
import { IProduct } from '@/constants/types'
import { mergePattern } from '@/utils'
import { LoadingButton } from '@mui/lab'
import { Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const DEFAULT_FORM = {
  id: 0,
  title: '',
  image: '',
  link: '',
  description: '',
  content: '',
  priority: 1,
  group_id: 0
}

export default function CreateProduct({
  data,
  groupId,
  onSuccess
}: {
  data: IProduct | null
  groupId?: number
  onSuccess?: () => void
}) {
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState<typeof DEFAULT_FORM>(
    data
      ? (mergePattern(DEFAULT_FORM, {
          ...data,
          link: data?.link || ''
        }) as typeof DEFAULT_FORM)
      : { ...DEFAULT_FORM, group_id: groupId || 0 }
  )

  console.log(form)

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
      const request = payload.id ? productService.update : productService.create

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
        {form?.id ? 'Update' : 'Create'} Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <UploadImage
            value={form?.image}
            onChange={(value) => setForm((prev) => ({ ...prev, image: value }))}
            module="upload"
          />
        </Grid>
        <Grid container item xs={7}>
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
              label="Link"
              name="link"
              value={form?.link}
              onChange={handleChangeInput}
            />
          </Grid>
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

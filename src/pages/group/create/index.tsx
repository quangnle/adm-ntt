import groupService from '@/api/group'
import CustomSelect from '@/components/form/CustomSelect'
import MyTextField from '@/components/form/MyTextField'
import TextEditor from '@/components/form/TextEditor'
import UploadImage from '@/components/form/UploadImage'
import { ICategory, IGroup } from '@/constants/types'
import { mergePattern } from '@/utils'
import { LoadingButton } from '@mui/lab'
import {
  Grid,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

const DEFAULT_FORM = {
  id: 0,
  title: '',
  image: '',
  label: '',
  description: '',
  label_html: '',
  category_id: 0
}

export default function CreateGroup({
  data,
  onSuccess,
  categoryList
}: {
  data: IGroup | null
  onSuccess?: () => void
  categoryList: ICategory[]
}) {
  const [isCreating, setIsCreating] = useState(false)
  const [categoryId, setCategoryId] = useState(0)

  const [form, setForm] = useState<typeof DEFAULT_FORM>(
    data
      ? (mergePattern(DEFAULT_FORM, {
          ...data,
          category_id: categoryId
        }) as typeof DEFAULT_FORM)
      : { ...DEFAULT_FORM, category_id: categoryId || 0 }
  )
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newForm = {
      ...form,
      [name]: value
    }
    setForm(newForm)
  }

  useEffect(() => {
    data && setCategoryId(data.category_id)
  }, [data])

  const handleSubmitForm = async () => {
    try {
      setIsCreating(true)
      const payload = { ...form, category_id: categoryId }
      const request = payload.id ? groupService.update : groupService.create

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
              label="Label"
              name="label"
              value={form?.label}
              onChange={handleChangeInput}
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
          <CustomSelect
            label="Category"
            value={categoryId}
            onChange={(event: SelectChangeEvent<unknown>) => {
              setCategoryId(parseInt(event.target.value as string) || 0)
            }}
            sx={{ width: 400 }}
          >
            <MenuItem value={0}>-- Choose Category --</MenuItem>
            {categoryList?.map((gr) => (
              <MenuItem key={gr.id} value={gr.id}>
                {gr?.title}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            value={form?.label_html}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, label_html: value }))
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

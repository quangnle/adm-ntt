import variableService from '@/api/variable'
import MyTextField from '@/components/form/MyTextField'
import { mergePattern } from '@/utils'
import { LoadingButton } from '@mui/lab'
import { Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const DEFAULT_FORM = {
  id: 0,
  name: '',
  value: '',
  lang: '',
  group: ''
}

type IForm = {
  id: number
  name: string
  value: string
  lang: string
  group: string
  created_at: string
  updated_at: string
}

export default function CreatePhrases({
  data,
  onSuccess
}: {
  data: IForm | null
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
        ? variableService.update
        : variableService.create

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
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <MyTextField
              fullWidth
              label="Name"
              name="name"
              value={form?.name}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              fullWidth
              label="Value"
              name="value"
              value={form?.value}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              fullWidth
              label="Lang"
              name="lang"
              value={form?.lang}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              fullWidth
              label="Group"
              name="group"
              value={form?.group}
              onChange={handleChangeInput}
            />
          </Grid>
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

import configService from '@/api/config'
import MyTextField from '@/components/form/MyTextField'
import UploadImage from '@/components/form/UploadImage'
import { ConfigType } from '@/constants/types'
import { LoadingButton } from '@mui/lab'
import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const DEFAULT_FORM = {
  source: '',
  alt: ''
}

export default function ChangeLogo({ data }: { data: ConfigType }) {
  const [form, setForm] = useState<typeof DEFAULT_FORM>(
    (data?.value as typeof DEFAULT_FORM) || DEFAULT_FORM
  )
  const [creating, setCreating] = useState(false)
  const handleSubmitForm = async () => {
    try {
      setCreating(true)

      await configService.updateConfigWithKey(data?.id, {
        value: form
      })
    } catch (error) {
      console.log(error)
    } finally {
      setCreating(false)
    }
  }
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Change Logo</Typography>
      </Stack>
      <Box flex={1}>
        <UploadImage
          value={form?.source}
          onChange={(value) => setForm((prev) => ({ ...prev, source: value }))}
          module="upload"
          mode="contain"
        />
        <MyTextField
          fullWidth
          sx={{ mt: 2 }}
          label="Alternative Text"
          value={form?.alt}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, alt: event.target.value }))
          }
        />
        <LoadingButton
          variant="contained"
          size="large"
          onClick={handleSubmitForm}
          loading={creating}
          sx={{ marginTop: 'auto', width: '100%' }}
        >
          Update
        </LoadingButton>
      </Box>
    </>
  )
}

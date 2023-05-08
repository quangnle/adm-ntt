import ComponentModule from '@/modules'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import configService from '@/api/config'

interface IDetailContact {
  content: string
}

export default function ContactPage() {
  const [detail, setDetail] = useState<IDetailContact | null>(null)
  const [configId, setConfigId] = useState<number | null>(null)
  const handleSubmitForm = async () => {
    try {
      if (!configId) return
      const { data } = await configService.updateConfigWithKey(configId, {
        value: {
          content: detail?.content
        }
      })
      if (data) {
        setDetail({ content: data?.value?.content || '' })
      }
    } catch (error: unknown) {
      console.log(error as Error)
    }
  }
  const handleChangeContent = async (data: IDetailContact) => {
    setDetail(data)
  }
  const getContentDetail = async () => {
    try {
      const { data } = await configService.getConfigWithKey('contact-detail')
      setConfigId(Number(data?.id) || null)
      const value = JSON.parse(data.value) as IDetailContact
      if (value) {
        setDetail(value)
      }
    } catch (error: unknown) {
      console.log(error as Error)
    }
  }
  useEffect(() => {
    getContentDetail()
  }, [])
  return (
    <Stack sx={{ width: '100%', pt: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" mb={2}>
          Contact
        </Typography>

        <LoadingButton
          variant="contained"
          size="large"
          onClick={handleSubmitForm}
          loading={false}
        >
          Update
        </LoadingButton>
      </Stack>

      <ComponentModule
        component="ContactDetailModule"
        data={detail}
        onChange={(data: IDetailContact) => handleChangeContent(data)}
      />
    </Stack>
  )
}

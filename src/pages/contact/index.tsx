import ComponentModule from '@/modules'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import configService from '@/api/config'
import { IItemValues } from '@/modules/values-customer'

interface IDetailContact {
  heading: string
  description: string
  formHeading: string
  formDescription: string
  items: IItemValues[]
}

let DEFAULT_FORM: IDetailContact = {
  description: '',
  heading: '',
  formHeading: '',
  formDescription: '',
  items: []
}

export default function ContactPage() {
  const [detail, setDetail] = useState<IDetailContact>(DEFAULT_FORM)
  const [configIdDetail, setConfigDetailId] = useState<number | null>(null)
  const handleSubmitForm = async () => {
    try {
      if (!configIdDetail) return
      await Promise.all([
        configService.updateConfigWithKey(configIdDetail, {
          value: {
            heading: detail.heading,
            description: detail.description,
            formHeading: detail.formHeading,
            formDescription: detail.formDescription,
            items: detail.items
          }
        })
      ])
    } catch (error: unknown) {
      console.log(error as Error)
    }
  }

  const handleChangeContent = async (data: IDetailContact) => {
    setDetail((prev) => {
      return {
        ...prev,
        heading: data.heading,
        description: data.description,
        formHeading: data.formHeading,
        formDescription: data.formDescription
      }
    })
  }

  const getContentDetail = async () => {
    try {
      const [resContactDetail] = await Promise.all([
        configService.getConfigWithKey('contact-detail')
      ])
      const contentDetail = JSON.parse(resContactDetail?.data.value)
      if (typeof contentDetail !== 'undefined') {
        DEFAULT_FORM = contentDetail
      }
      setConfigDetailId(Number(resContactDetail?.data?.id) || null)
      setDetail(DEFAULT_FORM)
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
        component="ContactDetail"
        data={detail as unknown as Record<string, string>}
        onChange={(data: unknown) =>
          handleChangeContent(data as unknown as IDetailContact)
        }
      />
    </Stack>
  )
}

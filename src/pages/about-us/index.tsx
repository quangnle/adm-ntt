import ComponentModule from '@/modules'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import configService from '@/api/config'
import { IItemValues } from '@/modules/values-customer'

interface IDetailContact {
  content?: string
  heading: string
  items: IItemValues[]
}

const DEFAULT_FORM: IDetailContact = {
  content: '',
  heading: '',
  items: []
}

export default function AboutUsPage() {
  const [detail, setDetail] = useState<IDetailContact>(DEFAULT_FORM)
  const [configIdDetail, setConfigDetailId] = useState<number | null>(null)
  const [configIdValue, setConfigValueId] = useState<number | null>(null)
  const handleSubmitForm = async () => {
    try {
      if (!configIdDetail || !configIdValue) return
      await Promise.all([
        configService.updateConfigWithKey(configIdDetail, {
          value: {
            content: detail?.content
          }
        }),
        configService.updateConfigWithKey(configIdValue, {
          value: {
            heading: detail.heading,
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
        content: data.content || '',
        heading: data.heading || ''
      }
    })
  }
  const getContentDetail = async () => {
    try {
      const [resAboutUsDetail, resValuesCustomer] = await Promise.all([
        configService.getConfigWithKey('about-us-detail'),
        configService.getConfigWithKey('about-us-values-customer')
      ])
      const contentDetail = JSON.parse(resAboutUsDetail?.data.value)
      if (typeof contentDetail !== 'undefined') {
        DEFAULT_FORM.content = contentDetail.content
      }
      const contentValuesCustomer = JSON.parse(resValuesCustomer?.data.value)
      if (typeof contentValuesCustomer !== 'undefined') {
        DEFAULT_FORM.heading = contentValuesCustomer.heading
        DEFAULT_FORM.items = contentValuesCustomer.items
      }
      setConfigDetailId(Number(resAboutUsDetail?.data?.id) || null)
      setConfigValueId(Number(resValuesCustomer?.data?.id) || null)
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
          About Us
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
        data={detail as unknown as Record<string, string>}
        onChange={(data: unknown) =>
          handleChangeContent(data as unknown as IDetailContact)
        }
      />
      <ComponentModule
        component="ValuesToCustomer"
        data={detail as unknown as Record<string, string>}
        onChange={(data: unknown) =>
          handleChangeContent(data as unknown as IDetailContact)
        }
      />
    </Stack>
  )
}

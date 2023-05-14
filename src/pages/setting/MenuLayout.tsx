import { LoadingButton } from '@mui/lab'
import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import configService from '@/api/config'
import MyTextField from '@/components/form/MyTextField'

interface IImage {
  alt: string
  source: string
}

interface IMenuChild {
  path: string
  title: string
}

interface IMenuFooterItem {
  head: string
  childs: IMenuChild[]
}

interface IMenuNavbarItem {
  path: string
  title: string
  childs: IMenuChild
}

interface IFormatLayoutForm {
  logo: IImage
  footer: {
    menu: IMenuFooterItem[]
    background: IImage
    description: string
  }
  navbar: {
    menu: IMenuNavbarItem[]
  }
}

let DEFAULT_FORM: IFormatLayoutForm = {
  logo: {
    alt: '',
    source: ''
  },
  footer: {
    menu: [],
    background: {
      alt: '',
      source: ''
    },
    description: ''
  },
  navbar: {
    menu: []
  }
}

export default function MenuLayout() {
  const [formJSON, setForm] = useState<string>(
    JSON.stringify(DEFAULT_FORM, null, 2)
  )
  const [configIdLayout, setConfigLayoutId] = useState<number | null>(null)
  const [configIdNav, setConfigNavId] = useState<number | null>(null)
  const [configIdFooter, setConfigFooterId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setForm(value)
  }

  const getConfigSettings = async () => {
    try {
      const [configLayoutRes, configNavRes, configFooterRes] =
        await Promise.all([
          configService.getConfigWithKey('layout'),
          configService.getConfigWithKey('navbar_menus'),
          configService.getConfigWithKey('footer_menus')
        ])
      const configLayoutDetail = JSON.parse(
        configLayoutRes?.data.value
      ) as IFormatLayoutForm
      if (typeof configLayoutDetail !== 'undefined') {
        DEFAULT_FORM = configLayoutDetail
      }
      setConfigLayoutId(Number(configLayoutRes?.data?.id) || null)
      setConfigNavId(Number(configNavRes?.data?.id) || null)
      setConfigFooterId(Number(configFooterRes?.data?.id) || null)
      setForm(JSON.stringify(DEFAULT_FORM, null, 2))
    } catch (error: unknown) {
      console.log(error as Error)
    }
  }
  useEffect(() => {
    getConfigSettings()
  }, [])

  const handleSubmitForm = async () => {
    try {
      setLoading(true)
      if (!configIdLayout || !configIdNav || !configIdFooter) return
      const form = JSON.parse(formJSON) as IFormatLayoutForm
      const [layoutRes] = await Promise.all([
        configService.updateConfigWithKey(configIdLayout, {
          value: form
        }),
        configService.updateConfigWithKey(configIdNav, {
          value: form?.navbar || {}
        }),
        configService.updateConfigWithKey(configIdFooter, {
          value: form?.footer || {}
        })
      ])

      if (layoutRes?.data) {
        setIsSuccess(true)
      }
    } catch (error: unknown) {
      console.log(error as Error)
      alert('Invalid JSON Format !')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Typography variant="h5" mb={4}>
        Menu Layout
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <MyTextField
            required
            fullWidth
            label="JSON Layout"
            name="JSON Layout"
            value={formJSON}
            placeholder="Enter Layout Form in JSON Format..."
            onChange={handleChangeInput}
            multiline
            rows={20}
          />
        </Grid>
      </Grid>

      {isSuccess && (
        <Typography color="#28a745">
          Configurations updated successfully
        </Typography>
      )}

      <LoadingButton
        variant="contained"
        size="large"
        onClick={handleSubmitForm}
        loading={loading}
        sx={{ mt: 2, mb: 2, width: '100%' }}
      >
        Update
      </LoadingButton>
    </div>
  )
}

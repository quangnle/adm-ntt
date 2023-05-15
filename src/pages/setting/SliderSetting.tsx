import { LoadingButton } from '@mui/lab'
import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import configService from '@/api/config'
import MyTextField from '@/components/form/MyTextField'

interface ISliderResponsive {
  breakpoint: number
  from: number
  settings: {
    slidesToShow: number
  }
}

interface ISliderCustom {
  className: string
  dots: boolean
  infinite: boolean
  speed: number
  slidesToShow: number
  responsive: ISliderResponsive[]
}

let DEFAULT_FORM: ISliderCustom = {
  className: '',
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  responsive: []
}

export default function SliderSetting() {
  const [formJSON, setForm] = useState<string>(
    JSON.stringify(DEFAULT_FORM, null, 2)
  )
  const [configSliderId, setConfigSliderId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setForm(value)
  }

  const getConfigSettings = async () => {
    try {
      const [configLayoutRes] = await Promise.all([
        configService.getConfigWithKey('slider-setting')
      ])
      const configLayoutDetail = JSON.parse(
        configLayoutRes?.data.value
      ) as ISliderCustom
      if (typeof configLayoutDetail !== 'undefined') {
        DEFAULT_FORM = configLayoutDetail
      }
      setConfigSliderId(Number(configLayoutRes?.data?.id) || null)
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
      if (!configSliderId) return
      const form = JSON.parse(formJSON) as ISliderCustom
      const [layoutRes] = await Promise.all([
        configService.updateConfigWithKey(configSliderId, {
          value: form
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
        Slider Setting
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <MyTextField
            required
            fullWidth
            label="JSON Slider Setting"
            name="JSON Slider Setting"
            value={formJSON}
            placeholder="Enter Slider Setting in JSON Format..."
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

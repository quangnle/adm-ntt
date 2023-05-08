import MyTextField from '@/components/form/MyTextField'
import { LoadingButton } from '@mui/lab'
import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { validateUpdateConfig } from './validate'
import configService from '@/api/config'
import { ConfigType } from '@/constants/types'
import { convertErrorYup } from '@/utils'
import { ValidationError } from 'yup'

const DEFAULT_FORM = {
  company_name: '',
  address: '',
  website: '',
  phone: '',
  email: ''
}

export default function UpdateConfig({ data }: { data: ConfigType }) {
  const [form, setForm] = useState<typeof DEFAULT_FORM>(
    (data?.value as typeof DEFAULT_FORM) || DEFAULT_FORM
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [creating, setCreating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitForm = async () => {
    try {
      setCreating(true)

      await validateUpdateConfig.validate(form, { abortEarly: false })

      const res = await configService.updateConfigWithKey(data?.id, {
        value: form
      })
      if (res) {
        setIsSuccess(true)
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        setErrors(convertErrorYup(error as ValidationError))
      } else {
        console.log(error)
      }
    } finally {
      setCreating(false)
    }
  }

  return (
    <>
      <Typography variant="h5" mb={4}>
        Website config
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MyTextField
            required
            fullWidth
            label="Company Name"
            name="company_name"
            value={form?.company_name}
            placeholder="Enter Heading..."
            onChange={handleChangeInput}
            error={!!errors['company_name']}
            helperText={errors['company_name']}
          />
        </Grid>
        <Grid item xs={6}>
          <MyTextField
            required
            fullWidth
            label="Website"
            name="website"
            value={form?.website}
            placeholder="Enter Webiste..."
            onChange={handleChangeInput}
            error={!!errors['website']}
            helperText={errors['website']}
          />
        </Grid>
        <Grid item xs={6}>
          <MyTextField
            required
            fullWidth
            label="Phone number"
            name="phone"
            value={form?.phone}
            placeholder="Enter Phone number..."
            onChange={handleChangeInput}
            error={!!errors['phone']}
            helperText={errors['phone']}
          />
        </Grid>
        <Grid item xs={6}>
          <MyTextField
            required
            fullWidth
            label="Email"
            name="email"
            value={form?.email}
            placeholder="Enter Email..."
            onChange={handleChangeInput}
            error={!!errors['email']}
            helperText={errors['email']}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            required
            fullWidth
            label="Address"
            name="address"
            value={form?.address}
            placeholder="Enter Address..."
            onChange={handleChangeInput}
            error={!!errors['address']}
            helperText={errors['address']}
          />
        </Grid>
      </Grid>

      {isSuccess && (
        <Typography color="#28a745" mb={2}>
          Config updated successfuly
        </Typography>
      )}

      <LoadingButton
        variant="contained"
        size="large"
        onClick={handleSubmitForm}
        loading={creating}
      >
        Update
      </LoadingButton>
    </>
  )
}

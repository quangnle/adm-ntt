import AuthServices from '@/api/auth'
import MyTextField from '@/components/form/MyTextField'
import { LoadingButton } from '@mui/lab'
import { Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { useState } from 'react'
import { validateChangePassword } from './validate'
import { ValidationError } from 'yup'
import { convertErrorYup } from '@/utils'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const DEFAULT_FORM = {
  password: '',
  confirmPassword: ''
}

export default function ChangePassword() {
  const [form, setForm] = useState<typeof DEFAULT_FORM>(DEFAULT_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitForm = async () => {
    try {
      setLoading(true)

      await validateChangePassword.validate(form, { abortEarly: false })

      const { data } = await AuthServices.changePassword({
        password: form.password
      })
      if (data) {
        setIsSuccess(true)
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        setErrors(convertErrorYup(error as ValidationError))
      } else {
        console.log(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Typography variant="h5" mb={4}>
        Change Password
      </Typography>

      <Grid>
        <Grid item xs={12}>
          <MyTextField
            required
            fullWidth
            label="Password"
            name="password"
            value={form?.password}
            placeholder="Enter Password..."
            onChange={handleChangeInput}
            error={!!errors['password']}
            helperText={errors['password']}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            value={form?.confirmPassword}
            placeholder="Enter Confirm Password..."
            onChange={handleChangeInput}
            error={!!errors['confirmPassword']}
            helperText={errors['confirmPassword']}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      {isSuccess && (
        <Typography color="#28a745">Password updated successfuly</Typography>
      )}

      <LoadingButton
        variant="contained"
        size="large"
        onClick={handleSubmitForm}
        loading={loading}
        sx={{ marginTop: 'auto' }}
      >
        Update
      </LoadingButton>
    </>
  )
}

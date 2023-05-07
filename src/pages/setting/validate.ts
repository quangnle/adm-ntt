import * as yup from 'yup'

export const validateChangePassword = yup.object({
  password: yup
    .string()
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .matches(/[a-zA-Z1-9]/, 'Password can only contain Latin letters.')
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .test(
      'matchPassword',
      'Password and confirm password fields value must be matched ',
      function (value) {
        return value === this.parent.password
      }
    )
})

export const validateUpdateConfig = yup.object({
  company_name: yup.string().required(),
  address: yup.string().required(),
  website: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required()
})

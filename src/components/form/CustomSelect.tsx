import React, { FC } from 'react'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps
} from '@mui/material'

import { FormComponentError } from './type'

type CustomSelect = SelectProps &
  FormComponentError & {
    fullWidth?: boolean
  }

const CustomSelect: FC<CustomSelect> = ({ error, helperText, ...props }) => {
  return (
    <FormControl fullWidth={props.fullWidth}>
      <InputLabel shrink={true} id={props?.labelId}>
        {props?.label}
      </InputLabel>
      <Select notched={true} displayEmpty {...props}>
        {props.children}
      </Select>

      {<FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSelect

import React from 'react'
import { TextField } from '@mui/material'

interface CustomTextFieldProps {
  children?: React.ReactNode | string
  variant?: 'standard' | 'outlined' | 'filled'
  placeholder?: string
  sx?: React.CSSProperties
  label?: string
  style?: React.CSSProperties
  InputProps?: object
  width?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  helperText?: string
  default?: string
  size?: 'medium' | 'small'
  type?: string
  multiline?: boolean
  value?: string
}

const CustomTextField: React.FC<CustomTextFieldProps> = (
  props: CustomTextFieldProps
) => {
  return <TextField {...props} hiddenLabel fullWidth />
}

export default CustomTextField

import { ERROR_MESSAGES, PasswordValidationMessage } from './constants'
import { SignInDetails, SignUpDetails } from './types'

export const MIN_LENGTH = 8
export const SPECIAL_CHARS_REGEX = /[!@#$%^&*(),.?":{}|<>]/
export const NUMBER_REGEX = /\d/
export const LOWERCASE_REGEX = /[a-z]/
export const UPPERCASE_REGEX = /[A-Z]/
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
export const numericRegex = /^\d*$/
export const alphabetRegex = /^[A-Za-z\s]+$/

export const validateEmailFormat = (email: string): boolean => {
  return emailRegex.test(email)
}

export const validateEmail = (value: string): string => {
  if (!validateEmailFormat(value) && value.length) {
    return ERROR_MESSAGES.email
  }
  return ''
}

export const evaluatePasswordStrength = (password: string): string => {
  if (password.length < MIN_LENGTH) {
    return PasswordValidationMessage.MESSAGE_MIN_LENGTH
  }

  if (!SPECIAL_CHARS_REGEX.test(password)) {
    return PasswordValidationMessage.MESSAGE_SPECIAL_CHARS_REGEX
  }

  if (!NUMBER_REGEX.test(password)) {
    return PasswordValidationMessage.MESSAGE_NUMBER_REGEX
  }

  if (!LOWERCASE_REGEX.test(password)) {
    return PasswordValidationMessage.MESSAGE_LOWERCASE_REGEX
  }

  if (!UPPERCASE_REGEX.test(password)) {
    return PasswordValidationMessage.MESSAGE_UPPERCASE_REGEX
  }

  return ''
}

export const validateFullNameFormat = (name: string): boolean => {
  return alphabetRegex.test(name)
}

export const validateFullName = (value: string): string => {
  if (!validateFullNameFormat(value)) {
    return ERROR_MESSAGES.fullname
  }
  return ''
}

export const validateField = (
  field: keyof SignInDetails | keyof SignUpDetails,
  value: string
): string => {
  switch (field) {
    case 'fullname':
      return validateFullName(value)
    case 'email':
      return validateEmail(value)
    case 'password':
      return evaluatePasswordStrength(value)
    default:
      return ''
  }
}

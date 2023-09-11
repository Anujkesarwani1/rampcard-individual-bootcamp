import { ERROR_MESSAGES, PasswordValidationMessage } from 'utils/constants'
import {
  evaluatePasswordStrength,
  validateEmailFormat,
  validateField,
  validateFullName,
  validateFullNameFormat,
} from 'utils/credentials'
import { SignInDetails } from 'utils/types'

describe('validateEmailFormat', () => {
  test('it should return true for valid email format', () => {
    const validEmails = ['test@example.com', 'infotest@test.com']

    validEmails.forEach((email) => {
      expect(validateEmailFormat(email)).toBe(true)
    })
  })

  test('it should return false for invalid email format', () => {
    const invalidEmails = ['test', 'test@', 'test@example']

    invalidEmails.forEach((email) => {
      expect(validateEmailFormat(email)).toBe(false)
    })
  })
})

describe('evaluatePasswordStrength', () => {
  test('it should return empty string for a strong password', () => {
    const strongPasswords = ['Abcdefg1!', 'P@ssw0rd!', 'S3cur3P@ss!']

    strongPasswords.forEach((password) => {
      expect(evaluatePasswordStrength(password)).toBe('')
    })
  })

  test('it should return error message for a password length if it is less than 8', () => {
    const passwords = ['passwor', 'test']

    passwords.forEach((password) => {
      expect(evaluatePasswordStrength(password)).toContain(
        PasswordValidationMessage.MESSAGE_MIN_LENGTH
      )
    })
  })

  test('it should return error message for a password missing special characters', () => {
    const passwords = ['Password1', 'Abcdefg1', 'password1', 'Abcdefg1']

    passwords.forEach((password) => {
      expect(evaluatePasswordStrength(password)).toContain(
        PasswordValidationMessage.MESSAGE_SPECIAL_CHARS_REGEX
      )
    })
  })

  test('it should return error message for a password missing numbers', () => {
    const passwords = ['Password!', 'Abcdefg!', 'password!', 'Abcdefg!']

    passwords.forEach((password) => {
      expect(evaluatePasswordStrength(password)).toContain(
        PasswordValidationMessage.MESSAGE_NUMBER_REGEX
      )
    })
  })

  test('it should return error message for a password missing lowercase letters', () => {
    const passwords = ['PASSWORD1!', 'ABCDEFG1!', '12345678!', '1!@#$%^&*()']

    passwords.forEach((password) => {
      expect(evaluatePasswordStrength(password)).toContain(
        PasswordValidationMessage.MESSAGE_LOWERCASE_REGEX
      )
    })
  })

  test('it should return error message for a password missing uppercase letters', () => {
    const passwords = ['password1!', 'abcdefg1!', 'a12345678!', 'a!1#$%^&*()']

    passwords.forEach((password) => {
      expect(evaluatePasswordStrength(password)).toContain(
        PasswordValidationMessage.MESSAGE_UPPERCASE_REGEX
      )
    })
  })
})

describe('Validation Functions', () => {
  test('validateFirstName should return an error message for an invalid first name', () => {
    const invalidFirstName = '1234'
    const errorMessage = validateFullName(invalidFirstName)
    expect(errorMessage).toBe(ERROR_MESSAGES.fullname)
  })

  test('validateFirstName should return an empty string for a valid first name', () => {
    const validFirstName = 'John'
    const errorMessage = validateFullName(validFirstName)
    expect(errorMessage).toBe('')
  })
})

describe('validateFullnameFormat', () => {
  test('it should return true for valid names', () => {
    const validNames = [
      'Anuj kesarwani',
      'Aman Chaurasia',
      'Avi Srivastava',
      'Chandrakant Yadav',
    ]

    validNames.forEach((name) => {
      expect(validateFullNameFormat(name)).toBe(true)
    })
  })

  test('it should return false for invalid names', () => {
    const invalidNames = ['123Anuj', 'Aman123', '!Avi', 'Chandrakant@']

    invalidNames.forEach((name) => {
      expect(validateFullNameFormat(name)).toBe(false)
    })
  })
})

describe('validateFieldForLogIn', () => {
  test('it should return an empty string for a valid email', () => {
    const validEmail = 'user@example.com'
    const result = validateField('email', validEmail)
    expect(result).toBe('')
  })

  test('it should return an error message for an invalid email', () => {
    const invalidEmail = 'invalid-email'
    const result = validateField('email', invalidEmail)
    expect(result).toBe(ERROR_MESSAGES.email)
  })

  test('it should return an empty string for a strong password', () => {
    const strongPassword = 'StrongPassword123!'
    const result = validateField('password', strongPassword)
    expect(result).toBe('')
  })

  test('it should return an error message for a weak password', () => {
    const weakPassword = 'weak'
    const result = validateField('password', weakPassword)
    expect(result).toBe(evaluatePasswordStrength(weakPassword))
  })

  test('it should return an empty string for other fields', () => {
    const otherField = 'someValue'
    const result = validateField(
      'otherField' as keyof SignInDetails,
      otherField
    )
    expect(result).toBe('')
  })
})

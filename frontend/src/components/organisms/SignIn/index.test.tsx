import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignIn, { SignInProps } from '.'
import { Constants, ERROR_MESSAGES, SIGN_IN } from 'utils/constants'

const mockProps: SignInProps = {
  header: SIGN_IN.HEADER,
  onContinue: jest.fn(),
  onGoogleClick: jest.fn(),
  onForget: jest.fn,
}

describe('SignIn', () => {
  test('it should show error message for invalid email format', async () => {
    render(<SignIn {...mockProps} />)

    const emailInput = screen.getByPlaceholderText(
      Constants.EMAIL_PLACEHOLDER
    ) as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    await waitFor(() => {
      const errorMessage = screen.getByText(ERROR_MESSAGES.email)
      expect(errorMessage).toBeInTheDocument()
    })
  })

  test('it should handle input changes', () => {
    render(<SignIn {...mockProps} />)

    const emailInput = screen.getByPlaceholderText(
      Constants.EMAIL_PLACEHOLDER
    ) as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText(
      Constants.PASSWORD_PLACEHOLDER
    ) as HTMLInputElement
    expect(emailInput.value).toBe('')
    expect(passwordInput.value).toBe('')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  test('it should toggle password visibility using the visibility icon', () => {
    render(<SignIn {...mockProps} />)

    const passwordField = screen.getByPlaceholderText(
      Constants.PASSWORD_PLACEHOLDER
    )
    expect(passwordField).toHaveAttribute('type', 'password')

    const visibilityIcon = screen.getByTestId('toggle-password-visibility-icon')
    fireEvent.click(visibilityIcon)
    expect(passwordField).toHaveAttribute('type', 'text')

    fireEvent.click(visibilityIcon)
    expect(passwordField).toHaveAttribute('type', 'text')
  })
})

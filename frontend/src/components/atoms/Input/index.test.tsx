import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomTextField from '.'
import '@testing-library/jest-dom/extend-expect'
import { Constants } from 'utils/constants'

describe('CustomTextField', () => {
  test('it should render with provided placeholder', () => {
    render(<CustomTextField placeholder={Constants.EMAIL_PLACEHOLDER} />)

    const placeholderElement = screen.getByPlaceholderText(
      Constants.EMAIL_PLACEHOLDER
    )
    expect(placeholderElement).toBeInTheDocument()
  })

  test('it should update the input value when onChange is called', () => {
    render(<CustomTextField />)

    const inputElement = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    expect(inputElement.value).toBe('New Value')
  })
})

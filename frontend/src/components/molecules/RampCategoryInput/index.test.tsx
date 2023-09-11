import { RAMP_CATEGORY_INPUT } from 'utils/constants'
import RampCategoryInput, { RampCategoryInputProps } from '.'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const mockProps: RampCategoryInputProps = {
  label: RAMP_CATEGORY_INPUT.LABEL,
  placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
  iconVisible: true,
  labelColor: 'color',
  labelVariant: 'body2',
}

describe('RampCategoryInput', () => {
  test('it should render label & placeholder correctly and handle the icon click', () => {
    render(<RampCategoryInput {...mockProps} />)

    const labelElement = screen.getByText(mockProps.label)
    const placeholderElement = screen.getByPlaceholderText(
      mockProps.placeholder
    )
    expect(labelElement).toBeInTheDocument()
    expect(placeholderElement).toBeInTheDocument()

    const cancelIcon = screen.getByTestId('Atom-Icon')
    fireEvent.click(cancelIcon)
    waitFor(() => expect(cancelIcon).toHaveBeenCalledTimes(1))
  })
})

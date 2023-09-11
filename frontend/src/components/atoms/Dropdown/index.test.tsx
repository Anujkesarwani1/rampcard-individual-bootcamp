import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { OptionItem } from 'utils/types'
import Dropdown, { DropdownProps } from '.'

const mockOptions: OptionItem[] = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
]

const mockLabel = 'Choose one'

const mockProps: DropdownProps = {
  label: mockLabel,
  options: mockOptions,
  width: 200,
  height: 40,
  value: null,
  onChange: jest.fn(),
  disabled: false,
}

describe('Dropdown', () => {
  test('it should render the label correctly', () => {
    render(<Dropdown {...mockProps} />)
    const labelElement = screen.getByLabelText(mockLabel)
    expect(labelElement).toBeInTheDocument()
  })

  test('it should render the options correctly', () => {
    render(<Dropdown {...mockProps} />)
    const optionElements = screen.getAllByRole('combobox')
    waitFor(() => {
      optionElements.forEach((option, index) => {
        expect(option).toHaveTextContent(mockOptions[index].label)
      })
    })
  })

  test('it should be disabled when disabled prop is true', () => {
    render(<Dropdown {...mockProps} disabled={true} />)
    const inputElement = screen.getByRole('combobox')
    expect(inputElement).toBeDisabled()
  })
})

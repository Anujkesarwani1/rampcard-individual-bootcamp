import { render, screen, fireEvent } from '@testing-library/react'
import ButtonNavigation, { ButtonNavigationProps } from '.'
import BlackDownChevron from 'public/assets/image/black_down_chevron.svg'
import WhiteDownChevron from 'public/assets/image/white_down_chevron.svg'

const mockProps: ButtonNavigationProps = {
  label: 'Insights',
  onClick: jest.fn(),
  beforeClickIcon: BlackDownChevron,
  afterClickIcon: WhiteDownChevron,
}

describe('ButtonNavigation', () => {
  test('it should render the label correctly', () => {
    render(<ButtonNavigation {...mockProps} />)
    const labelElement = screen.getByText(mockProps.label)
    expect(labelElement).toBeInTheDocument()
  })

  test('it should call the onClick handler when clicked', () => {
    render(<ButtonNavigation {...mockProps} />)
    const container = screen.getByTestId('text-id')

    fireEvent.click(container)
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)

    fireEvent.click(container)
    expect(mockProps.onClick).toHaveBeenCalledTimes(2)
  })
})

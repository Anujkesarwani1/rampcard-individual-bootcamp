import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CALENDAR from 'public/assets/image/calendar.svg'
import Chip, { ChipProps } from '.'
import { Constants } from 'utils/constants'

const mockProps: ChipProps = {
  label: 'Lyft',
  icon: CALENDAR,
  onClick: jest.fn(),
  alt: Constants.ICON_ALT,
}

describe('Chip', () => {
  test('it should render label and icon correctly and handle cancel icon click', () => {
    render(<Chip {...mockProps} />)

    const labelElement = screen.getByText(mockProps.label)
    expect(labelElement).toBeInTheDocument()

    const iconElement = screen.getByTestId('Atom-Icon')
    expect(iconElement).toBeInTheDocument()
    fireEvent.click(iconElement)
    waitFor(() => expect(iconElement).toHaveBeenCalledTimes(1))
  })
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Navigation, { NavigationProps } from '.'
import { navigationData } from 'utils/constants'

const mockProps: NavigationProps = {
  navigationData: navigationData,
}

describe('Navigation', () => {
  test('it should render navigation buttons correctly', () => {
    render(<Navigation {...mockProps} />)

    const buttonElements = screen.getAllByTestId('Atom-Icon')
    fireEvent.click(buttonElements[1])
    waitFor(() => expect(buttonElements[1]).toHaveBeenCalledTimes(1))
  })

  test('it should toggle Ramp perks button', () => {
    render(<Navigation {...mockProps} />)

    const rampButtonElement = screen.getByText('Ramp perks')

    expect(rampButtonElement).not.toHaveClass('active')
    fireEvent.click(rampButtonElement)

    waitFor(() => expect(rampButtonElement).toHaveClass('active'))
    fireEvent.click(rampButtonElement)

    expect(rampButtonElement).not.toHaveClass('active')
  })
})

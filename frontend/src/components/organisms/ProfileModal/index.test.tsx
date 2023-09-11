import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ProfileModal, { ProfileModalProps } from '.'

const mockProps: ProfileModalProps = {
  header: 'My Ramp',
  open: false,
  onLogOut: jest.fn(),
}

describe('SearchSuggestionPanel', () => {
  test('it should open and close popover when icon is clicked', () => {
    render(<ProfileModal {...mockProps} />)

    const profileIcon = screen.getAllByTestId('Atom-Icon')
    fireEvent.click(profileIcon[0])
    expect(profileIcon[0]).toBeInTheDocument()
    waitFor(() => expect(profileIcon).toHaveBeenCalledTimes(1))

    const popover = screen.getByTestId('profile-popover')
    fireEvent.click(popover)
    expect(popover).not.toBeInTheDocument()
  })
})

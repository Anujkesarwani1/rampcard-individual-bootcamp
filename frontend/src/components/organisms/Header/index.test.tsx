import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header, { HeaderProps } from '.'

const mockProps: HeaderProps = {
  onLogOut: jest.fn(),
  onButtonClick: jest.fn(),
  open: true,
}

describe('Header', () => {
  test('it should toggle Setup guide button', () => {
    render(<Header {...mockProps} />)

    const guideButtonElement = screen.getByText('Setup guide')

    expect(guideButtonElement).not.toHaveClass('active')
    fireEvent.click(guideButtonElement)

    waitFor(() => expect(guideButtonElement).toHaveClass('active'))
    fireEvent.click(guideButtonElement)

    expect(guideButtonElement).not.toHaveClass('active')
  })
})

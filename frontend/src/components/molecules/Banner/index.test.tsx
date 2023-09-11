import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { BANNER } from 'utils/constants'
import Banner, { BannerProps } from '.'

const mockProps: BannerProps = {
  open: true,
  header: BANNER.HEADER,
  content: BANNER.CONTENT,
  onClick: jest.fn(),
}

describe('Banner', () => {
  test('it should render header and content correctly and handle cancel icon click', () => {
    render(<Banner {...mockProps} />)

    const headerElement = screen.getByText(mockProps.header)
    const contentElement = screen.getByText(mockProps.content)
    expect(headerElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()

    const cancelIcon = screen.getAllByTestId('Atom-Icon')
    fireEvent.click(cancelIcon[1])
    waitFor(() => {
      expect(cancelIcon).toHaveBeenCalledTimes(1)
    })
  })
})

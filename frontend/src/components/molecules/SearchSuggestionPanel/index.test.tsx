import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchSuggestionPanel, { SearchSuggestionPanelProps } from '.'

const mockProps: SearchSuggestionPanelProps = {
  open: true,
  item: 'Lyft',
  onClick: jest.fn(),
}

describe('SearchSuggestionPanel', () => {
  test('it should render item prop correctly', () => {
    render(<SearchSuggestionPanel {...mockProps} />)

    const itemElement = screen.getByTestId('item-test')
    expect(itemElement).toBeInTheDocument()
    fireEvent.click(itemElement)
    waitFor(() => expect(itemElement).toHaveBeenCalledTimes(1))
  })
})

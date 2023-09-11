import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Datatable, { DatatableProps } from '.'
import { API } from 'services/api'
import { columns, rows } from 'utils/constants'

const mockProps: DatatableProps = {
  rows: rows,
  columns: columns,
  onTrash: jest.fn(),
  onClear: jest.fn(),
  onFilter: jest.fn(),
  onSync: jest.fn(),
}

jest.mock('services/api')

describe('Datatable', () => {
  test('it should handle row selection change, search input, and chip interaction', async () => {
    render(<Datatable {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const checkbox = screen.getAllByRole('checkbox')[2]
    fireEvent.click(checkbox)
    await waitFor(() => {
      expect(mockProps.onTrash).toHaveBeenCalledTimes(0)
    })

    const SearchBar = screen.getByRole('textbox')
    expect(SearchBar).toHaveAttribute('placeholder', '  Search cards')
    fireEvent.change(SearchBar, { target: { value: 'Lyft' } })

    const LyftElement = screen.getAllByText('Lyft')
    fireEvent.click(LyftElement[1])
    fireEvent.click(screen.getByAltText('Cross'))
  })

  test('it should call handleNextClick when Previous button is clicked', async () => {
    render(<Datatable {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    waitFor(() => expect(nextButton).toHaveBeenCalledTimes(1))
  })

  test('it should call handlePreviousClick when Previous button is clicked', async () => {
    render(<Datatable {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const previousButton = screen.getByText('Previous')
    fireEvent.click(previousButton)
    waitFor(() => expect(mockProps.onClear).toHaveBeenCalledTimes(1))
  })

  test('it should fetch and update data from the API successfully', async () => {
    API.get = jest.fn().mockResolvedValue({ data: rows })
    render(<Datatable {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(API.get).toHaveBeenCalledTimes(1)
    })
  })

  test('it should handle API error', async () => {
    const errorMessage = 'An error occurred while fetching quickBooks data.'
    API.get = jest.fn().mockRejectedValue(new Error(errorMessage))

    render(<Datatable {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
      const errorElement = screen.getByText(errorMessage) as HTMLElement
      expect(errorElement).toBeInTheDocument()
    })
  })
})

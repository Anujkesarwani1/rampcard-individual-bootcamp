import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import RampcardStatus, { RampcardStatusProps } from '.'
import { statusItems } from 'utils/constants'
import { API } from 'services/api'

const mockProps: RampcardStatusProps = {
  rampcardStatusItems: statusItems,
  handleCategoriesRuleClick: jest.fn(),
}

describe('RampcardStatus', () => {
  test('it should render rampcard status items correctly', async () => {
    render(<RampcardStatus {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    mockProps.rampcardStatusItems.forEach((item) => {
      const titleElement = screen.getByText(item.title)
      expect(titleElement).toBeInTheDocument()

      const countElement = screen.getByTestId(`status-item-${item.id}`)
      expect(countElement).toBeInTheDocument()

      const containerElement = screen.getAllByTestId('container-item')
      fireEvent.click(containerElement[2])

      waitFor(() => {
        expect(containerElement).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('it should fetch rampCardStatus from the API successfully', async () => {
    API.get = jest
      .fn()
      .mockResolvedValue({ data: mockProps.rampcardStatusItems })

    render(<RampcardStatus {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    await waitFor(() => {})
    mockProps.rampcardStatusItems.forEach((item) => {
      const countElement = screen.getByTestId(`status-item-${item.id}`)
      expect(countElement).toBeInTheDocument()
    })
  })

  test('it should render the error message when rampCardStatus API call fails', async () => {
    const errorMessage = 'An error occurred while fetching quickBooks data.'
    API.get = jest.fn().mockRejectedValue(new Error(errorMessage))

    render(<RampcardStatus {...mockProps} />)

    await waitFor(() => {
      const errorElement = screen.getByText(errorMessage) as HTMLElement
      expect(errorElement).toBeInTheDocument()
    })
  })
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CreateMerchantRuleModal, { CreateMerchantRuleProps } from '.'
import { CREATE_MERCHANT_RULE, statusItems } from 'utils/constants'
import { API } from 'services/api'

const mockProps: CreateMerchantRuleProps = {
  header: CREATE_MERCHANT_RULE.HEADER,
  content: CREATE_MERCHANT_RULE.CONTENT,
  transactions: CREATE_MERCHANT_RULE.TRANSACTIONS,
  open: true,
  onCreateRule: jest.fn(),
  onClose: jest.fn(),
}

describe('CreateMerchantRuleModal', () => {
  test('it should render CreateMerchantRuleModal with correct props and handle cancel', () => {
    render(<CreateMerchantRuleModal {...mockProps} />)

    const headerElement = screen.getByText(mockProps.header)
    expect(headerElement).toBeInTheDocument()

    const contentElement = screen.getByText(mockProps.content)
    expect(contentElement).toBeInTheDocument()

    const transactionsElement = screen.getByText(mockProps.transactions)
    expect(transactionsElement).toBeInTheDocument()

    const cancelButton = screen.getByTestId('cancel-btn')
    fireEvent.click(cancelButton)
    waitFor(() => expect(cancelButton).toHaveBeenCalledTimes(1))
  })

  test('it should update merchant rule count and show modal', async () => {
    API.patch = jest.fn().mockResolvedValue({ data: { id: 2, count: 2 } })

    render(<CreateMerchantRuleModal {...mockProps} />)

    const createButton = screen.getByTestId('create-btn')
    fireEvent.click(createButton)

    await waitFor(() => {
      expect(API.patch).toHaveBeenCalledWith('rampcard-status/2', {
        count: 3,
      })
    })
  })

  test('it should handle API error', async () => {
    const mockErrorMessage = 'API error message'

    jest.spyOn(API, 'patch').mockRejectedValue(new Error(mockErrorMessage))

    render(<CreateMerchantRuleModal {...mockProps} />)

    const createButton = screen.getByTestId('create-btn')
    fireEvent.click(createButton)

    await waitFor(() => {
      const errorElement = screen.getByText(mockErrorMessage)
      expect(errorElement).toBeInTheDocument()
    })
  })
})

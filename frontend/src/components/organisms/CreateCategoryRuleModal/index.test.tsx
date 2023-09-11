import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CreateCategoryRuleModal, { CreateCategoryRuleProps } from '.'
import {
  CREATE_CATEGORY_RULE,
  CREATE_RAMP_CATEGORY,
  options,
} from 'utils/constants'
import { API } from 'services/api'

const mockProps: CreateCategoryRuleProps = {
  header: CREATE_CATEGORY_RULE.HEADER,
  contentHeader: CREATE_CATEGORY_RULE.CONTENT_HEADER,
  content: CREATE_RAMP_CATEGORY.CONTENT,
  open: true,
  onCreateRule: jest.fn(),
  onClose: jest.fn(),
  rulesHeader: CREATE_CATEGORY_RULE.RULES_HEADER,
  rulesContent: CREATE_CATEGORY_RULE.RULES_CONTENT,
  onCancel: jest.fn(),
}

jest.mock('services/api')

describe('CreateCategoryRuleModal', () => {
  test('it should render CreateCategoryRuleModal with correct props and handle cancel', async () => {
    render(<CreateCategoryRuleModal {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const headerElement = screen.getByText(mockProps.header)
    expect(headerElement).toBeInTheDocument()

    const contentHeaderElement = screen.getByText(mockProps.contentHeader)
    expect(contentHeaderElement).toBeInTheDocument()

    const contentElement = screen.getByText(mockProps.content)
    expect(contentElement).toBeInTheDocument()

    const rulesHeaderElement = screen.getByText(mockProps.rulesHeader)
    expect(rulesHeaderElement).toBeInTheDocument()

    const rulesContentElement = screen.getByText(mockProps.rulesContent)
    expect(rulesContentElement).toBeInTheDocument()

    const cancelButton = screen.getByTestId('cancel-btn')
    fireEvent.click(cancelButton)
    expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
  })

  test('it should fetch quickBooks data from the API successfully', async () => {
    API.get = jest.fn().mockResolvedValue({ data: options })

    render(<CreateCategoryRuleModal {...mockProps} />)

    await waitFor(() => {})
    const quickBooksDropdowns = screen.getAllByLabelText(
      'Quickbooks category'
    ) as HTMLElement[]

    quickBooksDropdowns.forEach((quickBooksDropdown) => {
      expect(quickBooksDropdown).toBeInTheDocument()
    })
  })

  test('it should render the error message when quickBooks API call fails', async () => {
    const errorMessage = 'An error occurred while fetching quickBooks data.'
    API.get = jest.fn().mockRejectedValue(new Error(errorMessage))

    render(<CreateCategoryRuleModal {...mockProps} />)

    await waitFor(() => {})
    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
  })

  test('it should update category rule count and show modal', async () => {
    API.patch = jest.fn().mockResolvedValue({ data: { id: 3, count: 3 } })

    render(<CreateCategoryRuleModal {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const createButton = screen.getByTestId('create-btn')
    fireEvent.click(createButton)

    await waitFor(() => {
      expect(API.patch).toHaveBeenCalledWith('rampcard-status/3', {
        count: 4,
      })
    })
  })

  test('it should handle API error', async () => {
    const mockErrorMessage = 'API error message'

    jest.spyOn(API, 'patch').mockRejectedValue(new Error(mockErrorMessage))

    render(<CreateCategoryRuleModal {...mockProps} />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const createButton = screen.getByTestId('create-btn')
    fireEvent.click(createButton)

    await waitFor(() => {
      const errorElement = screen.getByText(mockErrorMessage)
      expect(errorElement).toBeInTheDocument()
    })
  })
})

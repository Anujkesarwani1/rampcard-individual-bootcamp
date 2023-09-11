import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CreateRampCategoryModal, { CreateRampCategoryProps } from '.'
import { CREATE_RAMP_CATEGORY } from 'utils/constants'

const mockProps: CreateRampCategoryProps = {
  header: CREATE_RAMP_CATEGORY.HEADER,
  contentHeader: CREATE_RAMP_CATEGORY.CONTENR_HEADER,
  content: CREATE_RAMP_CATEGORY.CONTENT,
  open: true,
  onCreateRule: jest.fn(),
  onClose: jest.fn(),
}

describe('CreateRampCategoryModal', () => {
  test('it should render CreateRampCategoryModal with correct props and handle AddNew & cancel', () => {
    render(<CreateRampCategoryModal {...mockProps} />)

    const headerElement = screen.getByText(mockProps.header)
    expect(headerElement).toBeInTheDocument()

    const contentHeaderElement = screen.getByText(mockProps.contentHeader)
    expect(contentHeaderElement).toBeInTheDocument()

    const contentElement = screen.getByText(mockProps.content)
    expect(contentElement).toBeInTheDocument()

    const addNewIcon = screen.getAllByTestId('Atom-Icon')
    fireEvent.click(addNewIcon[1])
    waitFor(() => expect(addNewIcon).toHaveBeenCalledTimes(1))

    const cancelButton = screen.getByTestId('cancel-btn')
    fireEvent.click(cancelButton)
    waitFor(() => expect(cancelButton).toHaveBeenCalledTimes(1))
  })
})

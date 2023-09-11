import { render, screen } from '@testing-library/react'
import TransactionItem, { TransactionItemProps } from '.'

const mockProps: TransactionItemProps = {
  label: 'H&M',
  sublabel: 'casio',
}

describe('TransactionItem', () => {
  test('it should render the label & sublabel correctly', () => {
    render(<TransactionItem {...mockProps} />)
    const labelElement = screen.getByText(mockProps.label)
    expect(labelElement).toBeInTheDocument()

    const subLabelElement = screen.getByText(mockProps.sublabel)
    expect(subLabelElement).toBeInTheDocument()
  })
})

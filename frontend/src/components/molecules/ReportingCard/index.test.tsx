import '@testing-library/jest-dom'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import ReportingCard, { ReportingCardProps } from '.'
import { REPORTING_CARD } from 'utils/constants'

const mockProps: ReportingCardProps = {
  header: REPORTING_CARD.HEADER,
  content: REPORTING_CARD.CONTENT,
  awsHeader: REPORTING_CARD.AWS_HEADER,
  awsAmount: REPORTING_CARD.AWS_AMOUNT,
  onClick: jest.fn(),
}

describe('Reportingcard', () => {
  test('it should render props correctly', () => {
    render(<ReportingCard {...mockProps} />)
    const headerElement = screen.getByText(mockProps.header)
    const contentElement = screen.getByText(mockProps.content)
    const awsHeaderElement = screen.getByText(mockProps.awsHeader)
    const awsAmountElement = screen.getByText(mockProps.awsAmount)
    const partnerReward = screen.getByTestId('reward-btn')

    expect(headerElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
    expect(awsHeaderElement).toBeInTheDocument()
    expect(awsAmountElement).toBeInTheDocument()

    fireEvent.click(partnerReward)
    waitFor(() => {
      expect(partnerReward).toHaveBeenCalledTimes(1)
    })
  })
})

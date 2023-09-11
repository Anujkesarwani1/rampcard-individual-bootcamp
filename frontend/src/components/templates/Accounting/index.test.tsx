import { render, screen } from '@testing-library/react'
import AccountingTemplate, { AccountingTemplateProps } from '.'

const mockProps: AccountingTemplateProps = {
  rampCardStatus: (
    <div data-testid="mock-rampCardStatus">Mock RampCardStatus</div>
  ),
  content: <div data-testid="mock-content">Mock Content</div>,
}

describe('AccountingTemplate', () => {
  test('it should render header, navigation, and content', () => {
    render(<AccountingTemplate {...mockProps} />)

    const rampCardStatusElement = screen.getByTestId('mock-rampCardStatus')
    const contentElement = screen.getByTestId('mock-content')

    expect(rampCardStatusElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
  })
})

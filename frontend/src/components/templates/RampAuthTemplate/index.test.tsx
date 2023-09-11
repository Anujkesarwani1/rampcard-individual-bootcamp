import { render, screen } from '@testing-library/react'
import RampAuthTemplate, { RampAuthTemplateProps } from '.'

const mockProps: RampAuthTemplateProps = {
  authContent: <div data-testid="mock-authContent">Mock Auth Content</div>,
}

describe('RampAuthTemplate', () => {
  test('it should render authContent props correctly', () => {
    render(<RampAuthTemplate {...mockProps} />)

    const authContentElement = screen.getByTestId('mock-authContent')
    expect(authContentElement).toBeInTheDocument()
  })
})

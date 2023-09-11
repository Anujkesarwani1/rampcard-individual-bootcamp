import { render, screen } from '@testing-library/react'
import CheckboxTypography, { Props } from '.'
import theme from 'themes'

const testLabel = 'Stay signed in for a week'
const testVariant: Props['variant'] = 'body2'

describe('CheckboxTypography', () => {
  test('it should render correctly with the provided label and variant', () => {
    render(<CheckboxTypography label={testLabel} variant={testVariant} />)

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    const typography = screen.getByText(testLabel)

    expect(checkbox).toBeInTheDocument()
    expect(typography).toBeInTheDocument()
    expect(typography).toHaveStyle(`color: ${theme.palette.Text.highEmphasis}`)
  })

  test('it should display the correct label text', () => {
    render(<CheckboxTypography label={testLabel} variant={testVariant} />)

    const typographyElement = screen.getByText(testLabel)
    expect(typographyElement).toBeInTheDocument()
  })
})

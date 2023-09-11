import { render, screen } from '@testing-library/react'
import Checkbox from '.'

describe('Checkbox', () => {
  test('renders  checkbox with default props', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  test("renders checked checkbox when 'checked' prop is passed as true", () => {
    render(<Checkbox checked={true} />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })
})

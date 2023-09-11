import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MuiTypography from '.'

describe('Test Suit for Typography', () => {
  test('it should render Typography component correctly', () => {
    render(<MuiTypography>Ramp cards</MuiTypography>)
    const text = screen.getByText('Ramp cards')
    expect(text).toBeInTheDocument()
  })

  test('it should render heading', () => {
    render(<MuiTypography variant="h1" children="Ramp cards" />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })
})

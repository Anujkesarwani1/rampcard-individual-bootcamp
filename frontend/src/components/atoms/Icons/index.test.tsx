import { render, screen } from '@testing-library/react'
import MuiIcon from '.'

const props = {
  url: 'public/assets/image/google.svg',
  altText: 'Icon not found',
}

describe('Icon', () => {
  test('it should render icon with provided URL and alt text', () => {
    render(<MuiIcon src={props.url} alt={props.altText} />)

    const icon = screen.getByRole('img')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('src', props.url)
    expect(icon).toHaveAttribute('alt', props.altText)
  })
})

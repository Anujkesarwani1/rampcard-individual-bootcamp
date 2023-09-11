import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import Image from '.'

const prop = {
  src: './assets/image/signup-left.svg',
  alt: 'Share tracking link',
  width: '400',
  height: '300',
}

describe('Image', () => {
  test('it should render image with alt text correctly', () => {
    render(<Image {...prop} />)
    const imgElement = screen.getByRole('img')
    expect(imgElement).toHaveAttribute('alt', prop.alt)
  })

  test('it should render image with the correct props', () => {
    render(
      <Image
        src={prop.src}
        alt={prop.alt}
        width={prop.width}
        height={prop.height}
      />
    )
    const imgElement = screen.getByRole('img')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', prop.src)
    expect(imgElement).toHaveAttribute('alt', prop.alt)
    expect(imgElement).toHaveAttribute('width', prop.width)
    expect(imgElement).toHaveAttribute('height', prop.height)
  })
})

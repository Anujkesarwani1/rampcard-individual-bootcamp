import { render, fireEvent } from '@testing-library/react'
import Button from '.'

test('it should render the button with children', () => {
  const { getByText } = render(<Button>Create category rule</Button>)
  const buttonElement = getByText('Create category rule')
  expect(buttonElement).toBeInTheDocument()
})

test('it should trigger the onClick event with additional arguments when we click on button', () => {
  const onClickMock = jest.fn()
  const additionalArgument = 'Test Argument'
  const { getByText } = render(
    <Button onClick={(event) => onClickMock(event, additionalArgument)}>
      Click Me
    </Button>
  )
  const buttonElement = getByText('Click Me')
  fireEvent.click(buttonElement)
  expect(onClickMock).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.anything(),
    }),
    additionalArgument
  )
})

test('it should render the button with some props', () => {
  const { getByText } = render(<Button size="medium">Click Me</Button>)
  const buttonElement = getByText('Click Me')
  expect(buttonElement).toBeInTheDocument()
  expect(buttonElement).toHaveClass(
    'MuiTypography-root MuiTypography-body2 css-e784if-MuiTypography-root'
  )
})

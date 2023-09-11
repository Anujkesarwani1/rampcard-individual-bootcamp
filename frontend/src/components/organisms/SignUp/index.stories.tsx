import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SignUp from '.'
import { SIGN_UP } from 'utils/constants'

export default {
  title: 'organisms/SignUp',
  component: SignUp,
} as Meta<typeof SignUp>

const Template: StoryFn<typeof SignUp> = (args) => <SignUp {...args} />

export const Primary = Template.bind({})
Primary.args = {
  header: SIGN_UP.HEADER,
  onContinue: action('Continue is Clicked'),
  onGoogleClick: action('Sign in with Google is Clicked'),
  onForget: action('Forget your password is Clicked'),
}

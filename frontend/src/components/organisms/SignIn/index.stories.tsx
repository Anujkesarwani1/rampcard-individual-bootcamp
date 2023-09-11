import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SignIn from '.'
import { SIGN_IN } from 'utils/constants'

export default {
  title: 'organisms/SignIn',
  component: SignIn,
} as Meta<typeof SignIn>

const Template: StoryFn<typeof SignIn> = (args) => <SignIn {...args} />

export const Primary = Template.bind({})
Primary.args = {
  header: SIGN_IN.HEADER,
  onContinue: action('Continue is Clicked'),
  onGoogleClick: action('Sign in with Google is Clicked'),
  onForget: action('Forget your password is Clicked'),
}

import { Meta, StoryFn } from '@storybook/react'
import SignInPage from '.'

export default {
  title: 'pages/SignIn Page',
  component: SignInPage,
} as Meta<typeof SignInPage>

const Template: StoryFn<typeof SignInPage> = (args) => <SignInPage {...args} />

export const Primary = Template.bind({})
Primary.args = {}

import { Meta, StoryFn } from '@storybook/react'
import SignUpPage from '.'

export default {
  title: 'pages/SignUp Page',
  component: SignUpPage,
} as Meta<typeof SignUpPage>

const Template: StoryFn<typeof SignUpPage> = (args) => <SignUpPage {...args} />

export const Primary = Template.bind({})
Primary.args = {}

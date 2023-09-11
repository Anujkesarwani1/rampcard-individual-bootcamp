import { Meta, StoryFn } from '@storybook/react'
import RampAuthTemplate from '.'
import SignIn from 'components/organisms/SignIn'

export default {
  title: 'templates/RampAuth Template',
  component: RampAuthTemplate,
} as Meta<typeof RampAuthTemplate>

const Template: StoryFn<typeof RampAuthTemplate> = (args) => (
  <RampAuthTemplate {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  authContent: (
    <SignIn
      header={'Sign in to your account'}
      onContinue={() => {}}
      onGoogleClick={() => {}}
      onForget={() => {}}
    />
  ),
}

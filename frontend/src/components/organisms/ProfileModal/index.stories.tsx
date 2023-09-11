import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ProfileModal from '.'

export default {
  title: 'organisms/Profile Modal',
  component: ProfileModal,
} as Meta<typeof ProfileModal>

const Template: StoryFn<typeof ProfileModal> = (args) => (
  <ProfileModal {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  header: 'My Ramp',
  open: false,
  onLogOut: action('Log out is Clicked'),
}

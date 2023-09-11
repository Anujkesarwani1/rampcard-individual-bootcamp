import { Meta, StoryFn } from '@storybook/react'
import Navigation from '.'
import { navigationData } from 'utils/constants'

export default {
  title: 'organisms/Navigation',
  component: Navigation,
} as Meta<typeof Navigation>

const Template: StoryFn<typeof Navigation> = (args) => <Navigation {...args} />

export const Primary = Template.bind({})
Primary.args = {
  navigationData: navigationData,
}

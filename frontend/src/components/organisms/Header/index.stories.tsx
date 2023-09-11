import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Header from '.'

export default {
  title: 'organisms/Header',
  component: Header,
} as Meta<typeof Header>

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />

export const Primary = Template.bind({})
Primary.args = {}

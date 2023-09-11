import { Meta, StoryFn } from '@storybook/react'
import Dropdown from '.'
import theme from 'themes'
import { options } from 'utils/constants'

export default {
  component: Dropdown,
  title: 'Atoms/Dropdown',
} as Meta

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Choose one',
  options: options,
  width: '150px',
  height: '60px',
  sx: {
    borderRadius: '8px',
    border: `1px solid ${theme.palette.Structural.stroke100}`,
  },
  disabled: false,
}

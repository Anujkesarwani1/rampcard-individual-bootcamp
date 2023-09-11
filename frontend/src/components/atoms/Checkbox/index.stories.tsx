import { Meta, StoryFn } from '@storybook/react'
import Checkbox from '.'
import { CheckboxProps } from '@mui/material'

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
} as Meta

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})

Default.args = {
  checked: false,
}

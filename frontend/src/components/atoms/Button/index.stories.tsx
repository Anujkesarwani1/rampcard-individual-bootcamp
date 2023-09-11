import { Meta, StoryFn } from '@storybook/react'
import Button from '.'
import theme from 'themes'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
} as Meta

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const LoginButton = Template.bind({})
LoginButton.args = {
  children: 'Log in',
  variant: 'contained',
  fullWidth: true,
  sx: {
    font: theme.typography.body2,
    textTransform: 'none',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.Text.primary500}`,
  },
}
export const Defualt = Template.bind({})
Defualt.args = {
  children: 'Create category rule',
  variant: 'contained',
  sx: {
    font: theme.typography.body2,
    textTransform: 'none',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.Text.primary500}`,
  },
}

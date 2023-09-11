import { Meta, StoryFn } from '@storybook/react'
import GOOGLE from 'public/assets/image/google.svg'
import MuiIcon from '.'

export default {
  title: 'Atoms/MuiIcons',
  component: MuiIcon,
} as Meta<typeof MuiIcon>

const Template: StoryFn<typeof MuiIcon> = (args) => <MuiIcon {...args} />

export const Default = Template.bind({})
Default.args = {
  src: GOOGLE,
  alt: 'Icon not found',
}

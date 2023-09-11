import { Meta, StoryFn } from '@storybook/react'
import Image from '.'
import IMAGE from 'public/assets/image/signup-left.svg'

export default {
  title: 'atoms/Image',
  component: Image,
} as Meta<typeof Image>

const template: StoryFn<typeof Image> = (args) => <Image {...args} />

export const Primary = template.bind({})

Primary.args = {
  src: IMAGE,
  alt: 'Image not found',
}

import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Banner from '.'
import { BANNER } from 'utils/constants'

export default {
  title: 'molecules/Banner',
  component: Banner,
} as Meta<typeof Banner>

const template: StoryFn<typeof Banner> = (args) => <Banner {...args} />

export const Primary = template.bind({})

Primary.args = {
  open: true,
  onClick: action('Create rule is Clicked'),
  header: BANNER.HEADER,
  content: BANNER.CONTENT,
}

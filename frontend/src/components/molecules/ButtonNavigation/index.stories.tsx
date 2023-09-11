import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import BlackDownChevron from 'public/assets/image/black_down_chevron.svg'
import WhiteDownChevron from 'public/assets/image/white_down_chevron.svg'
import ButtonNavigation from '.'

export default {
  title: 'molecules/ButtonNavigation',
  component: ButtonNavigation,
} as Meta

const Template: StoryFn<typeof ButtonNavigation> = (args) => (
  <ButtonNavigation {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  label: 'Insights',
  onClick: action('ButtonNavigation is clicked'),
  beforeClickIcon: BlackDownChevron,
  afterClickIcon: WhiteDownChevron,
}

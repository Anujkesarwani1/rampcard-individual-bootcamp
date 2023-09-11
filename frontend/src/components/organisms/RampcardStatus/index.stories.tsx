import { Meta, StoryFn } from '@storybook/react'
import RampcardStatus from '.'
import { statusItems } from 'utils/constants'

export default {
  title: 'organisms/Rampcard Status',
  component: RampcardStatus,
} as Meta<typeof RampcardStatus>

const Template: StoryFn<typeof RampcardStatus> = (args) => (
  <RampcardStatus {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  rampcardStatusItems: statusItems,
}

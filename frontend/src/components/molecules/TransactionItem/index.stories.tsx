import { Meta, StoryFn } from '@storybook/react'
import TransactionItem from '.'

export default {
  title: 'molecules/Transactions Item',
  component: TransactionItem,
} as Meta

const Template: StoryFn<typeof TransactionItem> = (args) => (
  <TransactionItem {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  label: 'H&M',
  sublabel: 'casio',
}

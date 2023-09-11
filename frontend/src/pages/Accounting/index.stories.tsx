import { Meta, StoryFn } from '@storybook/react'
import AccountingPage from '.'

export default {
  title: 'Pages/Accounting Page',
  component: AccountingPage,
} as Meta

const Template: StoryFn<typeof AccountingPage> = (args) => (
  <AccountingPage {...args} />
)

export const Primary = Template.bind({})

Primary.args = {}

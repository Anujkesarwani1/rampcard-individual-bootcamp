import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CreateMerchantRuleModal from '.'
import { CREATE_MERCHANT_RULE } from 'utils/constants'

export default {
  title: 'organisms/Create Merchant Rule',
  component: CreateMerchantRuleModal,
} as Meta<typeof CreateMerchantRuleModal>

const Template: StoryFn<typeof CreateMerchantRuleModal> = (args) => (
  <CreateMerchantRuleModal {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  header: CREATE_MERCHANT_RULE.HEADER,
  content: CREATE_MERCHANT_RULE.CONTENT,
  transactions: CREATE_MERCHANT_RULE.TRANSACTIONS,
  open: true,
  onCreateRule: action('Create rule is Clicked'),
}

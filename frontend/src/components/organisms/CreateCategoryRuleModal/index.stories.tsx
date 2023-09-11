import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CREATE_CATEGORY_RULE, CREATE_RAMP_CATEGORY } from 'utils/constants'
import CreateCategoryRuleModal from '.'

export default {
  title: 'organisms/Create Category Rule',
  component: CreateCategoryRuleModal,
} as Meta<typeof CreateCategoryRuleModal>

const Template: StoryFn<typeof CreateCategoryRuleModal> = (args) => (
  <CreateCategoryRuleModal {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  header: CREATE_CATEGORY_RULE.HEADER,
  contentHeader: CREATE_CATEGORY_RULE.CONTENT_HEADER,
  content: CREATE_RAMP_CATEGORY.CONTENT,
  rulesHeader: CREATE_CATEGORY_RULE.RULES_HEADER,
  rulesContent: CREATE_CATEGORY_RULE.RULES_CONTENT,
  open: true,
  onCreateRule: action('Create rule is Clicked'),
}

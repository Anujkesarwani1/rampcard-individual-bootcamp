import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CreateRampCategoryModal from '.'
import { CREATE_RAMP_CATEGORY } from 'utils/constants'

export default {
  title: 'organisms/Create Ramp Category',
  component: CreateRampCategoryModal,
} as Meta<typeof CreateRampCategoryModal>

const Template: StoryFn<typeof CreateRampCategoryModal> = (args) => (
  <CreateRampCategoryModal {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  header: CREATE_RAMP_CATEGORY.HEADER,
  contentHeader: CREATE_RAMP_CATEGORY.CONTENR_HEADER,
  content: CREATE_RAMP_CATEGORY.CONTENT,
  open: true,
  onCreateRule: action('Create rule is Clicked'),
}

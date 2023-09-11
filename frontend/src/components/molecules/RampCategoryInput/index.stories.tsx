import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RampCategoryInput from '.'
import { RAMP_CATEGORY_INPUT } from 'utils/constants'

export default {
  title: 'Molecules/Ramp Category Input',
  component: RampCategoryInput,
} as Meta

const Template: StoryFn<typeof RampCategoryInput> = (args) => (
  <RampCategoryInput {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  label: RAMP_CATEGORY_INPUT.LABEL,
  placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
}

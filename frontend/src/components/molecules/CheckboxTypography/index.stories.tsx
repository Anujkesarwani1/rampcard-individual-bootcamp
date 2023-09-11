import { StoryFn, Meta } from '@storybook/react'
import CheckboxTypography from '.'
import { Constants } from 'utils/constants'

const meta: Meta = {
  title: 'molecules/CheckboxTypography',
  component: CheckboxTypography,
}
export default meta

const Template: StoryFn<typeof CheckboxTypography> = (args) => (
  <CheckboxTypography {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  label: Constants.STAY_SIGNED_IN,
  variant: 'body2',
}

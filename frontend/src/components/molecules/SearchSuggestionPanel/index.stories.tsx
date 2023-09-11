import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SearchSuggestionPanel from '.'

export default {
  title: 'molecules/Search Suggestion Panel',
  component: SearchSuggestionPanel,
} as Meta<typeof SearchSuggestionPanel>

const Template: StoryFn<typeof SearchSuggestionPanel> = (args) => (
  <SearchSuggestionPanel {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  open: true,
  item: 'Lyft',
  onClick: action('Lyft is Clicked'),
}

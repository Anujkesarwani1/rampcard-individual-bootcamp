import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ReportingCard from '.'
import { REPORTING_CARD } from 'utils/constants'

export default {
  title: 'molecules/Reporting Card',
  component: ReportingCard,
} as Meta

const Template: StoryFn<typeof ReportingCard> = (args) => (
  <ReportingCard {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  header: REPORTING_CARD.HEADER,
  content: REPORTING_CARD.CONTENT,
  awsHeader: REPORTING_CARD.AWS_HEADER,
  awsAmount: REPORTING_CARD.AWS_AMOUNT,
  onClick: action('Partner Reward is Clicked'),
}

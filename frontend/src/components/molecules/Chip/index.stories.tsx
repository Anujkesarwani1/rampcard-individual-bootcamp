import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CANCELCIRCLE from 'public/assets/image/cancelCircle.svg'
import CALENDAR from 'public/assets/image/calendar.svg'
import Chip from '.'
import theme from 'themes'

export default {
  title: 'molecules/Chip',
  component: Chip,
} as Meta<typeof Chip>

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args} />

export const Lyft = Template.bind({})
export const AllCards = Template.bind({})

Lyft.args = {
  label: 'Lyft',
  icon: CANCELCIRCLE,
  onClick: action('Chip is Clicked'),
  style: {
    color: `${theme.palette.primary.primary500}`,
    border: `1px solid ${theme.palette.Structural.stroke50}`,
    fontWeight: 'bold',
  },
}

AllCards.args = {
  label: 'All cards',
  icon: CALENDAR,
  onClick: action('Chip is Clicked'),
  style: {
    width: '8rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    border: `1px solid ${theme.palette.Structural.stroke50}`,
    color: `${theme.palette.Text.mediumEmphasis}`,
  },
}

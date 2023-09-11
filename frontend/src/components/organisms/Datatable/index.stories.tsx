import { Meta, StoryFn } from '@storybook/react'
import Datatable from '.'
import { columns, rows } from 'utils/constants'

export default {
  title: 'organisms/Datatable',
  component: Datatable,
} as Meta<typeof Datatable>

const Template: StoryFn<typeof Datatable> = (args) => <Datatable {...args} />

export const Primary = Template.bind({})
Primary.args = {
  rows: rows,
  columns: columns,
}

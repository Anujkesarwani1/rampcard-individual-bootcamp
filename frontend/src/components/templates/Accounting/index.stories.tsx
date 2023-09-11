import { Meta, StoryFn } from '@storybook/react'
import RampcardStatus from 'components/organisms/RampcardStatus'
import { columns, rows, statusItems } from 'utils/constants'
import Datatable from 'components/organisms/Datatable'
import AccountingTemplate from '.'

export default {
  title: 'templates/AccountingTemplate',
  component: AccountingTemplate,
} as Meta<typeof AccountingTemplate>

const Template: StoryFn<typeof AccountingTemplate> = (args) => (
  <AccountingTemplate {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  rampCardStatus: <RampcardStatus rampcardStatusItems={statusItems} />,
  content: (
    <Datatable
      rows={rows}
      columns={columns}
      onTrash={() => {}}
      onClear={() => {}}
      onFilter={() => {}}
      onSync={() => {}}
    />
  ),
}

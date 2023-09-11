import CreateCategoryRuleModal from 'components/organisms/CreateCategoryRuleModal'
import Datatable from 'components/organisms/Datatable'
import RampcardStatus from 'components/organisms/RampcardStatus'
import AccountingTemplate from 'components/templates/Accounting'
import { useState } from 'react'
import {
  CREATE_CATEGORY_RULE,
  CREATE_RAMP_CATEGORY,
  columns,
  rows,
  statusItems,
} from 'utils/constants'

export interface AccountingPageProps {}

const AccountingPage = (props: AccountingPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCategoriesRuleClick = (category: string) => {
    if (category === statusItems[2].title) {
      setIsModalOpen(!isModalOpen)
    }
  }

  return (
    <AccountingTemplate
      rampCardStatus={
        <>
          <RampcardStatus
            rampcardStatusItems={statusItems}
            handleCategoriesRuleClick={handleCategoriesRuleClick}
          />
          {isModalOpen && (
            <CreateCategoryRuleModal
              header={CREATE_CATEGORY_RULE.HEADER}
              contentHeader={CREATE_CATEGORY_RULE.CONTENR_HEADER}
              content={CREATE_RAMP_CATEGORY.CONTENT}
              rulesHeader={CREATE_CATEGORY_RULE.RULES_HEADER}
              rulesContent={CREATE_CATEGORY_RULE.RULES_CONTENT}
              open={isModalOpen}
              onClose={() => {
                setIsModalOpen(!isModalOpen)
              }}
              onCancel={() => {
                setIsModalOpen(!isModalOpen)
              }}
              onCreateRule={() => {}}
            />
          )}
        </>
      }
      content={
        <Datatable
          rows={rows}
          columns={columns}
          onTrash={() => {}}
          onClear={() => {}}
          onFilter={() => {}}
          onSync={() => {}}
        />
      }
    />
  )
}

export default AccountingPage

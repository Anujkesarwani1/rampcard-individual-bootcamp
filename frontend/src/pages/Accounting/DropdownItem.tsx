import Dropdown from 'components/atoms/Dropdown'
import Banner from 'components/molecules/Banner'
import CreateMerchantRuleModal from 'components/organisms/CreateMerchantRuleModal'
import { useState } from 'react'
import DropdownIcon from 'utils/DropdownIcon'
import { BANNER, CREATE_MERCHANT_RULE } from 'utils/constants'
import { OptionItem } from 'utils/types'

interface DropdownItemProps {
  options: OptionItem[]
}

const DropdownItem = (props: DropdownItemProps) => {
  const [openBanner, setOpenBanner] = useState(false)
  const [merchantRule, setMerchantRule] = useState(false)

  const handleOpenBanner = () => {
    setOpenBanner(!openBanner)
  }
  return (
    <>
      <Dropdown
        options={props.options}
        size="small"
        onChange={handleOpenBanner}
        label="Choose one"
        width="11rem"
        popupIcon={<DropdownIcon />}
      />
      {openBanner && (
        <Banner
          open={openBanner}
          header={BANNER.HEADER}
          content={BANNER.CONTENT}
          onClick={() => {
            setOpenBanner(!openBanner)
            setMerchantRule(!merchantRule)
          }}
        />
      )}
      {merchantRule && (
        <CreateMerchantRuleModal
          header={CREATE_MERCHANT_RULE.HEADER}
          content={CREATE_MERCHANT_RULE.CONTENT}
          transactions={CREATE_MERCHANT_RULE.TRANSACTIONS}
          open={merchantRule}
          onClose={() => setMerchantRule(!merchantRule)}
          onCreateRule={() => {}}
        />
      )}
    </>
  )
}

export default DropdownItem

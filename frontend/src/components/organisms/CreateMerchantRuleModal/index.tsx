import { Grid, Modal } from '@mui/material'
import Dropdown from 'components/atoms/Dropdown'
import MuiTypography from 'components/atoms/Typography'
import { useState } from 'react'
import theme from 'themes'
import DropdownIcon from 'utils/DropdownIcon'
import { options, statusItems } from 'utils/constants'
import { ModalFooter, ModalHeader } from 'utils/styles'
import ModalFooterBox from './ModalFooter'
import { updateCountStatus } from 'services/RampcardStatus/getrampcardStatus'

export interface CreateMerchantRuleProps {
  header: string
  content: string
  transactions: string
  open: boolean
  onClose: () => void
  onCreateRule: () => void
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  outline: 'none',
  width: '28rem',
  borderRadius: '0.375rem',
  background: `${theme.palette.Structural.main}`,
}

const CreateMerchantRuleModal = (props: CreateMerchantRuleProps) => {
  const [showModal, setShowModal] = useState(props.open)
  const [isError, setIsError] = useState('')

  const handleCreateRule = async () => {
    try {
      const categoryRuleItem = statusItems.find(
        (item) => item.title === statusItems[1].title
      )

      if (categoryRuleItem) {
        const updatedCount = categoryRuleItem.count + 1
        await updateCountStatus(categoryRuleItem.id, updatedCount)

        window.location.reload()
      }
    } catch (error: any) {
      setIsError(error.message)
    }
  }

  return (
    <Modal open={showModal} onClose={props.onClose}>
      <Grid container sx={modalStyle}>
        <ModalHeader item>
          <MuiTypography variant="body2">{props.header}</MuiTypography>
        </ModalHeader>
        <Grid item>
          <Grid
            container
            margin="1rem 1.25rem 0.25rem 1.25rem"
            flexDirection="column"
          >
            <Grid item width="25rem">
              <MuiTypography variant="body2">{props.content}</MuiTypography>
            </Grid>
            <Grid item marginTop="1rem">
              <Dropdown
                options={options}
                width="17.75rem"
                size="small"
                inputValue="Travel"
                popupIcon={<DropdownIcon />}
              />
            </Grid>
            <Grid item marginTop="0.5rem">
              <MuiTypography
                variant="caption1"
                color={theme.palette.Accent.accentRed100}
                fontSize="0.75rem"
              >
                {props.transactions}
              </MuiTypography>
            </Grid>
          </Grid>
        </Grid>
        <ModalFooter item>
          <ModalFooterBox
            onCancel={() => setShowModal(!showModal)}
            onCreateRule={handleCreateRule}
          />
        </ModalFooter>
        {isError !== '' && (
          <MuiTypography variant="body2" color={theme.palette.Text.warning}>
            {isError}
          </MuiTypography>
        )}
      </Grid>
    </Modal>
  )
}

export default CreateMerchantRuleModal

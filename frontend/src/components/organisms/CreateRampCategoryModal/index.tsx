import { Grid, Modal } from '@mui/material'
import MuiTypography from 'components/atoms/Typography'
import RampCategoryInput from 'components/molecules/RampCategoryInput'
import { useState } from 'react'
import theme from 'themes'
import { RAMP_CATEGORY_INPUT } from 'utils/constants'
import { ModalFooter, ModalHeader } from 'utils/styles'
import PLUS from 'public/assets/image/add.svg'
import IconTypography from '../SignIn/IconTypography'
import ModalFooterBox from '../CreateMerchantRuleModal/ModalFooter'

export interface CreateRampCategoryProps {
  header: string
  contentHeader: string
  content: string
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

const CreateRampCategoryModal = (props: CreateRampCategoryProps) => {
  const [showModal, setShowModal] = useState(props.open)
  const [categoryInputs, setCategoryInputs] = useState([{ id: 1 }])

  const addCategoryInput = () => {
    const newInputId = categoryInputs.length + 1
    setCategoryInputs([...categoryInputs, { id: newInputId }])
  }

  return (
    <Modal open={showModal} onClose={props.onClose}>
      <Grid container sx={modalStyle}>
        <ModalHeader item>
          <MuiTypography variant="body1">
            <b>{props.header}</b>
          </MuiTypography>
        </ModalHeader>
        <Grid item>
          <Grid
            container
            margin="1rem 1.25rem 0.25rem 1.25rem"
            flexDirection="column"
          >
            <Grid item>
              <MuiTypography variant="body2">
                <b>{props.contentHeader}</b>
              </MuiTypography>
            </Grid>
            <Grid item marginTop="1rem" width="25rem">
              <MuiTypography variant="body2">{props.content}</MuiTypography>
            </Grid>
            <Grid item marginTop="2.25rem">
              {categoryInputs.map((input) => (
                <RampCategoryInput
                  key={input.id}
                  label={RAMP_CATEGORY_INPUT.LABEL}
                  labelColor={theme.palette.Text.highEmphasis}
                  labelVariant="body2"
                  placeholder={RAMP_CATEGORY_INPUT.PLACEHOLDER}
                  iconVisible={true}
                />
              ))}
            </Grid>
            <Grid item marginTop="0.75rem">
              <IconTypography
                icon={PLUS}
                label="Add new"
                onClick={addCategoryInput}
                sx={{
                  gap: '0.5rem',
                  color: theme.palette.primary.primary500,
                  cursor: 'pointer',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <ModalFooter item>
          <ModalFooterBox
            onCancel={() => setShowModal(!showModal)}
            onCreateRule={props.onCreateRule}
          />
        </ModalFooter>
      </Grid>
    </Modal>
  )
}

export default CreateRampCategoryModal

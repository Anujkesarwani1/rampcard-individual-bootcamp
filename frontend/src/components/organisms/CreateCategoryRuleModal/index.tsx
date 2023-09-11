import { Grid, Modal } from '@mui/material'
import MuiTypography from 'components/atoms/Typography'
import RampCategoryInput from 'components/molecules/RampCategoryInput'
import { useEffect, useState } from 'react'
import theme from 'themes'
import {
  Constants,
  activeRules,
  options,
  recentCategories,
  statusItems,
} from 'utils/constants'
import { ModalFooter, ModalHeader, WhiteButton } from 'utils/styles'
import THUNDER from 'public/assets/image/thunder.svg'
import ModalFooterBox from '../CreateMerchantRuleModal/ModalFooter'
import Icons from 'components/atoms/Icons'
import Dropdown from 'components/atoms/Dropdown'
import DropdownIcon from 'utils/DropdownIcon'
import { InputData, OptionItem } from 'utils/types'
import { retrieveQuickBookCategoryData } from 'services/QuickBookCategory/getQuickBookCategory'
import { updateCountStatus } from 'services/RampcardStatus/getrampcardStatus'

export interface CreateCategoryRuleProps {
  onCancel: () => void
  header: string
  contentHeader: string
  content: string
  rulesHeader: string
  rulesContent: string
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
  width: '35.5rem',
  borderRadius: '0.375rem',
  background: `${theme.palette.Structural.main}`,
}

const CreateCategoryRuleModal = (props: CreateCategoryRuleProps) => {
  const [quickBooks, setQuickBooks] = useState<OptionItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState({
    quickBooks: '',
    activeRules: '',
    createButton: '',
  })

  const fetchQuickBooksData = async () => {
    try {
      const response = await retrieveQuickBookCategoryData() //for MockAPI: await API.get('/quickBooks')
      setQuickBooks(response)
      setLoading(false)
    } catch (error: any) {
      setIsError((prevErrors) => ({
        ...prevErrors,
        quickBooks: error.message,
      }))
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuickBooksData()
  }, [])

  if (loading) {
    return <Grid>Loading...</Grid>
  }

  const handleCreateRule = async () => {
    try {
      const categoryRuleItem = statusItems.find(
        (item) => item.title === statusItems[2].title
      )
      if (categoryRuleItem) {
        const updatedCount = categoryRuleItem.count + 1
        await updateCountStatus(categoryRuleItem.id, updatedCount)

        window.location.reload()
      }
    } catch (error: any) {
      setIsError((prevErrors) => ({
        ...prevErrors,
        createButton: error.message,
      }))
    }
  }

  const generateInputContainer = (
    element: InputData,
    optionsData: OptionItem[],
    showLabel?: boolean
  ) => {
    return (
      <Grid container key={element.id}>
        <Grid item>
          <RampCategoryInput
            label={element.label}
            placeholder={element.placeholder}
            iconVisible={false}
            value={element.value}
            labelColor={theme.palette.Text.mediumEmphasis}
            labelVariant="body2"
          />
        </Grid>
        <Grid item marginTop="2.5rem" marginRight="0.5rem">
          <Icons src={THUNDER} alt={Constants.ICON_ALT} />
        </Grid>
        <Grid item>
          <MuiTypography
            variant="body2"
            color={theme.palette.Text.mediumEmphasis}
            marginBottom="0.5rem"
          >
            Quickbooks category
          </MuiTypography>
          <Dropdown
            options={optionsData}
            width="13.75rem"
            size="small"
            inputValue={element.dropdownValue}
            popupIcon={<DropdownIcon />}
            label={showLabel ? 'Quickbooks category' : undefined}
          />
        </Grid>
      </Grid>
    )
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Grid container sx={modalStyle}>
        <ModalHeader item sx={{ width: '35rem' }}>
          <MuiTypography variant="body1">
            <b>{props.header}</b>
          </MuiTypography>
        </ModalHeader>
        <Grid item height="30.375rem" sx={{ overflow: 'auto' }}>
          <Grid
            container
            margin="1rem 1.25rem 0.25rem 1.25rem"
            flexDirection="column"
            gap="1.5rem"
            width="32rem"
          >
            <Grid container width="25.5rem" gap="0.25rem">
              <Grid item>
                <MuiTypography variant="body2">
                  <b>{props.contentHeader}</b>
                </MuiTypography>
              </Grid>
              <Grid item>
                <MuiTypography variant="body2">{props.content}</MuiTypography>
              </Grid>
            </Grid>

            <Grid container flexDirection="column" gap="0.75rem">
              <Grid item>
                <MuiTypography variant="body2">
                  <b>Active rules</b>
                </MuiTypography>
              </Grid>
              <Grid item container gap="0.5rem">
                {activeRules.map((element) =>
                  generateInputContainer(element, options)
                )}
              </Grid>
            </Grid>

            <Grid container flexDirection="column" gap="0.75rem">
              <Grid item>
                <MuiTypography variant="body2">
                  <b>Recent categories</b>
                </MuiTypography>
              </Grid>
              <Grid item container gap="0.5rem">
                {recentCategories.map((element) =>
                  generateInputContainer(element, quickBooks, true)
                )}
              </Grid>
            </Grid>
            {isError.quickBooks !== '' && (
              <MuiTypography variant="body2" color={theme.palette.Text.warning}>
                {isError.quickBooks}
              </MuiTypography>
            )}

            <Grid container width="25.5rem" gap="0.25rem">
              <Grid item>
                <MuiTypography variant="body2">
                  <b>{props.rulesHeader}</b>
                </MuiTypography>
              </Grid>
              <Grid item>
                <MuiTypography variant="body2">
                  {props.rulesContent}
                </MuiTypography>
              </Grid>
              <Grid item marginTop="0.25rem">
                <WhiteButton variant="contained">
                  See all categories
                </WhiteButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ModalFooter
          item
          sx={{ padding: '0.875rem 1.25rem 0.875rem 22.8rem', width: '35rem' }}
        >
          <ModalFooterBox
            data-testid="cancel-btn"
            onCancel={props.onCancel}
            onCreateRule={handleCreateRule}
          />
        </ModalFooter>
        {isError.createButton !== '' && (
          <MuiTypography variant="body2" color={theme.palette.Text.warning}>
            {isError.createButton}
          </MuiTypography>
        )}
      </Grid>
    </Modal>
  )
}

export default CreateCategoryRuleModal

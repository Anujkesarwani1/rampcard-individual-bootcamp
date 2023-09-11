import { Grid } from '@mui/material'
import MuiIcon from 'components/atoms/Icons'
import CustomTextField from 'components/atoms/Input'
import MuiTypography from 'components/atoms/Typography'
import CANCEL from 'public/assets/image/cancel.svg'
import { useState } from 'react'
import { Constants } from 'utils/constants'

export interface RampCategoryInputProps {
  label: string
  placeholder: string
  iconVisible: boolean
  labelColor: string | undefined
  value?: string
  labelVariant:
    | 'h1'
    | 'h2'
    | 'subtitle1'
    | 'subtitle2'
    | 'subtitle3'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption1'
    | 'caption2'
}

const styledInput = {
  display: 'flex',
  padding: '0.375rem 0.1rem',
  alignItems: 'center',
  borderRadius: '0.5rem',
}

const RampCategoryInput = (props: RampCategoryInputProps) => {
  const [showInput, setShowInput] = useState(true)

  const handleCancelClick = () => {
    setShowInput(false)
  }

  return (
    <>
      {showInput && (
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item>
            <MuiTypography
              variant={props.labelVariant}
              color={props.labelColor}
            >
              {props.label}
            </MuiTypography>
          </Grid>
          <Grid item container flexDirection="row">
            <Grid item>
              <CustomTextField
                placeholder={props.placeholder}
                value={props.value}
                style={styledInput}
                size="small"
              />
            </Grid>
            <Grid item paddingTop="1rem" marginLeft="0.5rem">
              <MuiIcon
                src={CANCEL}
                alt={Constants.ICON_ALT}
                style={{ cursor: 'pointer' }}
                onClick={handleCancelClick}
                visible={props.iconVisible}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default RampCategoryInput

import { Grid } from '@mui/material'
import MuiTypography from 'components/atoms/Typography'
import theme from 'themes'
import { Constants } from 'utils/constants'
import { StyledContinueButton, StyledGoogleButton } from 'utils/styles'
import IconTypography from './IconTypography'

interface ButtonsSectionProps {
  icon: string
  iconLabel: string
  isButtonDisabled: boolean
  onContinue: () => void
  onGoogleClick: () => void
}

const ButtonSection = (props: ButtonsSectionProps) => {
  return (
    <Grid container flexDirection="column">
      <Grid item marginTop="2rem">
        <StyledContinueButton
          variant="contained"
          fullWidth
          disabled={props.isButtonDisabled}
          onClick={props.onContinue}
        >
          {Constants.CONTINUE}
        </StyledContinueButton>
      </Grid>
      <Grid item sx={{ marginTop: '2rem', textAlign: 'center' }}>
        <MuiTypography
          variant="caption1"
          color={theme.palette.Text.lowEmphasis}
        >
          {Constants.OR}
        </MuiTypography>
      </Grid>
      <Grid item marginTop="1rem">
        <StyledGoogleButton
          fullWidth
          variant="text"
          onClick={props.onGoogleClick}
        >
          <IconTypography
            icon={props.icon}
            label={props.iconLabel}
            sx={{ gap: '1.5rem', color: theme.palette.Text.highEmphasis }}
            iconPaddingTop="0.1rem"
          />
        </StyledGoogleButton>
      </Grid>
    </Grid>
  )
}
export default ButtonSection

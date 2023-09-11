import { Grid, styled } from '@mui/material'
import Image from 'components/atoms/Image'
import MuiTypography from 'components/atoms/Typography'
import theme from 'themes'
import LEFT from 'public/assets/image/signup-left.svg'
import RIGHT from 'public/assets/image/signup-right.svg'
import { Constants } from 'utils/constants'

export interface RampAuthTemplateProps {
  authContent: React.ReactNode
}

const StyledContainer = styled(Grid)({
  flexDirection: 'column',
  width: '35rem',
  marginTop: '2.5rem',
  marginBottom: '5rem',
})

const RampAuthTemplate = (props: RampAuthTemplateProps) => {
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item marginTop="21rem" marginRight="4.03rem">
        <Image src={LEFT} alt={Constants.ICON_ALT} width="300rem" />
      </Grid>
      <StyledContainer item container>
        <Grid item margin="0rem 0rem 2.5rem 1.25rem">
          <MuiTypography
            variant="h1"
            fontSize="1.75rem"
            fontWeight="bold"
            color={theme.palette.Text.highEmphasis}
          >
            Ramp
          </MuiTypography>
        </Grid>
        <Grid item>{props.authContent}</Grid>
      </StyledContainer>
      <Grid item marginTop="4.03rem" marginLeft="5.69rem">
        <Image src={RIGHT} alt={Constants.ICON_ALT} width="300rem" />
      </Grid>
    </Grid>
  )
}

export default RampAuthTemplate

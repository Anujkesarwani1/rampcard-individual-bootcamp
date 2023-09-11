import { Grid, styled } from '@mui/material'
import Icons from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
import theme from 'themes'
import AWS from 'public/assets/image/aws.svg'
import RIGHT_ARROW from 'public/assets/image/right_arrow.svg'
import { Constants, REPORTING_CARD } from 'utils/constants'

export interface ReportingCardProps {
  header: string
  content: string
  awsHeader: string
  awsAmount: string
  onClick: () => void
}

const StyledContainer = styled(Grid)({
  display: 'flex',
  width: '15.5rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.75rem',
})

const ReportingCard = (props: ReportingCardProps) => {
  return (
    <StyledContainer container>
      <Grid item>
        <MuiTypography variant="subtitle2">
          <b>{props.header}</b>
        </MuiTypography>
      </Grid>
      <Grid item>
        <MuiTypography
          variant="body2"
          color={theme.palette.Text.mediumEmphasis}
        >
          {props.content}
        </MuiTypography>
      </Grid>
      <Grid item>
        <Grid container gap="0.5rem">
          <Grid item>
            <Icons src={AWS} alt={Constants.ICON_ALT} />
          </Grid>
          <Grid item>
            <Grid container flexDirection="column">
              <Grid item>
                <MuiTypography variant="caption2" marginBottom="0.31rem">
                  {props.awsHeader}
                </MuiTypography>
              </Grid>
              <Grid item>
                <MuiTypography
                  variant="subtitle2"
                  color={theme.palette.Accent.accentGreen100}
                >
                  {props.awsAmount}
                </MuiTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container sx={{ cursor: 'pointer', flexDirection: 'row' }}>
          <Grid item>
            <MuiTypography
              variant="body2"
              color={theme.palette.primary.primary500}
              onClick={props.onClick}
              data-testid="reward-btn"
            >
              {REPORTING_CARD.PARTNER_REWARD}
            </MuiTypography>
          </Grid>
          <Grid item>
            <Icons src={RIGHT_ARROW} alt={Constants.ICON_ALT} />
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  )
}

export default ReportingCard

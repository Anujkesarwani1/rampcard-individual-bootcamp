import { Grid, styled } from '@mui/material'
import MuiTypography from 'components/atoms/Typography'
import Header from 'components/organisms/Header'
import Navigation from 'components/organisms/Navigation'
import theme from 'themes'
import { navigationData } from 'utils/constants'
import { WhiteButton } from 'utils/styles'

export interface AccountingTemplateProps {
  rampCardStatus: React.ReactNode
  content: React.ReactNode
}

const BaseGrid = styled(Grid)({
  display: 'flex',
  height: '2.75rem',
  margin: 0,
  flexShrink: '0',
})

const ContentGrid = styled(Grid)({
  display: 'flex',
  height: '42.75rem',
  padding: '2.5rem',
})

const AccountingTemplate = (props: AccountingTemplateProps) => {
  return (
    <Grid container display="flex" flexDirection="column">
      <BaseGrid item>
        <Header onLogOut={() => {}} onButtonClick={() => {}} open={false} />
      </BaseGrid>
      <BaseGrid item>
        <Navigation navigationData={navigationData} />
      </BaseGrid>
      <ContentGrid item>
        <Grid container display="flex" flexDirection="column">
          <Grid item>
            <Grid
              container
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <MuiTypography
                  variant="h1"
                  color={theme.palette.Text.highEmphasis}
                  fontSize="1.75rem"
                  fontWeight="bold"
                >
                  Ramp cards
                </MuiTypography>
              </Grid>
              <Grid item marginRight="3.5rem">
                <WhiteButton variant="contained" sx={{ marginRight: '0.5rem' }}>
                  Sync history
                </WhiteButton>
                <WhiteButton variant="contained">Settings</WhiteButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item marginTop="1.75rem" marginBottom="2.25rem">
            {props.rampCardStatus}
          </Grid>
          <Grid item height="3.75rem">
            {props.content}
          </Grid>
        </Grid>
      </ContentGrid>
    </Grid>
  )
}

export default AccountingTemplate

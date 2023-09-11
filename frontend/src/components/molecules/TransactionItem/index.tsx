import { Grid, styled } from '@mui/material'
import MuiTypography from 'components/atoms/Typography'
import theme from 'themes'
import { VisibilityOutlined } from '@mui/icons-material'

export interface TransactionItemProps {
  label: string
  sublabel: string
}

const StyledContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5rem',
  alignItems: 'center',
  gap: '0.5rem',
})

const TransactionItem = (props: TransactionItemProps) => {
  return (
    <StyledContainer container>
      <Grid item>
        <Grid container flexDirection="column" width="6.5rem">
          <Grid item>
            <MuiTypography variant="body2">{props.label}</MuiTypography>
          </Grid>
          <Grid item>
            <MuiTypography
              variant="body3"
              color={theme.palette.Text.mediumEmphasis}
            >
              {props.sublabel}
            </MuiTypography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <VisibilityOutlined
          sx={{
            color: `${theme.palette.Structural.icon}`,
            width: '1rem',
            height: '1rem',
          }}
        />
      </Grid>
    </StyledContainer>
  )
}

export default TransactionItem

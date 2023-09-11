import { Box, Divider, Grid, Popover, styled } from '@mui/material'
import Icons from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
import HELP from 'public/assets/image/help.svg'
import theme from 'themes'
import { Constants } from 'utils/constants'

const StyledBox = styled(Box)({
  width: '36.75rem',
  height: '10.6875rem',
  flexShrink: '0',
  borderRadius: '0.375rem',
  border: `1px solid ${theme.palette.Structural.stroke100}`,
  background: `${theme.palette.Structural.main}`,
  boxShadow: `0px 5px 15px 0px rgba(0, 0, 0, 0.12), 0px 15px 35px 0px rgba(60, 66, 87, 0.08)`,
  padding: '1.5rem',
})

export interface SearchSuggestionPanelProps {
  open: boolean
  item: string
  onClick: () => void
}

const SearchSuggestionPanel = (props: SearchSuggestionPanelProps) => {
  return (
    <Popover
      open={props.open}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 320, left: 50 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <StyledBox>
        <Grid container flexDirection="column">
          <Grid item marginBottom="0.5rem">
            <MuiTypography
              variant="subtitle1"
              color={theme.palette.Text.lowEmphasis}
            >
              Show all results for <b>Lyft</b>
            </MuiTypography>
          </Grid>
          <Divider />
          <Grid item marginTop="1.06rem">
            <MuiTypography
              variant="subtitle1"
              color={theme.palette.Text.lowEmphasis}
            >
              TRANSACTIONS
            </MuiTypography>
          </Grid>
          <Grid item sx={{ cursor: 'pointer', marginTop: '1rem' }}>
            <MuiTypography
              variant="subtitle1"
              onClick={props.onClick}
              data-testid="item-test"
            >
              {props.item}
            </MuiTypography>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            marginTop="1.67rem"
            gap="0.25rem"
          >
            <Grid item>
              <Icons src={HELP} alt={Constants.ICON_ALT} />
            </Grid>
            <Grid item>
              <MuiTypography variant="subtitle1">Search tips</MuiTypography>
            </Grid>
          </Grid>
        </Grid>
      </StyledBox>
    </Popover>
  )
}

export default SearchSuggestionPanel

import { Grid, styled } from '@mui/material'
import ButtonNavigation from 'components/molecules/ButtonNavigation'
import RIGHT_ARROW from 'public/assets/image/right_arrow.svg'
import ProfileModal from '../ProfileModal'
import theme from 'themes'

export interface HeaderProps {
  onLogOut: () => void
  onButtonClick: () => void
  open: boolean
}

const GridContainer = styled(Grid)({
  display: 'flex',
  height: '2.75rem',
  flexShrink: '0',
  background: `var(--structural-colors-50, #F6F8FA)`,
})

const Header = (props: HeaderProps) => {
  return (
    <GridContainer container>
      <Grid
        item
        margin="0.63rem 0rem 0.63rem 2.5rem"
        sx={{
          background: '#EBEEF1',
          borderRadius: '2.5rem',
          color: theme.palette.primary.primary500,
          fontWeight: 'bold',
        }}
      >
        <ButtonNavigation
          label="Setup guide"
          onClick={() => {}}
          sx={{ color: theme.palette.Text.main }}
          beforeClickIcon={RIGHT_ARROW}
          afterClickIcon={RIGHT_ARROW}
        />
      </Grid>
      <Grid item margin="0.63rem 5rem 0.63rem auto">
        <ProfileModal
          header="My Ramp"
          onLogOut={props.onLogOut}
          open={props.open}
        />
      </Grid>
    </GridContainer>
  )
}

export default Header

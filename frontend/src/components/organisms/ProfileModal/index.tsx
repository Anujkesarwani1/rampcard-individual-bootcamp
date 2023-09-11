import { Divider, Grid, Popover, styled } from '@mui/material'
import Icons from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
import PROFILE from 'public/assets/image/profile_2.svg'
import { useState } from 'react'
import theme from 'themes'
import { Constants, profileOptions } from 'utils/constants'
import IconTypography from '../SignIn/IconTypography'
import SETTINGS from 'public/assets/image/settings.svg'
import LOGOUT from 'public/assets/image/log_out.svg'

export interface ProfileModalProps {
  header: string
  open: boolean
  onLogOut: () => void
}

const StyledContained = styled(Grid)({
  display: 'inline-flex',
  padding: '0.5rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '0.625rem',
  borderRadius: '0.375rem',
  border: `1px solid ${theme.palette.Structural.stroke100}`,
  background: `${theme.palette.Structural.main}`,
  boxShadow:
    '0px 5px 15px 0px rgba(0, 0, 0, 0.12), 0px 15px 35px 0px rgba(60, 66, 87, 0.08)',
})

const ProfileModal = (props: ProfileModalProps) => {
  const [showPopOver, setShowPopOver] = useState(props.open)
  return (
    <Grid container justifyContent="flex-end">
      <Grid item>
        <Icons
          src={PROFILE}
          alt={Constants.ICON_ALT}
          onClick={() => setShowPopOver(!showPopOver)}
          style={{ cursor: 'pointer' }}
        />
        {showPopOver && (
          <Popover
            data-testid="profile-popover"
            onClick={() => setShowPopOver(!showPopOver)}
            open={showPopOver}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 60, left: 1500 }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <StyledContained container>
              <Grid item>
                <MuiTypography
                  variant="caption1"
                  color={theme.palette.Text.lowEmphasis}
                  fontSize="0.75rem"
                >
                  {props.header}
                </MuiTypography>
              </Grid>
              {profileOptions.map((item) => (
                <Grid item key={item.id} marginTop="0.25rem">
                  <MuiTypography
                    variant="body2"
                    color={theme.palette.Text.lowEmphasis}
                    sx={{ cursor: 'pointer' }}
                  >
                    <b>{item.option}</b>
                  </MuiTypography>
                </Grid>
              ))}
              <Divider sx={{ width: '10rem', height: '0.0625rem' }} />
              <Grid item>
                <IconTypography
                  icon={SETTINGS}
                  label="Settings"
                  sx={{
                    gap: '0.5rem',
                    color: theme.palette.Text.lowEmphasis,
                    cursor: 'pointer',
                  }}
                  iconPaddingTop="0.1rem"
                />
              </Grid>
              <Grid item>
                <IconTypography
                  icon={LOGOUT}
                  label="Log out"
                  sx={{
                    gap: '0.5rem',
                    color: theme.palette.Text.lowEmphasis,
                    cursor: 'pointer',
                  }}
                  onClick={props.onLogOut}
                />
              </Grid>
            </StyledContained>
          </Popover>
        )}
      </Grid>
    </Grid>
  )
}

export default ProfileModal

import { Box, Grid, Popover } from '@mui/material'
import Icons from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
import INFO from 'public/assets/image/info.svg'
import CANCEL from 'public/assets/image/cancel.svg'
import theme from 'themes'
import { useState } from 'react'
import { Constants } from 'utils/constants'
import { WhiteButton, modalStyle } from 'utils/styles'

export interface BannerProps {
  open: boolean
  header: string
  content: string
  onClick: () => void
}

const Banner = (props: BannerProps) => {
  const [openPopover, setOpenPopover] = useState(props.open)
  return (
    <Popover
      anchorReference="anchorPosition"
      anchorPosition={{ top: 600, left: 1200 }}
      open={openPopover}
    >
      <Box sx={modalStyle}>
        <Grid container flexDirection="row">
          <Grid item marginRight="0.75rem" marginTop="0.3rem">
            <Icons src={INFO} alt="Icon not found" />
          </Grid>
          <Grid item>
            <Grid container width="14.75rem">
              <Grid item>
                <MuiTypography variant="body1">{props.header}</MuiTypography>
              </Grid>
              <Grid item>
                <MuiTypography
                  variant="body2"
                  color={theme.palette.Text.mediumEmphasis}
                >
                  {props.content}
                </MuiTypography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item marginLeft="1.5rem">
            <Icons
              src={CANCEL}
              alt={Constants.ICON_ALT}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenPopover(!openPopover)}
            />
          </Grid>
        </Grid>
        <WhiteButton variant="contained" onClick={props.onClick}>
          Create rule
        </WhiteButton>
      </Box>
    </Popover>
  )
}

export default Banner

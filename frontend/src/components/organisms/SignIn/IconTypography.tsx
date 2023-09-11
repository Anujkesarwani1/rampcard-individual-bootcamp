import { Grid } from '@mui/material'
import Icons from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
import { Constants } from 'utils/constants'

interface IconTypographyProps {
  icon: string
  label: string
  sx?: React.CSSProperties
  onClick?: () => void
  iconPaddingTop?: string
}

const IconTypography = (props: IconTypographyProps) => {
  return (
    <Grid container sx={props.sx}>
      <Grid item paddingTop={props.iconPaddingTop}>
        <Icons
          src={props.icon}
          alt={Constants.ICON_ALT}
          onClick={props.onClick}
        />
      </Grid>
      <Grid item>
        <MuiTypography variant="body2" onClick={props.onClick}>
          <b>{props.label}</b>
        </MuiTypography>
      </Grid>
    </Grid>
  )
}

export default IconTypography

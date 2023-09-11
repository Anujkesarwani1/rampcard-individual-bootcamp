import { Box } from '@mui/material'
import Checkbox from 'components/atoms/Checkbox'
import MuiTypography from 'components/atoms/Typography'
import theme from 'themes'

export interface Props {
  label: string
  variant:
    | 'h1'
    | 'h2'
    | 'subtitle1'
    | 'subtitle2'
    | 'subtitle3'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption1'
    | 'caption2'
}

const CheckboxTypography = ({ label, variant }: Props) => {
  return (
    <Box style={{ display: 'flex' }}>
      <Checkbox style={{ marginRight: '0.5rem' }} />
      <MuiTypography
        variant={variant}
        sx={{ color: theme.palette.Text.highEmphasis }}
      >
        {label}
      </MuiTypography>
    </Box>
  )
}

export default CheckboxTypography

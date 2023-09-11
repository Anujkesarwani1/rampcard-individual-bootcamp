import { Checkbox as MuiCheckbox, styled, CheckboxProps } from '@mui/material'
import theme from 'themes'

const StyledCheckbox = styled(MuiCheckbox)({
  width: '12px',
  height: '12px',
  borderRadius: '4px',
  color: theme.palette.Structural.stroke100,
  '&.Mui-checked': {
    color: theme.palette.primary.primary500,
  },
  boxShadow:
    '0px 1px 1px 0px rgba(0, 0, 0, 0.08), 0px 2px 5px 0px rgba(60, 66, 87, 0.12)',
})
const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />
}
export default Checkbox

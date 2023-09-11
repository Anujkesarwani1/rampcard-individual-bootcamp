import { Autocomplete, AutocompleteProps } from '@mui/material'
import { OptionItem } from 'utils/types'
import CustomTextField from '../Input'

export interface DropdownProps {
  label?: string
  options: OptionItem[]
  width?: number | string
  height?: number | string
  value?: OptionItem | null
  onChange?: any
  disabled?: boolean
  sx?: React.CSSProperties
  size: AutocompleteProps<OptionItem, false, false, false>['size']
  popupIcon?: React.ReactNode
  inputValue?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  width,
  height,
  disabled,
  size,
  popupIcon,
  onChange,
  inputValue,
}) => {
  return (
    <Autocomplete
      onChange={onChange}
      disablePortal
      options={options}
      sx={{ width: width, height: height }}
      size={size}
      inputValue={inputValue}
      popupIcon={popupIcon}
      renderInput={(params) => <CustomTextField {...params} label={label} />}
      disabled={disabled}
    />
  )
}

export default Dropdown

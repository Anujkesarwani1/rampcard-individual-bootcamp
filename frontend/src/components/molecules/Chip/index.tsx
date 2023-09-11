import { Chip as MuiChip } from '@mui/material'
import Icons from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
import React from 'react'

export interface ChipProps {
  label: string
  icon: string
  onClick: () => void
  style?: React.CSSProperties
  alt: string
}

const Chip = (props: ChipProps) => {
  return (
    <MuiChip
      variant="outlined"
      style={props.style}
      clickable
      icon={
        <Icons
          src={props.icon}
          alt={props.alt}
          style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
          onClick={props.onClick}
        />
      }
      label={<MuiTypography variant="caption1">{props.label}</MuiTypography>}
    />
  )
}

export default Chip

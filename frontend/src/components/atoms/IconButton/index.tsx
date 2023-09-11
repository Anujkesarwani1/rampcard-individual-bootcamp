import { Button, ButtonProps, styled } from '@mui/material'
import React from 'react'

interface IconButtonProps extends ButtonProps {
  icon?: string
  text?: string | React.ReactNode
  variant: 'text' | 'outlined' | 'contained'
  onClick?: () => void
}

const StyledIconButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  borderRadius: '6px',
  minWidth: 0,
})

const IconButton = ({
  icon,
  text,
  variant,
  onClick,
  ...props
}: IconButtonProps) => {
  return (
    <>
      <StyledIconButton
        data-testid="icon-button"
        variant={variant}
        startIcon={icon && <img src={icon} alt="Icon" />}
        onClick={onClick}
        disableRipple={true}
        disableElevation={true}
        {...props}
      >
        {text}
      </StyledIconButton>
    </>
  )
}

export default IconButton
